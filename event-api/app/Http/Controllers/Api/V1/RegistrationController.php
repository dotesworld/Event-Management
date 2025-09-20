<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Ticket;
use App\Models\Registration;
use App\Jobs\SendTicketInvoiceJob;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Carbon;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = Registration::query()->with(['event', 'ticket']);

        if ($request->filled('event_id')) {
            $query->where('event_id', $request->integer('event_id'));
        }
        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }
        $search = trim((string) $request->query('search', ''));
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%$search%")
                  ->orWhere('last_name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('reference', 'like', "%$search%");
            });
        }

        $regs = $query->latest('created_at')->paginate((int) $request->query('per_page', 15));
        return response()->json($regs);
    }

    public function store(Request $request, Event $event, Ticket $ticket)
    {
        abort_unless($ticket->event_id === $event->id && $ticket->is_active, 422);

        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
        ]);

        $registration = DB::transaction(function () use ($event, $ticket, $validated) {
            if ($ticket->sold >= $ticket->quantity) {
                abort(422, 'Sold out');
            }

            $reference = strtoupper(Str::random(10));

            $reg = Registration::create([
                'event_id' => $event->id,
                'ticket_id' => $ticket->id,
                'user_id' => auth()->id(),
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'status' => 'confirmed',
                'reference' => $reference,
            ]);

            $ticket->increment('sold');

            return $reg;
        });

        // Dispatch async job to generate QR/PDF and send email
        dispatch(new SendTicketInvoiceJob($registration->id));
        Log::info('Registration created', ['id' => $registration->id]);

        return response()->json($registration, 201);
    }

    public function show(Registration $registration)
    {
        $registration->load(['event', 'ticket']);
        return response()->json($registration);
    }

    public function update(Request $request, Registration $registration)
    {
        $validated = $request->validate([
            'first_name' => ['sometimes', 'string', 'max:255'],
            'last_name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255'],
            'status' => ['sometimes', 'in:pending,confirmed,cancelled,refunded'],
        ]);

        $registration->update($validated);
        return response()->json($registration->fresh()->load(['event', 'ticket']));
    }

    public function checkIn(Registration $registration)
    {
        if ($registration->checked_in_at) {
            return response()->json(['message' => 'Already checked in'], 200);
        }

        $registration->update(['checked_in_at' => now()]);

        return response()->json(['message' => 'Checked in']);
    }

    public function checkInByReference(Request $request)
    {
        $data = $request->validate([
            'reference' => ['required', 'string'],
        ]);

        $registration = Registration::where('reference', $data['reference'])->first();

        if (!$registration) {
            return response()->json(['message' => 'Registration not found'], 404);
        }

        if ($registration->checked_in_at) {
            return response()->json([
                'message' => 'Already checked in',
                'registration' => $registration->load(['event', 'ticket']),
            ], 200);
        }

        $registration->update(['checked_in_at' => now()]);

        return response()->json([
            'message' => 'Checked in',
            'registration' => $registration->load(['event', 'ticket']),
        ]);
    }

    public function destroy(Registration $registration)
    {
        return DB::transaction(function () use ($registration) {
            // Adjust sold counter if this was a confirmed sale
            $ticket = $registration->ticket()->lockForUpdate()->first();
            if ($ticket && $registration->status === 'confirmed' && $ticket->sold > 0) {
                $ticket->decrement('sold');
            }
            $registration->delete();
            return response()->json(['message' => 'Registration deleted']);
        });
    }
}
