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
        return <div>{isSignedIn ? <CreateNFT /> : <SignIn />}</div>;
      }}
    </FirebaseAuthConsumer>
  );
}
