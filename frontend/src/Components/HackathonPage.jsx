import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const HackathonPage = ({ onBack }) => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("All");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/hackathons`)
      .then((res) => {
        setHackathons(res.data);
        setFilteredHackathons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = hackathons.filter((hack) =>
      hack.name.toLowerCase().includes(search.toLowerCase()) ||
      hack.organizer.toLowerCase().includes(search.toLowerCase())
    );

    if (mode !== "All") {
      filtered = filtered.filter((hack) => hack.mode === mode);
    }

    setFilteredHackathons(filtered);
  }, [search, mode, hackathons]);

  const handleApply = (link) => {
    if (!link) {
      alert("Registration link not available");
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500
      bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
      text-gray-800 dark:text-gray-200"
    >

      {/* ===== HEADER ===== */}
      <div
        className="flex flex-col md:flex-row justify-between items-center gap-4 p-8
        bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md"
      >
        <div>
          <h1
            className="text-4xl font-extrabold
            bg-gradient-to-r from-indigo-500 to-teal-500
            dark:from-purple-400 dark:to-indigo-400
            bg-clip-text text-transparent"
          >
            Hackathon Hub
          </h1>
        </div>

        <button
          onClick={onBack}
          className="bg-indigo-500 px-6 py-3 rounded-2xl text-white font-semibold hover:bg-indigo-600 transition shadow-md"
        >
          Go Back
        </button>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row gap-6 items-center justify-between">

        <input
          type="text"
          placeholder="Search hackathons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-6 py-3 rounded-2xl 
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-200
          focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="px-5 py-3 rounded-2xl 
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-200
          focus:ring-2 focus:ring-teal-400 outline-none shadow-sm"
        >
          <option value="All">All Modes</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* ===== CONTENT ===== */}
      {loading ? (
        <div className="flex items-center justify-center mt-20 text-xl font-semibold">
          Loading hackathons...
        </div>
      ) : (
        <div className="px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {filteredHackathons.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
              No hackathons found.
            </p>
          ) : (
            filteredHackathons.map((hack) => {
              const id = hack._id || hack.id;

              return (
                <div
                  key={id}
                  className="bg-white/70 dark:bg-gray-800 backdrop-blur-lg
                  border border-white/40 dark:border-gray-700
                  rounded-3xl p-8 shadow-xl
                  hover:shadow-2xl hover:scale-[1.03]
                  transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {hack.name}
                    </h2>

                    <p className="text-md font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                      {hack.organizer}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {hack.date}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Mode: {hack.mode}
                    </p>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {hack.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(hack.applyLink)}
                    className="mt-8 bg-gradient-to-r from-indigo-500 to-teal-500
                    text-white font-bold px-6 py-3 rounded-2xl
                    hover:scale-105 transition shadow-md"
                  >
                    Register Now →
                  </button>
                </div>
              );
            })
          )}

        </div>
      )}
    </div>
  );
};

export default HackathonPage;
