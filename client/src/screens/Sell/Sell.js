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
import SignIn from "./SignIn";
import CreateNFT from "./CreateNFT";

export default function Sell() {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return <div>{isSignedIn ? <SellerPage /> : <SignIn />}</div>;
      }}
    </FirebaseAuthConsumer>
  );
}

function SellerPage() {
  function signOut() {
    firebase.auth().signOut();
  }
  if (firebase.auth().currentUser.emailVerified) {
    return (
      <div>
        <button onClick={signOut}>Sign Out</button>
        <br />
        <button>View my NFTS</button>

        <CreateNFT />
      </div>
    );
  } else {
    return (
      <div>
        {
          "Please verify your email first by clicking on the link in the confirmation email we sent you."
        }
        <br />
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}
