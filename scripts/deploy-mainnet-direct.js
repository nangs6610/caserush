import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

async function main() {
  console.log("\n🚨 DEPLOYING TO BSC MAINNET 🚨\n");

  // Connect to BSC Mainnet
  const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  console.log("📝 Deployer:", wallet.address);

  const balance = await provider.getBalance(wallet.address);
  console.log("💰 Balance:", ethers.formatEther(balance), "BNB\n");

  // Load contract
  const contractJson = JSON.parse(
    fs.readFileSync("./artifacts/contracts/CaseRush.sol/CaseRush.json", "utf8")
  );

  console.log("🚀 Deploying contract...");
  const startTime = Date.now();

  const CaseRush = new ethers.ContractFactory(
    contractJson.abi,
    contractJson.bytecode,
    wallet
  );

  const teamWallet = process.env.TEAM_WALLET_ADDRESS || wallet.address;
  const serverSeedHash = process.env.SERVER_SEED_HASH;

  const contract = await CaseRush.deploy(teamWallet, serverSeedHash, {
    gasLimit: 5000000,
  });

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  const deployTime = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log(`\n✅ CONTRACT DEPLOYED SUCCESSFULLY!\n`);
  console.log("📍 Contract Address:", contractAddress);
  console.log("⏱️  Deploy Time:", deployTime, "seconds");
  console.log("🌐 Network: BSC Mainnet (56)");
  console.log("👛 Team Wallet:", teamWallet);
  console.log("\n🔗 View on BscScan:");
  console.log(`   https://bscscan.com/address/${contractAddress}\n`);

  // Save deployment info
  const deploymentInfo = {
    network: "bscMainnet",
    chainId: 56,
    contractAddress: contractAddress,
    teamWallet: teamWallet,
    deployedAt: new Date().toISOString(),
    deployer: wallet.address,
    txHash: contract.deploymentTransaction().hash,
  };

  fs.writeFileSync(
    "deployment-bscMainnet.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("💾 Deployment info saved to deployment-bscMainnet.json\n");

  // Verify odds
  console.log("🎲 Verifying case odds...");
  const totalOdds = await contract.totalOdds();
  console.log("   Total odds:", totalOdds.toString(), "/", (10000).toString());
  console.log("   Expected return: 62.7%");
  console.log("   House edge: 37.3%\n");

  console.log("⚠️  NEXT STEPS:");
  console.log("1. Fund the contract with 50-100 BNB for payouts");
  console.log(`   Send BNB to: ${contractAddress}`);
  console.log("2. Update .env.local with:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  console.log(`   NEXT_PUBLIC_CHAIN_ID=56`);
  console.log(`   NEXT_PUBLIC_RPC_URL=https://bsc-dataseed.binance.org/`);
  console.log("3. Deploy website to Vercel");
  console.log("4. Test with small amounts first!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error.message);
    process.exit(1);
  });
