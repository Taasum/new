"use client";
import { useState } from "react";

export default function UploadCropPage() {
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crop || !quantity || !file) {
      alert("Please enter crop, quantity, and upload image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", crop);
    formData.append("quantity", quantity);
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/add-crop", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">🌾 Farmer Crop Submission</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Crop Name (e.g., Wheat)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <input
          type="number"
          placeholder="Enter Quantity (quintals)"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border w-full p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded-xl hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-md w-[600px]">
          <h2 className="text-xl font-bold mb-4">📊 Crop Details</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Crop</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Price/Unit</th>
                <th className="border px-4 py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{result.crop}</td>
                <td className="border px-4 py-2">{result.quantity}</td>
                <td className="border px-4 py-2">{result.grade}</td>
                <td className="border px-4 py-2">₹{result.pricePerUnit}</td>
                <td className="border px-4 py-2 font-bold text-green-700">
                  ₹{result.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              📅 Price Source: Today’s Mandi CSV
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
