"use client";

import { useEffect, useState } from "react";

interface Crop {
  id: number;
  crop: string;
  farmer: string;
  weight: number;
  location: string;
  price: number;
  totalPrice: number;
  status: string;
  image: string;
}

export default function WarehouseDashboard() {
  const [crops, setCrops] = useState<Crop[]>([]);

  // Fetch crops from backend once
  useEffect(() => {
    fetch("http://localhost:5000/api/warehouse")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch(console.error);
  }, []);

  // Client-side status update
  const handleStatusChange = (id: number, newStatus: "Accepted" | "Rejected") => {
    setCrops((prev) =>
      prev.map((crop) =>
        crop.id === id ? { ...crop, status: newStatus } : crop
      )
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏬 Warehouse Dashboard</h1>

      {crops.length === 0 && <p>No crops received yet.</p>}

      <div className="grid gap-4">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className={`border-l-4 p-4 rounded shadow-md flex flex-col md:flex-row gap-4 ${
              crop.status === "Pending"
                ? "border-yellow-500 bg-yellow-50"
                : crop.status === "Accepted"
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            }`}
          >
            <img
              src={`http://localhost:5000${crop.image}`}
              alt={crop.crop}
              className="w-32 h-24 object-cover rounded border"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{crop.crop}</h2>
              <p>Farmer: {crop.farmer}</p>
              <p>Location: {crop.location}</p>
              <p>Weight: {crop.weight} Kg</p>
              <p>Price per Unit: ₹{crop.price}</p>
              <p>Total: ₹{crop.totalPrice}</p>
              <p>Status: {crop.status}</p>
            </div>
            {crop.status === "Pending" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleStatusChange(crop.id, "Accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(crop.id, "Rejected")}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
