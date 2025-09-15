"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-green-700 text-white shadow-md">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-3">
        <Image
          src="/agri-logo.png" // place AgriChain logo in public folder
          alt="AgriChain Logo"
          width={40}
          height={40}
        />
        <span className="font-bold text-xl">AgriChain</span>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/marketplace">Marketplace</Link>
        <Link href="/waste-exchange">Waste Exchange</Link>
        <Link href="/supply-chain">Supply Chain</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </nav>
  );
}
