import dotenv from "dotenv";
dotenv.config({ path: ".env" });

console.log("📋 To verify your contract on BSCScan Testnet:");
console.log("\n1. Go to: https://testnet.bscscan.com/address/0x2750D11eB5b9507134dd5d872F03FaAC41529C9b#code");
console.log("\n2. Click 'Verify and Publish'");
console.log("\n3. Enter these details:");
console.log("   - Compiler Type: Solidity (Single file)");
console.log("   - Compiler Version: v0.8.20+commit.a1b79de6");
console.log("   - Open Source License Type: MIT");
console.log("\n4. Paste your contract code from contracts/CaseRush.sol");
console.log("\n5. Constructor Arguments (ABI-encoded):");
console.log("   Team Wallet:", process.env.TEAM_WALLET_ADDRESS);
console.log("   Server Seed Hash:", process.env.SERVER_SEED_HASH);
console.log("\nOr run: npx hardhat verify --network bscTestnet 0x2750D11eB5b9507134dd5d872F03FaAC41529C9b \"" + process.env.TEAM_WALLET_ADDRESS + "\" \"" + process.env.SERVER_SEED_HASH + "\"");
