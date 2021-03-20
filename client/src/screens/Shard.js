import React, { Component } from "react";
import MR from "../images/MR.png";

export default class Shard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shardInfo: {
        title: "Distribute the Vaccines",
        date: "Jan 15, 2012",
        price: "102.23",
        available: false,
        owner: "@tokoloshe_",
      },
    };
  }

  render() {
    const { shardInfo } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <div>{this.ItemComp(shardInfo)}</div>
          <div
            onClick={() => alert("Dwarkesh - handle this.")}
            style={{
              width: 150,
              cursor: "pointer",
              height: 60,
              marginTop: 50,
              backgroundColor: "#242524",
              color: "white",
              borderRadius: 5,
              display: "flex",
              fontSize: 18,
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "spec-bold",
            }}
          >
            Buy now
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {}

  ItemComp(item, index) {
    return (
      <div
        onClick={() => (window.location.href = "/shards/12983")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
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
              style={{ fontFamily: "spec-bold", fontSize: 18, marginTop: 10 }}
            >
              {item.title}
            </div>
            <div style={{ fontFamily: "spec", fontSize: 18, marginTop: 10 }}>
              {item.date}
            </div>
            <div style={{ fontFamily: "spec", fontSize: 18, marginTop: 2 }}>
              {item.owner}
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "spec-bold", fontSize: 24, marginTop: 10 }}>
          {"$" + item.price}
        </div>
      </div>
    );
  }
}
