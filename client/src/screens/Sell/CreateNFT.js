import React, { useState } from "react";
import Web3 from "web3";
import { MetaMaskButton } from "rimble-ui";
import * as blogNFT from "../../contracts/BlogNFT.json";
import * as marketplace from "../../contracts/Marketplace.json";
import * as blogAuction from "../../contracts/BlockNFTAuction.json"
import { NFTStorage, Blob } from "nft.storage";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const axios = require("axios");
const FormData = require("form-data");

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8NDU1MTc5MTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE4ODM4OTgxMiwibmFtZSI6ImRlZmF1bHQifQ.ugTHkSIEBhS9Olsikjh_vuX2nB8x-R8t_ghAv4rYm5g";
const client = new NFTStorage({ token: apiKey });

const web3 = new Web3(Web3.givenProvider);

const blogNFT_address = "0xCB0ee4537e4CB1503B7D344A30c439a46d0dD92C";
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0x1B379913DbC82ee9801F9F2C3D11dEDd6Cb1cfa9";
const marketplaceContract = new web3.eth.Contract(
  marketplace.abi,
  marketplace_address
);

const auction_address = "0x4d879C926A047E1E05f1918C14830e95e29aDD87";
const auctionContract = new web3.eth.Contract(
  blogAuction.abi,
  auction_address
);



export default function MintNFT() {
  const [ethAccount, setEthAccount] = useState("");

   const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const [sellPrice, setSellPrice] = useState(0);
  const [duration, setDuration] = useState(0);


  const connect_metamask = async () => {
    const accounts = await window.ethereum.enable();
    setEthAccount(accounts[0]);
  };

  const mintNFT = async (t) => {
    t.preventDefault();
        
    const content = new Blob([author, title, url, Date.now(), ]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    await blogNFTContract.methods
      .awardItem(ethAccount, cid, "ipfs://" + cid)
      .send({
        from: ethAccount,
      });

    const latestNFTIndex = await blogNFTContract.methods.balanceOf(ethAccount).call();
    const tokenID = await blogNFTContract.methods
        .tokenOfOwnerByIndex(ethAccount, latestNFTIndex-1)
        .call();
    console.log("latest token id: ", tokenID);
    
    //give permission to move token to contract
    await blogNFTContract.methods
      .approve(auction_address, tokenID)
      .send({
        from: ethAccount,
      });
    console.log("permission given");
    
    //call opentrade on marketplace.sol
    await auctionContract.methods
      .createAuction(tokenID, web3.utils.toWei(sellPrice, 'ether'), duration) // add duration and convert sellprice to wei
      .send({
        from: ethAccount,
      });
      console.log("nft on auction");

    const name = firebase.auth().currentUser.displayName;
    firebase
      .firestore()
      .collection("sellers")
      .doc(name)
      .update({ NFTs: firebase.firestore.FieldValue.arrayUnion(cid) });
  };



  return (
    <div className="main">
      <div className="card">
        <h1>Create NFT</h1>
        <p>address: {ethAccount}</p>
        <MetaMaskButton onClick={connect_metamask}>
          Connect with MetaMask
        </MetaMaskButton>
      </div>
      <div className="card">
        <form className="form" onSubmit={mintNFT}>
          <h3>Blog Post information</h3>
          {/* <label for="hash">IPFS Hash:</label> */}
          {/* <input type="text" id="hash" onChange={(t)=>{setIPFSHash(t.target.value)}}/> */}
          <label for="author">Name of Author:</label>
          <input
            type="text"
            id="author"
            onChange={(t) => {
              setAuthor(t.target.value);
            }}
          />
          <br />

          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={(t) => {
              setTitle(t.target.value);
            }}
          />
          <br />

          <label for="url">URL:</label>
          <input
            type="text"
            id="url"
            onChange={(t) => {
              setUrl(t.target.value);
            }}
          />
          <br />

          <label for="price">Price (ETH):</label>
          <input
            type="text"
            id="price"
            onChange={(t) => {
              setSellPrice(t.target.value);
            }}
          />
          <br />

          <label for="time">Length of auction (in days):</label>
          <input
            type="text"
            id="time"
            onChange={(t) => {
              setDuration(t.target.value * 24 * 60 * 60); // convert day to seconds
            }}
          />
          <br />

          {/* <label for="amount">Metadata URI:</label>
          <input
            type="text"
            id="amount"
            onChange={(t) => {
              setMetadata(t.target.value);
            }}
          /> */}
          <br />
            <button className="button">submit</button>
        </form>
      </div>

      
      {/* <div className="card">
        <br />
        <button onClick={get_nft}>See Your NFT</button>
      </div> */}
    </div>
  );
}
