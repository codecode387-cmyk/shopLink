"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";

export default function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [sb] = useState(() => createClient());
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setMsg("Enter a valid email address.");
    if (!pw) return setMsg("Enter your password.");
    setBusy(true);
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password: pw });
    if (error) {
      setBusy(false);
      return setMsg(error.message.toLowerCase().includes("invalid login") ? "Wrong email or password." : error.message);
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form className="card" onSubmit={onSubmit} noValidate>
      <label className="field">Email
        <input type="email" autoComplete="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="field">Password
        <input type={show ? "text" : "password"} autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} />
      </label>
      <label className="check"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> <span>Show password</span></label>
      <p className="msg" role="alert">{msg}</p>
      <button className="btn btn-main" type="submit" disabled={busy} style={{ width: "100%", marginTop: ".8rem" }}>
        {busy ? "Logging in…" : "Log in"}
      </button>
      <p className="alt-link">Forgot your password? <Link href="/contact">Message us on WhatsApp</Link></p>
      <p className="alt-link">New here? <Link href="/signup">Create your store</Link></p>
    </form>
  );
}
