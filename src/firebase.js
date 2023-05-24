// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase';
// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyBrCE8CuEdHkkebwnJKZFRWdLBhZ1vok0o",

//     authDomain: "instagram-clone-f80ec.firebaseapp.com",

//     projectId: "instagram-clone-f80ec",

//     storageBucket: "instagram-clone-f80ec.appspot.com",

//     messagingSenderId: "10178630319",

//     appId: "1:10178630319:web:71f8f839bcbfc23071fa5a",

//     measurementId: "G-KPMFGXCBDF"
// });

// const db = firebase.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export { db, auth, storage };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrCE8CuEdHkkebwnJKZFRWdLBhZ1vok0o",

  authDomain: "instagram-clone-f80ec.firebaseapp.com",

  projectId: "instagram-clone-f80ec",

  storageBucket: "instagram-clone-f80ec.appspot.com",

  messagingSenderId: "10178630319",

  appId: "1:10178630319:web:71f8f839bcbfc23071fa5a",

  measurementId: "G-KPMFGXCBDF",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage();
export const serverStamp = firebase.firestore.Timestamp;