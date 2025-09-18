// // src/app/dashboard/warehouse/page.tsx
// "use client";

// import { FaWarehouse } from "react-icons/fa";

// export default function WarehouseDashboard() {
//   return (
//     <main className="max-w-6xl mx-auto py-12 px-6">
//       <h1 className="text-3xl font-bold flex items-center gap-3">
//         <FaWarehouse className="text-blue-600" /> Warehouse Dashboard
//       </h1>
//       <p className="mt-2 text-slate-600">
//         Manage inventory, monitor storage, and generate reports.
//       </p>

//       <div className="grid md:grid-cols-2 gap-6 mt-8">
//         {/* Profile Overview */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold">Profile Overview</h2>
//           <p className="mt-2 text-sm text-slate-600">
//             License Verified · Capacity: 200MT · Location: Bhubaneswar
//           </p>
//         </div>

//         {/* Inventory */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold">Current Inventory</h2>
//           <p className="mt-2 text-sm text-slate-600">
//             View crops stored, available space, and farmer details.
//           </p>
//         </div>

//         {/* Monitoring */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold">Condition Monitoring</h2>
//           <p className="mt-2 text-sm text-slate-600">
//             IoT-powered alerts for temperature, humidity, and spoilage.
//           </p>
//         </div>

//         {/* Reports */}
//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-semibold">Reports & Logs</h2>
//           <p className="mt-2 text-sm text-slate-600">
//             Storage history, utilization analytics, and efficiency stats.
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// }

// src/app/dashboard/warehouse/page.tsx
// "use client";
// import React from "react";

// export default function WarehouseDashboard() {
//   const inventory = [
//     { id: 1, crop: "Wheat", farmer: "Ram Kumar", qty: "5 tons", entry: "2025-08-01" },
//     { id: 2, crop: "Maize", farmer: "Sita Devi", qty: "3 tons", entry: "2025-08-10" },
//   ];

//   const sensors = [
//     { id: 1, name: "Storage A", temp: "22°C", humidity: "58%" },
//     { id: 2, name: "Cold Room 1", temp: "6°C", humidity: "78%" },
//   ];

//   return (
//     <main className="max-w-7xl mx-auto py-12 px-6">
//       <header className="flex items-center justify-between">
//         <div>
          
//           <h1 className="text-3xl font-bold text-slate-800"> Warehouse Dashboard</h1>
//           <p className="text-sm text-slate-600 mt-1">Monitor stored produce, storage conditions and utilization.</p>
//         </div>
//       </header>

//       <section className="grid lg:grid-cols-3 gap-6 mt-8">
//         {/* Inventory (span 2) */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-lg font-semibold mb-3">Current Inventory</h2>
//             <div className="space-y-3">
//               {inventory.map((it) => (
//                 <div key={it.id} className="flex items-center justify-between border rounded-md px-4 py-3">
//                   <div>
//                     <div className="font-medium">{it.crop}</div>
//                     <div className="text-xs text-slate-500">{it.farmer} • Entry: {it.entry}</div>
//                   </div>
//                   <div className="text-sm text-slate-700">{it.qty}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-lg font-semibold mb-3">Storage Actions</h2>
//             <div className="flex gap-3">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Accept New Batch</button>
//               <button className="px-4 py-2 bg-gray-100 rounded-md">Generate Storage Report</button>
//               <button className="px-4 py-2 bg-gray-100 rounded-md">Export Inventory CSV</button>
//             </div>
//           </div>
//         </div>

//         {/* Sensors / Condition monitoring */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h3 className="text-lg font-semibold">Condition Monitoring</h3>
//             <div className="mt-3 space-y-3">
//               {sensors.map((s) => (
//                 <div key={s.id} className="flex items-center justify-between border rounded-md px-4 py-3">
//                   <div>
//                     <div className="font-medium">{s.name}</div>
//                     <div className="text-xs text-slate-500">Temperature & Humidity</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-semibold">{s.temp}</div>
//                     <div className="text-xs text-slate-500">{s.humidity}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h3 className="text-lg font-semibold">Utilization</h3>
//             <p className="text-sm text-slate-500 mt-2">Storage utilization overview and quick analytics (placeholder tiles below).</p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <div className="bg-gray-50 p-4 rounded-md text-sm">Capacity Used: 62%</div>
//               <div className="bg-gray-50 p-4 rounded-md text-sm">Avg Temp: 11°C</div>
//               <div className="bg-gray-50 p-4 rounded-md text-sm">Active Batches: 12</div>
//               <div className="bg-gray-50 p-4 rounded-md text-sm">Pending Inspections: 2</div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";
import React from "react";
import { FaBoxes, FaCog, FaThermometerHalf, FaChartBar } from "react-icons/fa";

export default function WarehouseDashboard() {
  const inventory = [
    { id: 1, crop: "Wheat", farmer: "Ram Kumar", qty: "5 tons", entry: "2025-08-01" },
    { id: 2, crop: "Maize", farmer: "Sita Devi", qty: "3 tons", entry: "2025-08-10" },
  ];

  const sensors = [
    { id: 1, name: "Storage A", temp: "22°C", humidity: "58%" },
    { id: 2, name: "Cold Room 1", temp: "6°C", humidity: "78%" },
  ];

  return (
    <main className="max-w-7xl mx-auto py-12 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
            <FaBoxes className="text-blue-600" /> Warehouse Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Monitor stored produce, storage conditions and utilization in real-time.
          </p>
        </div>
      </header>

      <section className="grid lg:grid-cols-3 gap-8">
        {/* Inventory */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <FaBoxes className="text-blue-600" /> Current Inventory
            </h2>
            <div className="space-y-4">
              {inventory.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between border border-slate-200 rounded-xl px-5 py-4 bg-slate-50 hover:bg-blue-50 transition shadow-sm"
                >
                  <div>
                    <div className="font-medium text-slate-800">{it.crop}</div>
                    <div className="text-xs text-slate-500">
                      {it.farmer} • Entry: {it.entry}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-blue-700">{it.qty}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center gap-2">
              <FaCog className="text-green-600" /> Storage Actions
            </h2>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition">
                Accept New Batch
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md shadow-sm transition">
                Generate Report
              </button>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-md shadow-sm transition">
                Export Inventory CSV
              </button>
            </div>
          </div>
        </div>

        {/* Sensors & Utilization */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FaThermometerHalf className="text-red-500" /> Condition Monitoring
            </h3>
            <div className="mt-4 space-y-4">
              {sensors.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between border border-slate-200 rounded-xl px-5 py-4 bg-slate-50 hover:bg-blue-50 transition shadow-sm"
                >
                  <div>
                    <div className="font-medium text-slate-800">{s.name}</div>
                    <div className="text-xs text-slate-500">Temperature & Humidity</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-700">{s.temp}</div>
                    <div className="text-xs text-slate-500">{s.humidity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <FaChartBar className="text-yellow-600" /> Utilization
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              Quick glance at warehouse capacity & performance.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl text-sm font-medium text-blue-800 shadow-sm">
                Capacity Used: 62%
              </div>
              <div className="bg-green-50 p-4 rounded-xl text-sm font-medium text-green-800 shadow-sm">
                Avg Temp: 11°C
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-sm font-medium text-yellow-800 shadow-sm">
                Active Batches: 12
              </div>
              <div className="bg-red-50 p-4 rounded-xl text-sm font-medium text-red-800 shadow-sm">
                Pending Inspections: 2
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
