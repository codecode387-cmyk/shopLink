import Link from "next/link";

export const metadata = { title: "Why ShopLink", description: "No monthly fees, direct payments, and orders in your WhatsApp. See why small vendors choose ShopLink NG." };

export default function Page() {
  return (
    <>

<section className="page-hero"><div className="wrap">
  <h1>Why sellers choose ShopLink</h1>
  <p className="lead">Built for small vendors who want to sell online without a monthly bill.</p>
</div></section>

<section style={{ paddingTop: "1rem" }}><div className="wrap">
  <div className="reasons">
    <div className="reason"><h3>Free to start</h3><p>Open your store and list your products without paying anything up front.</p></div>
    <div className="reason"><h3>You keep every naira</h3><p>Buyers pay you directly. We never touch your money or take a cut of your sales.</p></div>
    <div className="reason"><h3>Orders in your chat</h3><p>Everything arrives in the WhatsApp you already use, so there is nothing new to learn.</p></div>
    <div className="reason"><h3>Fast on any phone</h3><p>Pages are light, so buyers can shop even on a weak network.</p></div>
    <div className="reason"><h3>No tech skills needed</h3><p>If you can post on WhatsApp status, you can run your ShopLink store.</p></div>
    <div className="reason"><h3>Your own store link</h3><p>Your store name, logo, and link, ready to share anywhere your customers are.</p></div>
  </div>
</div></section>

<section className="alt"><div className="wrap">
  <div className="sec-head"><h2>ShopLink compared to a typical store builder</h2></div>
  <div className="table-wrap"><table>
    <thead><tr><th></th><th className="us">ShopLink NG</th><th>Typical monthly store builder</th></tr></thead>
    <tbody>
      <tr><td>Monthly fee</td><td className="us">None</td><td>Paid every month</td></tr>
      <tr><td>Setup</td><td className="us">Minutes, from your phone</td><td>Often hours, sometimes needs a developer</td></tr>
      <tr><td>Payments</td><td className="us">Paid directly to you</td><td>Often card processing and fees</td></tr>
      <tr><td>Where orders arrive</td><td className="us">Your WhatsApp</td><td>A dashboard or email</td></tr>
      <tr><td>Buyer needs an account</td><td className="us">No</td><td>Often yes</td></tr>
    </tbody>
  </table></div>
</div></section>

<section><div className="wrap">
  <div className="sec-head"><h2>Is ShopLink right for you?</h2><p>We would rather you know before you sign up.</p></div>
  <div className="fit">
    <div className="reason"><h3>A great fit if you</h3><ul><li>Already take orders on WhatsApp</li><li>Sell products you deliver or hand over yourself</li><li>Collect payment by transfer or on delivery</li><li>Want a simple catalog without a monthly cost</li></ul></div>
    <div className="reason"><h3>Not the best fit if you</h3><ul><li>Need customers to pay by card on the site</li><li>Need orders sent without the buyer pressing Send</li><li>Run a large store with complex stock systems</li></ul></div>
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
