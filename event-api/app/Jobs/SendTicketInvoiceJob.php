<?php

namespace App\Jobs;

use App\Mail\TicketInvoiceMail;
use App\Models\Registration;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class SendTicketInvoiceJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $registrationId)
    {
    }

    public function handle(): void
    {
        $registration = Registration::with(['event', 'ticket', 'user'])->findOrFail($this->registrationId);

        $payload = json_encode([
            'reference' => $registration->reference,
            'event_id' => $registration->event_id,
            'ticket_id' => $registration->ticket_id,
            'email' => $registration->email,
        ]);

        // Generate QR Code (SVG)
        $qrSvg = QrCode::format('svg')->size(300)->generate($payload);
        $qrPath = 'qrcodes/' . $registration->reference . '.svg';
        Storage::disk('public')->put($qrPath, $qrSvg);

        // Generate PDF Invoice (embed inline SVG to avoid remote loading)
        $pdf = Pdf::loadView('pdf.invoice', [
            'registration' => $registration,
            'event' => $registration->event,
            'ticket' => $registration->ticket,
            'qr_svg' => $qrSvg,
        ]);
        $pdfContent = $pdf->output();
        $invoicePath = 'invoices/' . $registration->reference . '.pdf';
        Storage::disk('public')->put($invoicePath, $pdfContent);

        // Update registration with file paths
        $registration->update([
            'qr_code_path' => $qrPath,
            'invoice_path' => $invoicePath,
        ]);

        // Send email with attachment
        $mailData = [
            'name' => trim($registration->first_name . ' ' . $registration->last_name),
            'event_title' => $registration->event->title,
            'reference' => $registration->reference,
            'starts_at' => $registration->event->starts_at,
            'ends_at' => $registration->event->ends_at,
            'invoice_url' => Storage::disk('public')->url($invoicePath),
        ];

        $mailable = (new TicketInvoiceMail($mailData))
            ->attachData($pdfContent, 'invoice-' . $registration->reference . '.pdf', [
                'mime' => 'application/pdf',
            ]);

        Mail::to($registration->email)->send($mailable);
    }
}
