import React from "react";
import ReactDOM from "react-dom";
import RenderRoutes from "./navigation/RenderRoutes";
import firebase from "firebase/app";
import { config } from "./firebaseConfig";
import { FirebaseAuthProvider } from "@react-firebase/auth";

firebase.initializeApp(config);

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase} {...config}>
    <RenderRoutes />
  </FirebaseAuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
