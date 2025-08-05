"use client";
import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const wasteTypes = [
  {
    name: "Plastic Waste",
    icon: "🧴",
    description: "Bottles, wrappers, containers",
    price: "₹2.5/kg",
  },
  {
    name: "Metal Waste",
    icon: "🪙",
    description: "Cans, old utensils",
    price: "₹10/kg",
  },
  {
    name: "Food Waste",
    icon: "🍎",
    description: "Leftovers, fruit peels",
    price: "₹1/kg",
  },
  {
    name: "E-Waste",
    icon: "💻",
    description: "Old phones, gadgets",
    price: "₹15/kg",
  },
  {
    name: "Paper Waste",
    icon: "📄",
    description: "Newspapers, boxes",
    price: "₹3/kg",
  },
];

export default function SellWastePage() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % wasteTypes.length);
  };

  const handlePrev = () => {
    setIndex((prev) =>
      prev === 0 ? wasteTypes.length - 1 : prev - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const waste = wasteTypes[index];

  return (
    <div
      {...swipeHandlers}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-white p-6 select-none"
    >
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Sell Waste (Swipe ⬅️➡️)
      </h1>

      <div className="w-full max-w-sm">
        <div className="transition-all duration-300 ease-in-out bg-white shadow-xl rounded-2xl p-6 text-center">
          <div className="text-5xl mb-2">{waste.icon}</div>
          <h2 className="text-xl font-semibold text-gray-800">
            {waste.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {waste.description}
          </p>
          <p className="text-lg font-medium text-green-600 mt-4">
            {waste.price}
          </p>

          <button className="mt-6 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
            Sell Now
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Swipe left or right to change waste type
        </p>
      </div>
    </div>
  );
}
