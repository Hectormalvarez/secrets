import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taylored Secrets",
  description: "a secret sharing website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
