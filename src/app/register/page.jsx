"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="relative h-screen w-full bg-green-50 overflow-hidden">
      {/* Blurred Eco Image Background */}
      <img
        src="https://thumbs.dreamstime.com/z/eco-friendly-energy-innovation-technology-green-concept-icon-bulb-sources-renewable-blur-background-inspiration-idea-274359972.jpg
"
        alt="Eco Background"
        className="absolute w-full h-full object-cover blur-sm brightness-90"
      />

      {/* Overlay form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <form
          onSubmit={handleRegister}
          className="bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6"
        >
          <h2 className="text-3xl font-bold text-green-800 text-center">Register</h2>

          <p className="text-center text-green-700">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium hover:underline">
              Login
            </Link>
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-5 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-green-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
