pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BlockNFTAuction {
    
    struct Auction {
         // Current owner of NFT
        address seller;
        // highest bidder's address
        address payable highestBidder;
        // Price (in wei) at beginning of auction
        uint128 startingPrice;
        // Price (in wei) at end of auction
        uint128 currentPrice;
        // Duration (in seconds) of auction
        uint64 duration;
        // Time when auction started
        // NOTE: 0 if this auction has been concluded
        uint64 startTime;
    }

    // Reference to contract tracking NFT ownership
    ERC721 public nonFungibleContract;

    // Map from token ID to their corresponding auction.
    mapping (uint256 => Auction) tokenIdToAuction;

    address payable owner;

    enum Status { pending, active, finished }


    constructor (address _itemTokenAddress) public {
	  nonFungibleContract = ERC721(_itemTokenAddress);
      owner = msg.sender;
	}

    function createAuction(uint256 tokenId, uint128 startingPrice, uint64 duration) public {         
        //check ownership
        require(nonFungibleContract.ownerOf(tokenId) == msg.sender);
        //escrow
        nonFungibleContract.transferFrom(msg.sender, address(this), tokenId);
        
        Auction memory auction = Auction({
            seller: msg.sender,
            highestBidder: address(0),
            startingPrice: startingPrice,
            currentPrice: startingPrice,
            duration: duration,
            startTime: uint64(now)
        });

        tokenIdToAuction[tokenId] = auction;
    }

    function cancelAuction(uint256 tokenId) public{
        require(getStatus(tokenId) == Status.active);
        Auction storage auction = tokenIdToAuction[tokenId];
        require(msg.sender == auction.seller);

        auction.duration = uint64(now) - auction.startTime;

        nonFungibleContract.transferFrom(address(this), msg.sender, tokenId);
        if(auction.highestBidder != address(0)){ //check it's not the first bidder
            auction.highestBidder.transfer(auction.currentPrice);
        }
    }

    function bid(uint256 tokenId, uint128 bidAmount) public payable{
        require(getStatus(tokenId) == Status.active);

        Auction storage auction = tokenIdToAuction[tokenId];
       
        // change to increment price later
        require(bidAmount > auction.currentPrice);

        require(msg.value == bidAmount);

        // payback the previous bidder
        if(auction.highestBidder != address(0)){ //check it's not the first bidder
            auction.highestBidder.transfer(auction.currentPrice);
        }
        
        auction.currentPrice = bidAmount;
        auction.highestBidder = msg.sender;
    }

    function getStatus(uint256 tokenId) public view returns (Status) {
        Auction storage auction = tokenIdToAuction[tokenId];
        if (now < auction.startTime) {
            return Status.pending;
        } else if (now < auction.startTime + auction.duration) {
            return Status.active;
        } else {
            return Status.finished;
        }
    }
    
    function claimPrize(uint256 tokenId) public {

        require(getStatus(tokenId) == Status.finished);

        Auction storage auction = tokenIdToAuction[tokenId];

        nonFungibleContract.transferFrom(address(this), msg.sender, tokenId);
        
        uint128 ownerCut = auction.currentPrice / 20;
        uint128 sellerCut = auction.currentPrice - ownerCut;
        
        auction.highestBidder.transfer(sellerCut);
        owner.transfer(ownerCut);
    }


}