import React, {useState} from 'react';
import Web3 from "web3";
import { MetaMaskButton } from 'rimble-ui';
import * as blogNFT from '../contracts/BlogNFT.json'
import * as marketplace from '../contracts/Marketplace.json'

const axios = require("axios");
const FormData = require("form-data");



const pinataApiKey = "8d8803ba03e16bd87221";
const pinataSecretApiKey = "fbec8fd8657e371c66f04d8cb2f42c8ffddceb6d165135d9b05144a4827b1ddd";



const web3 = new Web3(Web3.givenProvider);

const blogNFT_address = "0x7733e0C4359863a4253A202cB405D3b0fBd95B17"
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0x91e28C4368A18e612F8D2ecA54BF4005d5889Ef2"
const marketplaceContract = new web3.eth.Contract(marketplace.abi, marketplace_address);


export default function Sell() {
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
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    let data = new FormData();
    data.append("author", author );
    data.append("title", title);
    data.append("url", url);
    data.append("timestamp", timestamp);
    const res = await axios.post(url, data, {
        maxContentLength: "Infinity", 
        headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey, 
        pinata_secret_api_key: pinataSecretApiKey,
        },
    });
    console.log(res.data);

    setIPFSHash(res.data.IpfsHash);
};

  return(
    <div >
      <div className="card">
          <h2>We're excited to help you sell your NFTs!</h2>
          {/* <p>address: {ethAccount}</p>
          <MetaMaskButton onClick={connect_metamask}>Connect with MetaMask</MetaMaskButton>  */}
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

          <label for="url">Blog Post URL:</label>
          <input type="text" id="url" onChange={(t)=>{setUrl(t.target.value)}}/>
          <br/>
{/* 
          <label for="amount">Metadata URI:</label>
          <input type="text" id="amount" onChange={(t)=>{setMetadata(t.target.value)}}/> */}
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

