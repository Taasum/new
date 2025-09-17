"use client";
import Link from "next/link";
import React, { useState } from "react"; 
import LoginModal from "./LoginModal";   

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="bg-green-100 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-green-800 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <Link href="/">
                <span className="text-green-900 font-extrabold text-xl">AgriChain</span>
              </Link>
            </div>

            {/* Menu */}
            <div className="hidden md:flex items-center gap-6 text-green-900 font-medium">
              {/* Login comes first */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hover:text-green-600 bg-green-700 text-white px-3 py-1 rounded-md transition hover:bg-green-800"
              >
                Login
              </button>

              <Link href="/admin" className="hover:text-green-600">Admin</Link>
              <a href="#" className="hover:text-green-600">Search</a>
              <Link href="/register" className="hover:text-green-600">Register</Link>
              <Link href="/about" className="hover:text-green-600">About</Link>
              <Link href="/contact" className="hover:text-green-600">Contact</Link>
            </div>

            {/* Mobile placeholder */}
            <div className="md:hidden">
              <button className="px-3 py-2 rounded-md bg-green-200 text-green-800">Menu</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
