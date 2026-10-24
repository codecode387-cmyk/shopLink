"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../lib/supabase/client";

const RESERVED = ["about","terms","privacy","contact","signup","login","logout","dashboard","admin","api","how-it-works","why-shoplink","index","styles","menu","settings","store","stores","shop","help","support","www","app"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 30).replace(/-+$/, "");

const slugProblem = (s: string): string | null => {
  if (s.length < 3 || s.length > 30 || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s)) return "Use 3 to 30 letters, numbers, or single hyphens.";
  if (RESERVED.includes(s)) return "That link is reserved. Try another.";
  return null;
};

const normPhone = (v: string) => {
  const d = v.replace(/\D/g, "");
  if (d.startsWith("234")) return d;
  if (d.startsWith("0")) return "234" + d.slice(1);
  if (d.length === 10) return "234" + d;
  return d;
};
const phoneOk = (p: string) => /^234[789][01]\d{8}$/.test(p);

function friendly(message: string) {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered")) return "This email already has an account. Log in instead.";
  if (m.includes("rate") || m.includes("too many")) return "Too many attempts. Please wait a minute and try again.";
  if (m.includes("database error")) return "We could not create your store. Try a different store link.";
  return message || "Something went wrong. Please try again.";
}

export default function SignupForm() {
  const router = useRouter();
  const [sb] = useState(() => createClient());
  const [store, setStore] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [wa, setWa] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ slug: string; status: "taken" | "free" | "unknown" } | null>(null);

  useEffect(() => {
    if (!slug || slugProblem(slug)) return;
    let cancelled = false;
    const id = setTimeout(async () => {
      const { data, error } = await sb.from("vendors").select("slug").eq("slug", slug).limit(1);
      if (cancelled) return;
      setResult({ slug, status: error ? "unknown" : data && data.length ? "taken" : "free" });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [slug, sb]);

  let hint = "";
  let hintKind = "";
  if (slug) {
    const problem = slugProblem(slug);
    const r = result && result.slug === slug ? result.status : null;
    if (problem) { hint = problem; hintKind = "bad"; }
    else if (r === "taken") { hint = "That link is taken. Try another."; hintKind = "bad"; }
    else if (r === "free") { hint = `shoplink.ng/${slug} is available`; hintKind = "ok"; }
    else if (r === null) hint = "Checking…";
  }

  function fail(text: string, id?: string) {
    setMsg(text);
    if (id) document.getElementById(id)?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");
    const name = store.trim();
    const phone = normPhone(wa);
    const mail = email.trim();
    const r = result && result.slug === slug ? result.status : null;
    if (name.length < 2) return fail("Enter your store name.", "store");
    if (slugProblem(slug) || r === "taken") return fail("Choose a valid, available store link.", "slug");
    if (!phoneOk(phone)) return fail("Enter a valid Nigerian WhatsApp number, for example 0903 247 3005.", "wa");
    if (!/^\S+@\S+\.\S+$/.test(mail)) return fail("Enter a valid email address.", "email");
    if (pw.length < 8) return fail("Your password needs at least 8 characters.", "pw");
    if (!agree) return fail("Please accept the Terms and Privacy policy to continue.", "agree");

    setBusy(true);
    const { data, error } = await sb.auth.signUp({
      email: mail,
      password: pw,
      options: { data: { store_name: name, slug, whatsapp_number: phone } },
    });
    if (error) { setBusy(false); return fail(friendly(error.message)); }
    if (!data.session) {
      setBusy(false);
      return fail("Account created, but email confirmation is still on in Supabase. Turn it off under Authentication settings, then log in.");
    }
    router.push("/dashboard?welcome=1");
    router.refresh();
  }

  return (
    <form className="card" onSubmit={onSubmit} noValidate>
      <label className="field">Store name
        <input id="store" value={store} maxLength={50} autoComplete="organization" placeholder="Mama Ngozi Bags"
          onChange={(e) => { setStore(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
      </label>
      <label className="field">Store link
        <span className="slug">
          <span className="pre">shoplink.ng/</span>
          <input id="slug" value={slug} maxLength={30} autoCapitalize="off" autoComplete="off" spellCheck={false} placeholder="mama-ngozi"
            onChange={(e) => { setSlugTouched(true); setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }} />
        </span>
        <small className={"hint " + hintKind} aria-live="polite">{hint}</small>
      </label>
      <label className="field">WhatsApp number
        <input id="wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="0903 247 3005" value={wa} onChange={(e) => setWa(e.target.value)} />
        <small className="hint">Your orders will be sent to this number.</small>
      </label>
      <label className="field">Email
        <input id="email" type="email" autoComplete="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="field">Password
        <input id="pw" type={show ? "text" : "password"} autoComplete="new-password" placeholder="At least 8 characters" value={pw} onChange={(e) => setPw(e.target.value)} />
      </label>
      <label className="check"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} /> <span>Show password</span></label>
      <label className="check"><input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>I agree to the <Link href="/terms">Terms</Link> and <Link href="/privacy">Privacy policy</Link></span>
      </label>
      <p className="msg" role="alert">{msg}</p>
      <button className="btn btn-main" type="submit" disabled={busy} style={{ width: "100%", marginTop: ".8rem" }}>
        {busy ? "Creating your store…" : "Create my store"}
      </button>
      <p className="alt-link">Already have a store? <Link href="/login">Log in</Link></p>
    </form>
  );
}
