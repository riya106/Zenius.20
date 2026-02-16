import React from "react";

function Front({ onGetStarted, onLoginClick, onSignupClick }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#f0fdfa] to-[#e0f2fe] text-gray-800 overflow-hidden relative">

      {/* Soft Teal Glow Background */}
      <div className="absolute w-[600px] h-[600px] bg-teal-300 opacity-30 blur-3xl rounded-full top-1/3 left-1/4 animate-pulse"></div>

      {/* 🔹 Top Navigation */}
      <div className="absolute top-6 right-8 flex gap-4 z-20">
        <button
          onClick={onLoginClick}
          className="px-6 py-2 rounded-full border border-teal-400 text-teal-600 font-semibold hover:bg-teal-500 hover:text-white transition"
        >
          Login
        </button>

        <button
          onClick={onSignupClick}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500 text-white font-semibold hover:opacity-90 transition"
        >
          Sign Up
        </button>
      </div>

      {/* Zenius Title */}
      <h1 className="text-[16vw] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-sky-500 to-blue-500 animate-fadeIn">
        Zenius
      </h1>

      {/* Tagline */}
      <p className="mt-8 text-[3vw] md:text-[1.8vw] text-gray-600 font-semibold tracking-wide animate-fadeInSlow">
        Your Zenius to be Genius.
      </p>

      {/* Get Started Button */}
      <button
        onClick={onGetStarted}
        className="mt-10 px-10 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-teal-500 to-sky-500 hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fadeInSlow"
      >
        Get Started
      </button>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out forwards;
        }
        .animate-fadeInSlow {
          animation: fadeIn 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Front;
