"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function FarmerDashboard() {
  const [fullName] = useState("Farmer User");
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", qty: "2 tons", harvest: "2025-03-10", status: "Stored" },
    { id: 2, name: "Rice", qty: "1.2 tons", harvest: "2025-05-01", status: "In Transit" },
  ]);

  const [notifications, setNotifications] = useState<
    { id: number; message: string; date: string }[]
  >([]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  useEffect(() => {
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
    setNotifications([newNotif, paymentNotif]);
  }, []);

  return (
    <main className="min-h-screen p-6 bg-green-50 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-green-700">Farmer Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Side - Farmer Profile */}
        <aside className="md:col-span-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
            <span className="text-gray-500">Photo</span>
          </div>
          <h2 className="text-xl font-bold text-green-700">{fullName}</h2>
          <p className="text-gray-600">Village: ExamplePur</p>
          <p className="text-gray-600">State: Uttar Pradesh</p>
          <p className="text-gray-600">Member since: 2023</p>
        </aside>

        {/* Right Side - Main Content */}
        <section className="md:col-span-2 space-y-6">
          {/* Notifications */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-2 text-green-700">Notifications</h2>
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications yet</p>
            ) : (
              <ul className="space-y-3">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="border p-3 rounded bg-green-50 hover:bg-green-100 transition"
                  >
                    <p>{n.message}</p>
                    <span className="text-xs text-gray-400">{n.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Crops */}
          <div className="grid sm:grid-cols-2 gap-4">
            {crops.map((c) => (
              <div
                key={c.id}
                className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">{c.name}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-green-700">{c.name}</h3>
                  <p>{c.qty} • Harvest: {c.harvest}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={
                        c.status === "Stored"
                          ? "text-green-600"
                          : "text-orange-500"
                      }
                    >
                      {c.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Crop Button */}
          <div>
            <Link href="/dashboard/farmer/add_crop">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                ➕ Add Crop
              </button>
            </Link>
          </div>

          {/* Mandi Prices */}
          <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
            <div className="w-2/3">
              <h2 className="text-2xl font-semibold mb-2 text-green-700">Mandi Prices</h2>
              <p className="text-gray-600">
                Check the latest modal, minimum and maximum prices for your crops in
                your state to make informed decisions.
              </p>
            </div>
            <Link href="/dashboard/farmer/mandi_prices">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                Check Prices
              </button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
