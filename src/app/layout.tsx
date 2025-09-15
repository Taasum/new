// src/app/layout.tsx
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "AgriChain",
  description: "Blockchain-based transparent agricultural supply chain (AgriChain)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
