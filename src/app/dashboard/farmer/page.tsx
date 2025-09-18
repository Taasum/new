"use client";
import React, { useState } from "react";
import { FaSeedling, FaPlusCircle, FaBell, FaHistory } from "react-icons/fa";

export default function FarmerDashboard() {
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", qty: "2 tons", harvest: "2025-03-10", status: "Stored" },
    { id: 2, name: "Rice", qty: "1.2 tons", harvest: "2025-05-01", status: "In Transit" },
  ]);

  const [payments] = useState([
    { id: 1, amount: "₹18,000", date: "2025-08-10", status: "Paid" },
    { id: 2, amount: "₹7,500", date: "2025-08-20", status: "Pending" },
  ]);

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-green-700">
            <FaSeedling /> Farmer Dashboard
          </h1>
          <p className="mt-1 text-slate-600">
            Add crops, track QR authenticity and receive instant settlements.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">Notifications</div>
          <div className="bg-white p-3 rounded-full shadow">
            <FaBell className="text-green-600" />
          </div>
        </div>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left column: Profile + Add Crop */}
        <div className="space-y-6">
          {/* Profile */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Profile Overview</h2>
            <p className="text-sm text-slate-600">
              Aadhaar Verified · KCC Linked · Bank/UPI Connected
            </p>
            <div className="mt-4 text-sm space-y-2">
              <div><strong>Name:</strong> Ram Kumar</div>
              <div><strong>Contact:</strong> +91 98XXXXXXXX</div>
              <div><strong>Bank:</strong> SBI • UPI linked</div>
            </div>
          </div>

          {/* Add New Crop - simplified form */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add New Crop</h3>
              <FaPlusCircle className="text-green-600" />
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Enter details, upload image & generate QR for transparency.
            </p>

            <form className="mt-4 space-y-3">
              <input className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Crop name (e.g., Wheat)" />
              <input className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Quantity (e.g., 2 tons)" />
              <input className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Harvest date" type="date" />
              <div className="flex gap-2">
                <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md">Add Crop</button>
                <button type="button" className="px-4 py-2 bg-gray-100 rounded-md">Reset</button>
              </div>
            </form>
          </div>
        </div>

        {/* Right columns (span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Crops list */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">My Crops / Status Tracking</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {crops.map((c) => (
                <div key={c.id} className="border rounded-lg p-4 flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-md flex items-center justify-center text-xs text-slate-500">
                    QR<br/>Preview
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-slate-500">{c.qty} • Harvest: {c.harvest}</div>
                      </div>
                      <div className="text-sm px-3 py-1 rounded-full text-white"
                           style={{ background: c.status === "Stored" ? "#16a34a" : "#f97316" }}>
                        {c.status}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">View</button>
                      <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Generate QR</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payments & Transactions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Payments & Transactions</h3>
            <div className="space-y-3">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between border rounded-md px-4 py-3">
                  <div>
                    <div className="font-medium">{p.amount}</div>
                    <div className="text-xs text-slate-500">Date: {p.date}</div>
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full ${p.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {p.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-slate-500">Note: Settlements are processed via smart-contracts and show here automatically after confirmation.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
