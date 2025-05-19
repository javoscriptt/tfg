// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgJ-QTWKGV1PCTwyXi4joKW_qsBz-wjMY",
  authDomain: "sedigrafia.firebaseapp.com",
  projectId: "sedigrafia",
  storageBucket: "sedigrafia.firebasestorage.app",
  messagingSenderId: "741954859715",
  appId: "1:741954859715:web:51ea7e92d1cafd58a36876"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  