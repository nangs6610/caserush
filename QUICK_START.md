# 🚀 CaseRush - Quick Start Guide

Your website is **LIVE and RUNNING** at: **http://localhost:3000**

## ✅ What's Already Done

The entire website is built and functional! Here's what works:

1. **Black + Gold Theme** - Sleek, premium CS:GO aesthetic
2. **Wallet Connection** - Privy integration with your App ID
3. **Case Opening Animation** - CS:GO-style horizontal reel
4. **Payment System** - 0.03 BNB per case (demo mode enabled)
5. **Inventory** - Stores won items with sell button
6. **Leaderboard** - Real-time wins feed
7. **How It Works** - Complete guide page
8. **Fully Responsive** - Mobile, tablet, desktop

## 📋 Your Checklist

### Right Now (To Test):
- [ ] Open http://localhost:3000
- [ ] Click around and explore the UI
- [ ] Connect a wallet (works in demo mode)
- [ ] Open a case to see the animation

### Before Launch:
- [ ] **Add case image** → `public/images/case/rush_case.png`
- [ ] **Add item images** → `public/images/items/` (name them clearly)
- [ ] **Edit case items** → `data/rush_case_items.json` (add your actual skins)
- [ ] **Add sound files** → `public/sounds/` (tick.mp3, reveal.mp3, etc.)
- [ ] **Set wallet address** → `.env.local` (replace YOUR_BNB_WALLET_ADDRESS_HERE)
- [ ] **Register domain** → caserush.gg (seems available!)
- [ ] **Test on mobile** → Responsive design needs real device testing

## 🎨 Adding Your Content

### 1. Case Image (Priority: HIGH)

```
Location: public/images/case/rush_case.png
Size: 512x512px or larger
Format: PNG with transparency
Style: CS:GO case style (glossy, 3D)
```

**Tip:** Use AI image generators (Midjourney, DALL-E) with prompt:
"3D rendered CS:GO weapon case, glossy metallic surface, gold accents, transparent background"

### 2. Item Images (Priority: HIGH)

```
Location: public/images/items/
Files: ak47_redline.png, awp_asiimov.png, etc.
Size: 256x256px (consistent)
Format: PNG with transparency
```

**Where to get CS:GO skin images:**
- Steam Community Market (screenshot items)
- CS:GO wiki sites
- CSGOFloat, Buff163 (they have item images)
- Or use placeholders with rarity colors for now

### 3. Case Items Data (Priority: HIGH)

Edit `data/rush_case_items.json`:

**CRITICAL:** Probabilities MUST sum to 1.0!

Example for a balanced case:
```json
{
  "items": [
    {"probability": 0.40, "rarity": "consumer", ...},    // 40% chance
    {"probability": 0.25, "rarity": "industrial", ...},  // 25% chance
    {"probability": 0.15, "rarity": "mil-spec", ...},    // 15% chance
    {"probability": 0.10, "rarity": "restricted", ...},  // 10% chance
    {"probability": 0.06, "rarity": "classified", ...},  //  6% chance
    {"probability": 0.03, "rarity": "covert", ...},      //  3% chance
    {"probability": 0.01, "rarity": "special", ...}      //  1% chance (knife!)
  ]
}
```

### 4. Sound Files (Priority: MEDIUM)

```
public/sounds/tick.mp3        - Rapid click during spin (0.1s)
public/sounds/reveal.mp3      - Final reveal (1-2s)
public/sounds/win_common.mp3  - Low rarity win
public/sounds/win_rare.mp3    - Mid rarity win
public/sounds/win_epic.mp3    - High rarity win
public/sounds/win_legendary.mp3 - Knife/special win
```

**Option 1:** Extract from CS:GO game files (if you own it)
**Option 2:** Find free alternatives on Freesound.org, Zapsplat
**Option 3:** I can help you locate specific CS:GO sound files

## 🔐 Setting Up Real Payments

Currently in **DEMO MODE** (no real money):

1. Get your BNB wallet address (from MetaMask, Trust Wallet, etc.)
2. Open `.env.local`
3. Replace: `NEXT_PUBLIC_TEAM_WALLET_ADDRESS=0xYourAddressHere`
4. Change: `NEXT_PUBLIC_DEMO_MODE=false`
5. **Test on BNB testnet first!**

## 🎵 About the Sounds

You mentioned wanting the **exact CS:GO case opening sounds**. Here's what to know:

**The Sounds You Want:**
1. **Tick sound** - The rapid "click-click-click" as items scroll
2. **Reveal sound** - The final "whoosh" when it stops
3. **Win sounds** - Different sounds for different rarity tiers

**Legal Note:**
- Official CS:GO sounds are copyrighted by Valve
- Many case sites use them anyway (gray area)
- Safer option: Use "sound-alike" effects

**Where I Can Help:**
- I can guide you to extract sounds from CS:GO files if you own the game
- I can find free alternatives that sound similar
- Let me know which approach you prefer

## 🐛 Troubleshooting

### "Module not found" errors:
```bash
cd caserush
npm install
```

### Page won't load:
- Check if server is running: http://localhost:3000
- Look for errors in terminal
- Check browser console (F12)

### Wallet won't connect:
- Make sure you're using a supported wallet (MetaMask, Coinbase, etc.)
- Check if wallet is on BNB Smart Chain
- Try refreshing the page

### Images not showing:
- File paths must start with `/images/...`
- Check file names match exactly (case-sensitive)
- Clear browser cache (Ctrl+Shift+R)

## 📱 Social Media Setup

Since you wanted to set up Twitter first:

**Twitter Handle Suggestions:**
- @CaseRush
- @CaseRushGG
- @PlayCaseRush

**First Tweet Ideas:**
- "🎰 CaseRush is coming soon. Premium CS:GO case opening with blockchain transparency. 0.03 BNB per case. Provably fair. Are you ready? 🔥"
- Include a teaser screenshot (I can help generate one)
- Use hashtags: #CSGO #CS2 #CaseOpening #Web3Gaming

## 🚀 Next Steps

1. **Today:** Add placeholder images and test the full flow
2. **This Week:** Get real CS:GO skin images and data
3. **Next Week:** Add sounds, polish UI, test on mobile
4. **Before Launch:** Legal review, set up domain, test payments on testnet

## 📞 Need Help?

**Common requests:**
- "Help me find CS:GO skin images" → I can guide you
- "Help me configure the case items" → I can walk through it
- "The animation doesn't look right" → I can adjust it
- "I want to change the theme colors" → Edit `app/globals.css`

Just ask! I'm here to help get CaseRush launched successfully.

---

**Your website is ready to go. Now it's time to add your content!** 🎉

Visit: **http://localhost:3000**
