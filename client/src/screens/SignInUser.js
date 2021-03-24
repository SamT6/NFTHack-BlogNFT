import React, { Component } from "react";
import { Drawer, SwipeableDrawer } from "@material-ui/core";
import { injected, fortmatic } from "../components/Connectors";

export default class SignInUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletDrawer: false,
      // userAddress: "0xef91bb7531f672c7f0fe673ec9129f73bcaf907d",
      userAddress: "",
      userAccount: null,
    };
  }

  render() {
    const { walletDrawer, userAddress, userAccount } = this.state;

    return (
      <div style={{ marginTop: "30vh" }}>
        <Drawer
          anchor={"bottom"}
          open={walletDrawer}
          onClose={() =>
            this.setState({
              walletDrawer: false,
            })
          }
          style={{
            zIndex: 99999,
          }}
        >
          <div
            style={{
              height: "70vh",
              minHeight: 500,
              overflowY: "hidden",
              backgroundImage:
                "linear-gradient(0.25turn, #FFFFFF, #D1D5DB, #A4AAB8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "oxy",
            }}
          >
            <div
              style={{ fontFamily: "oxy-bold", fontSize: 20, marginTop: 100 }}
            >
              Pick a wallet to connect to Scholar.Market
            </div>
            <div
              onClick={() => this.connectToMetaMask()}
              style={{ marginTop: 30, cursor: "pointer" }}
            >
              <img
                src={"https://metamask.io/images/mm-logo.svg"}
                style={{ width: 200 }}
              />
            </div>
            <div
              onClick={() => this.connectToFormatic()}
              style={{
                display: "flex",
                alignItems: "center",
                width: 200,
                marginTop: 10,
                cursor: "pointer",
              }}
            >
              <img
                src={
                  "https://gblobscdn.gitbook.com/spaces%2F-Lj7HukBJLlR6jbx0-eP%2Favatar.png?alt=media"
                }
                style={{ height: 45 }}
              />
              <div
                style={{
                  marginLeft: 10,
                  fontSize: 24,
                  fontFamily: "oxy-bold",
                }}
              >
                Fortmatic
              </div>
            </div>
          </div>
        </Drawer>
        {!userAddress &&
          !userAccount && ( // 1. No address and no account. Set up the wallet.
            <div>
              <div style={{ fontFamily: "oxy", fontSize: 36 }}>
                Let's select a wallet.
              </div>

              <div
                onClick={() => this.selectWallet()}
                style={{
                  fontFamily: "oxy-bold",
                  backgroundColor: "#283142",
                  color: "white",
                  padding: 20,
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 15,
                  textDecorationColor: "#283142",
                  textDecorationThickness: 0,
                  textDecorationWidth: 0,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                SELECT A WALLET
              </div>
            </div>
          )}
        {userAddress &&
          !userAccount && ( // 2. Address, but no account tied to it.
            <div style={{ width: 420 }}>
              <div style={{ fontFamily: "oxy", fontSize: 30 }}>
                Let's set up an account for your address.
              </div>

              <div
                style={{
                  display: "flex",
                  fontFamily: "oxy",
                  marginTop: 20,
                  marginBottom: 30,
                }}
              >
                <div>Address:</div>
                <div style={{ marginLeft: 10 }}>{userAddress}</div>
              </div>

              <div
                onClick={() => this.selectWallet()}
                style={{
                  fontFamily: "oxy-bold",
                  backgroundColor: "#283142",
                  color: "white",
                  padding: 20,
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 15,
                  textDecorationColor: "#283142",
                  textDecorationThickness: 0,
                  textDecorationWidth: 0,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                SIGN UP
              </div>
              <div
                onClick={() => this.selectWallet()}
                style={{
                  fontFamily: "oxy-bold",
                  borderColor: "#283142",
                  borderStyle: "solid",
                  borderWidth: 2,
                  color: "#283142",
                  padding: 20,
                  borderRadius: 7,
                  cursor: "pointer",
                  fontSize: 15,
                  textDecorationColor: "#283142",
                  textDecorationThickness: 0,
                  textDecorationWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                SWITCH ADDRESSES
              </div>
            </div>
          )}
      </div>
    );
  }

  selectWallet() {
    this.setState({
      walletDrawer: true,
    });
  }

  connectToMetaMask() {
    injected
      .activate()
      .then((a) => {
        console.log(a);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  connectToFormatic() {
    fortmatic
      .activate()
      .then((a) => {
        console.log(a);
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
