
// src/app/components/LoginModal.tsx
"use client";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1524594151925-9d9d5e01c0a5"
          alt="Farm background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* overlay for readability */}
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email or Username"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Remember me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-green-600" />
              Remember me
            </label>
            <a href="#" className="text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition font-medium"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex gap-4 justify-center">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5" />
          </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100">
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/DigiLocker_logo.png" alt="DigiLocker" className="w-5 h-5"/>
            </button>
        </div>

        {/* Sign Up */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
