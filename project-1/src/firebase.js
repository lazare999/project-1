// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrlEWskelufFTeKXRe4l1eXMaGaQ4e0S0",
  authDomain: "project-1-1a2e3.firebaseapp.com",
  databaseURL: "https://project-1-1a2e3-default-rtdb.firebaseio.com",
  projectId: "project-1-1a2e3",
  storageBucket: "project-1-1a2e3.appspot.com",
  messagingSenderId: "446444589584",
  appId: "1:446444589584:web:31721b8d2c6b8a140af095",
  measurementId: "G-W1KD9ELL9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);



