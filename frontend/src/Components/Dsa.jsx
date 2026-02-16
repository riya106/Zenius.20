import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Dsa = ({ onBack }) => {
  const [roadmap, setRoadmap] = useState([]);
  const [practiceSheets, setPracticeSheets] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/dsa/roadmap`)
      .then((res) => setRoadmap(res.data))
      .catch(() => {});

    axios.get(`${API_BASE_URL}/api/dsa/practiceSheets`)
      .then((res) => setPracticeSheets(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ===== LEFT SIDE (Motivation Panel) ===== */}
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 via-teal-500 to-cyan-500 text-white flex flex-col justify-center p-12 relative overflow-hidden">

        {/* Decorative Blur Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Master DSA.
            <br />
            Crack Interviews.
            <br />
            Build Confidence.
          </h1>

          <p className="text-lg opacity-90 mb-8">
            Consistency beats talent. Solve problems daily and
            turn logic into power.
          </p>

          <button
            onClick={onBack}
            className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
             Go Back
          </button>
        </div>
      </div>

      {/* ===== RIGHT SIDE (Content Panel) ===== */}
      <div className="md:w-1/2 bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 p-10 overflow-y-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          DSA Roadmap
        </h2>

        <div className="space-y-6 mb-12">
          {roadmap.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                {item.duration}
              </h3>
              <p className="text-gray-600">{item.focus}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
           Practice Sheets
        </h2>

        <div className="space-y-6">
          {practiceSheets.map((sheet, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >
              <a
                href={sheet.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold hover:underline"
              >
                {sheet.name} →
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dsa;
