import React, { Component } from "react";
import MR from "../images/MR.png";
import tyler from "../images/tyler.png";
import SSC from "../images/ssc.png";
import bryan from "../images/bryan.jpeg";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import TypistLoop from "react-typist-loop";
import { Link } from "react-router-dom";

export default class Main extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#283142",
            fontFamily: "test",
            // fontWeight: "600",
            marginTop: 100,
            fontSize: 100,
            textAlign: "flex-start",
            height: 200,
          }}
        >
          Collect NFT's from
          <TypistLoop interval={0}>
            {[
              "Writers",
              "Bloggers",
              "Thinkers",
              "Intellectuals",
              "Scholars",
            ].map((text) => (
              <Typist key={text} avgTypingDelay={100} startDelay={0}>
                {text}
                <Typist.Backspace count={text.length} delay={2000} />
              </Typist>
            ))}
          </TypistLoop>
        </div>
        {/* <div
          style={{
            fontFamily: "oxy-bold",
            fontSize: 56,
            marginTop: 40,
          }}
        >
          Collect NFT's From
        </div> */}
        {/* <div
          style={{
            fontFamily: "test",
            width: 500,
            textAlign: "center",
            fontSize: 22,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          Scholars, academics, and writers release unique NFT's of their work
          that can only be found here.
        </div> */}
        <div
          style={{
            display: "flex",

            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
          }}
        >
          <Link
            to="/sign-in"
            style={{
              fontFamily: "oxy-bold",
              backgroundColor: "#283142",
              color: "white",
              padding: 20,
              borderRadius: 7,
              cursor: "pointer",
              fontSize: 15,
              width: 150,
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            START COLLECTING
          </Link>
          <Link
            to="info"
            style={{
              fontFamily: "oxy-bold",
              borderRadius: 7,
              marginLeft: 20,
              cursor: "pointer",
              textDecorationColor: "#283142",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              color: "#283142",
              fontSize: 12,
            }}
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    );
  }

  WriterBox(
    name,
    picture,
    blog,
    primaryColor,
    secondaryColor,
    numSold,
    numTotal,
    id
  ) {
    return (
      <div
        className="main-box-elem"
        onClick={() => (window.location.href = "/creator/" + id)}
        style={{
          width: "30vw",
          marginBottom: 10,
          maxWidth: 600,
          backgroundColor: primaryColor,
          padding: 30,
          borderRadius: 8,
          display: "flex",
          flexDirection: "row",
          cursor: "pointer",
        }}
      >
        <img
          src={picture}
          style={{ width: 100, height: 100, borderRadius: 45 }}
        />
        <div style={{ marginLeft: 30, marginTop: 0 }}>
          <div
            style={{
              fontSize: 28,
              fontFamily: "oxy-bold",
              color: secondaryColor,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "oxy-bold",
              color: secondaryColor,
              marginTop: 0,
            }}
          >
            {blog}
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "oxy-bold",
              color: secondaryColor,
              marginTop: 15,
            }}
          >
            {parseInt(numTotal - numSold) + "/" + numTotal + " available"}
          </div>
        </div>
      </div>
    );
  }
  blendColors(colorA, colorB, amount) {
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount)
      .toString(16)
      .padStart(2, "0");
    const g = Math.round(gA + (gB - gA) * amount)
      .toString(16)
      .padStart(2, "0");
    const b = Math.round(bA + (bB - bA) * amount)
      .toString(16)
      .padStart(2, "0");
    return "#" + r + g + b;
  }
}
