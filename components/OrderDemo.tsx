"use client";
import { useEffect, useState } from "react";

const LINES = [
  "Hello Mama Ngozi, I want to order:",
  "2 × Ankara tote bag — ₦12,000",
  "1 × Beaded anklet — ₦3,500",
  "Total: ₦15,500",
  "Name: Tola A.",
  "Deliver to: Yaba, Lagos",
];

export default function OrderDemo() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const total = LINES.length + 2;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(total);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= total; i++) timers.push(setTimeout(() => setShown(i), 700 + (i - 1) * 650));
    return () => timers.forEach(clearTimeout);
  }, []);
  return (
    <>
      <div className="bubble">
        {LINES.map((t, i) => (
          <div key={i} className={(i === 3 ? "tot " : "") + (shown > i ? "on" : "")}>{t}</div>
        ))}
        <div className={"tick " + (shown > LINES.length ? "on" : "")}>✓✓ Sent from shoplink.ng</div>
      </div>
      <div className={"reply" + (shown > LINES.length + 1 ? " on" : "")}>Thank you Tola! Confirming your order now 🙏</div>
    </>
  );
}
