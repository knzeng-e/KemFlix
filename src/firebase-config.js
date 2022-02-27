import "firebase/auth";
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';


dotenv.config()

console.log(process.env)

// export const firebaseConfig = {
//     apiKey : process.env.FIREBASE_API_KEY,
//     authDomain: `${process.env.PROJECT_ID}.firebase.com`,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
//     messagingSenderId: process.env.SENDER_ID,
//     measurementId: `G-${process.env.MEASUREMENT_ID}`,
//     testValue: "TOTOTOOOIII"
// }

export const auth = initializeApp({
    apiKey: "AIzaSyA72yOsl-HNehweFTqpSSnNq26ccI_1emA",
    authDomain: "kem-flix.firebaseapp.com",
    databaseURL: "https://kem-flix-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kem-flix",
    storageBucket: "kem-flix.appspot.com",
    messagingSenderId: "488071772276",
    appId: "1:488071772276:web:2ee991e8bd6d1d0574f921",
    measurementId: "G-8Y6YNM70DY"
  });