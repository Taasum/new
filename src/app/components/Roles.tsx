// src/app/components/Roles.tsx
"use client";
import React from "react";

const items = [
  { name: "Farmer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lVob72Wth5Y5ZY6QzoRW2wVvCMhLN7O2NA&s" },
  { name: "Warehouse", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-WU1McUybR9Pn2lIu0cTR72JHD4vod7SGSQ&s" },
  { name: "Consumer", img: "https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=800&q=60" },
];

export default function Roles() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {items.map((it) => (
          <div
            key={it.name}
            className="flex flex-col items-center text-center"
            style={{ perspective: "1000px" }}
          >
                {/* Circle Image */}
            <div
              className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-110 hover:-translate-y-3 hover:shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
            </div>
                 {/* Role Card with Hover */}
               <div
              className="mt-4 w-40 md:w-48 bg-white rounded-md shadow-md p-3 flex flex-col items-center 
                         transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50"
            >
              <div className="font-semibold text-green-800">{it.name}</div>
              <div className="text-xs text-gray-500 mt-1">Click to explore</div>
                {/* 🔵 Blue Button */}
              <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

