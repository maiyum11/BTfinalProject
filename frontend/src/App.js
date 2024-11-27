// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [playerAddress, setPlayerAddress] = useState('');

    // Function to create a game asset by calling the backend API
    const handleCreateAsset = async () => {
        try {
            const response = await axios.post('http://localhost:3000/createAsset', { player: playerAddress });
            alert(response.data.message);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Gaming Ecosystem</h1>
            <input
                type="text"
                placeholder="Enter Player Address"
                value={playerAddress}
                onChange={(e) => setPlayerAddress(e.target.value)}
            />
            <button onClick={handleCreateAsset}>Create Game Asset</button>
        </div>
    );
}

export default App;