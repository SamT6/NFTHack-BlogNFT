pragma solidity ^0.6.0;

import "./BlogNFT.sol";

contract Marketplace {
    struct Trade {
	  address payable poster; //NFT owner
	  uint256 item; // NFT token ID
	  uint256 price; 
	  bytes32 status; // Open, Executed, Cancelled
	}

    mapping(uint256 => Trade) public trades;
    IERC721 public itemToken;
    uint256 public tradeCounter;

    constructor (address _itemTokenAddress) public {
	  itemToken = BlogNFT(_itemTokenAddress);
	  tradeCounter = 0;
	}

    function openTrade(uint256 _item, uint256 _price) public{
        itemToken.transferFrom(msg.sender, address(this), _item);
        trades[tradeCounter] = Trade({
            poster: msg.sender,
            item: _item,
            price: _price,
            status: "Open"
        });
        tradeCounter += 1;
        //emit TradeStatusChange(tradeCounter - 1, "Open");
    }

    function executeTrade(uint256 _trade) public payable{
        Trade memory trade = trades[_trade];
        require(trade.status == "Open", "Trade is not Open.");
        require(msg.value == trade.price, "not enough eth");
        trade.poster.transfer(trade.price);
        itemToken.transferFrom(address(this), msg.sender, trade.item);
        trades[_trade].status = "Executed";
       // emit TradeStatusChange(_trade, "Executed");
    }

    function cancelTrade(uint256 _trade) public{
        Trade memory trade = trades[_trade];
        require(
            msg.sender == trade.poster,
            "Trade can be cancelled only by poster."
        );
        require(trade.status == "Open", "Trade is not Open.");
        itemToken.transferFrom(address(this), trade.poster, trade.item);
        trades[_trade].status = "Cancelled";
        //emit TradeStatusChange(_trade, "Cancelled");
    }

    function getPrice(uint256 _trade) public returns (uint256) {
        return trades[_trade].price;
    }

}