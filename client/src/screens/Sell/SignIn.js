import React, { useState } from "react";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const submit = async () => {
    if (signingUp) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => setError(error.message));
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => setError(error.message));
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <form className="">
        <label htmlFor="userEmail" className="block">
          Email:
        </label>
        <input
          type="email"
          value={email}
          placeholder="E.g: faruq123@gmail.com"
          id="userEmail"
          onChange={(event) => setEmail(event.target.value)}
        />
      </form>
      <form className="">
        <label htmlFor="userPass" className="block">
          Password:
        </label>
        <input
          type="password"
          id="usePass"
          onChange={(event) => setPassword(event.target.value)}
        />
      </form>
      {error}
      <label>
        Signing Up?
        <input
          name="signingUp"
          type="checkbox"
          checked={signingUp}
          onChange={() => setSigningUp(!signingUp)}
        />
      </label>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
