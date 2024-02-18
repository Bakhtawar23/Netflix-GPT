// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXDUFSo5W7p2JHSzS5pVE-gITTNbE7-VU",
  authDomain: "netflixgpt-9ce00.firebaseapp.com",
  projectId: "netflixgpt-9ce00",
  storageBucket: "netflixgpt-9ce00.appspot.com",
  messagingSenderId: "88017366245",
  appId: "1:88017366245:web:5ee3e7443c7c36628e380c",
  measurementId: "G-9H4YEQPMZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();