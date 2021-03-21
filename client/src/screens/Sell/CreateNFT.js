import React, { useState } from "react";
import Web3 from "web3";
import { MetaMaskButton } from "rimble-ui";
import * as blogNFT from "../../contracts/BlogNFT.json";
import * as marketplace from "../../contracts/Marketplace.json";
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

const blogNFT_address = "0x7733e0C4359863a4253A202cB405D3b0fBd95B17";
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0x91e28C4368A18e612F8D2ecA54BF4005d5889Ef2";
const marketplaceContract = new web3.eth.Contract(
  marketplace.abi,
  marketplace_address
);

export default function MintNFT() {
  const [ethAccount, setEthAccount] = useState("");
  const [metadata, setMetadata] = useState("");

  const [ipfsHash, setIPFSHash] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(0);

  const connect_metamask = async () => {
    const accounts = await window.ethereum.enable();
    setEthAccount(accounts[0]);
  };

  const mint_nft = async (t) => {
    t.preventDefault();

    setTimestamp(Date.now());

    await uploadToIPFS();

    const tx = await blogNFTContract.methods
      .awardItem(ethAccount, ipfsHash, metadata)
      .send({
        from: ethAccount,
      });

    const name = firebase.auth().currentUser.displayName;
    firebase
      .firestore()
      .collection("sellers")
      .doc(name)
      .update({ NFTs: firebase.firestore.FieldValue.arrayUnion(ipfsHash) });
  };

  const get_nft = async (t) => {
    t.preventDefault();
    console.log("getting nft");

    const numOfNFT = await blogNFTContract.methods.balanceOf(ethAccount).call();
    console.log("number of nft: ", numOfNFT);

    for (var i = 0; i < parseInt(numOfNFT); i++) {
      const tokenID = await blogNFTContract.methods
        .tokenOfOwnerByIndex(ethAccount, i)
        .call();
      console.log(tokenID);
    }
  };

  const uploadToIPFS = async () => {
    const content = new Blob([author, title, url, timestamp]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    setIPFSHash(cid);
    setMetadata("ipfs://" + cid);
    setIPFSHash(0);
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
        <form className="form" onSubmit={mint_nft}>
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
      <div className="card">
        <br />
        <button onClick={get_nft}>See Your NFT</button>
      </div>
    </div>
  );
}