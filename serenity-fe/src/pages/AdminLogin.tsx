import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router";
import { admin } from "../api/admin";
import Button from "../components/Button";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: admin,
    onSuccess: () => navigate("/admin"),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm border border-line bg-cream p-8">
        <div className="flex flex-col items-center">
          <span className="flex h-12 w-12 items-center justify-center border-2 border-ink font-display text-xl">
            S
          </span>
          <h1 className="mt-4 text-lg font-semibold uppercase tracking-widest">
            Serenity Space
          </h1>
          <p className="mt-1 text-xs uppercase tracking-widest text-ink/60">
            Host sign-in
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
              Email
            </span>
            <input
              type="email"
              value={email}
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/70">
              Password
            </span>
            <input
              type="password"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-line bg-white px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </label>

          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error.message}
            </p>
          )}

          <div className="mt-2 grid">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
