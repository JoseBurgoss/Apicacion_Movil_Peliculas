import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAT83uj4cx3nj8saUpm_2MHGxddYBcOAE",
  authDomain: "rotten-b7ea0.firebaseapp.com",
  projectId: "rotten-b7ea0",
  storageBucket: "rotten-b7ea0.firebasestorage.app",
  messagingSenderId: "1064007807863",
  appId: "1:1064007807863:web:0e6ff27ad40a50f7c6e772",
  measurementId: "G-S5R9BKNJGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;