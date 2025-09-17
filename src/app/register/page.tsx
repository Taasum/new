
// "use client";
// import React, { useState } from "react";
// import { FaTractor, FaShoppingCart, FaWarehouse } from "react-icons/fa";

// export default function RegisterPage() {
//   const [role, setRole] = useState<"farmer" | "consumer" | "warehouse">("farmer");

//   // Reusable class for inputs
//   const inputClass =
//     "p-3 border border-gray-400 rounded-lg bg-white w-full hover:shadow-md hover:shadow-green-200 transition focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300";

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100 p-6">
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
        
//         {/* Left Side - Role Selection */}
//         <div className="bg-gradient-to-br from-green-700 to-green-500 text-white flex flex-col items-center justify-center p-10">
//           <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">AgriChain</h1>
//           <p className="text-lg mb-8 text-center opacity-90">
//             Register as a <span className="font-semibold">Farmer</span>,{" "}
//             <span className="font-semibold">Consumer</span>, or{" "}
//             <span className="font-semibold">Warehouse</span> to be part of a
//             secure and transparent agriculture supply chain.
//           </p>

//           <div className="flex gap-4 flex-wrap justify-center">
//             <button
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold shadow-md transform transition hover:scale-105 hover:shadow-lg ${
//                 role === "farmer"
//                   ? "bg-white text-green-700"
//                   : "bg-green-800/70 hover:bg-green-800"
//               }`}
//               onClick={() => setRole("farmer")}
//             >
//               <FaTractor /> Farmer
//             </button>

//             <button
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold shadow-md transform transition hover:scale-105 hover:shadow-lg ${
//                 role === "consumer"
//                   ? "bg-white text-green-700"
//                   : "bg-green-800/70 hover:bg-green-800"
//               }`}
//               onClick={() => setRole("consumer")}
//             >
//               <FaShoppingCart /> Consumer
//             </button>

//             <button
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl text-lg font-semibold shadow-md transform transition hover:scale-105 hover:shadow-lg ${
//                 role === "warehouse"
//                   ? "bg-white text-green-700"
//                   : "bg-green-800/70 hover:bg-green-800"
//               }`}
//               onClick={() => setRole("warehouse")}
//             >
//               <FaWarehouse /> Warehouse
//             </button>
//           </div>
//         </div>

//         {/* Right Side - Forms */}
//         <div className="p-10 bg-white/60 backdrop-blur-md">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 border-b-2 border-green-200 pb-2">
//             {role === "farmer"
//               ? "Farmer Registration"
//               : role === "consumer"
//               ? "Consumer Registration"
//               : "Warehouse Registration"}
//           </h2>

//           <form className="grid grid-cols-1 gap-4">
//             {/* Farmer Form */}
//             {role === "farmer" && (
//               <>
//                 <input type="text" placeholder="Full Name" className={inputClass} />
//                 <input type="text" placeholder="Aadhar Number" className={inputClass} />
//                 <input type="text" placeholder="KCC ID" className={inputClass} />
//                 <input type="tel" placeholder="Contact Number" className={inputClass} />
//                 <input type="email" placeholder="Email ID" className={inputClass} />
//                 <textarea placeholder="Address (Village, District, State, Pincode)" className={inputClass} />
//                 <input type="text" placeholder="Bank Account / UPI ID" className={inputClass} />
//                 <input type="password" placeholder="Password" className={inputClass} />
//                 <input type="password" placeholder="Confirm Password" className={inputClass} />
//               </>
//             )}

//             {/* Consumer Form */}
//             {role === "consumer" && (
//               <>
//                 <input type="text" placeholder="Full Name" className={inputClass} />
//                 <input type="tel" placeholder="Contact Number" className={inputClass} />
//                 <input type="email" placeholder="Email ID" className={inputClass} />
//                 <textarea placeholder="Address / Delivery Location" className={inputClass} />
//                 <input type="text" placeholder="Preferred Produce (Optional)" className={inputClass} />
//                 <input type="password" placeholder="Password" className={inputClass} />
//                 <input type="password" placeholder="Confirm Password" className={inputClass} />
//               </>
//             )}

//             {/* Warehouse Form */}
//             {role === "warehouse" && (
//               <>
//                 <input type="text" placeholder="Warehouse Name / Owner Name" className={inputClass} />
//                 <input type="tel" placeholder="Contact Number" className={inputClass} />
//                 <input type="email" placeholder="Email ID" className={inputClass} />
//                 <textarea placeholder="Warehouse Location (Full Address + Pincode)" className={inputClass} />
//                 <input type="text" placeholder="Storage Capacity (in Metric Tons)" className={inputClass} />
//                 <input type="text" placeholder="Facilities (Cold/Dry/Organic storage)" className={inputClass} />
//                 <input type="text" placeholder="License / Certification ID" className={inputClass} />
//                 <input type="password" placeholder="Password" className={inputClass} />
//                 <input type="password" placeholder="Confirm Password" className={inputClass} />
//               </>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white p-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
//             >
//               Register Now
//             </button>
//           </form>
//         </div>
//       </div>
//     </main>
//   );
// }


"use client";
import React, { useState } from "react";
import { FaTractor, FaShoppingCart, FaWarehouse } from "react-icons/fa";

export default function RegisterPage() {
  const [role, setRole] = useState<"farmer" | "consumer" | "warehouse">("farmer");
  const [formData, setFormData] = useState<any>({});

  const inputClass =
    "p-3 border border-gray-400 rounded-lg bg-white w-full hover:shadow-md hover:shadow-green-200 transition focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role }),
      });
      const data = await res.json();
      alert(data.message); // 👈 shows "Registered Successfully"
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-100 p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

        {/* Left Side */}
        <div className="bg-gradient-to-br from-green-700 to-green-500 text-white flex flex-col items-center justify-center p-10">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">AgriChain</h1>
          <p className="text-lg mb-8 text-center opacity-90">Register as Farmer, Consumer, or Warehouse.</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button onClick={() => setRole("farmer")} className={`px-6 py-3 rounded-xl ${role==="farmer"?"bg-white text-green-700":"bg-green-800/70 text-white"}`}><FaTractor/> Farmer</button>
            <button onClick={() => setRole("consumer")} className={`px-6 py-3 rounded-xl ${role==="consumer"?"bg-white text-green-700":"bg-green-800/70 text-white"}`}><FaShoppingCart/> Consumer</button>
            <button onClick={() => setRole("warehouse")} className={`px-6 py-3 rounded-xl ${role==="warehouse"?"bg-white text-green-700":"bg-green-800/70 text-white"}`}><FaWarehouse/> Warehouse</button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 bg-white/60 backdrop-blur-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6">{role} Registration</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} className={inputClass} />
            <input name="aadhar" type="text" placeholder="Aadhar Number" onChange={handleChange} className={inputClass} />
            <input name="kccId" type="text" placeholder="KCC ID" onChange={handleChange} className={inputClass} />
            <input name="contact" type="tel" placeholder="Contact Number" onChange={handleChange} className={inputClass} />
            <input name="email" type="email" placeholder="Email ID" onChange={handleChange} className={inputClass} />
            <textarea name="address" placeholder="Address" onChange={handleChange} className={inputClass} />
            <input name="bankUpi" type="text" placeholder="Bank Account / UPI ID" onChange={handleChange} className={inputClass} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className={inputClass} />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className={inputClass} />

            <button type="submit" className="mt-4 w-full bg-gradient-to-r from-green-600 to-green-500 text-white p-3 rounded-xl font-semibold shadow-lg">
              Register Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

