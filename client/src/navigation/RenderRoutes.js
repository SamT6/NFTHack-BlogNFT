import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "../components/Header";
import Creator from "../screens/Creator";
import Form from "../screens/Form";
import Main from "../screens/Main";
import Shard from "../screens/Shard";
import Contact from "../screens/Contact";
import Sell from "../screens/Sell/Sell";
import { config } from "../firebaseConfig";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

export default class RenderRoutes extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          //   backgroundImage:
          //     "linear-gradient(0.25turn, #C5C9D2, #A8AEBB, #8B93A4)",
          backgroundImage:
            "linear-gradient(0.25turn, #FFFFFF, #D1D5DB, #A4AAB8)",
          overflowY: "scroll",
          minHeight: "100vh",
        }}
      >
        <FirebaseAuthProvider firebase={firebase} {...config}>
          <Router>
            <Header />
            <div style={{ height: 80 }}></div>
            <Switch>
              // Andrew
              <Route path="/" exact={true} render={() => <Main />} />
              <Route path="/sell" exact={true} render={() => <Sell />} />
              <Route path="/creator" exact={false} render={() => <Creator />} />
              <Route path="/shards" exact={false} render={() => <Shard />} />
              // Dwarkesh + Sam
              <Route path="/sell" exact={false} render={() => <Sell />} />
              <Route path="/contact" exact={false} render={() => <Contact />} />
            </Switch>
          </Router>
        </FirebaseAuthProvider>
      </div>
    );
  }
}
