// components/Background.jsx
import React from "react";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden">
      {/* Abstract blood cell blobs */}
      <div className="absolute w-72 h-72 bg-red-300 rounded-full opacity-30 top-10 left-[-60px] blur-3xl animate-pulse" />
      <div className="absolute w-96 h-96 bg-red-200 rounded-full opacity-40 bottom-[-100px] right-[-80px] blur-2xl animate-pulse" />
      <div className="absolute w-52 h-52 bg-red-400 rounded-full opacity-20 top-1/2 left-1/3 blur-xl animate-ping" />
    </div>
  );
}
