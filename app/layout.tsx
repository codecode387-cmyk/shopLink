import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { createClient } from "../lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "ShopLink NG", template: "%s – ShopLink NG" },
  description: "Create an online store in minutes. Customers pick what they want and the order is sent straight to your WhatsApp.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header loggedIn={!!user} />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
