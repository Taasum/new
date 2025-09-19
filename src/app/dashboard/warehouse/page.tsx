"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";

// Define Crop type
type Crop = {
  id: number;
  name: string;
  farmer: string;
  weight: string;
  location: string;
  status: "Pending" | "Accepted" | "Delivered";
  deliveryDate: string | null;
  totalPrice: number;
};

export default function WarehouseDashboard() {
  // Sample crops
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: "Wheat",
      farmer: "Farmer User",
      weight: "2 tons",
      location: "Madhya Pradesh",
      status: "Pending",
      deliveryDate: null,
      totalPrice: 2862 * 2,
    },
    {
      id: 2,
      name: "Rice",
      farmer: "Farmer User",
      weight: "1 ton",
      location: "Uttar Pradesh",
      status: "Pending",
      deliveryDate: null,
      totalPrice: 2862 * 1,
    },
  ]);

  // Accept crop -> assign delivery date
  const handleAccept = (id: number) => {
    setCrops((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "Accepted", deliveryDate: "21 Sep 2025" }
          : c
      )
    );
    alert("✅ Crop accepted! Delivery Date: 21 Sep 2025");
  };

  // Confirm delivery -> release payment
  const handleDelivery = (id: number) => {
    setCrops((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Delivered" } : c
      )
    );
    const crop = crops.find((c) => c.id === id);
    if (crop) alert(`💰 Payment of ₹${crop.totalPrice} released to farmer!`);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">
        Warehouse Dashboard
      </h1>

      <section className="grid md:grid-cols-2 gap-6">
        {crops.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col gap-3"
          >
            <h2 className="font-semibold text-lg">{c.name}</h2>
            <p>Farmer: {c.farmer}</p>
            <p>Weight: {c.weight}</p>
            <p>Location: {c.location}</p>
            <p>
              Status:{" "}
              <span
                className={
                  c.status === "Delivered"
                    ? "text-green-600"
                    : c.status === "Accepted"
                    ? "text-blue-600"
                    : "text-yellow-600"
                }
              >
                {c.status}
              </span>
            </p>
            {c.deliveryDate && <p>Delivery Date: {c.deliveryDate}</p>}

            {/* QR Code */}
            <div className="mt-2 flex justify-center">
              <QRCode
                value={JSON.stringify({
                  id: c.id,
                  crop: c.name,
                  farmer: c.farmer,
                  weight: c.weight,
                  price: c.totalPrice,
                  status: c.status,
                })}
                size={128}
              />
            </div>

            {c.status === "Pending" && (
              <button
                onClick={() => handleAccept(c.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Accept Crop
              </button>
            )}

            {c.status === "Accepted" && (
              <button
                onClick={() => handleDelivery(c.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Mark Delivered & Release Payment
              </button>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
