import Web3 from "web3";
import * as blogNFT from './contracts/BlogNFT.json'
import * as marketplace from './contracts/Marketplace.json'
import { NFTStorage, Blob } from 'nft.storage'



const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8NDU1MTc5MTEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE4ODM4OTgxMiwibmFtZSI6ImRlZmF1bHQifQ.ugTHkSIEBhS9Olsikjh_vuX2nB8x-R8t_ghAv4rYm5g';
const client = new NFTStorage({ token: apiKey })


const web3 = new Web3(Web3.givenProvider);

const blogNFT_address = "0x7733e0C4359863a4253A202cB405D3b0fBd95B17"
const blogNFTContract = new web3.eth.Contract(blogNFT.abi, blogNFT_address);

const marketplace_address = "0x91e28C4368A18e612F8D2ecA54BF4005d5889Ef2"
const marketplaceContract = new web3.eth.Contract(marketplace.abi, marketplace_address);




  const connect_metamask = async () => {
    await window.ethereum.enable();
  } 

  const mint_nft = async (ethAccount, author, title, url) => {
    const timestamp = Date.now()
    const content = new Blob([author, title, url, timestamp]);
    const cid = await client.storeBlob(content);
    console.log(cid);

    const ipfsHash = cid
    const metadata = "ipfs://" + cid
    
    const tx = await blogNFTContract.methods.awardItem(ethAccount, ipfsHash, metadata).send({
      from: ethAccount
    })
  }

  const get_nft = async (ethAccount) => {
    console.log('getting nft');

    const numOfNFT = await blogNFTContract.methods.balanceOf(ethAccount).call();
    console.log("number of nft: ", numOfNFT);

    for(var i = 0; i < parseInt(numOfNFT); i++) {
      const tokenID = await blogNFTContract.methods.tokenOfOwnerByIndex(ethAccount, i).call();
      console.log(tokenID);
    }    
  }

  const sellNFT = async (ethAccount, marketplace_address, sellTokenID, sellTokenID, sellPrice) => {
    //give permission to moove token to contract
    const tx = await blogNFTContract.methods.approve(marketplace_address, sellTokenID).send({
      from: ethAccount
    })

    //call opentrade on marketplace.sol
    const tx = await marketplaceContract.methods.openTrade(sellTokenID, sellPrice).send({
      from: ethAccount
    })
  }



  const cancelSellNFT = async (ethAccount, tradeID) => {
    const tx = await marketplaceContract.methods.cancelTrade(tradeID).send({
      from: ethAccount
    })
  }



  const buyNFT = async (ethAccount, buyTradeID) => {
    const tokenPrice = await marketplaceContract.methods.executeTrade(buyTradeID).call()

    const tx = await marketplaceContract.methods.executeTrade(buyTradeID).send({
      from: ethAccount
    })
  }



  const addOwner = async (ethAccount, new_owner_address) => {
    const tx = await blogNFTContract.methods.addOwner(new_owner_address).send({
      from: ethAccount
    })
  }



  const addCreator = async (ethAccount, new_creator_address) => {
    const tx = await blogNFTContract.methods.addCreator(new_creator_address).send({
      from: ethAccount
    })
  }

export default {connect_metamask, mint_nft, get_nft, sellNFT, cancelSellNFT, buyNFT, addOwner, addCreator};