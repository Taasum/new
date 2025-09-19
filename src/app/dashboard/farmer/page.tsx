"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function FarmerDashboard() {
  const [fullName] = useState("Farmer User");
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", qty: "2 tons", harvest: "2025-03-10", status: "Stored" },
    { id: 2, name: "Rice", qty: "1.2 tons", harvest: "2025-05-01", status: "In Transit" },
  ]);

  // notifications state
  const [notifications, setNotifications] = useState<
    { id: number; message: string; date: string }[]
  >([]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  // Simulate a crop added from AddCropPage (replace with real API in future)
  useEffect(() => {
    // Example notification
    const newNotif = {
      id: 1,
      message: "🌾 Your crop 'Maize' has been accepted by warehouse. Delivery Date: 21 Sep 2025",
      date: new Date().toLocaleString(),
    };
    const paymentNotif = {
      id: 2,
      message: "💰 Payment of ₹2862 released to your account for 'Maize'",
      date: new Date().toLocaleString(),
    };
    setNotifications([newNotif, paymentNotif]); // add to top
  }, []);

  return (
    <main className="min-h-screen p-8 bg-green-50 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-green-700">Farmer Dashboard</h1>
        <div>
          <span className="mr-4 font-medium">{fullName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Notifications Panel */}
      <section className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications yet</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n.id} className="border p-2 rounded bg-gray-50">
                <p>{n.message}</p>
                <span className="text-xs text-gray-400">{n.date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Crops Section */}
      <section className="grid md:grid-cols-2 gap-6 mb-6">
        {crops.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
            <img
              src={`/images/${c.name.toLowerCase()}.jpg`}
              alt={c.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p>{c.qty} • Harvest: {c.harvest}</p>
              <p>Status: <span className={c.status === "Stored" ? "text-green-600" : "text-orange-500"}>{c.status}</span></p>
            </div>
          </div>
        ))}
      </section>

      <div className="mb-6">
        <Link href="/dashboard/farmer/add_crop">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Add Crop (Full Page)
          </button>
        </Link>
      </div>

      {/* Mandi Summary Section */}
      <section className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-2">Mandi Prices Summary</h2>
          <p>
            Check the latest modal, minimum and maximum prices for your crops in
            your state to make informed decisions.
          </p>
        </div>
        <div>
          <Link href="/dashboard/farmer/mandi_prices">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              Check Mandi Prices
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
