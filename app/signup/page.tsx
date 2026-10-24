import type { Metadata } from "next";
import SignupForm from "../../components/SignupForm";

export const metadata: Metadata = {
  title: "Create your free store",
  description: "Open a ShopLink NG store in two minutes and receive orders on WhatsApp. Your first month is free.",
};

export default function SignupPage() {
  return (
    <>
      <section className="page-hero"><div className="wrap">
        <h1>Create your store</h1>
        <p className="lead">Takes about two minutes. Your first month is free.</p>
      </div></section>
      <section style={{ paddingTop: "1rem" }}><div className="wrap auth">
        <SignupForm />
        <aside className="side">
          <h2>What you get</h2>
          <ul>
            <li>Your own store link to share anywhere</li>
            <li>Add products with photos and prices in naira</li>
            <li>Every order sent to your WhatsApp</li>
            <li>1 month free, then ₦2,000 per month</li>
          </ul>
        </aside>
      </div></section>
    </>
  );
}
