

"use client";
import React from "react";
import { FaSearch, FaShoppingCart, FaHistory, FaBell, FaCheckCircle, FaTruck, FaLeaf } from "react-icons/fa";

export default function ConsumerDashboard() {
  const orders = [
    { id: 1, crop: "Organic Wheat", qty: "10kg", date: "2025-08-12", status: "Delivered" },
    { id: 2, crop: "Basmati Rice", qty: "5kg", date: "2025-08-20", status: "In Transit" },
  ];

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <FaShoppingCart className="text-emerald-600" /> Consumer Dashboard
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Browse authentic produce, scan QR codes and manage your orders.
        </p>
      </header>

      <section className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Scan & Browse */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaSearch className="text-blue-500" /> Scan / Search
            </h2>
            <p className="text-sm text-slate-500 mb-3">
              Scan QR code to verify crop journey or search available produce.
            </p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md">Scan QR</button>
              <button className="px-4 py-2 bg-gray-100 rounded-md">Search Crops</button>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaHistory className="text-orange-500" /> Order History
            </h2>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex justify-between items-center border rounded-md px-4 py-3">
                  <div>
                    <div className="font-medium">{o.crop}</div>
                    <div className="text-xs text-slate-500">Qty: {o.qty} • {o.date}</div>
                  </div>
                  <div className={`text-sm font-semibold ${o.status === "Delivered" ? "text-green-600" : "text-orange-500"}`}>
                    {o.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FaBell className="text-purple-600" /> Notifications
            </h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-2 border rounded-md px-3 py-2">
                <FaCheckCircle className="text-green-600" /> Your Wheat order has been delivered.
              </li>
              <li className="flex items-center gap-2 border rounded-md px-3 py-2">
                <FaTruck className="text-orange-500" /> Basmati Rice order is on the way.
              </li>
              <li className="flex items-center gap-2 border rounded-md px-3 py-2">
                <FaLeaf className="text-emerald-600" /> New Organic Millets available now.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
