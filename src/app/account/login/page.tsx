'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const { login, register } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name || email.split('@')[0], email, password);
      }
      router.push('/account');
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-md mx-auto px-6 py-16">
        <p className="eyebrow mb-3">{mode === 'login' ? 'Sign In' : 'Create account'}</p>
        <h1 className="h-display text-4xl text-ivory">
          {mode === 'login' ? 'Welcome back.' : 'Join the garage.'}
        </h1>
        <p className="mt-3 text-sm text-ivory/65 font-body">
          {mode === 'login'
            ? 'Any credentials work in this demo build — try anything.'
            : 'A demo account will be created locally. No real backend call yet.'}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {mode === 'register' && (
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
          )}
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-vermillion-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-sm px-7 py-3.5 transition focus-ring bg-mauli-500 text-ink hover:bg-mauli-400 shadow-mauli-glow disabled:opacity-50"
          >
            {busy ? 'Working…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-sm text-ivory/65 text-center font-body">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-mauli-500 hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-mauli-500 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        <p className="mt-10 text-center">
          <Link href="/shop" className="nav-link">Continue shopping</Link>
        </p>
      </div>
    </section>
  );
}
