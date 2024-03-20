// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEv9l42ArIh78we_qgHPwDqETS1ybPMhM",
  authDomain: "chatapplication-with-cha-84772.firebaseapp.com",
  projectId: "chatapplication-with-cha-84772",
  storageBucket: "chatapplication-with-cha-84772.appspot.com",
  messagingSenderId: "955808055671",
  appId: "1:955808055671:web:5ec5bebb2be4eddc8ca172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);