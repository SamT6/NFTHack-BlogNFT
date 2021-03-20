import React, { Component } from "react";
import tyler from "../images/tyler.png";
import MR from "../images/MR.png";
import "../css/main.css";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow.png";
import { Input, Menu, MenuItem } from "@material-ui/core";

export default class Creator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogTokens: [
        {
          title: "Meditations on Moloch",
          date: "Feb 15, 2016",
          price: "502.23",
          available: true,
          owner: "No owner",
        },
        {
          title: "Distribute the Vaccines",
          date: "Jan 15, 2012",
          price: "102.23",
          available: false,
          owner: "@tokoloshe_",
        },
      ],
      menuOpen: null,
      sortType: "Available",
    };
  }

  render() {
    const { blogTokens } = this.state;
    return (
      <div
        style={{
          width: "90vw",
          marginTop: "0vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div style={{ marginTop: "5vh" }}>
            <img
              src={tyler}
              style={{ width: 300, height: 300, borderRadius: 130 }}
            />
            <div
              style={{
                fontFamily: "tinos-bold",
                textAlign: "center",
                fontSize: 38,
                color: "#283142",
              }}
            >
              Tyler Cowen
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <div
                style={{
                  fontFamily: "tinos",
                  textAlign: "center",
                  fontSize: 20,
                  color: "#283142",
                  cursor: "pointer",
                }}
              >
                Twitter
              </div>
              <div
                style={{
                  fontFamily: "tinos",
                  textAlign: "center",
                  fontSize: 20,
                  color: "#283142",
                  marginLeft: 15,
                  cursor: "pointer",
                }}
              >
                Blog
              </div>
            </div>
          </div>
          <div style={{ marginLeft: 80, marginTop: "5vh" }}>
            <Input
              style={{ width: "30vw", fontSize: 20, fontFamily: "tinos" }}
              placeholder={"Find something"}
            />
            <div id="anchor" style={{ height: 30 }}></div>
            {/*{this.FilterBarComp()}
            <div style={{ height: 10 }}></div> 

            {blogTokens.map((item, index) => {
              return this.SearchItemComp(item);
            })} */}
            {this.RowComp("Blog Posts", [
              {
                title: "Meditations on Moloch",
                date: "Feb 15, 2016",
                price: "502.23",
                available: true,
                owner: "No owner",
              },
              {
                title: "Distribute the Vaccines",
                date: "Jan 15, 2012",
                price: "102.23",
                available: false,
                owner: "@tokoloshe_",
              },
            ])}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const creatorId = urlParams.get("creator");

    const thePath = window.location.pathname;
    const lastItem = thePath.substring(thePath.lastIndexOf("/") + 1);

    // get creator
  }

  RowComp(title, blogPosts) {
    return (
      <div style={{ height: 100, width: "70vw" }}>
        <div
          style={{
            fontSize: 32,
            fontFamily: "tinos-bold",
            marginBottom: 20,
            marginLeft: 10,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex" }}>
          {blogPosts.map((item, index) => {
            return this.ItemComp(item, index);
          })}
        </div>
      </div>
    );
  }

  ItemComp(item, index) {
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
            marginLeft: 10,
            marginRight: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            height: 320,
            backgroundColor: "#16b78f",
            width: 230,
            borderRadius: 5,
          }}
        >
          <img src={MR} style={{ width: 150, height: 150, borderRadius: 10 }} />

          <div
            style={{
              backgroundColor: "#f1f1f1",
              marginBottom: 5,
              borderRadius: 5,
              width: 220,
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontFamily: "tinos-bold", fontSize: 18, marginTop: 10 }}
            >
              {item.title}
            </div>
            <div style={{ fontFamily: "tinos", fontSize: 18, marginTop: 5 }}>
              {item.date}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "tinos-bold", fontSize: 24, marginTop: 10 }}>
          {"$" + item.price}
        </div>
      </div>
    );
  }

  SearchItemComp(blogToken) {
    const { title, date, price, available, owner } = blogToken;
    return (
      <div
        style={{
          marginBottom: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={MR} style={{ width: 120, height: 120, borderRadius: 10 }} />
          <div style={{ marginLeft: 20, marginTop: 2 }}>
            <div
              style={{
                fontFamily: "tinos-bold",
                textAlign: "center",
                fontSize: 22,
                color: "#283142",
              }}
            >
              {title}
            </div>
            <div
              style={{ fontSize: 20, fontFamily: "tinos", color: "#283142" }}
            >
              {date}
            </div>
            <div
              style={{ fontSize: 20, fontFamily: "tinos", color: "#283142" }}
            >
              {owner}
            </div>

            <div
              style={{
                fontSize: 20,
                fontFamily: "tinos",
                color: "#283142",
                marginTop: 5,
              }}
            >
              {"$" + price}
            </div>
          </div>
        </div>
        <div
          style={{
            width: 120,
            height: 60,
            backgroundColor: "#16b78f",
            color: "#283142",
            borderRadius: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "600",
            marginBottom: 5,
          }}
        >
          {available ? "BUY" : "REQUEST"}
        </div>
      </div>
    );
  }

  FilterBarComp() {
    const { menuOpen, sortType } = this.state;
    return (
      <div>
        <div
          onClick={(e) => this.setState({ menuOpen: e.currentTarget })}
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <div style={{ cursor: "pointer", fontFamily: "tinos", fontSize: 18 }}>
            {sortType}
          </div>
          <img
            src={downArrow}
            style={{ width: 15, height: 15, marginLeft: 5, marginTop: 0 }}
          ></img>
        </div>

        <Menu
          id="simple-menu"
          anchorEl={menuOpen}
          keepMounted
          open={Boolean(menuOpen)}
          onClose={() => this.setState({ menuOpen: null })}
        >
          <MenuItem
            onClick={() =>
              this.setState({ menuOpen: null, sortType: "Available" })
            }
          >
            Available
          </MenuItem>
          <MenuItem
            onClick={() =>
              this.setState({ menuOpen: null, sortType: "Expensive" })
            }
          >
            Expensive
          </MenuItem>
          <MenuItem
            onClick={() => this.setState({ menuOpen: null, sortType: "Cheap" })}
          >
            Cheap
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
