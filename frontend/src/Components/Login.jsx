import React, { useState } from "react";
import { auth, db, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = ({ onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatError = (msg) =>
    msg.replace("Firebase:", "").replace("auth/", "");

  const handleForgotPassword = async () => {
    if (!email) {
      return alert("Enter your email to reset password.");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Reset email sent! Check your inbox.");
    } catch (error) {
      alert(formatError(error.message));
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const ref = doc(db, "users", user.uid);
      const snapshot = await getDoc(ref);

      if (!snapshot.exists()) {
        await setDoc(
          ref,
          {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date(),
            provider: "google",
          },
          { merge: true }
        );
      }

      onLoginSuccess();
    } catch (error) {
      alert(formatError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess();
      } else {
        if (password !== confirmPassword) {
          alert("⚠️ Passwords do not match!");
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await setDoc(
          doc(db, "users", user.uid),
          {
            name,
            email,
            createdAt: new Date(),
            provider: "email",
          },
          { merge: true }
        );

        onLoginSuccess();
      }
    } catch (error) {
      alert(formatError(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-sky-50 to-indigo-100 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-teal-300 opacity-20 blur-3xl rounded-full top-1/4 left-1/4"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-300 opacity-20 blur-3xl rounded-full bottom-1/4 right-1/4"></div>

      {/* Auth Card */}
      <div className="relative w-[430px] bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500 mb-6">
          {isLoginMode ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Toggle */}
        <div className="relative flex h-12 mb-6 bg-white rounded-full shadow-inner overflow-hidden">
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-sm font-semibold transition-all z-10 ${
              isLoginMode ? "text-white" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-sm font-semibold transition-all z-10 ${
              !isLoginMode ? "text-white" : "text-gray-600"
            }`}
          >
            Sign Up
          </button>

          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-300 ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
          ></div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLoginMode && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-white rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {isLoginMode && (
            <p
              onClick={handleForgotPassword}
              className="text-right text-indigo-600 hover:underline cursor-pointer text-sm"
            >
              Forgot Password?
            </p>
          )}

          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-white rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-2xl text-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            } transition`}
          >
            {loading
              ? "Please wait..."
              : isLoginMode
              ? "Login"
              : "Sign Up"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 p-3 bg-white border border-gray-300 rounded-2xl text-gray-700 font-medium hover:shadow-md transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-gray-600 text-sm">
            {isLoginMode
              ? "Don’t have an account?"
              : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              {isLoginMode ? "Sign Up" : "Login"}
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
