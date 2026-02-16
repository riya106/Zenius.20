import React, { useState, useEffect } from "react";
import { auth } from "./firebase";

import Front from "./Components/Front";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import InternshipPage from "./Components/InternshipPage";
import HackathonPage from "./Components/HackathonPage";
import Dsa from "./Components/Dsa";
import Summits from "./Components/Summits";

function App() {
  const [page, setPage] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌙 Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 🔐 Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setPage("dashboard");
      } else {
        setPage("front");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🌙 Apply Dark Mode Globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ⛔ Loading Screen
  if (loading || page === null) {
    return (
      <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
      text-gray-700 dark:text-gray-300 text-xl font-semibold transition-colors duration-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500
    bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100
    dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black
    text-gray-800 dark:text-gray-200">

      {/* FRONT */}
      {page === "front" && !user && (
        <Front
          onGetStarted={() => setPage("login")}
          onLoginClick={() => {
            setAuthMode("login");
            setPage("login");
          }}
          onSignupClick={() => {
            setAuthMode("signup");
            setPage("login");
          }}
        />
      )}

      {/* LOGIN */}
      {page === "login" && !user && (
        <Login
          initialMode={authMode}
          onLoginSuccess={() => setPage("dashboard")}
        />
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && user && (
        <Dashboard
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onOpenInternship={() => setPage("internship")}
          onOpenHackathon={() => setPage("hackathon")}
          onOpenDSA={() => setPage("dsa")}
          onOpenSummits={() => setPage("summits")}
          onLogout={() => {
            auth.signOut();
            setPage("front");
          }}
        />
      )}

      {/* INTERNSHIPS */}
      {page === "internship" && user && (
        <InternshipPage onBack={() => setPage("dashboard")} />
      )}

      {/* HACKATHONS */}
      {page === "hackathon" && user && (
        <HackathonPage onBack={() => setPage("dashboard")} />
      )}

      {/* DSA */}
      {page === "dsa" && user && (
        <Dsa onBack={() => setPage("dashboard")} />
      )}

      {/* SUMMITS */}
      {page === "summits" && user && (
        <Summits onBack={() => setPage("dashboard")} />
      )}

    </div>
  );
}

export default App;
