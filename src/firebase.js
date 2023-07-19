// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvXlAYSRcISWqmjO7fLaK_n9wJ_7b-Xis",
  authDomain: "pocast-app-react.firebaseapp.com",
  projectId: "pocast-app-react",
  storageBucket: "pocast-app-react.appspot.com",
  messagingSenderId: "218390631376",
  appId: "1:218390631376:web:5e9cd9dc6b40250b679fd5",
  measurementId: "G-TQ4QSH9RP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};
