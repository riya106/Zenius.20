import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIZ9zOVimWfw-EYk4-StLvGHPzSJFDsKg",
  authDomain: "zenius-87bae.firebaseapp.com",
  projectId: "zenius-87bae",
  storageBucket: "zenius-87bae.appspot.com",
  messagingSenderId: "14817063133",
  appId: "1:14817063133:web:959092a0856e9614296b34",
  measurementId: "G-FKHDCWDXP4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // 👈 Firestore instance
export const provider = new GoogleAuthProvider();

