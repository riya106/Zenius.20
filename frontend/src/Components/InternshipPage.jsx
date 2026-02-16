import React, { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const InternshipPage = ({ onBack }) => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/internships`)
      .then((res) => res.json())
      .then((data) => {
        setInternships(data);
        setFilteredInternships(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = internships.filter((intern) =>
      intern.title.toLowerCase().includes(search.toLowerCase()) ||
      intern.company.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "All") {
      filtered = filtered.filter(
        (intern) => intern.category === category
      );
    }

    setFilteredInternships(filtered);
  }, [search, category, internships]);

  const handleApply = (applyLink) => {
    if (!applyLink) {
      alert("Application link not available");
      return;
    }
    window.open(applyLink, "_blank");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 text-gray-800">

     
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-8 bg-white/70 backdrop-blur-md shadow-md">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
            Internship 
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
          placeholder="Search internships..."
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
          <option value="Web Development">Web Development</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Data Science">Data Science</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
      </div>

      {/* ===== CONTENT ===== */}
      {loading ? (
        <div className="flex items-center justify-center mt-20 text-xl font-semibold">
          Loading internships...
        </div>
      ) : (
        <div className="px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {filteredInternships.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No internships found.
            </p>
          ) : (
            filteredInternships.map((intern) => {
              const id = intern._id || intern.id;

              return (
                <div
                  key={id}
                  className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {intern.title}
                    </h2>

                    <p className="text-lg font-semibold text-teal-600 mb-1">
                      {intern.company}
                    </p>

                    <p className="text-gray-600 mb-2">
                       Duration: {intern.duration}
                    </p>

                    <p className="text-gray-600">
                       Category: {intern.category}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApply(intern.applyLink)}
                    className="mt-8 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-bold px-6 py-3 rounded-2xl hover:scale-105 transition shadow-md"
                  >
                    Apply Now →
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

export default InternshipPage;
