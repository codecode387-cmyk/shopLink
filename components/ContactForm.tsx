"use client";

const WA = "2349032473005";

export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const message = String(f.get("message") || "").trim();
    const topic = String(f.get("topic") || "");
    if (!name || !message) return;
    const text = `Hello ShopLink NG, my name is ${name}.\nTopic: ${topic}\n${message}`;
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  }
  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Or write your message here</h2>
      <label className="field">Your name<input name="name" autoComplete="name" required /></label>
      <label className="field">What is it about?
        <select name="topic">
          <option>Vendor support</option>
          <option>Problem with an order</option>
          <option>Report a store</option>
          <option>Feedback or partnership</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="field">Message<textarea name="message" required /></label>
      <button className="btn btn-main" type="submit" style={{ marginTop: "1.2rem" }}>Send on WhatsApp</button>
    </form>
  );
}
