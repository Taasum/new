"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function FarmerDashboard() {
  const [fullName] = useState("Farmer User"); // Default name, bina login ke
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", qty: "2 tons", harvest: "2025-03-10", status: "Stored" },
    { id: 2, name: "Rice", qty: "1.2 tons", harvest: "2025-05-01", status: "In Transit" },
  ]);

  const handleLogout = () => {
    // abhi ke liye login system nahi hai, so sirf refresh karwa do
    window.location.href = "/";
  };

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

      {/* Farmer profile */}
      <section className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">Profile Overview</h2>
        <p>Aadhaar Verified · KCC Linked · Bank/UPI Connected</p>
      </section>

      {/* Crops */}
      <section className="grid md:grid-cols-2 gap-6 mb-6">
        {crops.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
          >
            <img
              src={`/images/${c.name.toLowerCase()}.jpg`}
              alt={c.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p>
                {c.qty} • Harvest: {c.harvest}
              </p>
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
