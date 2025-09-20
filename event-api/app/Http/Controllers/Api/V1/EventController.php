<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->boolean('published_only', false)) {
            $query->where('is_published', true);
        }

        $search = trim((string) $request->query('search', ''));
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%")
                  ->orWhere('city', 'like', "%$search%")
                  ->orWhere('country', 'like', "%$search%");
            });
        }

        $events = $query->latest('starts_at')->paginate((int) $request->query('per_page', 15));

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:events,slug'],
            'description' => ['nullable', 'string'],
            'venue' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'capacity' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
            'cover_path' => ['nullable', 'string', 'max:1024'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title'] . '-' . Str::random(6));
        }

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        $event->load('tickets');
        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'nullable', 'string', 'max:255', 'unique:events,slug,' . $event->id],
            'description' => ['sometimes', 'nullable', 'string'],
            'venue' => ['sometimes', 'nullable', 'string', 'max:255'],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],
            'city' => ['sometimes', 'nullable', 'string', 'max:255'],
            'country' => ['sometimes', 'nullable', 'string', 'max:255'],
            'starts_at' => ['sometimes', 'date'],
            'ends_at' => ['sometimes', 'nullable', 'date', 'after_or_equal:starts_at'],
            'capacity' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'is_published' => ['sometimes', 'boolean'],
            'cover_path' => ['sometimes', 'nullable', 'string', 'max:1024'],
        ]);

        if (array_key_exists('title', $validated) && empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title'] . '-' . Str::random(6));
        }

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(['message' => 'Event deleted']);
    }
}
