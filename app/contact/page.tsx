import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contact", description: "Contact ShopLink NG on WhatsApp for vendor support, order problems, or feedback." };

export default function Page() {
  return (
    <>

<section className="page-hero"><div className="wrap"><h1>Talk to us on WhatsApp</h1><p className="lead">Tap the button and your message is ready to send. We reply on WhatsApp.</p></div></section>
<section style={{ paddingTop: "1rem" }}><div className="wrap split" style={{ alignItems: "start" }}>
  <div className="card">
    <h2>Chat with us now</h2>
    <div className="big-num">0903 247 3005</div>
    <a className="btn btn-main" href="https://wa.me/2349032473005?text=Hello%20ShopLink%20NG%2C%20I%20would%20like%20to%20ask%20about..." rel="noopener">Open WhatsApp</a>
  </div>
  <ContactForm />
</div></section>
<section className="alt"><div className="wrap">
  <div className="sec-head"><h2>How we can help</h2></div>
  <div className="reasons">
    <div className="reason"><h3>Vendor support</h3><p>Help with setting up your store, adding products, or sharing your link.</p></div>
    <div className="reason"><h3>Order problems</h3><p>Please contact the vendor first, since they handle payment and delivery. Message us if you cannot reach them.</p></div>
    <div className="reason"><h3>Report a store</h3><p>Tell us about a fake listing, scam, or anything that breaks our terms and we will look into it.</p></div>
  </div>
</div></section>


    </>
  );
}
