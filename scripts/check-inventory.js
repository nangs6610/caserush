import { ethers } from "ethers";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env.local" });

async function main() {
  const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const USER_ADDRESS = "0xEFB44a2c882234e311b05Efad587FA85E9B3e259"; // Replace with your wallet

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contractJson = JSON.parse(
    fs.readFileSync("./artifacts/contracts/CaseRush.sol/CaseRush.json", "utf8")
  );

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractJson.abi,
    provider
  );

  console.log("📦 Checking inventory for:", USER_ADDRESS);
  console.log("📍 Contract:", CONTRACT_ADDRESS);

  const inventory = await contract.getUserInventory(USER_ADDRESS);

  console.log("\n📋 Inventory Items:");
  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    console.log(`\n--- Item ${i} ---`);
    console.log("Item ID:", item.itemId.toString());
    console.log("Timestamp:", new Date(Number(item.timestamp) * 1000).toLocaleString());
    console.log("Block Number:", item.blockNumber.toString());
    console.log("Redeemed:", item.redeemed);

    // Get item details
    const itemDetails = await contract.getItem(item.itemId);
    console.log("Name:", itemDetails.name);
    console.log("Floor Price:", ethers.formatEther(itemDetails.floorPrice), "BNB");
  }

  const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
  console.log("\n💰 Contract Balance:", ethers.formatEther(contractBalance), "BNB");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
