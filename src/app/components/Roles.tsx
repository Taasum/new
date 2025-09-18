// // src/app/components/Roles.tsx
// "use client";
// import React from "react";

// const items = [
//   { name: "Farmer", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lVob72Wth5Y5ZY6QzoRW2wVvCMhLN7O2NA&s" },
//   { name: "Warehouse", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-WU1McUybR9Pn2lIu0cTR72JHD4vod7SGSQ&s" },
//   { name: "Consumer", img: "data:image/jpeg;base64,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" },
// ];

// export default function Roles() {
//   return (
//     <div className="max-w-6xl mx-auto py-12 px-4">
   
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//         {items.map((it) => (
//           <div
//             key={it.name}
//             className="flex flex-col items-center text-center"
//             style={{ perspective: "1000px" }}
//           >
//                 {/* Circle Image */}
//             <div
//               className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-110 hover:-translate-y-3 hover:shadow-2xl"
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
//             </div>
//                  {/* Role Card with Hover */}
//                <div
//               className="mt-4 w-40 md:w-48 bg-white rounded-md shadow-md p-3 flex flex-col items-center 
//                          transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50"
//             >
//               <div className="font-semibold text-green-800">{it.name}</div>
//               <div className="text-xs text-gray-500 mt-1">Click to explore</div>
//                 {/* 🔵 Blue Button */}
//               <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
//                 Explore
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import React from "react";
import Link from "next/link";

const items = [
  {
    name: "Farmer",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9lVob72Wth5Y5ZY6QzoRW2wVvCMhLN7O2NA&s",
    link: "/dashboard/farmer",
  },
  {
    name: "Warehouse",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-WU1McUybR9Pn2lIu0cTR72JHD4vod7SGSQ&s",
    link: "/dashboard/warehouse",
  },
  {
    name: "Consumer",
    img:
      "https://media.istockphoto.com/id/1457644605/photo/young-family-talking-during-breakfast-at-dining-table.jpg?s=612x612&w=0&k=20&c=lqz1M_9onmhFAsNNI1GOWPZG4ZZ6uimaJ6fevNbCjMY=",
    link: "/dashboard/consumer",
  },
];

export default function Roles() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Choose your role</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {items.map((it) => (
          <Link href={it.link} key={it.name} className="group">
            <div
              className="flex flex-col items-center text-center cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              {/* Circle Image (clickable because wrapped with Link) */}
              <div
                className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-110 hover:-translate-y-3 hover:shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
              </div>

              {/* Role Card with Hover — replaced to be like Code 2's box */}
              <div
                className="mt-4 w-40 md:w-48 bg-white rounded-md shadow-md p-4 flex flex-col items-center
                           transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50"
              >
                <div className="font-semibold text-green-800">{it.name}</div>
                <div className="text-xs text-gray-500 mt-1">Click to explore</div>

                {/* Styled Explore box (kept as non-button element to avoid nested interactive elements) */}
                <div
                  aria-hidden
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition text-sm"
                >
                  Explore
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
