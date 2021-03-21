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

  const submit = async () => {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "https://www.scholar-market.web.com/finishSignUp?cartId=1234",
      // This must be true.
      handleCodeInApp: true,
      // iOS: {
      //   bundleId: "com.example.ios",
      // },
      // android: {
      //   packageName: "com.example.android",
      //   installApp: true,
      //   minimumVersion: "12",
      // },
      // dynamicLinkDomain: "example.page.link",
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        console.log("done " + email);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage);
        // ...
      });
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
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
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
