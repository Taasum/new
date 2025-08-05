'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import React from 'react';
import {
  Home,
  User,
  ShoppingCart,
  BookOpen,
  Phone,
  Menu,
  X,
  Leaf,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type SubItem = {
  title: string;
  link: string;
};

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  link?: string;
  subItems?: SubItem[];
};

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    icon: <Home size={18} />,
    link: '/',
  },
  {
    title: 'Profile',
    icon: <User size={18} />,
    subItems: [
      { title: 'Your Account', link: '/profile' },
      { title: 'Settings', link: '/settings' },
      { title: 'Logout', link: '/logout' },
    ],
  },
  {
    title: 'Cart',
    icon: <ShoppingCart size={18} />,
    subItems: [
      { title: 'View Cart', link: '/cart' },
      { title: 'Checkout', link: '/checkout' },
    ],
  },
  {
    title: 'About Us',
    icon: <BookOpen size={18} />,
    link: '/about',
  },
  {
    title: 'Support',
    icon: <Phone size={18} />,
    subItems: [
      { title: 'Contact', link: '/contact' },
      { title: 'FAQs', link: '/faq' },
    ],
  },
];

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const toggleSubmenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-emerald-700 text-white flex items-center justify-between px-6 py-2 relative z-40">
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/default-profile.png"
              alt="Zentara Logo"
              width={40}
              height={10}
              className="cursor-pointer"
            />
          </Link>
          <button className="text-sm hover:underline"> Update Location</button>
        </div>

        {/* Right: ECO Points, Cart, Profile/Login, Hamburger */}
        <div className="flex items-center gap-4">
          {/* ECO Points */}
          <div className="relative group">
            <button className="hover:underline text-sm flex items-center gap-1">
              <Leaf size={16} /> ECO Points
            </button>
            <div className="absolute hidden group-hover:block bg-white text-black text-xs p-2 rounded shadow top-full mt-1 right-0 z-50">
              You have 20 ECO points.
            </div>
          </div>

          {/* Cart */}
          <Link href="/cart" className="hover:underline text-sm flex items-center gap-1">
            <ShoppingCart size={16} /> Cart
          </Link>

          {/* Login/Profile */}
          {!isLoggedIn ? (
            <Link href="/login" className="hover:underline text-sm">
              Login / Signup
            </Link>
          ) : (
            <Link href="/profile" className="flex items-center gap-2">
              <span className="text-sm">👤 Your Name</span>
              <Image
                src="/profile.png"
                alt="Profile"
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          )}

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="text-2xl z-50">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Sidebar + Overlay */}
      <div className="relative z-50">
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          } z-50`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-xl">
              <X size={24} />
            </button>
          </div>

          {/* Menu List */}
          <ul className="p-4 space-y-4">
            {menuItems.map((menu) => (
              <li key={menu.title}>
                {menu.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(menu.title)}
                      className="flex items-center justify-between w-full text-left gap-2"
                    >
                      <div className="flex items-center gap-2">
                        {menu.icon} {menu.title}
                      </div>
                      {expandedMenus.includes(menu.title) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                    {expandedMenus.includes(menu.title) && (
                      <ul className="ml-6 mt-2 space-y-2 text-sm">
                        {menu.subItems.map((sub) => (
                          <li key={sub.title}>
                            <Link
                              href={sub.link}
                              onClick={() => setMenuOpen(false)}
                              className="hover:underline block"
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={menu.link || '/'}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    {menu.icon} {menu.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>
    </>
  );
}
