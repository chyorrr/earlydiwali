import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dil Waali Diwali 2026 | Aarya's Soirée",
  description: "Exclusive festive invitation to Aarya's Diwali celebration on Saturday, October 31st, 2026. Claim your digital Daawat Pass.",
  openGraph: {
    title: "Dil Waali Diwali 2026 | Aarya's Soirée",
    description: "Exclusive festive invitation to Aarya's Diwali celebration on Saturday, October 31st, 2026. Claim your digital Daawat Pass.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
