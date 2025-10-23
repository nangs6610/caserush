import hre from "hardhat";
import { ethers } from "ethers";
import fs from "fs";

async function main() {
  console.log("🚀 Deploying CaseRush Contract...\n");

  // Get RPC URL based on network
  let rpcUrl;
  if (hre.network.name === "bscTestnet") {
    rpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  } else if (hre.network.name === "bscMainnet") {
    rpcUrl = "https://bsc-dataseed1.binance.org/";
  } else {
    throw new Error(`Unsupported network: ${hre.network.name}`);
  }

  // Get deployer account from private key
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("📝 Deploying with account:", deployer.address);

  const balance = await provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "BNB\n");

  // Configuration
  const TEAM_WALLET = process.env.TEAM_WALLET_ADDRESS || deployer.address;
  const SERVER_SEED_HASH = process.env.SERVER_SEED_HASH || ethers.id("default-server-seed-change-this");

  console.log("⚙️  Configuration:");
  console.log("   Team Wallet:", TEAM_WALLET);
  console.log("   Server Seed Hash:", SERVER_SEED_HASH.slice(0, 20) + "...\n");

  // Deploy contract - read compiled contract
  const contractJson = JSON.parse(fs.readFileSync("./artifacts/contracts/CaseRush.sol/CaseRush.json", "utf8"));
  const ContractFactory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, deployer);

  console.log("🔨 Deploying contract...");
  const caseRush = await ContractFactory.deploy(TEAM_WALLET, SERVER_SEED_HASH);
  await caseRush.waitForDeployment();

  const contractAddress = await caseRush.getAddress();

  console.log("✅ CaseRush deployed to:", contractAddress);
  console.log("\n📋 Next steps:");
  console.log("1. Fund the contract with initial bankroll (recommended 50-75 BNB):");
  console.log(`   await caseRush.fundContract({ value: ethers.parseEther("50") })`);
  console.log("\n2. Verify contract on BscScan:");
  console.log(`   npx hardhat verify --network ${hre.network.name} ${contractAddress} "${TEAM_WALLET}" "${SERVER_SEED_HASH}"`);
  console.log("\n3. Update frontend with contract address and ABI");
  console.log("\n4. Test opening a case before going live!");

  // Get all items to verify configuration
  console.log("\n🎰 Verifying item configuration...");
  const allItems = await caseRush.getAllItems();
  console.log(`   Total items: ${allItems.length}`);

  let totalProb = 0;
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    totalProb += Number(item.probability);
    console.log(`   Item ${i + 1}: ${item.name} - ${ethers.formatEther(item.floorPrice)} BNB (${Number(item.probability)/100}%)`);
  }
  console.log(`   Total probability: ${totalProb}/10000 (${totalProb/100}%)`);

  if (totalProb !== 10000) {
    console.log("\n⚠️  WARNING: Probabilities don't sum to 100%!");
  } else {
    console.log("\n✅ Probabilities verified!");
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    teamWallet: TEAM_WALLET,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    blockNumber: await provider.getBlockNumber()
  };

  fs.writeFileSync(
    `deployment-${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`\n💾 Deployment info saved to deployment-${hre.network.name}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
