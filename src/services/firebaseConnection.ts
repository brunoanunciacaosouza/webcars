// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQGT_BzNJL5vosR714AnpHmF4bWlVWRwI",
  authDomain: "webcars-8be65.firebaseapp.com",
  projectId: "webcars-8be65",
  storageBucket: "webcars-8be65.appspot.com",
  messagingSenderId: "225644604957",
  appId: "1:225644604957:web:37557898c19236d77ce0f4",
  measurementId: "G-40NNHGGCY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
