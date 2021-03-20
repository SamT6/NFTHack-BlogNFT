import React, { Component } from "react";
import scroll from "../images/scroll.png";
import { isMobile } from "react-device-detect";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "../css/main.css";

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
            "linear-gradient(0.45turn, #FFFFFF, #D1D5DB, #A4AAB8)",
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
            marginLeft: isMobile ? "5vw" : "15vw",
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
              fontSize: 46,
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
              fontSize: 46,
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
              fontSize: 46,
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
                fontFamily: "spec-bold",
                textAlign: "center",
                fontSize: 18,
                cursor: "pointer",
                color: "#283142",
              }}
            >
              Work with us
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
              marginRight: "15vw",
            }}
          >
            <div
              style={{
                fontFamily: "spec-bold",
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
}
