import Link from "next/link";
import OrderDemo from "../components/OrderDemo";

export const metadata = { title: { absolute: "ShopLink NG \u2013 Your shop in one link. Orders land on WhatsApp." }, description: "Create a free online store in minutes. Customers pick what they want and the order is sent straight to your WhatsApp. No monthly fees." };

export default function Page() {
  return (
    <>

<div className="hero">
  <div className="wrap">
    <div>
      <h1>Your shop in one link.<span>Orders land on WhatsApp.</span></h1>
      <p className="lead">Add your products, share your store link, and get every order in your WhatsApp. Free to start, with no monthly fees.</p>
      <div className="cta">
        <Link className="btn btn-main" href="/signup">Create your free store</Link>
        <Link className="btn btn-ghost" href="/how-it-works">See how it works</Link>
      </div>
      <div className="proof">
        <span><b>₦0</b> monthly fee</span>
        <span><b>5 minutes</b> to set up</span>
        <span><b>No app</b> for buyers to install</span>
      </div>
    </div>

    <div className="stage" aria-hidden="true">
      <div className="phone">
        <div className="screen">
          <div className="chat-top"><div className="av">MN</div><div><b>Mama Ngozi Bags</b><span>online</span></div></div>
          <div className="chat">
            <OrderDemo />
          </div>
          <div className="input"><span>Message</span><span>➤</span></div>
        </div>
      </div>
      <div className="pill">New order ₦15,500</div>
    </div>
  </div>
</div>

<section id="how">
  <div className="wrap">
    <div className="sec-head">
      <h2>Set up in the time it takes to boil rice</h2>
      <p>No website skills, no card payments to configure, no developer.</p>
      <Link className="more" href="/how-it-works">See the full guide for vendors and buyers</Link>
    </div>
    <div className="steps">
      <div className="step"><h3>Add your products</h3><p>Upload a photo, set a price, and mark what is in stock. Do it all from your phone.</p></div>
      <div className="step"><h3>Share your link</h3><p>You get a store link like shoplink.ng/your-store. Put it on your WhatsApp status, Instagram bio, or flyers.</p></div>
      <div className="step"><h3>Get orders on WhatsApp</h3><p>Customers pick items and tap send. The full order, with their name and address, arrives in your chat.</p></div>
    </div>
  </div>
</section>

<section className="why" id="why">
  <div className="wrap">
    <div className="sec-head">
      <h2>Built for sellers who cannot afford monthly bills</h2>
      <p>Most store builders charge every month before you make a sale. We do not.</p>
      <Link className="more" href="/why-shoplink">See all the reasons</Link>
    </div>
    <div className="why-grid">
      <div className="why-item"><h3>Free to start</h3><p>List your first products and open your store without paying anything.</p></div>
      <div className="why-item"><h3>You keep every naira</h3><p>Customers pay you directly by transfer or on delivery. We never touch your money.</p></div>
      <div className="why-item"><h3>Chat the way you already do</h3><p>Orders arrive in the WhatsApp you use every day, so there is no new dashboard to learn.</p></div>
      <div className="why-item"><h3>Fast on any phone</h3><p>Pages are light, so your buyers can shop even on a weak network.</p></div>
    </div>
  </div>
</section>


<section id="reviews">
  <div className="wrap">
    <div className="sec-head">
      <h2>What vendors and buyers say</h2>
      <p>Small sellers and their customers on how ordering through WhatsApp feels.</p>
    </div>
    <div className="marquee"><div className="track">
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I used to pay a developer every month just to keep my shop online. Now my orders come straight to WhatsApp and I pay nothing.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffc83d" }} aria-hidden="true">NO</div><div><b>Ngozi Okafor</b><small>Bag seller, Lagos</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“My customers can see every product and price before they message me. I answer far fewer “how much is this?” chats.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#7be0a4" }} aria-hidden="true">KA</div><div><b>Kemi Adeyemi</b><small>Food supplier, Ibadan</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I set up my store on my phone while waiting for a customer. It took less than ten minutes.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffb29a" }} aria-hidden="true">TB</div><div><b>Tunde Bakare</b><small>Thrift seller, Abuja</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“No more sending product screenshots one by one. I send my link and people pick what they want.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#a9d4ff" }} aria-hidden="true">AY</div><div><b>Amina Yusuf</b><small>Beauty products, Kano</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I picked three items, tapped send, and my order was already written out in WhatsApp. No account, no stress.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#e4c1ff" }} aria-hidden="true">CE</div><div><b>Chiamaka Eze</b><small>Buyer, Enugu</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I used to pay a developer every month just to keep my shop online. Now my orders come straight to WhatsApp and I pay nothing.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffc83d" }} aria-hidden="true">NO</div><div><b>Ngozi Okafor</b><small>Bag seller, Lagos</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“My customers can see every product and price before they message me. I answer far fewer “how much is this?” chats.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#7be0a4" }} aria-hidden="true">KA</div><div><b>Kemi Adeyemi</b><small>Food supplier, Ibadan</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I set up my store on my phone while waiting for a customer. It took less than ten minutes.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffb29a" }} aria-hidden="true">TB</div><div><b>Tunde Bakare</b><small>Thrift seller, Abuja</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“No more sending product screenshots one by one. I send my link and people pick what they want.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#a9d4ff" }} aria-hidden="true">AY</div><div><b>Amina Yusuf</b><small>Beauty products, Kano</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I picked three items, tapped send, and my order was already written out in WhatsApp. No account, no stress.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#e4c1ff" }} aria-hidden="true">CE</div><div><b>Chiamaka Eze</b><small>Buyer, Enugu</small></div></figcaption>
      </figure>
</div></div>
<div className="marquee rev"><div className="track">
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="4 out of 5 stars">★★★★☆</div>
        <p>“The message arrives with the customer’s name and address, so I do not have to ask twice.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffc83d" }} aria-hidden="true">BS</div><div><b>Bola Salami</b><small>Caterer, Abeokuta</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“The store opened fast even on my small phone with bad network.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#7be0a4" }} aria-hidden="true">IM</div><div><b>Ibrahim Musa</b><small>Buyer, Kaduna</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="4 out of 5 stars">★★★★☆</div>
        <p>“I would like to pay inside the app, but paying the seller directly is how I already do it, so it works for me.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffb29a" }} aria-hidden="true">FJ</div><div><b>Folake Johnson</b><small>Buyer, Port Harcourt</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I put the link in my Instagram bio and people now order without DMing me five times.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#a9d4ff" }} aria-hidden="true">SW</div><div><b>Sade Williams</b><small>Hair vendor, Lagos</small></div></figcaption>
      </figure>
<figure className="review" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I sell snacks to students and could not afford a monthly plan. This is the first one that fits my budget.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#e4c1ff" }} aria-hidden="true">EN</div><div><b>Emeka Nwosu</b><small>Snack seller, Nsukka</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="4 out of 5 stars">★★★★☆</div>
        <p>“The message arrives with the customer’s name and address, so I do not have to ask twice.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffc83d" }} aria-hidden="true">BS</div><div><b>Bola Salami</b><small>Caterer, Abeokuta</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“The store opened fast even on my small phone with bad network.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#7be0a4" }} aria-hidden="true">IM</div><div><b>Ibrahim Musa</b><small>Buyer, Kaduna</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="4 out of 5 stars">★★★★☆</div>
        <p>“I would like to pay inside the app, but paying the seller directly is how I already do it, so it works for me.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#ffb29a" }} aria-hidden="true">FJ</div><div><b>Folake Johnson</b><small>Buyer, Port Harcourt</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I put the link in my Instagram bio and people now order without DMing me five times.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#a9d4ff" }} aria-hidden="true">SW</div><div><b>Sade Williams</b><small>Hair vendor, Lagos</small></div></figcaption>
      </figure>
<figure className="review dup" aria-hidden="true" style={{ marginInline: "0" }}>
        <div className="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
        <p>“I sell snacks to students and could not afford a monthly plan. This is the first one that fits my budget.”</p>
        <figcaption className="who"><div className="av" style={{ background: "#e4c1ff" }} aria-hidden="true">EN</div><div><b>Emeka Nwosu</b><small>Snack seller, Nsukka</small></div></figcaption>
      </figure>
</div></div>
  </div>
</section>

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
