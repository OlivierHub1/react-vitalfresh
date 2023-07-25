// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2NAF9b0j2PoYqTNRptBclQse85sprHwA",
  authDomain: "vitalfresh-53b01.firebaseapp.com",
  databaseURL: "https://vitalfresh-53b01-default-rtdb.firebaseio.com",
  projectId: "vitalfresh-53b01",
  storageBucket: "vitalfresh-53b01.appspot.com",
  messagingSenderId: "689066928873",
  appId: "1:689066928873:web:7af49e07acba8de9081e78",
  measurementId: "G-VP94MSGZ29"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
export const db = getDatabase();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);