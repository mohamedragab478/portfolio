import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2G350fJcL_up99AC3h4JRE-5mNfFtRPY",
  authDomain: "amir-portfolio-cms.firebaseapp.com",
  projectId: "amir-portfolio-cms",
  storageBucket: "amir-portfolio-cms.firebasestorage.app",
  messagingSenderId: "870008538483",
  appId: "1:870008538483:web:12b32c753507b4781e3106",
  measurementId: "G-JCXZY31G3G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

