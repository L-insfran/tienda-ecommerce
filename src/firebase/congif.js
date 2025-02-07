import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBOakbZFJm9tcTZmVbra_44sYWR5r8NNb0",
  authDomain: "kintsugi-db.firebaseapp.com",
  projectId: "kintsugi-db",
  storageBucket: "kintsugi-db.firebasestorage.app",
  messagingSenderId: "877202928008",
  appId: "1:877202928008:web:82efae7d5e91ca9f890a3d"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)  //Representa a nuetra base de datos 