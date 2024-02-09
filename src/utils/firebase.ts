// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
const analytics = getAnalytics(app);

