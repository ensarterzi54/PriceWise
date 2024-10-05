import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCNwp3To2ZT5lNBuoUbHCu4vVZWSRMW-s",
  authDomain: "pricewise1-a6ce2.firebaseapp.com",
  projectId: "pricewise1-a6ce2",
  storageBucket: "pricewise1-a6ce2.appspot.com",
  messagingSenderId: "647338401583",
  appId: "1:647338401583:web:46b39be9be4250cb024bda",
  measurementId: "G-VNRFXM8K1N"
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();