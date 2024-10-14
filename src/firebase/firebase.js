// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiwVhG1bNzcaNFRDe02UE8_fgMnx-WJjQ",
  authDomain: "daily-fitness-tracker-app.firebaseapp.com",
  databaseURL: "https://daily-fitness-tracker-app-default-rtdb.firebaseio.com",
  projectId: "daily-fitness-tracker-app",
  storageBucket: "daily-fitness-tracker-app.appspot.com",
  messagingSenderId: "456880845835",
  appId: "1:456880845835:web:7fb8527ccc474f263ec30e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
