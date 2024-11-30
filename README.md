# Blockchain Final Project

This Project aims to provide a demo of how Blockchain technologies can be used in Gaming Ecosystems


## Group Members:
- Victor Fang (100778219)
- Mariam Shahnawaz (100839322)
- Munirahmed Patel (100830549)

## Technologies Used:
- Hardhat: for compiling, deploying, and testing the smart contract.
- Nodejs: to deploy the smart contract to a local web browser.
- npm: to manage dependencies.

**Setup the Project**
1. Run the following commands in the project directory:
   - npm install hardhat
   - npm install @nomiclabs/hardhat-ethers ethers
   - npm install react react-dom
   - npm install dotenv

2. Prepare Smart Contract and Deploy it in the "game-assets" Directory:
   - npx hardhat clear (to clear the previous compiler)
   - npx hardhat node (to start hardhat node for the local network)
   - npx hardhat run scripts/deploy.js --network localhost (to deploy the smart contract using a script)
  
3. Start NodeJS:
   - npm start

# Work Distribution:
We aimed to distribute the coding part as fairly as possible, with everyone working with each other. The tasks can be divided into:
- Brainstorming (33.3% split among everyone)
- Developing the Smart Contract "GameAssets.sol" (Munir 40% -> Mariam 30% -> Victor 30%)
- Deploying the Smart Contract using Hardhat (Mariam 50% -> Munir 20% -> Victor 30%)
- Deploying the Contract to NodeJS and Implementing a UI (Victor 45% -> Mariam 20% -> Munir 35%

