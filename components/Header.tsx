"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header({ loggedIn }: { loggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const cur = (p: string) => (path === p ? ("page" as const) : undefined);

  return (
    <header>
      <div className={"wrap nav" + (open ? " open" : "")}>
        <Link className="logo" href="/" aria-label="ShopLink NG home">
          <i aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#06210f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
              <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
          </i>
          ShopLink <small>NG</small>
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span></span>
        </button>
        <nav className="links" id="menu" aria-label="Main">
          <Link href="/how-it-works" aria-current={cur("/how-it-works")}>How it works</Link>
          <Link href="/why-shoplink" aria-current={cur("/why-shoplink")}>Why ShopLink</Link>
          {loggedIn ? (
            <Link className="btn btn-main btn-sm" href="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" aria-current={cur("/login")}>Log in</Link>
              <Link className="btn btn-main btn-sm" href="/signup">Create your store</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
