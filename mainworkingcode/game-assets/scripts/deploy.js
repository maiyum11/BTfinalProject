const hre = require("hardhat");

async function main() {
  const GameAssets = await hre.ethers.getContractFactory("GameAssets");
  const gameAssets = await GameAssets.deploy();

  await gameAssets.deployed();
  console.log("GameAssets deployed to:", gameAssets.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
