// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvfqAgDnSYrR7XHXFYBoZwkid625_NBa8",
  authDomain: "todo-app-e73d9.firebaseapp.com",
  projectId: "todo-app-e73d9",
  storageBucket: "todo-app-e73d9.appspot.com",
  messagingSenderId: "193694900824",
  appId: "1:193694900824:web:86584b190725d27a4ae02d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);