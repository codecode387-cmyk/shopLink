import type { Metadata } from "next";
import LoginForm from "../../components/LoginForm";

export const metadata: Metadata = { title: "Log in", description: "Log in to manage your ShopLink NG store." };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const sp = await searchParams;
  const next = sp.next && sp.next.startsWith("/") && !sp.next.startsWith("//") ? sp.next : "/dashboard";
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <h1>Welcome back</h1>
        <p className="lead">Log in to manage your store.</p>
      </div></section>
      <section style={{ paddingTop: "1rem" }}><div className="wrap auth">
        <LoginForm next={next} />
        <aside className="side">
          <h2>Your dashboard</h2>
          <ul>
            <li>See your store link and plan</li>
            <li>Share your link in your bio</li>
            <li>Products and store settings are coming next</li>
          </ul>
        </aside>
      </div></section>
    </>
  );
}
