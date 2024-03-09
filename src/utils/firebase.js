// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9FWf15SKAwaK4GgqpR6U3xV77092Ae14",
  authDomain: "netflixgpt-73fbb.firebaseapp.com",
  projectId: "netflixgpt-73fbb",
  storageBucket: "netflixgpt-73fbb.appspot.com",
  messagingSenderId: "18099787089",
  appId: "1:18099787089:web:6978e82b6646bbf5d9af70",
  measurementId: "G-P6X3XEZ58M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();