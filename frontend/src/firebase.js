// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTYU8aNK33VIYW15TMo1zhzkhPJUFlpQQ",
  authDomain: "loginsignupform-51b73.firebaseapp.com",
  projectId: "loginsignupform-51b73",
  storageBucket: "loginsignupform-51b73.firebasestorage.app",
  messagingSenderId: "862594968973",
  appId: "1:862594968973:web:54a3d9cec0e6a35f06a1c4",
  measurementId: "G-SLG0G8ERWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
export default app;


// const analytics = getAnalytics(app);