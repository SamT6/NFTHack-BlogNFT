import React, { Component } from "react";
import scroll from "../images/scroll.png";
import { isMobile } from "react-device-detect";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createMetaMaskContext } from "@daisypayments/react-metamask";
import "../css/main.css";
import MetaMaskButton from "./MetaMaskButton";
import { injected } from "./Connectors";

export default class Header extends Component {
  render() {
    return (
      <div
        style={{
          height: 80,
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          backgroundImage:
            "linear-gradient(0.25turn, #FFFFFF, #D1D5DB, #A4AAB8)",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "#d1d1d1",
          zIndex: 105,
        }}
      >
        <Link
          to="/"
          id="header-link"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: isMobile ? "5vw" : "5vw",
            textDecorationColor: "#ffd700",
            textDecorationThickness: 0,
            textDecorationWidth: 0,
            textDecoration: "none",
          }}
        >
          <img src={scroll} style={{ width: 50, height: 50 }}></img>
          <div
            style={{
              marginLeft: 10,
              fontSize: 36,
              color: "#efbf00",
              color: "#283142",
              fontWeight: "500",
              fontFamily: "test",
              letterSpacing: 1.2,
            }}
          >
            Scholar
          </div>
          <div
            style={{
              marginLeft: 1,
              fontSize: 36,
              color: "#efbf00",
              color: "#283142",
              fontWeight: "500",
              fontFamily: "test",
              letterSpacing: 1.2,
            }}
          >
            .
          </div>
          <div
            style={{
              marginLeft: 1,
              fontSize: 36,
              color: "#efbf00",
              color: "#283142",
              fontWeight: "500",
              fontFamily: "test",
              letterSpacing: 1.2,
            }}
          >
            Market
          </div>
        </Link>
        <div style={{ display: "flex" }}>
          <Link
            to="/sell"
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "2vw" : "0vw",
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              textDecoration: "none",
              marginRight: 25,
            }}
          >
            <div
              style={{
                fontFamily: "oxy-bold",
                textAlign: "center",
                fontSize: 18,
                cursor: "pointer",
                color: "#283142",
              }}
            >
              Sell
            </div>
          </Link>

          <Link
            to="/sell"
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "2vw" : "0vw",
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              textDecoration: "none",
              marginRight: 25,
            }}
          >
            <div
              style={{
                fontFamily: "oxy-bold",
                textAlign: "center",
                fontSize: 18,
                cursor: "pointer",
                color: "#283142",
              }}
            >
              Discover
            </div>
          </Link>

          {!injected.isAuthorized() && (
            <div
              style={{
                fontFamily: "oxy-bold",
                textAlign: "center",
                fontSize: 18,
                marginLeft: isMobile ? "2vw" : "0vw",
                cursor: "pointer",
                color: "#283142",
                marginRight: 25,
              }}
              onClick={() => this.activeMetaMask()}
            >
              MetaMask
            </div>
          )}

          <Link
            to="/sign-in"
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "2vw" : "0vw",
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              textDecoration: "none",
              marginRight: 25,
            }}
          >
            <div
              style={{
                fontFamily: "oxy-bold",
                textAlign: "center",
                fontSize: 18,
                cursor: "pointer",
                color: "#283142",
              }}
            >
              Sign in
            </div>
          </Link>

          <Link
            to="/contact"
            id="header-link"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "2vw" : "0vw",
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              textDecoration: "none",
              marginRight: "5vw",
            }}
          >
            <div
              style={{
                fontFamily: "oxy-bold",
                textAlign: "center",
                fontSize: 18,
                cursor: "pointer",
                color: "#283142",
              }}
            >
              Contact
            </div>
          </Link>
        </div>
      </div>
    );
  }

  activeMetaMask() {
    injected
      .activate()
      .then((a) => {
        console.log(a);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
