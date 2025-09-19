"use client";

import { useState, useRef } from "react";

export default function AddCropPage() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fixed modal price for demo
  const FIXED_MODAL_PRICE = 2862;

  const startWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreaming(true);
        }
      } catch (err) {
        alert("Webcam not accessible");
        console.error(err);
      }
    } else {
      alert("Webcam not supported");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) ctx.drawImage(videoRef.current, 0, 0, width, height);
    canvasRef.current.toBlob((blob) => {
      if (blob) setImage(new File([blob], "webcam.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please upload or capture an image");

    setLoading(true);
    setResponse(null);

    // Demo logic: calculate price using FIXED_MODAL_PRICE
    const w = parseFloat(weight);
    const totalPrice = w * FIXED_MODAL_PRICE;

    setTimeout(() => {
      setResponse({
        crop: name,
        weight: w,
        price: FIXED_MODAL_PRICE,
        totalPrice,
        location,
        image: URL.createObjectURL(image),
      });
      setLoading(false);
    }, 500); // fake delay for demo
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🌾 Add Crop</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Crop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Weight (in Kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full border p-2 rounded"
        />

        <div className="mt-2">
          {!streaming ? (
            <button type="button" onClick={startWebcam} className="bg-blue-600 text-white px-3 py-1 rounded">
              Open Webcam
            </button>
          ) : (
            <div className="mt-2">
              <video ref={videoRef} autoPlay className="w-full border rounded" />
              <button
                type="button"
                onClick={capturePhoto}
                className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
              >
                Capture Photo
              </button>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold">✅ Crop Uploaded</h2>
          <table className="w-full mt-2 border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold">Crop</td>
                <td className="p-2">{response.crop}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold">Weight</td>
                <td className="p-2">{response.weight} Kg</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold">Price per Unit</td>
                <td className="p-2">₹{response.price}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold">Total Price</td>
                <td className="p-2">₹{response.totalPrice}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 font-semibold">Location</td>
                <td className="p-2">{response.location}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Image</td>
                <td className="p-2">
                  <img src={response.image} alt="Uploaded crop" className="w-40 rounded border" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
