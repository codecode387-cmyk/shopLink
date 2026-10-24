"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [sb] = useState(() => createClient());
  async function logout() {
    await sb.auth.signOut();
    router.push("/");
    router.refresh();
  }
  return <button className="btn btn-ghost" type="button" onClick={logout}>Log out</button>;
}
