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

const blogNFT_address = "0xe45e31b5cBF202cE58382D2e8D9daB4d482e5120";
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0x1B379913DbC82ee9801F9F2C3D11dEDd6Cb1cfa9";
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

  const [sellTokenID, setSellTokenID] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  const [nftOwnByEthAccount, setNFTOwnByEthAccount] = useState({});

  const connect_metamask = async () => {
    const accounts = await window.ethereum.enable();
    setEthAccount(accounts[0]);
  };

  const mint_nft = async (t) => {
    t.preventDefault();

    setTimestamp(Date.now());

    //await uploadToIPFS();
    const content = new Blob([author, title, url, timestamp]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    const tx = await blogNFTContract.methods
      .awardItem(ethAccount, cid, "ipfs://" + cid)
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
  };

  const uploadToIPFS = async () => {
    const content = new Blob([author, title, url, timestamp]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    setIPFSHash(cid);
    setMetadata("ipfs://" + cid);
    setIPFSHash(0);
  };

  const sellNFT = async () => {
    //give permission to move token to contract
    const tx = await blogNFTContract.methods
      .approve(marketplace_address, sellTokenID)
      .send({
        from: ethAccount,
      });

    //call opentrade on marketplace.sol
    tx = await marketplaceContract.methods
      .openTrade(sellTokenID, sellPrice)
      .send({
        from: ethAccount,
      });
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
        <form className="form" onSubmit={sellNFT}>
          <h3>Sell Blog NFT</h3>
          <button onClick={get_nft}>see your blogs</button>
          <br />
          <label for="tokenid">TokenID:</label>
          <input
            type="text"
            id="tokenid"
            onChange={(t) => {
              setSellTokenID(t.target.value);
            }}
          />
          <br />

          <label for="price">Price:</label>
          <input
            type="text"
            id="price"
            onChange={(t) => {
              setSellPrice(t.target.value);
            }}
          />
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
