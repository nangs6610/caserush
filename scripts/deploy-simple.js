import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🚀 Deploying CaseRush Contract to BSC Testnet...\n");

  // BSC Testnet configuration
  const RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
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

  // Setup provider and wallet
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const deployer = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("📝 Deploying with account:", deployer.address);

  const balance = await provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "BNB\n");

  if (balance === 0n) {
    console.error("❌ Error: Account has no BNB. Get testnet BNB from https://testnet.bnbchain.org/faucet-smart");
    process.exit(1);
  }

  console.log("⚙️  Configuration:");
  console.log("   Team Wallet:", TEAM_WALLET);
  console.log("   Server Seed Hash:", SERVER_SEED_HASH.slice(0, 20) + "...\n");

  // Read compiled contract
  const contractJson = JSON.parse(
    fs.readFileSync("./artifacts/contracts/CaseRush.sol/CaseRush.json", "utf8")
  );

  const ContractFactory = new ethers.ContractFactory(
    contractJson.abi,
    contractJson.bytecode,
    deployer
  );

  console.log("🔨 Deploying contract... (this may take 30-60 seconds)");
  const caseRush = await ContractFactory.deploy(TEAM_WALLET, SERVER_SEED_HASH);

  console.log("⏳ Waiting for deployment confirmation...");
  await caseRush.waitForDeployment();

  const contractAddress = await caseRush.getAddress();

  console.log("\n✅ CaseRush deployed to:", contractAddress);
  console.log("\n📋 Next steps:");
  console.log("1. Fund the contract with initial bankroll (recommended 1-2 BNB for testing):");
  console.log(`   Send BNB directly to: ${contractAddress}`);
  console.log("\n2. Verify contract on BscScan:");
  console.log(`   https://testnet.bscscan.com/address/${contractAddress}`);
  console.log("\n3. Update frontend with contract address");
  console.log("\n4. Test opening a case before going live!");

  // Get all items to verify configuration
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

  if (totalProb !== 10000) {
    console.log("\n⚠️  WARNING: Probabilities don't sum to 100%!");
  } else {
    console.log("\n✅ Probabilities verified!");
  }

  // Save deployment info
  const deploymentInfo = {
    network: "bscTestnet",
    contractAddress: contractAddress,
    teamWallet: TEAM_WALLET,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await provider.getBlockNumber(),
  };

  fs.writeFileSync(
    "deployment-bscTestnet.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n💾 Deployment info saved to deployment-bscTestnet.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
