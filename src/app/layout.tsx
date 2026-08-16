import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "DJSCE Club Events",
  description: "Discover and register for upcoming DJSCE club events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}