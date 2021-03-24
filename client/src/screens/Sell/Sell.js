import React, { useState } from "react";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import CreateNFT from "./CreateNFT";

export default function Sell() {
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user, providerId }) => {
        return <div>{isSignedIn ? <SellerPage /> : <SignIn />}</div>;
      }}
    </FirebaseAuthConsumer>
  );
}



function SellerPage() {
  function signOut() {
    firebase.auth().signOut();
  }

  const get_nft = async (t) => {
    t.preventDefault();
    console.log("getting nft");

    const numOfNFT = await blogNFTContract.methods.balanceOf(ethAccount).call();
    console.log("number of nft: ", numOfNFT);

    let nfts = {};
    for (var i = 0; i < parseInt(numOfNFT); i++) {
      const tokenID = await blogNFTContract.methods
        .tokenOfOwnerByIndex(ethAccount, i)
        .call();
      console.log(tokenID);
      //get blog title with tokenID
      const tokenURI = await blogNFTContract.methods.tokenURI(tokenID).call(); // metadata, IPFS link
      console.log("tokenURI: ", tokenURI.slice(7, tokenURI.length));
      axios
        .get("https://nft.storage/api/" + tokenURI.slice(7, tokenURI.length))
        .then(function (response) {
          console.log(response);
        });

      //add {tokenid, blog title} to nfts
      //nfts[tokenID] = blogTitle;
      //setState of nftOwnByEthAccount
      setNFTOwnByEthAccount(nfts);
    }
  };const get_nft = async (t) => {
    t.preventDefault();
    console.log("getting nft");

    const numOfNFT = await blogNFTContract.methods.balanceOf(ethAccount).call();
    console.log("number of nft: ", numOfNFT);

    let nfts = {};
    for (var i = 0; i < parseInt(numOfNFT); i++) {
      const tokenID = await blogNFTContract.methods
        .tokenOfOwnerByIndex(ethAccount, i)
        .call();
      console.log(tokenID);
      //get blog title with tokenID
      const tokenURI = await blogNFTContract.methods.tokenURI(tokenID).call(); // metadata, IPFS link
      console.log("tokenURI: ", tokenURI.slice(7, tokenURI.length));
      axios
        .get("https://nft.storage/api/" + tokenURI.slice(7, tokenURI.length))
        .then(function (response) {
          console.log(response);
        });

      //add {tokenid, blog title} to nfts
      //nfts[tokenID] = blogTitle;
      //setState of nftOwnByEthAccount
      //setNFTOwnByEthAccount(nfts);
    }
  };

  if (firebase.auth().currentUser.emailVerified) {
    return (
      <div>
        <button onClick={signOut}>Sign Out</button>
        <br />
        {/* TO DO */}
        <button>View my NFTS</button>

        <CreateNFT />
      </div>
    );
  } else {
    return (
      <div>
        {
          "Please verify your email first by clicking on the link in the confirmation email we sent you."
        }
        <br />
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
}

function viewNFTs() {
  
}
