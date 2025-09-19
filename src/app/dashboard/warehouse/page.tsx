"use client";

import { useState } from "react";

type CropBatch = {
  id: number;
  crop: string;
  farmer: string;
  quantity: string;
  entryDate: string;
  status: "Pending" | "Accepted" | "Rejected";
  image?: string;
};

export default function WarehouseDashboard() {
  const [user] = useState({ name: "Rajesh Kumar", location: "Harda, MP", role: "Warehouse Manager" });
  const [batches, setBatches] = useState<CropBatch[]>([
    { id: 1, crop: "Wheat", farmer: "Ram Kumar", quantity: "5 tons", entryDate: "2025-08-01", status: "Pending", image: "/images/crop-wheat.jpg" },
    { id: 2, crop: "Maize", farmer: "Sita Devi", quantity: "3 tons", entryDate: "2025-08-10", status: "Accepted", image: "/images/crop-maize.jpg" },
    { id: 3, crop: "Rice", farmer: "Shyam Lal", quantity: "2 tons", entryDate: "2025-08-15", status: "Rejected", image: "/images/crop-rice.jpg" },
  ]);
  const [storageUnits] = useState([
    { name: "Storage A", temperature: 22, humidity: 58, image: "/images/storage-a.jpg" },
    { name: "Cold Room 1", temperature: 6, humidity: 78, image: "/images/cold-room-1.jpg" },
  ]);

  const handleAction = (id: number, action: "Accepted" | "Rejected") => {
    setBatches(prev => prev.map(b => (b.id === id ? { ...b, status: action } : b)));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Poppins']">
      {/* Banner Section */}
      <section className="relative h-72 md:h-96 w-full overflow-hidden">
        <img
          src="/images/warehouse-banner.jpg"
          alt="Warehouse Banner"
          className="w-full h-full object-cover scale-105 transform transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-10 md:px-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">Warehouse Management</h1>
          <p className="mt-4 text-lg md:text-xl text-green-200 font-medium max-w-2xl">
            Real-time monitoring of crops, storage conditions, and batch approvals in a professional interface.
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-4 gap-8 px-10 pt-8 pb-16">
        {/* Left Panel: User Info */}
        <aside className="bg-white/75 backdrop-blur-md shadow-xl rounded p-6 space-y-4 sticky top-6 h-fit">
          <h2 className="text-2xl font-semibold text-gray-700">{user.name}</h2>
          <p className="text-gray-500">{user.role}</p>
          <p className="text-gray-600"><strong>Location:</strong> {user.location}</p>
          <p className="text-gray-600"><strong>Total Capacity:</strong> 100 tons</p>
          <p className="text-gray-600"><strong>Active Batches:</strong> {batches.filter(b => b.status === "Accepted").length}</p>
          <p className="text-gray-600"><strong>Pending:</strong> {batches.filter(b => b.status === "Pending").length}</p>
        </aside>

        {/* Main Panel */}
        <main className="lg:col-span-3 space-y-10">
          {/* Storage Units with Images */}
          <section className="grid md:grid-cols-2 gap-6">
            {storageUnits.map((s, idx) => (
              <div key={idx} className="relative rounded-xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-105">
                <img src={s.image} alt={s.name} className="w-full h-52 md:h-60 object-cover"/>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-4 text-white">
                  <p className="font-semibold text-lg">{s.name}</p>
                  <p className="text-sm">{s.temperature}°C, Humidity {s.humidity}%</p>
                </div>
              </div>
            ))}
          </section>

          {/* Pending Batches */}
          <section className="bg-white/75 backdrop-blur-md shadow-2xl rounded-xl p-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Pending Farmer Batches</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {batches.filter(b => b.status === "Pending").map(b => (
                <div key={b.id} className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 transform transition-transform duration-300 hover:scale-105">
                  {b.image && (
                    <img src={b.image} alt={b.crop} className="w-full md:w-36 h-28 md:h-32 object-cover rounded-xl"/>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg md:text-xl">{b.crop}</p>
                    <p className="text-gray-600 text-sm md:text-base">{b.farmer} • {b.entryDate}</p>
                    <p className="text-gray-600 text-sm md:text-base">{b.quantity}</p>
                  </div>
                  <div className="flex flex-col gap-3 justify-center">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
                      onClick={() => handleAction(b.id, "Accepted")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
                      onClick={() => handleAction(b.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {batches.filter(b => b.status === "Pending").length === 0 && (
                <p className="text-gray-500 text-lg">No pending batches.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
