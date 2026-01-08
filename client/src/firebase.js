// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "tsehayestate.firebaseapp.com",
  projectId: "tsehayestate",
  storageBucket: "tsehayestate.firebasestorage.app",
  messagingSenderId: "770884817294",
  appId: "1:770884817294:web:f6d2d2c9805d856ee514df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);