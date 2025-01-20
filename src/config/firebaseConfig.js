import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApaNjVTOPuXFXSXHVX521ao2C0X3Wx0_Q",
  authDomain: "cc3-chatbot.firebaseapp.com",
  projectId: "cc3-chatbot",
  storageBucket: "cc3-chatbot.firebasestorage.app",
  messagingSenderId: "362548459841",
  appId: "1:362548459841:web:82ec158565c6d7f80b89c0",
  measurementId: "G-TRQQXMND57",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
