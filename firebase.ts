// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhGrGTrG61NrVEChFY8fOX_kC2th4Ut4M",
  authDomain: "szakdolgozat2-394a2.firebaseapp.com",
  projectId: "szakdolgozat2-394a2",
  storageBucket: "szakdolgozat2-394a2.appspot.com",
  messagingSenderId: "420548840216",
  appId: "1:420548840216:web:f4906dd3f7c9897aef2c6d",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
