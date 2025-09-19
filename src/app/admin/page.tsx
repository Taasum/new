"use client";

import { useState } from "react";

// Dummy data
const dummyCrops = [
  {
    id: 1,
    crop: "Wheat",
    farmer: "Rahul Kumar",
    weight: 50,
    location: "Delhi",
    price: 2862,
    totalPrice: 50 * 2862,
    status: "Pending",
    image: "https://via.placeholder.com/100",
    date: "2025-09-19",
  },
  {
    id: 2,
    crop: "Rice",
    farmer: "Anjali Sharma",
    weight: 30,
    location: "UP",
    price: 2862,
    totalPrice: 30 * 2862,
    status: "Pending",
    image: "https://via.placeholder.com/100",
    date: "2025-09-18",
  },
];

const dummyFarmers = [
  { id: 1, name: "Rahul Kumar", location: "Delhi", totalCrops: 5 },
  { id: 2, name: "Anjali Sharma", location: "UP", totalCrops: 3 },
];

const dummyWarehouses = [
  { id: 1, name: "Delhi Warehouse", location: "Delhi", capacity: 1000 },
  { id: 2, name: "Lucknow Warehouse", location: "UP", capacity: 800 },
];

export default function AdminDashboard() {
  const [crops, setCrops] = useState(dummyCrops);

  const handleApprove = (id: number) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Approved" } : c))
    );
  };

  const handleReject = (id: number) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Rejected" } : c))
    );
  };

  const pendingCount = crops.filter((c) => c.status === "Pending").length;
  const approvedCount = crops.filter((c) => c.status === "Approved").length;
  const rejectedCount = crops.filter((c) => c.status === "Rejected").length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🏛️ Government Admin Dashboard</h1>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Total Farmers</p>
          <p className="text-2xl">{dummyFarmers.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Total Warehouses</p>
          <p className="text-2xl">{dummyWarehouses.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Pending Crops</p>
          <p className="text-2xl">{pendingCount}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <p className="text-lg font-semibold">Approved Crops</p>
          <p className="text-2xl">{approvedCount}</p>
        </div>
      </div>

      {/* Pending Crops */}
      <h2 className="text-2xl font-semibold mb-4">🌾 Pending Crops</h2>
      {crops.length === 0 && <p>No crops submitted yet.</p>}
      <div className="space-y-4 mb-8">
        {crops.map((c) => (
          <div
            key={c.id}
            className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded shadow-md flex flex-col md:flex-row gap-4 items-center"
          >
            <img
              src={c.image}
              alt={c.crop}
              className="w-24 h-24 object-cover rounded border"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{c.crop}</h3>
              <p>Farmer: {c.farmer}</p>
              <p>Location: {c.location}</p>
              <p>Weight: {c.weight} Kg</p>
              <p>Price/unit: ₹{c.price}</p>
              <p>Total: ₹{c.totalPrice}</p>
              <p>Date Submitted: {c.date}</p>
              <p>Status: {c.status}</p>
            </div>
            {c.status === "Pending" && (
              <div className="flex gap-2 flex-col md:flex-row">
                <button
                  onClick={() => handleApprove(c.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(c.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Farmers List */}
      <h2 className="text-2xl font-semibold mb-4">👨‍🌾 Farmers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {dummyFarmers.map((f) => (
          <div key={f.id} className="border p-4 rounded shadow bg-white">
            <p className="font-semibold">{f.name}</p>
            <p>Location: {f.location}</p>
            <p>Total Crops Submitted: {f.totalCrops}</p>
          </div>
        ))}
      </div>

      {/* Warehouses List */}
      <h2 className="text-2xl font-semibold mb-4">🏬 Warehouses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyWarehouses.map((w) => (
          <div key={w.id} className="border p-4 rounded shadow bg-white">
            <p className="font-semibold">{w.name}</p>
            <p>Location: {w.location}</p>
            <p>Capacity: {w.capacity} Kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}
