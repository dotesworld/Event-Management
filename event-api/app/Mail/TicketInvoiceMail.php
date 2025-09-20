<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketInvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public array $data
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Ticket Invoice',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.ticket-invoice',
            with: $this->data,
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
