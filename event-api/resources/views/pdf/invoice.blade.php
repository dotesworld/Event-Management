<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice - {{ $registration->reference }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; color: #111; font-size: 12px; }
        h1, h2, h3 { margin: 0 0 8px; }
        .header { border-bottom: 1px solid #ddd; margin-bottom: 12px; padding-bottom: 8px; }
        .grid { display: table; width: 100%; }
        .col { display: table-cell; vertical-align: top; }
        .col-2 { width: 50%; }
        .box { border: 1px solid #e5e7eb; padding: 10px; border-radius: 6px; }
        .muted { color: #555; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { padding: 6px 8px; border-bottom: 1px solid #eee; text-align: left; }
        .qr { width: 160px; height: 160px; border: 1px solid #e5e7eb; padding: 6px; }
        .small { font-size: 11px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Ticket Invoice</h1>
        <div class="muted">Reference: {{ $registration->reference }}</div>
    </div>

    <div class="grid">
        <div class="col col-2">
            <div class="box">
                <h3>Event</h3>
                <div><strong>{{ $event->title }}</strong></div>
                <div class="small muted">{{ optional($event->starts_at)->format('Y-m-d H:i') }} - {{ optional($event->ends_at)->format('Y-m-d H:i') }}</div>
                <div class="small">{{ $event->venue }}</div>
                <div class="small">{{ $event->address }}, {{ $event->city }}, {{ $event->country }}</div>
            </div>
        </div>
        <div class="col col-2">
            <div class="box">
                <h3>Attendee</h3>
                <div>{{ $registration->first_name }} {{ $registration->last_name }}</div>
                <div class="small muted">{{ $registration->email }}</div>
            </div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Ticket Type</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $ticket->type }}</td>
                <td>${{ number_format((float)$ticket->price, 2) }}</td>
                <td>1</td>
                <td>${{ number_format((float)$ticket->price, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <div style="margin-top: 16px;" class="grid">
        <div class="col col-2">
            <div class="box small">
                <div>Status: <strong>{{ ucfirst($registration->status) }}</strong></div>
                <div>Issued at: {{ now()->format('Y-m-d H:i') }}</div>
            </div>
        </div>
        <div class="col col-2" style="text-align:right;">
            <div class="qr">
                {!! $qr_svg !!}
            </div>
            <div class="small muted">Scan at check-in</div>
        </div>
    </div>
</body>
</html>