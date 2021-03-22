import React, { Component } from "react";
import img1 from "../images/screen1.png";
import img2 from "../images/screen2.png";
import img3 from "../images/screen3.png";
import arrowImg from "../images/right-arrow.png";
import arrowGreyImg from "../images/right-arrow-grey.png";
import { Input } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import TypistLoop from "react-typist-loop";
import Fade from "react-reveal/Fade";
import pg from "../images/pg.jpg";
import "../css/main.css";
import act from "../images/act.png";
import lw from "../images/lw.jpg";

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          marginTop: isMobile ? 30 : 120,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100vw" : "90vw",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: isMobile ? "90vw" : "60vw",
            marginLeft: isMobile ? "5vw" : null,
          }}
        >
          <div
            style={{
              color: "white",
              fontFamily: "oxy-bold",
              // fontWeight: "600",
              marginTop: isMobile ? 60 : 20,
              fontSize: isMobile ? 42 : 68,
              textAlign: "flex-start",
              height: 200,
            }}
          >
            {/* Join the Reddit for voice */}
            The future of voice chat for
            <TypistLoop interval={0}>
              {[
                "Astral Codex Ten",
                "Less Wrong",
                "Attack on Titan",
                "Worldbuilding",
                // "Leo Strauss",
                "Wall Street Bets",
                "Lord of the Rings",
                "Sushi-Coin",
                "Elden Ring",
                "Communities",
              ].map((text) => (
                <Typist key={text} avgTypingDelay={60} startDelay={0}>
                  {text}
                  <Typist.Backspace count={text.length} delay={1200} />
                </Typist>
              ))}
            </TypistLoop>
          </div>

          <div
            style={{
              marginTop: 20,
              textDecorationColor: "#ffd700",
              textDecorationThickness: 0,
              textDecorationWidth: 0,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Link
              to="/signup"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 500,
                textDecorationColor: "#ffd700",
                textDecorationThickness: 0,
                textDecorationWidth: 0,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  color: "#efbf00",
                  fontFamily: "oxy-bold",
                  marginBottom: 2,
                  fontSize: 22,
                }}
              >
                Get early access
              </div>
              <img
                style={{ width: 27, height: 27, marginLeft: 8 }}
                src={arrowImg}
              />
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: isMobile ? "100vw" : "90vw",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "100vw",
              scrollbarWidth: 5,
            }}
          >
            {this.GuildBoxComp(
              "Astral Codex Ten",
              "Reading more, together. This Column is for notes, quotes, thoughts about what you are reading, and to get book recommendations. It's an asynchronous book club where not everyone is reading the same thing.",
              1014,
              [pg, pg, pg],
              act
            )}
            {this.GuildBoxComp(
              "Less Wrong",
              "Reading more, together. This Column is for notes, quotes, thoughts about what you are reading, and to get book recommendations. It's an asynchronous book club where not everyone is reading the same thing.",
              478,
              [pg, pg, pg],
              lw
            )}
            {this.GuildBoxComp(
              "Something else",
              "Reading more, together. This Column is for notes, quotes, thoughts about what you are reading, and to get book recommendations. It's an asynchronous book club where not everyone is reading the same thing.",
              478,
              [pg, pg, pg],
              lw
            )}
          </div>
          {this.TextPictureComp(
            "Join a Guild",
            "A Guild is a group of people interested in a particular topic, but can be either open or private. Once joined, members (or mods) start events to discuss things and hang out with other members over voice. Join ",
            img1,
            0
          )}

          {this.TextPictureComp(
            "Explorable, Friendly, Anonymous",
            `Easily find guilds using explore. If a guild is private, submit a request to join. Requests are 1-3 short questions you answer with your voice, just to make sure you're a good fit. Guilds of all kinds exist, so finding friends is easy. And you can always start your own guild.`,
            img2,
            true,
            1
          )}
        </div>

        <div style={{ height: isMobile ? 50 : 0 }}></div>
      </div>
    );
  }

  TextPictureComp(title, text, picture, reversed, index) {
    if (!isMobile && reversed) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            width: isMobile ? "90vw" : "90vw",
            marginTop: 50,
            justifyContent: "center",
          }}
        >
          <img
            style={{
              // height: isMobile ? null : "70vh",
              width: isMobile ? "96vw" : 400,
              minWidth: isMobile ? null : 400,
              marginRight: isMobile ? 0 : 100,
            }}
            src={picture}
          />
          <div style={{ marginBottom: isMobile ? 0 : 60 }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: isMobile ? 32 : 56,
                // fontWeight: "600",
                fontFamily: "oxy-bold",
                textAlign: "left",
                width: isMobile ? "90vw" : 500,
              }}
            >
              {title}
            </div>
            <div
              style={{
                color: "#c1c1c1",
                marginTop: 20,
                marginBottom: 30,
                fontSize: isMobile ? 20 : 28,
                textAlign: "left",
                lineHeight: 1.4,
                width: isMobile ? "90vw" : 500,
                fontFamily: "oxy",
              }}
            >
              {text}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          width: isMobile ? "90vw" : "90vw",
          marginTop: 80,
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: isMobile ? 0 : 60 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: isMobile ? 32 : 56,
              // fontWeight: "600",
              textAlign: "left",
              width: isMobile ? "90vw" : 500,
              fontFamily: "oxy-bold",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#c1c1c1",
              marginTop: 20,
              marginBottom: 30,
              fontSize: isMobile ? 20 : 28,
              textAlign: "left",
              lineHeight: 1.4,
              width: isMobile ? "90vw" : 500,
              fontFamily: "oxy",
            }}
          >
            {text}
            <Link
              style={{
                color: "#c1c1c1",
                textDecorationColor: "#c1c1c1",
                textDecorationThickness: 2,
                textDecorationLine: "underline",
                textDecorationWidth: 2,
                // textDecoration: "none",
              }}
              to="/signup"
            >
              <span style={{ fontWeight: "400" }}>here.</span>
            </Link>
          </div>
        </div>
        <img
          style={{
            // height: isMobile ? null : "70vh",
            width: isMobile ? "96vw" : 400,
            minWidth: isMobile ? null : 400,
            marginLeft: isMobile ? 0 : 100,
          }}
          src={picture}
        />
      </div>
    );
  }

  GuildBoxComp(title, text, members, membersArray, image) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1005,
          marginTop: 10,
        }}
      >
        <div
          style={{
            maxWidth: 300,
            height: 300,
            borderStyle: "solid",
            borderWidth: 2,
            borderRadius: 8,
            borderColor: "#5f6b82",
            padding: 15,
            marginLeft: 5,
            marginRight: 5,
            // backgroundColor: "#283142",
            opacity: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                color: "white",
                fontFamily: "oxy-bold",
                fontSize: 26,
                marginRight: 20,
                minWidth: 220,
              }}
            >
              {title}
            </div>
            <img
              style={{ width: 50, height: 50, marginTop: 3, borderRadius: 100 }}
              src={image}
            />
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              marginTop: 10,
              fontFamily: "oxy",
              justifyContent: "space-between",
              width: 220,
            }}
          >
            <div style={{ width: 200, color: "#c1c1c1", fontSize: 14 }}>
              {members + " members"}
            </div>
            {/* <div style={{ display: "flex", alignItems: "center" }}>
              {membersArray.map((item, index) => {
                return (
                  <img
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      position: "absolute",
                      marginLeft: index * 20,
                      zIndex: index * -1,
                    }}
                    src={item}
                  ></img>
                );
              })}
            </div> */}
          </div>

          <div
            style={{
              marginTop: 30,
              color: "#c1c1c1",
              fontSize: 17,
            }}
          >
            {text}
          </div>
          <div
            onClick={() => this.joinGuild(title)}
            style={{
              backgroundColor: "#5f6b82",
              cursor: "pointer",
              fontFamily: "oxy-bold",
              borderRadius: 5,
              color: "white",
              marginTop: 20,
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Request to join guild
          </div>
        </div>
      </div>
    );
  }

  joinGuild(title) {
    alert(title);
  }
}
