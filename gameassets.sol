// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameAssets is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Event to notify when a new asset is created
    event AssetCreated(uint256 tokenId, string tokenURI);

    // Constructor for initializing the ERC721 token with name and symbol
    constructor() ERC721("GameAsset", "GAM") {
        tokenCounter = 0;
    }

    // Mint a new game asset (NFT) with a metadata URI
    function createAsset(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);  // Mint NFT to the owner (only the contract owner can mint)
        _setTokenURI(newItemId, tokenURI); // Set metadata URI for the new asset
        tokenCounter += 1;

        emit AssetCreated(newItemId, tokenURI); // Emit event to notify frontend/public

        return newItemId;
    }

    // Transfer asset (NFT) between users (can be done by anyone who owns the NFT)
    function transferAsset(address to, uint256 tokenId) public {
        safeTransferFrom(msg.sender, to, tokenId);
    }

    // Function to get all the tokens owned by a given address
    function getOwnedTokens(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory ownedTokens = new uint256[](balance);
        
        for (uint256 i = 0; i < balance; i++) {
            ownedTokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return ownedTokens;
    }

    // Function to view token URI by tokenId
    function viewTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }
}