import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7xU25OpKE4cBBS07JcHgrIir8q773MSI",
  authDomain: "task-2c5b0.firebaseapp.com",
  projectId: "task-2c5b0",
  storageBucket: "task-2c5b0.appspot.com",
  messagingSenderId: "860988068343",
  appId: "1:860988068343:web:06138ac4d8a92642591ef2",
  measurementId: "G-DLB9L44DEQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
