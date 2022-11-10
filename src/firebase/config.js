// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuLba5DXywaC5Y5dAwVrYBzCMm-lCuySE",
    authDomain: "journal-app-react-b16d0.firebaseapp.com",
    projectId: "journal-app-react-b16d0",
    storageBucket: "journal-app-react-b16d0.appspot.com",
    messagingSenderId: "426049238988",
    appId: "1:426049238988:web:1e0ad8310e8acd4d770f69"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Autenticación
export const FirebaseAuth = getAuth(FirebaseApp);

// Base de datos
export const FirebaseDB = getFirestore(FirebaseApp);