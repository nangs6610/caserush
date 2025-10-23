# CaseRush Mainnet Deployment Checklist

## ⚠️ WARNING: MAINNET = REAL MONEY
Deploying to mainnet means using REAL BNB. Double-check everything!

---

## Pre-Deployment Checklist

- [ ] Tested all features on testnet
- [ ] Contract has correct odds (verified)
- [ ] Team wallet address is correct
- [ ] Have 0.1 BNB for deployment
- [ ] Have 50-100 BNB to fund contract
- [ ] Legal compliance reviewed
- [ ] Terms of service ready

---

## Step 1: Deploy Contract to BSC Mainnet

1. Make sure you have real BNB in your wallet
2. Run deployment:
   ```bash
   node scripts/deploy-simple.js
   ```
   **Note:** The script will automatically use BSC Mainnet if you're on the right network

3. Save the contract address from deployment output

---

## Step 2: Fund the Contract

Send 50-100 BNB to your deployed contract address to enable payouts.

Recommended starting bankroll calculation:
- 10 BNB jackpot × 2 = 20 BNB reserve
- 1 BNB prize × 10 = 10 BNB reserve
- 0.25 BNB prize × 20 = 5 BNB reserve
- Buffer for other prizes = 15 BNB
- **Total: 50 BNB minimum**

---

## Step 3: Update Frontend Configuration

Update `.env.local`:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=YOUR_MAINNET_CONTRACT_ADDRESS
NEXT_PUBLIC_CHAIN_ID=56
NEXT_PUBLIC_DEMO_MODE=false
```

---

## Step 4: Test on Mainnet

1. Open a case with 0.03 BNB (REAL MONEY!)
2. Verify you receive the identifier back
3. Check inventory loads correctly
4. Sell an item and verify payout works

---

## Step 5: Monitor

- Watch contract balance: https://bscscan.com/address/YOUR_CONTRACT
- Monitor transactions
- Ensure bankroll stays healthy

---

## Emergency Contacts

- Contract on BSC Testnet: 0x2750D11eB5b9507134dd5d872F03FaAC41529C9b
- Contract on BSC Mainnet: [TO BE FILLED]
- Team Wallet: [YOUR TEAM WALLET]

---

## Reverting to Testnet

If you need to go back to testnet:
1. Update `.env.local`:
   - NEXT_PUBLIC_CHAIN_ID=97
   - NEXT_PUBLIC_CONTRACT_ADDRESS=[testnet contract]
2. Restart dev server
