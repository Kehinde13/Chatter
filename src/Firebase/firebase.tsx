// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNNYtYWy3DJtFAYicVewjpGiJvELgKKWo",
  authDomain: "chatter-ed368.firebaseapp.com",
  projectId: "chatter-ed368",
  storageBucket: "chatter-ed368.appspot.com",
  messagingSenderId: "416504933002",
  appId: "1:416504933002:web:160887414ebc70cfb41b73",
  measurementId: "G-PJ6ZJD37HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
export const db = getFirestore(app)