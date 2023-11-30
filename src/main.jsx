import React from 'react'
import 'core-js/stable'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqHYVopCj_4bj49LmNSQlzmHvXEtIdD0Y",
  authDomain: "api-react-coder.firebaseapp.com",
  projectId: "api-react-coder",
  storageBucket: "api-react-coder.appspot.com",
  messagingSenderId: "801509662850",
  appId: "1:801509662850:web:f14b8d1de3a9477a2dd49b",
  measurementId: "G-JT784FWEL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
