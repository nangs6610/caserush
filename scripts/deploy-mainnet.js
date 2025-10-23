import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config({ path: ".env" });

// Create readline interface for user confirmation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log("🚨 BSC MAINNET DEPLOYMENT 🚨\n");
  console.log("⚠️  WARNING: You are about to deploy to MAINNET with REAL BNB!\n");

  const RPC_URL = "https://bsc-dataseed1.binance.org/";
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const TEAM_WALLET = process.env.TEAM_WALLET_ADDRESS;
  const SERVER_SEED_HASH = process.env.SERVER_SEED_HASH;

  if (!PRIVATE_KEY || PRIVATE_KEY === "YOUR_PRIVATE_KEY_HERE") {
    console.error("❌ Error: PRIVATE_KEY not set in .env file");
    process.exit(1);
  }

  if (!TEAM_WALLET || TEAM_WALLET === "YOUR_TEAM_WALLET_ADDRESS_HERE") {
    console.error("❌ Error: TEAM_WALLET_ADDRESS not set in .env file");
    process.exit(1);
  }

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("📝 Deploying with account:", deployer.address);

  const balance = await provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "BNB");

  if (balance < ethers.parseEther("0.1")) {
    console.error("\n❌ Insufficient BNB for deployment!");
    console.error("   You need at least 0.1 BNB for gas fees.");
    process.exit(1);
  }

  console.log("\n⚙️  Configuration:");
  console.log("   Network: BSC MAINNET (Chain ID: 56)");
  console.log("   Team Wallet:", TEAM_WALLET);
  console.log("   Server Seed Hash:", SERVER_SEED_HASH.slice(0, 20) + "...");

  console.log("\n💸 Estimated Costs:");
  console.log("   Deployment gas: ~0.01 BNB (~$6)");
  console.log("   Contract bankroll needed: 50-100 BNB ($30,000-$60,000)");

  const answer1 = await question("\n❓ Have you tested everything on testnet? (yes/no): ");
  if (answer1.toLowerCase() !== "yes") {
    console.log("\n🛑 Please test on testnet first!");
    rl.close();
    process.exit(0);
  }

  const answer2 = await question("\n❓ Do you have 50-100 BNB ready to fund the contract? (yes/no): ");
  if (answer2.toLowerCase() !== "yes") {
    console.log("\n🛑 Get the bankroll ready before deploying!");
    rl.close();
    process.exit(0);
  }

  const answer3 = await question("\n❓ Type 'DEPLOY TO MAINNET' to confirm: ");
  if (answer3 !== "DEPLOY TO MAINNET") {
    console.log("\n🛑 Deployment cancelled.");
    rl.close();
    process.exit(0);
  }

  rl.close();

  console.log("\n🔨 Deploying contract to BSC MAINNET...");

  const contractJson = JSON.parse(
    fs.readFileSync("./artifacts/contracts/CaseRush.sol/CaseRush.json", "utf8")
  );

  const ContractFactory = new ethers.ContractFactory(
    contractJson.abi,
    contractJson.bytecode,
    deployer
  );

  console.log("⏳ Sending deployment transaction...");
  const caseRush = await ContractFactory.deploy(TEAM_WALLET, SERVER_SEED_HASH);

  console.log("⏳ Waiting for confirmation...");
  await caseRush.waitForDeployment();

  const contractAddress = await caseRush.getAddress();

  console.log("\n✅ CaseRush deployed to MAINNET!");
  console.log("📍 Contract Address:", contractAddress);
  console.log("🔍 View on BscScan: https://bscscan.com/address/" + contractAddress);

  // Verify configuration
  console.log("\n🎰 Verifying item configuration...");
  const allItems = await caseRush.getAllItems();
  console.log(`   Total items: ${allItems.length}`);

  let totalProb = 0;
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    totalProb += Number(item.probability);
    console.log(
      `   Item ${i + 1}: ${item.name} - ${ethers.formatEther(item.floorPrice)} BNB (${
        Number(item.probability) / 100
      }%)`
    );
  }
  console.log(`   Total probability: ${totalProb}/10000 (${totalProb / 100}%)`);

  if (totalProb === 10000) {
    console.log("\n✅ Probabilities verified!");
  }

  // Save deployment info
  const deploymentInfo = {
    network: "bscMainnet",
    chainId: 56,
    contractAddress: contractAddress,
    teamWallet: TEAM_WALLET,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await provider.getBlockNumber(),
  };

  fs.writeFileSync(
    "deployment-mainnet.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n💾 Deployment info saved to deployment-mainnet.json");

  console.log("\n📋 NEXT STEPS:");
  console.log("1. Fund the contract:");
  console.log(`   Send 50-100 BNB to: ${contractAddress}`);
  console.log("\n2. Update .env.local:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("   NEXT_PUBLIC_CHAIN_ID=56");
  console.log("   NEXT_PUBLIC_DEMO_MODE=false");
  console.log("\n3. Restart your dev server");
  console.log("\n4. Test with small amount first!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
