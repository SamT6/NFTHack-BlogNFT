import React, { Component } from "react";
import MR from "../images/MR.png";
import tyler from "../images/tyler.png";
import SSC from "../images/ssc.png";
import bryan from "../images/bryan.jpeg";


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
            fontFamily: "spec-bold-italic",
            fontSize: 36,
            marginTop: 40,
          }}
        >
          The only scholarly NFT's
        </div>
        <div
          style={{
            fontFamily: "spec",
            width: 500,
            textAlign: "center",
            fontSize: 22,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          Scholars, academics, and writers release unique NFT's of their work
          that can only be found here.
        </div>
        {this.WriterBox(
          "Tyler Cowen",
          tyler,
          "Marginal Revolution",
          // "#16b78f",
          this.blendColors("#16b78f", "#ffffff", 0.2),
          this.blendColors("#242524", "#000000", 0.2),
          23,
          25,
          "123"
        )}
        {this.WriterBox(
          "Bryan Caplan",
          bryan,
          "Econ Lib",
          // "#003866",
          this.blendColors("#003866", "#ffffff", 0.2),
          this.blendColors("#ffffff", "#ffffff", 0.2),
          5,
          32,
          "123"
        )}
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
              fontFamily: "spec-bold",
              color: secondaryColor,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "spec-bold",
              color: secondaryColor,
              marginTop: 0,
            }}
          >
            {blog}
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "spec-bold",
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
