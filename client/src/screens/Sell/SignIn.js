import React, { useState } from "react";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const submit = async () => {
    if (signingUp) {
      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => setError(error.message));
      const user = userCredentials.user;
      user.sendEmailVerification();
      user.updateProfile({
        displayName: name,
      });
      firebase.firestore().collection("sellers").doc(name).set({
        name: name,
        email: email,
        NFTs: [],
      });
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
      {signingUp && (
        <form className="name">
          <label htmlFor="userEmail" className="block">
            Name:
          </label>
          <input
            type="name"
            value={name}
            id="userName"
            onChange={(event) => setName(event.target.value)}
          />
        </form>
      )}
      <form className="email">
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
      <form className="password">
        <label htmlFor="userPass" className="block">
          Password:
        </label>
        <input
          type="password"
          value={password}
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
