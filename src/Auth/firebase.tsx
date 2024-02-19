// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getAuth(app)
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  app,
  analytics,
  database,
  auth,
  provider
}