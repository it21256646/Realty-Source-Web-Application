// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realysource.firebaseapp.com",
  projectId: "realysource",
  storageBucket: "realysource.appspot.com",
  messagingSenderId: "270780647667",
  appId: "1:270780647667:web:bcb59d48b1b00d89bb0f86"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);