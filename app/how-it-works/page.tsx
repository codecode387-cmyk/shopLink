import Link from "next/link";

export const metadata = { title: "How it works", description: "See how vendors open a store and how buyers send orders straight to WhatsApp on ShopLink NG." };

export default function Page() {
  return (
    <>

<section className="page-hero"><div className="wrap">
  <h1>How ShopLink works</h1>
  <p className="lead">One store link and one WhatsApp number. Here is what happens for the seller and for the buyer.</p>
</div></section>

<section style={{ paddingTop: "1rem" }}><div className="wrap">
  <div className="sec-head"><h2>If you sell</h2><p>Four steps from sign-up to your first order.</p></div>
  <div className="steps four">
    <div className="step"><h3>Create your account</h3><p>Sign up with your store name and WhatsApp number. That number is where every order will arrive.</p></div>
    <div className="step"><h3>Add your products</h3><p>Upload photos, set prices in naira, write a short description, and mark sold-out items so buyers do not order them.</p></div>
    <div className="step"><h3>Share your store link</h3><p>Copy your link, such as shoplink.ng/mama-ngozi, and post it on your WhatsApp status, Instagram bio, or flyers.</p></div>
    <div className="step"><h3>Confirm each order</h3><p>Orders land in your WhatsApp with the items, total, name, and address. Reply to confirm, then agree on payment and delivery.</p></div>
  </div>
</div></section>

<section className="alt"><div className="wrap">
  <div className="sec-head"><h2>If you buy</h2><p>No account and no app to install.</p></div>
  <div className="steps four">
    <div className="step"><h3>Open the store link</h3><p>The store opens in your phone’s browser. Browse everything the seller has listed.</p></div>
    <div className="step"><h3>Add items to your cart</h3><p>Choose the quantities you want and watch the total as you go.</p></div>
    <div className="step"><h3>Enter your details</h3><p>Add your name, phone number, and delivery address.</p></div>
    <div className="step"><h3>Send the order on WhatsApp</h3><p>Tap the green button. WhatsApp opens with the order already written. Press Send, then pay the seller directly.</p></div>
  </div>
</div></section>

<section><div className="wrap split">
  <div className="sec-head" style={{ margin: "0" }}>
    <h2>What the seller receives</h2>
    <p>A clear, complete message in the chat you already use. No dashboard to check, no email to miss.</p>
  </div>
  <div className="sample">Hello Mama Ngozi, I want to order:<br />2 × Ankara tote bag — ₦12,000<br />1 × Beaded anklet — ₦3,500<br /><b>Total: ₦15,500</b><br />Name: Tola A.<br />Deliver to: Yaba, Lagos</div>
</div></section>

<section className="alt"><div className="wrap">
  <div className="sec-head"><h2>Common questions</h2></div>
  <div className="faq">
    <details><summary>Do I need to pay to open a store?</summary><p>No. Opening a store is free, with no monthly fee.</p></details>
    <details><summary>Does ShopLink take payments?</summary><p>No. Buyers pay you directly by bank transfer or on delivery. We never handle your money.</p></details>
    <details><summary>Is the order sent automatically?</summary><p>The buyer presses Send in WhatsApp, so the message goes from their own phone. This is what keeps ShopLink free for you.</p></details>
    <details><summary>Does the buyer need an account?</summary><p>No. They open your link, choose items, and send the order.</p></details>
    <details><summary>Can I run my store from my phone?</summary><p>Yes. Adding products, editing prices, and sharing your link all work from a phone.</p></details>
  </div>
</div></section>
<section style={{ paddingTop: "0" }}>
  <div className="wrap">
    <div className="final">
      <h2>Open your store today</h2>
      <p>Join vendors who are taking orders without a website bill.</p>
      <Link className="btn" href="/signup">Create your free store</Link>
    </div>
  </div>
</section>

    </>
  );
}
