"use client";
import React, { useState } from "react";
import QRCode from "react-qr-code";

type Crop = {
  id: number;
  name: string;
  farmer: string;
  weight: number; // in tons
  location: string;
  status: "Pending" | "Accepted" | "Delivered";
  deliveryDate: string | null;
  totalPrice: number;
};

export default function WarehouseDashboard() {
  // Warehouse info
  const warehouseInfo = {
    name: "Central Warehouse",
    location: "Bhopal, MP",
    capacity: 500, // in tons
    currentStorage: 250, // tons occupied
    manager: "John Doe",
    memberSince: "2022",
  };

  // Sample crops
  const [crops, setCrops] = useState<Crop[]>([
    {
      id: 1,
      name: "Wheat",
      farmer: "Farmer User",
      weight: 2,
      location: "Madhya Pradesh",
      status: "Pending",
      deliveryDate: null,
      totalPrice: 2862 * 2,
    },
    {
      id: 2,
      name: "Rice",
      farmer: "Farmer User",
      weight: 1,
      location: "Uttar Pradesh",
      status: "Pending",
      deliveryDate: null,
      totalPrice: 2862 * 1,
    },
    {
      id: 3,
      name: "Maize",
      farmer: "Farmer X",
      weight: 1.5,
      location: "MP",
      status: "Delivered",
      deliveryDate: "15 Sep 2025",
      totalPrice: 2000 * 1.5,
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

  const pendingCrops = crops.filter((c) => c.status !== "Delivered");
  const historyCrops = crops.filter((c) => c.status === "Delivered");

  return (
    <main className="min-h-screen p-6 bg-green-50 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-green-700">
        Warehouse Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Warehouse Info */}
        <aside className="md:col-span-1 bg-white rounded-xl shadow p-6 flex flex-col items-center space-y-3">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            Photo
          </div>
          <h2 className="text-xl font-bold text-green-700">{warehouseInfo.name}</h2>
          <p>Location: {warehouseInfo.location}</p>
          <p>Capacity: {warehouseInfo.capacity} tons</p>
          <p>Current Storage: {warehouseInfo.currentStorage} tons</p>
          <p>Manager: {warehouseInfo.manager}</p>
          <p>Member since: {warehouseInfo.memberSince}</p>
        </aside>

        {/* Right Column - Current Crop Requests */}
        <section className="md:col-span-2 flex flex-col gap-4">
          {pendingCrops.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row items-center gap-4"
            >
              {/* Crop Details */}
              <div className="flex-1 space-y-1 text-left">
                <h3 className="font-semibold text-lg text-green-700">{c.name}</h3>
                <p>Farmer: {c.farmer}</p>
                <p>Weight: {c.weight} tons</p>
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

                {c.status === "Pending" && (
                  <button
                    onClick={() => handleAccept(c.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
                  >
                    Accept Crop
                  </button>
                )}

                {c.status === "Accepted" && (
                  <button
                    onClick={() => handleDelivery(c.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
                  >
                    Mark Delivered & Release Payment
                  </button>
                )}
              </div>

              {/* QR Code */}
              <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
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
            </div>
          ))}

          {/* History Section */}
          {historyCrops.length > 0 && (
            <div className="mt-6 bg-white rounded-xl shadow p-4">
              <h2 className="text-xl font-bold text-green-700 mb-4">📜 Delivery History</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {historyCrops.map((c) => (
                  <div key={c.id} className="border p-3 rounded flex flex-col md:flex-row items-center gap-3 bg-gray-50">
                    <div className="flex-1 text-left space-y-1">
                      <p><strong>Crop:</strong> {c.name}</p>
                      <p><strong>Farmer:</strong> {c.farmer}</p>
                      <p><strong>Weight:</strong> {c.weight} tons</p>
                      <p><strong>Delivered on:</strong> {c.deliveryDate}</p>
                      <p><strong>Total Price:</strong> ₹{c.totalPrice}</p>
                    </div>
                    <div className="flex-shrink-0 bg-gray-100 p-2 rounded">
                      <QRCode
                        value={JSON.stringify({
                          id: c.id,
                          crop: c.name,
                          farmer: c.farmer,
                          weight: c.weight,
                          price: c.totalPrice,
                          status: c.status,
                        })}
                        size={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
