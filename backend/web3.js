const Web3 = require('web3'); // Only declare Web3 once
require('dotenv').config(); // Load environment variables from .env file

// Initialize Web3 with the Infura URL from the .env file
const web3 = new Web3(process.env.INFURA_URL);

// Contract ABI 
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "createAsset",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Load contract and account details from environment variables
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const account = process.env.OWNER_ADDRESS;
const privateKey = process.env.PRIVATE_KEY;

// Mint a new game asset (NFT)
async function createGameAsset() {
    try {
        const tx = contract.methods.createAsset();
        const gas = await tx.estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account);

        const signedTx = await web3.eth.accounts.signTransaction(
            { to: contractAddress, data, gas, gasPrice, nonce },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Game asset created! Transaction hash:', receipt.transactionHash);
    } catch (error) {
        console.error('Error creating asset:', error);
    }
}

// Transfer an asset (NFT) between players
async function transferAsset(from, to, tokenId) {
    try {
        const tx = contract.methods.transferAsset(from, to, tokenId);
        const gas = await tx.estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account);

        const signedTx = await web3.eth.accounts.signTransaction(
            { to: contractAddress, data, gas, gasPrice, nonce },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Asset transferred! Transaction hash:', receipt.transactionHash);
    } catch (error) {
        console.error('Error transferring asset:', error);
    }
}

module.exports = { createGameAsset, transferAsset };