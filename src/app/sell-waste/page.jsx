"use client";
import React, { useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = wasteTypes.length;

  const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
  const nextIndex = (currentIndex + 1) % totalCards;

  const handlePrev = () => {
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center relative overflow-hidden">
      <h1 className="text-3xl font-bold text-green-700 mb-8">Sell Waste</h1>

      <div className="relative w-full max-w-3xl flex items-center justify-center">
        {/* Prev button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 z-30 bg-white shadow rounded-full p-2 hover:bg-green-100"
        >
          ⬅
        </button>

        {/* Card container */}
        <div className="relative flex justify-center items-center w-[80%] h-[400px]">
          {wasteTypes.map((waste, index) => {
            let style = "absolute transition-all duration-500 ease-in-out";

            if (index === currentIndex) {
              style += " z-20 scale-100 left-1/2 -translate-x-1/2 opacity-100";
            } else if (index === prevIndex) {
              style +=
                " z-10 scale-90 left-[-20%] opacity-60 pointer-events-none";
            } else if (index === nextIndex) {
              style +=
                " z-10 scale-90 left-[80%] opacity-60 pointer-events-none";
            } else {
              return null; // hide all other cards
            }

            return (
              <div
                key={index}
                className={`${style} w-[250px] h-[360px] bg-white shadow-2xl rounded-xl p-6 text-center`}
              >
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
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="absolute right-2 z-30 bg-white shadow rounded-full p-2 hover:bg-green-100"
        >
          ➡
        </button>
      </div>
    </div>
  );
}
