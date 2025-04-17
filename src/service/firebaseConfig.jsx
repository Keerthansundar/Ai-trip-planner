// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrkjWY4d3o1tucRE1z-g8Pi0vXBqdw5wg",
  authDomain: "chat-app-64dea.firebaseapp.com",
  projectId: "chat-app-64dea",
  storageBucket: "chat-app-64dea.appspot.com",
  messagingSenderId: "1062765543915",
  appId: "1:1062765543915:web:12d0d1f0077158812f99ae",
  measurementId: "G-THDM4V61B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the db instance for use in other files
export { db };
