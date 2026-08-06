'use client';

import { useCallback, useEffect, useState } from 'react';
import type { User } from '@/types';

const STORAGE_KEY = 'rakhi:user';

function readUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

/**
 * Mock auth: any credentials are accepted. Stores a User in localStorage.
 * Wire to the real backend by replacing login/register with POSTs to
 * /api/v1/auth/login and /api/v1/auth/register.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readUser());
    setHydrated(true);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const u: User = {
      id: `u_${Date.now()}`,
      name: email.split('@')[0] || 'Owner',
      email,
      role: 'customer',
      token: 'demo-token',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    setUser(u);
    return u;
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 400));
      const u: User = {
        id: `u_${Date.now()}`,
        name,
        email,
        role: 'customer',
        token: 'demo-token',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      setUser(u);
      return u;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return { user, hydrated, login, register, logout };
}
