import React, {useState} from 'react';
import Web3 from "web3";
import { MetaMaskButton } from 'rimble-ui';
import "./App.css";

import * as blogNFT from './contracts/BlogNFT.json'


const web3 = new Web3(Web3.givenProvider);

const blogNFT_address = "0x6874255928888fe6165FC83b9c209Ea57dE5B428"
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);


const App = () => {
  const [ethAccount, setEthAccount] = useState("");
  const [ipfsHash, setIPFSHash] = useState("");
  const [metadata, setMetadata] = useState("");


  const connect_metamask = async () => {
    const accounts = await window.ethereum.enable();
    setEthAccount(accounts[0]);
  } 

  const mint_nft = async (t) => {
    t.preventDefault()
    
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
          <label for="hash">IPFS Hash:</label>
          <input type="text" id="hash" onChange={(t)=>{setIPFSHash(t.target.value)}}/>
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