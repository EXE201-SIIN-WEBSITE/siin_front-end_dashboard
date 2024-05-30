// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOO1jgyd835wGvEqec6V-AL4diDYWRAbM',
  authDomain: 'uploadimagesiin.firebaseapp.com',
  projectId: 'uploadimagesiin',
  storageBucket: 'uploadimagesiin.appspot.com',
  messagingSenderId: '969623231226',
  appId: '1:969623231226:web:911b66e492ed640e220743',
  measurementId: 'G-8VMZLJJHJS'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
