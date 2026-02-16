import React from "react";

export default function Dashboard({
  onOpenInternship,
  onOpenHackathon,
  onOpenDSA,
  onOpenSummits,
  onLogout,
  darkMode,
  setDarkMode
}) {
  return (
    <div className="min-h-screen transition-colors duration-500 
    bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black 
    relative overflow-hidden text-gray-800 dark:text-gray-200">

      {/* Background Blurs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-teal-300 dark:bg-teal-700 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-700 rounded-full blur-3xl opacity-20"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/40 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-teal-500 to-indigo-500 bg-clip-text text-transparent">
            ZENIUS
          </h1>

          <div className="flex items-center gap-6">
            <nav className="flex gap-6 text-lg font-medium text-gray-700 dark:text-gray-300">
              <button onClick={onOpenInternship} className="hover:text-teal-600 transition">
                Internship
              </button>
              <button onClick={onOpenHackathon} className="hover:text-teal-600 transition">
                Hackathons
              </button>
              <button onClick={onOpenDSA} className="hover:text-teal-600 transition">
                DSA
              </button>
              <button onClick={onOpenSummits} className="hover:text-teal-600 transition">
                Summits
              </button>
            </nav>

            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">

        {/* HERO SECTION */}
        <section className="text-center mt-16 mb-16">
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            Discover internships, hackathons, DSA resources & global tech summits
            — all in one powerful dashboard.
          </p>

          <button
            onClick={onOpenInternship}
            className="mt-8 px-10 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition duration-300"
          >
            Explore Opportunities
          </button>
        </section>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6 text-center mb-16">
          {[
            { value: "120+", label: "Internships", color: "text-teal-500" },
            { value: "45+", label: "Hackathons", color: "text-indigo-500" },
            { value: "20+", label: "Summits", color: "text-sky-500" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            >
              <h2 className={`text-3xl font-bold ${item.color}`}>
                {item.value}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* MAIN CARDS */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">

          {/* Hackathons */}
          <Card
            title="Hackathons"
            desc="Participate in top national & international hackathons and win exciting prizes."
            btnText="View Hackathons"
            btnColor="bg-sky-500 hover:bg-sky-600"
            onClick={onOpenHackathon}
          />

          {/* Internships */}
          <Card
            title="Internships"
            desc="Explore curated internship opportunities tailored for tech students."
            btnText="Explore Internships"
            btnColor="bg-teal-500 hover:bg-teal-600"
            onClick={onOpenInternship}
          />

          {/* DSA */}
          <Card
            title="DSA Practice"
            desc="Strengthen your problem-solving skills with structured DSA content."
            btnText="Start Practicing"
            btnColor="bg-indigo-500 hover:bg-indigo-600"
            onClick={onOpenDSA}
          />

          {/* Summits */}
          <Card
            title="Tech Summits"
            desc="Stay updated with global tech conferences & developer events."
            btnText="View Summits"
            btnColor="bg-purple-500 hover:bg-purple-600"
            onClick={onOpenSummits}
          />

        </div>

        {/* LOGOUT */}
        <div className="flex justify-center pb-16">
          <button
            onClick={onLogout}
            className="px-10 py-3 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 hover:scale-105 transition shadow-lg"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

/* Reusable Card */
function Card({ title, desc, btnText, btnColor, onClick }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800 backdrop-blur-lg border border-white/40 dark:border-gray-700 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300">
      <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-6">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {desc}
      </p>
      <button
        onClick={onClick}
        className={`px-6 py-3 text-white rounded-xl font-semibold transition ${btnColor}`}
      >
        {btnText}
      </button>
    </div>
  );
}
