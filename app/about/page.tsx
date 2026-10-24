import Link from "next/link";

export const metadata = { title: "About", description: "ShopLink NG helps small Nigerian vendors open a free online store and receive orders on WhatsApp." };

export default function Page() {
  return (
    <>

<section className="page-hero"><div className="wrap"><h1>About ShopLink NG</h1><p className="lead">We help small Nigerian sellers get an online store without a monthly bill.</p></div></section>
<section style={{ paddingTop: "1rem" }}><div className="wrap">
  <div className="prose">
    <p>Many small vendors already sell on WhatsApp. They send photo after photo, answer the same price questions all day, and lose orders in a crowded chat.</p>
    <p>A proper online store would fix that, but monthly fees put it out of reach for most of them. ShopLink NG gives every seller a clean store page and sends each order to their WhatsApp, so they keep the chat their customers already trust.</p>
  </div>
</div></section>
<section className="alt"><div className="wrap">
  <div className="sec-head"><h2>What we stand for</h2></div>
  <div className="reasons">
    <div className="reason"><h3>Simple first</h3><p>If a feature needs a tutorial, we keep working on it. Selling should be as easy as posting a status.</p></div>
    <div className="reason"><h3>Fair to small sellers</h3><p>No monthly fee to open a store, and no cut taken from your sales. You deal with your customers directly.</p></div>
    <div className="reason"><h3>Built for Nigeria</h3><p>Prices in naira, orders on WhatsApp, and light pages that load on weak networks and small phones.</p></div>
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
