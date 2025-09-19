"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName, role: data.role })
      );
      setSuccess(`✅ Login successful as ${data.role}`);
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}
        <button className="w-full bg-green-700 text-white p-3 rounded-md hover:bg-green-800 transition">
          Login
        </button>
      </form>
    </div>
  );
}
