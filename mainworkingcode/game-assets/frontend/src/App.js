import './App.css';
import React, { useState } from "react";
import GameAssetsABI from "./GameAssetsABI.json";
const { ethers } = require("ethers");

const App = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [connected, setConnected] = useState(false);
  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with your deployed contract address

  const connectToContract = async () => {
    try {
      if (!address || !privateKey) {
        alert("Please provide both an address and private key to connect.");
        return;
      }
      const newProvider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const wallet = new ethers.Wallet(privateKey, newProvider);
      const gameAssetsContract = new ethers.Contract(contractAddress, GameAssetsABI, wallet);

      setProvider(newProvider);
      setContract(gameAssetsContract);
      setConnected(true);
      alert("Connected successfully!");
    } catch (error) {
      console.error(error);
      alert("Error connecting to contract. Please check your input.");
    }
  };

  const handleCreateCurrency = async () => {
    try {
      const recipient = prompt("Enter recipient address:");
      const amount = prompt("Enter amount to create:");
      if (!recipient || !amount) {
        alert("Both recipient address and amount are required.");
        return;
      }
      const tx = await contract.createCurrency(recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Currency created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating currency. Please try again.");
    }
  };

  const handleTransferCurrency = async () => {
    try {
      const recipient = prompt("Enter recipient address:");
      const amount = prompt("Enter amount to transfer:");
      if (!recipient || !amount) {
        alert("Both recipient address and amount are required.");
        return;
      }
      const tx = await contract.transferCurrency(recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Currency transferred successfully!");
    } catch (error) {
      console.error(error);
      alert("Error transferring currency. Please try again.");
    }
  };

  const handleCreateAsset = async () => {
    try {
      const recipient = prompt("Enter recipient address:");
      const uri = prompt("Enter URI for the asset:");
      if (!recipient || !uri) {
        alert("Both recipient address and URI are required.");
        return;
      }
      const tx = await contract.createAsset(recipient, uri);
      const receipt = await tx.wait();
      alert(`Asset created successfully! Asset ID: ${receipt.events[0].args.assetId.toString()}`);
    } catch (error) {
      console.error(error);
      alert("Error creating asset. Please try again.");
    }
  };

  const handleTransferAsset = async () => {
    try {
      const assetId = prompt("Enter Asset ID to transfer:");
      const recipient = prompt("Enter recipient address:");
      if (!assetId || !recipient) {
        alert("Both Asset ID and recipient address are required.");
        return;
      }
      const tx = await contract.transferAsset(recipient, assetId);
      await tx.wait();
      alert("Asset transferred successfully!");
    } catch (error) {
      console.error(error);
      alert("Error transferring asset. Please try again.");
    }
  };

  const handleGetBalance = async () => {
    try {
      const account = prompt("Enter account address to check balance:");
      if (!account) {
        alert("Account address is required.");
        return;
      }
      const balance = await contract.balances(account);
      alert(`Balance: ${ethers.utils.formatUnits(balance, 18)} tokens`);
    } catch (error) {
      console.error(error);
      alert("Error fetching balance. Please try again.");
    }
  };

  const handleGetOwnedAssets = async () => {
    try {
      const account = prompt("Enter account address to fetch owned assets:");
      if (!account) {
        alert("Account address is required.");
        return;
      }
      const assets = await contract.getOwnedAssets(account);
      alert(`Owned Assets: ${assets.join(", ")}`);
    } catch (error) {
      console.error(error);
      alert("Error fetching owned assets. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Game Assets Management</h1>
      {!connected ? (
        <div className="connect-section">
          <h2 className="sub-header">Connect to Contract</h2>
          <input
            className="input-field"
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Enter private key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <button className="button connect-button" onClick={connectToContract}>
            Connect
          </button>
        </div>
      ) : (
        <div className="functions-section">
          <h2 className="sub-header">Contract Functions</h2>
          <button className="button" onClick={handleCreateCurrency}>
            Create Currency
          </button>
          <button className="button" onClick={handleTransferCurrency}>
            Transfer Currency
          </button>
          <button className="button" onClick={handleCreateAsset}>
            Create Asset
          </button>
          <button className="button" onClick={handleTransferAsset}>
            Transfer Asset
          </button>
          <button className="button" onClick={handleGetBalance}>
            Get Balance
          </button>
          <button className="button" onClick={handleGetOwnedAssets}>
            Get Owned Assets
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
