// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebasekey = process.env.REACT_APP_FIREBASE_APPKEY;

const firebaseConfig = {
  apiKey: firebasekey,
  authDomain: "itty-7b5e0.firebaseapp.com",
  projectId: "itty-7b5e0",
  storageBucket: "itty-7b5e0.appspot.com",
  messagingSenderId: "1070087544604",
  appId: "1:1070087544604:web:322225f23d19466c11e4d9",
  measurementId: "G-WC54KP6M9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
const analytics = getAnalytics(app);
