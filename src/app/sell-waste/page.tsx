
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SellWastePage() {
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    quantity: "",
    location: "",
    description: "",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waste Product Submitted:", formData);
    alert("Your waste product has been listed!");
  };

  return (
    <main className="p-10 bg-gradient-to-br from-green-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-extrabold text-green-700 mb-4 drop-shadow">
          Sell Your Waste & Earn ♻️
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          List your waste materials and connect with buyers & recyclers. Choose
          from multiple categories including Plastic, E-waste, Metal, Organic,
          and more.
        </p>
      </motion.section>

      {/* Form Section */}
      <motion.section
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-green-100"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-green-700">
          Waste Listing Form
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Waste Category</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="E-waste">E-waste</option>
            <option value="Metal">Metal</option>
            <option value="Organic">Organic</option>
            <option value="Glass">Glass</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Product Name (e.g., Used Bottles)"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity (in kg)"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional Details"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-3 rounded-lg"
          />

          <motion.button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Post Waste Product
          </motion.button>
        </form>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Why Sell Waste on Zentara?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Multiple Categories",
              text: "Sell plastic, e-waste, organic, and more — all in one place.",
            },
            {
              title: "Fast Connections",
              text: "Get connected with buyers & recyclers instantly.",
            },
            {
              title: "Eco-Friendly Impact",
              text: "Reduce waste & contribute to a greener planet.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg border border-green-100"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-semibold text-green-600 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
