// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtVy3S0nuW3D8ZAbkAQiGVVI4sgDOU4y0",
  authDomain: "inventory-management-beeaf.firebaseapp.com",
  projectId: "inventory-management-beeaf",
  storageBucket: "inventory-management-beeaf.appspot.com",
  messagingSenderId: "792985821963",
  appId: "1:792985821963:web:afc4f15ac7a135e6eef80e",
  measurementId: "G-G1N8MM2K0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore}