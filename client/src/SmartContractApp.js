import React, {useState} from 'react';
import Web3 from "web3";
import { MetaMaskButton } from 'rimble-ui';
import * as blogNFT from './contracts/BlogNFT.json'
import * as marketplace from './contracts/Marketplace.json'
import "./App.css";
import { NFTStorage, Blob } from 'nft.storage'


const axios = require("axios");
const FormData = require("form-data");


const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8NDU1MTc5MTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE4ODM4OTgxMiwibmFtZSI6ImRlZmF1bHQifQ.ugTHkSIEBhS9Olsikjh_vuX2nB8x-R8t_ghAv4rYm5g';
const client = new NFTStorage({ token: apiKey })


const web3 = new Web3(Web3.givenProvider);

const blogNFT_address = "0x5468401B345fBEba98782E0346858d5A6E26AfC7"
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0xbF1636FDAdB0F0a004dAb78417e8AcAa2011589a"
const marketplaceContract = new web3.eth.Contract(marketplace.abi, marketplace_address);


const App = () => {
  const [ethAccount, setEthAccount] = useState("");
  const [metadata, setMetadata] = useState("");

  const [ipfsHash, setIPFSHash] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(0);

  const [sellTokenID, setSellTokenID] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);

  const [tradeID, setTradeID] = useState(0);

  const [buyTradeID, setBuyTradeID] = useState(0);



  const connect_metamask = async () => {
    const accounts = await window.ethereum.enable();
    setEthAccount(accounts[0]);
  } 

  const mint_nft = async (t) => {
    t.preventDefault()

    setTimestamp(Date.now())

    await uploadToIPFS();
    
    const tx = await blogNFTContract.methods.awardItem(ethAccount, ipfsHash, metadata).send({
      from: ethAccount
    })

  }

  const get_nft = async (t) => {
    t.preventDefault()
    console.log('getting nft');

    const numOfNFT = await blogNFTContract.methods.balanceOf(ethAccount).call();
    console.log("number of nft: ", numOfNFT);

    for(var i = 0; i < parseInt(numOfNFT); i++) {
      const tokenID = await blogNFTContract.methods.tokenOfOwnerByIndex(ethAccount, i).call();
      console.log(tokenID);
    }    
  }

  const uploadToIPFS = async () => {
    const content = new Blob([author, title, url, timestamp]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    setIPFSHash(cid);
    setMetadata("ipfs://" + cid);
    setIPFSHash(0);
  }

  const sellNFT = async () => {
    //give permission to moove token to contract
    const tx = await blogNFTContract.methods.approve(marketplace_address, sellTokenID).send({
      from: ethAccount
    })

    //call opentrade on marketplace.sol
    const tx = await marketplaceContract.methods.openTrade(sellTokenID, sellPrice).send({
      from: ethAccount
    })
  }

  const cancelSellNFT = async () => {
    const tx = await marketplaceContract.methods.cancelTrade(tradeID).send({
      from: ethAccount
    })
  }

  const buyNFT = async () => {
    const tokenPrice = await marketplaceContract.methods.executeTrade(buyTradeID).call()

    const tx = await marketplaceContract.methods.executeTrade(buyTradeID).send({
      from: ethAccount
    })
  }

  const addOwner = async () => {
    const tx = await blogNFTContract.methods.addOwner("new_owner_address").send({
      from: ethAccount
    })
  }

  const addCreator = async () => {
    const tx = await blogNFTContract.methods.addCreator("new_creator_address").send({
      from: ethAccount
    })
  }



  return(
    <div className="main">
      <div className="card">
          <h1>BlogNFT</h1>
          <p>address: {ethAccount}</p>
          <MetaMaskButton onClick={connect_metamask}>Connect with MetaMask</MetaMaskButton> 
      </div>
      <div className="card">
        <form className="form" onSubmit={mint_nft}>
          <h3>Mint NFT</h3>
          {/* <label for="hash">IPFS Hash:</label> */}
          {/* <input type="text" id="hash" onChange={(t)=>{setIPFSHash(t.target.value)}}/> */}
          <label for="author">Name of Author:</label>
          <input type="text" id="author" onChange={(t)=>{setAuthor(t.target.value)}}/>
          <br/>

          <label for="title">Title:</label>
          <input type="text" id="title" onChange={(t)=>{setTitle(t.target.value)}}/>
          <br/>

          <label for="url">URL:</label>
          <input type="text" id="url" onChange={(t)=>{setUrl(t.target.value)}}/>
          <br/>

          <label for="amount">Metadata URI:</label>
          <input type="text" id="amount" onChange={(t)=>{setMetadata(t.target.value)}}/>
          <br/>
          <button className="button">submit</button>
        </form>
      </div> 
      <div className="card">
        <br/>
        <button onClick={get_nft}>See Your NFT</button>
      </div> 
    </div>
  );

}


export default App;