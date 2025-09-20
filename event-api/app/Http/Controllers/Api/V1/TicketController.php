<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Event $event)
    {
        return response()->json($event->tickets()->orderBy('price')->get());
    }

    public function store(Request $request, Event $event)
    {
        $validated = $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'quantity' => ['required', 'integer', 'min:0'],
            'is_active' => ['boolean'],
        ]);

        $ticket = $event->tickets()->create($validated + ['sold' => 0]);

        return response()->json($ticket, 201);
    }

    public function show(Event $event, Ticket $ticket)
    {
        abort_unless($ticket->event_id === $event->id, 404);
        return response()->json($ticket);
    }

    public function update(Request $request, Event $event, Ticket $ticket)
    {
        abort_unless($ticket->event_id === $event->id, 404);

        $validated = $request->validate([
            'type' => ['sometimes', 'string', 'max:255'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'quantity' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $ticket->update($validated);
        return response()->json($ticket);
    }

    public function destroy(Event $event, Ticket $ticket)
    {
        abort_unless($ticket->event_id === $event->id, 404);
        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted']);
    }
}
