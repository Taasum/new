"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const links = [
    { href: "/farmer", label: "Farmer", icon: "/farmer.png" },
    { href: "/warehouse", label: "Warehouse", icon: "/warehouse.png" },
    { href: "/consumer", label: "Consumer", icon: "/consumer.png" },
    { href: "/admin", label: "Admin", icon: "/admin.png" },
  ];

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Profile / Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/agrichain.png"
          alt="AgriChain Logo"
          width={100}
          height={100}
          className="rounded-full border-4 border-green-500"
        />
        <h1 className="mt-4 text-2xl font-bold">@AgriChain</h1>
        <p className="text-gray-400">Connecting Agriculture & Sustainability</p>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center justify-center aspect-square bg-gray-800 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition transform"
          >
            <Image
              src={link.icon}
              alt={link.label}
              width={40}
              height={40}
              className="mb-2"
            />
            <span className="text-lg font-semibold">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} AgriChain — Sustainable Agriculture
      </footer>
    </main>
  );
}
