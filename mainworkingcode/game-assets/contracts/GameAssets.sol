// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title GameAssets: A simplified ERC721-like NFT and ERC20-based game currency/token contract.

contract GameAssets {
    // NFT Structure
    struct Asset {
        uint256 id;
        string uri; // Metadata URI
        address owner;
    }

    // Create in-game balances 
    mapping(address => uint256) public balances;

    // NFT Storage
    uint256 private _assetCounter;
    mapping(uint256 => Asset) private _assets;
    mapping(address => uint256[]) private _ownedAssets;

    // Ownership address
    address public owner;

    // Events
    event AssetCreated(address indexed to, uint256 indexed assetId, string uri);
    event AssetTransferred(address indexed from, address indexed to, uint256 indexed assetId);
    event CurrencyCreated(address indexed to, uint256 amount);
    event CurrencyTransferred(address indexed from, address indexed to, uint256 amount);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this method!");
        _;
    }

    modifier ownsAsset(address account, uint256 assetId) {
        require(_assets[assetId].owner == account, "Only the owner can call this asset!");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    // Create in-game currency
    function createCurrency(address to, uint256 amount) public onlyOwner {
        balances[to] += amount;
        emit CurrencyCreated(to, amount);
    }

    // Transfer in-game currency
    function transferCurrency(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit CurrencyTransferred(msg.sender, to, amount);
    }

    // Create an in-game NFT asset
    function createAsset(address to, string memory uri) public onlyOwner returns (uint256) {
        _assetCounter++;
        uint256 newAssetId = _assetCounter;

        Asset memory newAsset = Asset({
            id: newAssetId,
            uri: uri,
            owner: to
        });

        _assets[newAssetId] = newAsset;
        _ownedAssets[to].push(newAssetId);

        emit AssetCreated(to, newAssetId, uri);
        return newAssetId;
    }

    // Transfer an in-game NFT asset
    function transferAsset(address to, uint256 assetId) public ownsAsset(msg.sender, assetId) {
        address currentOwner = _assets[assetId].owner;
        require(currentOwner != to, "Cannot transfer to the same address");

        // Remove asset from current owner's list
        _removeOwnedAsset(currentOwner, assetId);

        // Transfer ownership
        _assets[assetId].owner = to;
        _ownedAssets[to].push(assetId);

        emit AssetTransferred(currentOwner, to, assetId);
    }

    // View details of an asset
    function getAsset(uint256 assetId) public view returns (uint256, string memory, address) {
        Asset memory asset = _assets[assetId];
        return (asset.id, asset.uri, asset.owner);
    }

    // View all assets owned by an address
    function getOwnedAssets(address account) public view returns (uint256[] memory) {
        return _ownedAssets[account];
    }

    // Internal function to remove an asset from an owner's list
    function _removeOwnedAsset(address account, uint256 assetId) internal {
        uint256[] storage assets = _ownedAssets[account];
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i] == assetId) {
                assets[i] = assets[assets.length - 1]; // Replace with the last asset
                assets.pop(); // Remove the last element
                break;
            }
        }
    }
}