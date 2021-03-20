import React from "react";
import ReactDOM from "react-dom";
import RenderRoutes from "./navigation/RenderRoutes";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyDo5jirFdOf1Rw9nHG6ZGm5cWHzdl111w8",
  authDomain: "nfthack-4fd52.firebaseapp.com",
  projectId: "nfthack-4fd52",
  storageBucket: "nfthack-4fd52.appspot.com",
  messagingSenderId: "626621965916",
  appId: "1:626621965916:web:64f983a80524d5a6a02899",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<RenderRoutes />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
