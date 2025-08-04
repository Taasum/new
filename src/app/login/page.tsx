"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token); // ✅ store token
      alert("Login successful");
    } else {
      alert(data.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-green-100">
        <img
          src="https://images6.alphacoders.com/368/368882.jpg"
          alt="Eco Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right - Login Form */}
      <div className="w-full md:w-1/2 bg-[#e6f4ec] flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-green-800 text-center">LOGIN</h2>
          <p className="text-center text-green-700">
            Don’t have an account?{" "}
            <a href="/register" className="text-black font-medium hover:underline">Sign Up</a>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}