'use client';

import { useState } from 'react';
import { useZxing } from 'react-zxing';
import { api, authToken } from '@/lib/api';

export default function CheckInPage() {
  const [result, setResult] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(true);
  const [manualText, setManualText] = useState<string>('');

  const { ref: scannerRef } = useZxing({
    onDecodeResult(res) {
      const text = res.getText();
      setResult(text);
      setScanning(false);
    },
    timeBetweenDecodingAttempts: 200,
    torch: false,
    constraints: {
      video: { facingMode: 'environment' },
    }
  });

  async function handleCheckIn() {
    setError('');
    setMessage('');

    try {
      // Accept either a JSON string payload or a plain reference value
      const raw = result.trim();
      let reference: string;
      if (raw.startsWith('{')) {
        const payload = JSON.parse(raw);
        reference = String(payload.reference || '').trim();
      } else {
        reference = raw;
      }
      if (!reference) {
        setError('No reference found. Please scan a valid QR or paste a valid reference.');
        return;
      }

      const token = authToken.get();
      if (!token) {
        setError('Please login on the Admin page first to obtain an access token.');
        return;
      }

      const res = await api.checkInByReference(reference);
      if ('error' in res) {
        setError(res.error || 'Failed to check in');
        return;
      }
      setMessage(res.data.message || 'Checked in');
    } catch (e: any) {
      setError(e?.message || 'Invalid QR or network error');
    }
  }

  function resetScanner() {
    setResult('');
    setMessage('');
    setError('');
    setScanning(true);
    setManualText('');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Event Check-In</h1>
        <p className="text-sm text-gray-600 mb-6">Scan the attendee's QR code to check them in.</p>

        <div className="rounded-lg border bg-white p-4">
          {scanning ? (
            <div>
              <video ref={scannerRef} className="w-full rounded" />
              <p className="text-sm text-gray-600 mt-2">Point the camera at the QR code…</p>
            </div>
          ) : (
            <div>
              <div className="text-sm text-gray-700">QR content:</div>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">{result}</pre>
              <div className="mt-3 flex gap-2">
                <button onClick={handleCheckIn} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded">Check In</button>
                <button onClick={resetScanner} className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded">Scan Another</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 rounded-lg border bg-white">
          <div className="text-sm font-medium text-gray-800 mb-2">Or paste JSON/reference manually:</div>
          <textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder='{"reference":"ABC123XYZ0"} or ABC123XYZ0'
            className="w-full min-h-[80px] text-sm border rounded p-2 font-mono"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => { setResult(manualText); setScanning(false); setMessage(''); setError(''); }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded"
            >
              Use Pasted Content
            </button>
            <button
              onClick={() => { setManualText(''); }}
              className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded"
            >
              Clear
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 p-3 rounded bg-green-50 text-green-700 border border-green-200">{message}</div>
        )}
        {error && (
          <div className="mt-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">{error}</div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          Tip: Log in on <a href="/admin" className="text-purple-700 underline">Admin</a> first so protected API calls include your token.
        </div>
      </div>
    </div>
  );
}