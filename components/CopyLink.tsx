"use client";
import { useState } from "react";

export default function CopyLink({ url }: { url: string }) {
  const [label, setLabel] = useState("Copy my link");
  async function copy() {
    try {
      await navigator.clipboard.writeText("https://" + url);
      setLabel("Copied");
    } catch {
      setLabel("Copy not available");
    }
  }
  return <button className="btn btn-ghost" type="button" onClick={copy}>{label}</button>;
}
