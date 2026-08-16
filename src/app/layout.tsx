import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club Event Portal",
  description: "Discover and register for upcoming club events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}