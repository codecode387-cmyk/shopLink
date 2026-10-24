import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import CopyLink from "../../components/CopyLink";
import LogoutButton from "../../components/LogoutButton";

export const metadata: Metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const { data: vendor } = await supabase
    .from("vendors").select("id,store_name,slug").eq("owner_id", user.id).maybeSingle();
  const { data: billing } = vendor
    ? await supabase.from("vendor_billing").select("trial_ends_at,subscription_status,paid_until").eq("vendor_id", vendor.id).maybeSingle()
    : { data: null };

  if (!vendor) {
    return (
      <section className="page-hero"><div className="wrap">
        <h1>We could not find your store</h1>
        <p className="lead">Your account exists but has no store yet. Please message us on WhatsApp and we will fix it quickly.</p>
        <div style={{ marginTop: "1.5rem" }}><LogoutButton /></div>
      </div></section>
    );
  }

  const url = `shoplink.ng/${vendor.slug}`;
  const status = billing?.subscription_status ?? "trialing";
  const daysLeft = billing ? Math.max(0, Math.ceil((new Date(billing.trial_ends_at).getTime() - Date.now()) / 86400000)) : 30;
  const badge =
    status === "active" ? { cls: "ok", text: "Active" }
    : status === "past_due" ? { cls: "warn", text: "Payment needed" }
    : status === "expired" || daysLeft === 0 ? { cls: "warn", text: "Trial ended" }
    : { cls: "", text: `Free trial: ${daysLeft} day${daysLeft === 1 ? "" : "s"} left` };

  return (
    <>
      <section className="page-hero"><div className="wrap">
        <h1>{vendor.store_name}</h1>
        <p className="lead">Your store dashboard</p>
      </div></section>
      <section style={{ paddingTop: "1rem" }}><div className="wrap">
        {sp.welcome && <div className="notice">Your store is created and your free month has started.</div>}
        <div className="dash-grid">
          <div className="card">
            <h2>Your store link</h2>
            <div className="done-url">{url}</div>
            <div className="done-actions"><CopyLink url={url} /></div>
          </div>
          <div className="card">
            <h2>Your plan</h2>
            <p style={{ margin: ".8rem 0" }}><span className={"badge " + badge.cls}>{badge.text}</span></p>
            <p style={{ color: "var(--muted)" }}>After your free month, the plan is ₦2,000 per month.</p>
          </div>
        </div>
        <div className="sec-head" style={{ margin: "2.5rem 0 1.2rem" }}><h2>Get your store ready</h2></div>
        <div className="steps">
          <div className="step"><h3>Set up your store</h3><p>Add your logo, description, and city. Coming next.</p></div>
          <div className="step"><h3>Add your products</h3><p>Upload up to 5 photos per product and set your prices. Coming next.</p></div>
          <div className="step"><h3>Share your link</h3><p>Copy your store link above and put it in your WhatsApp status and Instagram bio.</p></div>
        </div>
        <div className="done-actions" style={{ marginTop: "2.5rem" }}>
          <LogoutButton />
          <Link className="btn btn-ghost" href="/contact">Need help?</Link>
        </div>
      </div></section>
    </>
  );
}
