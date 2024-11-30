import { ethers } from "ethers";
import React, { useState } from "react";
import GameAssetsABI from "./GameAssetsABI.json"; // Export the ABI from the compiled contract

const GameAssets = () => {
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with deployed address

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());

      const gameAssetsContract = new ethers.Contract(
        contractAddress,
        GameAssetsABI,
        signer
      );
      setContract(gameAssetsContract);
      setConnected(true);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const createCurrency = async () => {
    const tx = await contract.createCurrency(address, 1000); // Example amount
    await tx.wait();
    alert("Currency created!");
  };

  const transferCurrency = async (to, amount) => {
    const tx = await contract.transferCurrency(to, amount);
    await tx.wait();
    alert("Currency transferred!");
  };

  // Add similar functions for NFTs (createAsset, transferAsset, etc.)

  return (
    <div>
      <h1>Game Assets</h1>
      {!connected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected as: {address}</p>
          <button onClick={createCurrency}>Create Currency</button>
          <button
            onClick={() =>
              transferCurrency("0xRecipientAddressHere", 500)
            }
          >
            Transfer Currency
          </button>
          {/* Add buttons for NFT operations */}
        </>
      )}
    </div>
  );
};

export default GameAssets;
