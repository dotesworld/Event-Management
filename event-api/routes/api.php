<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\EventController;
use App\Http\Controllers\Api\V1\TicketController;
use App\Http\Controllers\Api\V1\RegistrationController;

Route::prefix('v1')->group(function () {
    // Public endpoints
    Route::get('events', [EventController::class, 'index']);
    Route::get('events/{event}', [EventController::class, 'show']);
    Route::get('events/{event}/tickets', [TicketController::class, 'index']);
    Route::post('events/{event}/tickets/{ticket}/registrations', [RegistrationController::class, 'store']);

    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);

    // Protected endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('auth/logout', [AuthController::class, 'logout']);
        Route::get('auth/me', [AuthController::class, 'me']);

        // Events management
        Route::post('events', [EventController::class, 'store']);
        Route::put('events/{event}', [EventController::class, 'update']);
        Route::delete('events/{event}', [EventController::class, 'destroy']);

        // Tickets nested under events
        Route::post('events/{event}/tickets', [TicketController::class, 'store']);
        Route::get('events/{event}/tickets/{ticket}', [TicketController::class, 'show']);
        Route::put('events/{event}/tickets/{ticket}', [TicketController::class, 'update']);
        Route::delete('events/{event}/tickets/{ticket}', [TicketController::class, 'destroy']);

        // Registrations
        Route::get('registrations', [RegistrationController::class, 'index']);
        Route::put('registrations/{registration}', [RegistrationController::class, 'update']);
        Route::delete('registrations/{registration}', [RegistrationController::class, 'destroy']);
        Route::post('registrations/{registration}/check-in', [RegistrationController::class, 'checkIn']);
        Route::post('registrations/check-in-by-reference', [RegistrationController::class, 'checkInByReference']);
    });
});