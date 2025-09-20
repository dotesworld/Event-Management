"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, authToken } from "@/lib/api";

export type User = { id: number; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authToken.get();
    if (!token) { setLoading(false); return; }
    api.me().then((res) => {
      if ("data" in res) setUser(res.data);
      else authToken.set(null);
    }).finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login({ email, password });
    if ("error" in res) return { ok: false, error: res.error };
    authToken.set(res.data.token);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const registerFn = useCallback(async (name: string, email: string, password: string) => {
    const res = await api.register({ name, email, password });
    if ("error" in res) return { ok: false, error: res.error };
    authToken.set(res.data.token);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    authToken.set(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register: registerFn, logout }), [user, loading, login, registerFn, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}