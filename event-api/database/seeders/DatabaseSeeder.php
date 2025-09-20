<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a demo user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed a sample published event with a few tickets if none exist
        if (Event::count() === 0) {
            $event = Event::create([
                'title' => 'Tech Summit 2025',
                'slug' => Str::slug('Tech Summit 2025-' . Str::random(6)),
                'description' => 'A premier conference for developers and tech leaders.',
                'venue' => 'Convention Center',
                'address' => '123 Main St',
                'city' => 'Metropolis',
                'country' => 'USA',
                'starts_at' => Carbon::now()->addDays(14),
                'ends_at' => Carbon::now()->addDays(15),
                'capacity' => 500,
                'is_published' => true,
                'cover_path' => null,
            ]);

            $event->tickets()->createMany([
                ['type' => 'General Admission', 'price' => 299.00, 'quantity' => 300, 'sold' => 0, 'is_active' => true],
                ['type' => 'VIP Pass', 'price' => 599.00, 'quantity' => 100, 'sold' => 0, 'is_active' => true],
                ['type' => 'Student Ticket', 'price' => 99.00, 'quantity' => 100, 'sold' => 0, 'is_active' => true],
            ]);
        }
    }
}
