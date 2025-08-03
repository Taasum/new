"use client";

import { useState } from "react";

export default function SellWastePage() {
  const [wasteType, setWasteType] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${wasteType} - ${quantity} kg`);
    // Later: Send to backend
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-8">
        <img
          src="https://images.unsplash.com/photo-1581092334651-bd38fd8f0d00"
          alt="Waste Sorting"
          className="rounded-xl shadow-lg object-cover w-full h-[85%]"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Sell Your Waste
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Earn GreenPoints by recycling responsibly.
          </p>

          <select
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select Waste Type</option>
            <option value="Plastic">♻️ Plastic</option>
            <option value="Metal">🧲 Metal</option>
            <option value="Paper">📄 Paper</option>
            <option value="E-Waste">💻 E-Waste</option>
            <option value="Organic">🌿 Organic</option>
          </select>

          <input
            type="number"
            placeholder="Enter quantity (in kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit Waste
          </button>
        </form>
      </div>
    </div>
  );
}
