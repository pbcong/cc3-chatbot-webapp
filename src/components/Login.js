import React, { useState } from "react";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../config/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((error) => {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      });
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (isSigningIn) {
      setIsSigningIn(false);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSigningIn ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isSigningIn ? onRegister : onSubmit}>
        {isSigningIn ? "Register" : "Login"}
      </button>
      <button onClick={() => setIsSigningIn(!isSigningIn)}>
        {isSigningIn ? "Switch to Login" : "Switch to Register"}
      </button>
      <button
        onClick={onGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
