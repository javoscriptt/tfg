import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgJ-QTWKGV1PCTwyXi4joKW_qsBz-wjMY",
  authDomain: "sedigrafia.firebaseapp.com",
  projectId: "sedigrafia",
  storageBucket: "sedigrafia.firebasestorage.app",
  messagingSenderId: "741954859715",
  appId: "1:741954859715:web:51ea7e92d1cafd58a36876"
};

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
