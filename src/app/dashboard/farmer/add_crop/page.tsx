"use client";

import { useState, useRef } from "react";

export default function AddCropPage() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Webcam functions
  const startWebcam = async () => {
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
  };

  const stopWebcam = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
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

    stopWebcam();
  };

  // Submit crop to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return alert("Crop name required");
    if (!weight || parseFloat(weight) <= 0) return alert("Weight must be valid");
    if (!location.trim()) return alert("Location required");
    if (!image) return alert("Please upload or capture an image");

    setLoading(true);
    setResponse(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("weight", weight);
      formData.append("location", location);
      formData.append("image", image);

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.crop);
        alert("✅ Crop uploaded successfully!");
        setName(""); setWeight(""); setLocation(""); setImage(null);
      } else {
        alert("❌ Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error while uploading");
    }

    setLoading(false);
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
          placeholder="Weight (Kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border p-2 rounded"
          min={1}
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
          required
        />

        {/* Webcam Controls */}
        <div className="mt-2">
          {!streaming ? (
            <button type="button" onClick={startWebcam} className="bg-blue-600 text-white px-3 py-1 rounded">
              Open Webcam
            </button>
          ) : (
            <div className="mt-2">
              <video ref={videoRef} autoPlay className="w-full border rounded" />
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={capturePhoto} className="bg-green-600 text-white px-3 py-1 rounded">
                  Capture Photo
                </button>
                <button type="button" onClick={stopWebcam} className="bg-red-600 text-white px-3 py-1 rounded">
                  Close Webcam
                </button>
              </div>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold text-green-700">✅ Crop Uploaded</h2>
          <img src={`http://localhost:5000${response.image}`} alt="Uploaded crop" className="w-40 rounded border mt-2" />
          <p>Crop: {response.crop}</p>
          <p>Weight: {response.weight} Kg</p>
          <p>Location: {response.location}</p>
          <p>Price per Unit: ₹{response.price}</p>
          <p>Total Price: ₹{response.totalPrice}</p>
        </div>
      )}
    </div>
  );
}
