// web3.js
const Web3 = require('web3');
require('dotenv').config(); // To load environment variables from .env file

const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL); // Directly pass the URL to the Web3 constructor


// Your contract ABI
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

// Your contract address (replace with the actual contract address)
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create a new contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to create a game asset
async function createGameAsset(playerAddress) {
    try {
        const account = process.env.OWNER_ADDRESS; // Your account
        const privateKey = process.env.PRIVATE_KEY; // Your private key for signing transactions
        
        const tx = contract.methods.createAsset(playerAddress);
        const gas = await tx.estimateGas({ from: account });
        const gasPrice = await web3.eth.getGasPrice();

        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(account);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data,
                gas,
                gasPrice,
                nonce,
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction successful with hash:', receipt.transactionHash);
    } catch (error) {
        console.error('Error creating asset:', error);
    }
}

// Example call
createGameAsset('0xPlayerAddress'); // Replace with actual player address

module.exports = {
    createGameAsset
};