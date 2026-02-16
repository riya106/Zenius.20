import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const Summits = ({ onBack }) => {
  const [summits, setSummits] = useState([]);
  const [filteredSummits, setFilteredSummits] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/summits`)
      .then((res) => res.json())
      .then((data) => {
        setSummits(data);
        setFilteredSummits(data);
      })
      .catch((err) => console.log("Error fetching summits:", err));
  }, []);

  useEffect(() => {
    let filtered = summits.filter((summit) =>
      summit.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "All") {
      filtered = filtered.filter(
        (summit) => summit.category === category
      );
    }

    setFilteredSummits(filtered);
  }, [search, category, summits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 text-gray-800">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-8 bg-white/70 backdrop-blur-md shadow-md">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
            Summits & Conferences 
          </h1>
          
        </div>

        <button
          onClick={onBack}
          className="bg-indigo-500 px-6 py-3 rounded-2xl text-white font-semibold hover:bg-indigo-600 transition shadow-md"
        >
          Go Back
        </button>
      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-6 items-center justify-between">

        <input
          type="text"
          placeholder="Search summits..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-6 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none shadow-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-5 py-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
        >
          <option value="All">All Categories</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
      </div>

      {/* ===== CARDS ===== */}
      <div className="px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {filteredSummits.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No summits found.
          </p>
        ) : (
          filteredSummits.map((summit) => (
            <div
              key={summit._id}
              className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {summit.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {summit.shortDescription}
                </p>

                <p className="text-teal-600 font-semibold text-sm mb-1">
                  {summit.location}
                </p>

                <p className="text-gray-500 text-sm mb-2">
                  {summit.date}
                </p>

                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                  {summit.category}
                </span>
              </div>

              <a
                href={summit.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-6 w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:scale-105 transition"
              >
                Apply Now 
              </a>
            </div>
          ))
        )}

      </div>

     
    </div>
  );
};

export default Summits;
