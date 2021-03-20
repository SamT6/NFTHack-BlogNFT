pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract BlogNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;
    mapping(address => bool) creators;
    mapping(address => bool) owners;

    constructor() public ERC721("BlogNFT", "BLOG") {
        owners[msg.sender] = true;
        creators[msg.sender] = true;
    }

    function addOwner(address new_owner_address) public {
        require(owners[msg.sender] == true, "not a owner");
        owners[new_owner_address] = true;
        creators[new_owner_address] = true;
    }

    function addCreator(address new_creator_address) public {
        require(owners[msg.sender] == true, "not a owner");
        creators[new_creator_address] = true;
    }

    function awardItem(address recipient, string memory hash, string memory metadata) public returns (uint256){
        require(creators[msg.sender] == true, "not a creator");
        require(hashes[hash] != 1); //check hash doesn't already exist
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadata);
        return newItemId;
    }
}