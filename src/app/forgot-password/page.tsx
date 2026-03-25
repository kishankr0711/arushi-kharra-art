'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resetUrl, setResetUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setResetUrl('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to create reset link');
        return;
      }

      setMessage(data.message || 'If this email exists, reset link has been generated.');
      if (data.resetUrl) setResetUrl(data.resetUrl);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-center text-2xl font-light text-stone-900">Forgot Password</h1>
        <p className="mb-6 text-center text-sm text-stone-500">
          Enter your email to generate a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-4 py-2 focus:border-stone-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <Button type="submit" intent="art" className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Reset Link'}
          </Button>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm text-green-700">{message}</p>}

        {resetUrl && (
          <div className="mt-4 rounded-md bg-stone-100 p-3 text-xs text-stone-700">
            <p className="mb-2 font-medium">Reset link (development mode):</p>
            <a href={resetUrl} className="break-all text-stone-900 underline">
              {resetUrl}
            </a>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-stone-500">
          Back to{' '}
          <Link href="/login" className="text-stone-900 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
