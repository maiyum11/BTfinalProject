const express = require('express');
const { createGameAsset, transferAsset } = require('./web3');
const app = express();
const PORT = 3000;

app.use(express.json());

//endpt to mint a new game asset nfts
app.post('/createAsset', async (req, res) => {
    try {
        await createGameAsset();
        res.status(200).json({ message: 'Game asset created successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//endpt to transfer asset (trade between players)
app.post('/transferAsset', async (req, res) => {
    const { from, to, tokenId } = req.body;
    try {
        await transferAsset(from, to, tokenId);
        res.status(200).json({ message: 'Asset transferred successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});