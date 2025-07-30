'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-emerald-700 text-white flex items-center justify-between px-6 py-2">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/default-profile.png" alt="Zentara Logo" width={30} height={20} />
      </div>

      {/* Location */}
      <button className="flex items-center text-sm hover:underline">
        📍 Update Location
      </button>

      {/* Eco Points */}
      <div className="relative group">
        <button className="ml-4 hover:underline text-sm">🌱 ECO Points</button>
        <div className="absolute hidden group-hover:block bg-white text-black text-xs p-2 rounded shadow top-full mt-1">
          You have 20 ECO points.
        </div>
      </div>

      {/* Cart */}
      <Link href="/cart" className="ml-4 hover:underline text-sm">
        🛒 Cart
      </Link>

      {/* Login/Signup OR Profile */}
      {!isLoggedIn ? (
        <Link href="/login" className="ml-4 hover:underline text-sm">
          Login / Signup
        </Link>
      ) : (
        <div className="ml-4 text-sm">👤 Your Name</div>
      )}

      {/* Profile Picture */}
      {isLoggedIn && (
        <Image
          src="/profile.png"
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full ml-2"
        />
      )}

      {/* Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ml-4 text-2xl"
      >
        ☰
      </button>
    </nav>
  );
}
