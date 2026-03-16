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
    <div className="min-h-screen w-full transition-colors duration-500
    bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
    text-gray-800 dark:text-gray-200">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-8 
      bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md">

        <div>
          <h1 className="text-4xl font-extrabold 
          bg
