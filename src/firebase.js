// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage"
import "firebase/compat/firestore"
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyAyVoo4dylJwhlWpgvIX4S9sTxntPSys",
  authDomain: "tourism-f3a86.firebaseapp.com",
  projectId: "tourism-f3a86",
  storageBucket: "tourism-f3a86.appspot.com",
  messagingSenderId: "759369797765",
  appId: "1:759369797765:web:64b5d0176ed6688f5259ec",
  measurementId: "G-9R36G0S8HP"
  };
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth() ;
const firestore = firebase.firestore();
export const database = {
  users: firestore.collection('users'),
  getTimeStamp:  () =>{
    return firebase.firestore.Timestamp.now();
  }
}
export const storage = firebase.storage();