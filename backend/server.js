const express = require('express');
const Web3 = require('web3');
require('dotenv').config();
const contract = require('./web3'); // Importing web3 contract interactions

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/createAsset', async (req, res) => {
    const { player } = req.body;
    try {
        await contract.createGameAsset(player);
        res.status(200).json({ message: 'Game asset created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});