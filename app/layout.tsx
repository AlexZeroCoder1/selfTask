import type { Metadata } from "next";
import "./globals.css";
import AuthListener from "@/shared/components/authListener";
import Header from "@/shared/components/header";
import Footer from "@/shared/components/footer";

export const metadata: Metadata = {
  title: "Salf Track - Stay Hard",
  description: "...",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Манифест */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />

        {/* Иконки для PWA */}
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <Header />
        <AuthListener />
        <main className="max-w-[704px] mx-auto px-4 flex flex-col justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
