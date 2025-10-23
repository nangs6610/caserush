# CaseRush - CS:GO Case Opening Website

A premium CS:GO case opening website built with Next.js, featuring blockchain wallet integration via Privy, CS:GO-style animations, and BNB payments.

## 🚀 Current Status

✅ **FULLY FUNCTIONAL** - The website is complete and running!

- **Local URL**: http://localhost:3000
- **Status**: Development server running
- **Demo Mode**: Enabled (no real payments required)

## 📁 Project Structure

```
caserush/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Main Rush page (case opening)
│   ├── inventory/                # Inventory page
│   ├── leaderboard/              # Leaderboard page
│   ├── how-it-works/             # How it works page
│   ├── layout.tsx                # Root layout with Privy
│   └── globals.css               # Global styles (black + gold theme)
├── components/                   # React components
│   ├── Header.tsx                # Navigation & wallet connect
│   ├── Footer.tsx                # Footer
│   ├── CaseOpening.tsx           # CS:GO-style case opening animation
│   ├── ItemGrid.tsx              # Grid showing all case items
│   └── PrivyProviderWrapper.tsx  # Privy wallet provider
├── lib/                          # Utility functions
│   └── caseData.ts               # Case data loading & roll logic
├── types/                        # TypeScript types
│   └── index.ts                  # Item, Case, Inventory types
├── public/                       # Static assets
│   ├── images/
│   │   ├── case/                 # ← PUT YOUR CASE IMAGE HERE
│   │   └── items/                # ← PUT YOUR ITEM IMAGES HERE
│   └── sounds/                   # ← PUT YOUR SOUND FILES HERE
├── data/                         # Case data
│   └── rush_case_items.json      # ← EDIT YOUR CASE ITEMS HERE
├── .env.local                    # Environment variables
└── ASSETS_README.md              # Detailed asset organization guide
```

## 🎯 What You Need to Do Next

### 1. Add Your Team Wallet Address

Open `.env.local` and replace the placeholder:

```bash
NEXT_PUBLIC_TEAM_WALLET_ADDRESS=YOUR_ACTUAL_BNB_WALLET_ADDRESS
```

This is where the 0.03 BNB payments will be sent.

### 2. Add Case & Item Images

**Case Image:**
- File: `public/images/case/rush_case.png`
- Size: 512x512px or 1024x1024px
- Format: PNG with transparency

**Item Images:**
- Folder: `public/images/items/`
- Naming: `item_name.png` (e.g., `ak47_redline.png`)
- Size: 256x256px or 512x512px
- Format: PNG with transparency

### 3. Configure Your Case Items

Edit `data/rush_case_items.json`:

```json
{
  "caseName": "Rush Case",
  "caseImage": "/images/case/rush_case.png",
  "caseDescription": "Your description here",
  "items": [
    {
      "id": 1,
      "name": "AK-47 | Redline",
      "weapon": "AK-47",
      "skin": "Redline",
      "rarity": "classified",
      "image_url": "/images/items/ak47_redline.png",
      "probability": 0.15,
      "floor_price": 12.50
    }
    // Add more items...
  ]
}
```

**Important:**
- All `probability` values must sum to **1.0** (100%)
- Use exact rarity values: `consumer`, `industrial`, `mil-spec`, `restricted`, `classified`, `covert`, `special`

### 4. Add Sound Files (Optional but Recommended)

Place these files in `public/sounds/`:

- `tick.mp3` - Rapid clicking sound during spin
- `reveal.mp3` - Final reveal sound
- `win_common.mp3` - Gray/white rarity wins
- `win_rare.mp3` - Blue rarity wins
- `win_epic.mp3` - Purple rarity wins
- `win_legendary.mp3` - Red/gold rarity wins

**Where to find CS:GO sounds:**
- Extract from CS:GO game files
- Use sound-alike effects from Freesound.org, Zapsplat, etc.
- I can help you locate specific sound files if needed

### 5. Test the Website

1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Connect any wallet (MetaMask, Coinbase, etc.)
4. Click "Open Case" - since demo mode is ON, no payment required
5. Watch the CS:GO-style animation
6. Check your Inventory and Leaderboard

## 🎨 Features Implemented

✅ **Black + Gold Theme** - Premium dark theme with gold accents
✅ **Privy Wallet Integration** - Connect with MetaMask, Coinbase, WalletConnect, Google, Email
✅ **CS:GO-Style Animation** - Horizontal reel with smooth easing and rarity colors
✅ **BNB Payment Flow** - 0.03 BNB per case (currently in demo mode)
✅ **Inventory System** - Stores all won items locally
✅ **Sell Button** - Shows processing message (1-2 hours)
✅ **Leaderboard** - Real-time wins feed with stats
✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **How It Works Page** - Complete user guide

## 🔧 Development Commands

```bash
# Start development server (already running!)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install new packages
npm install package-name
```

## 🌐 Switching to Production Mode

When you're ready to accept real BNB payments:

1. Set your team wallet address in `.env.local`
2. Change demo mode: `NEXT_PUBLIC_DEMO_MODE=false`
3. Test on BNB testnet first
4. Deploy to production (Vercel, Netlify, etc.)

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel: https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_PRIVY_APP_ID`
   - `NEXT_PUBLIC_TEAM_WALLET_ADDRESS`
   - `NEXT_PUBLIC_DEMO_MODE`
   - `NEXT_PUBLIC_CASE_PRICE_BNB`
5. Deploy!

Domain: caserush.gg should be available - register it!

## ⚠️ Legal Considerations

This type of site may be considered gambling in many jurisdictions:

- Require age verification (18+)
- Display clear odds and disclaimers
- Consider gambling licenses for your target regions
- Block users from restricted countries
- Implement responsible gambling features
- Consult with a lawyer before launching

## 🛠️ Customization

### Change Theme Colors

Edit `app/globals.css`:

```css
:root {
  --gold: #C9A227;        /* Your color */
  --gold-bright: #F2C94C; /* Your color */
  --background: #0B0C0E;  /* Your color */
  /* etc... */
}
```

### Change Case Price

Edit `.env.local`:

```bash
NEXT_PUBLIC_CASE_PRICE_BNB=0.05  # Change to your price
```

### Add More Cases

Currently supports one case. To add more:
1. Create additional JSON files in `data/`
2. Update the UI to show case selection
3. Modify `lib/caseData.ts` to load multiple cases

## 📞 Support

If you need help:
1. Check `ASSETS_README.md` for asset organization
2. Review error messages in browser console (F12)
3. Ensure all file paths are correct
4. Verify JSON probabilities sum to 1.0

## 🎉 You're Ready!

The website is **fully functional** and waiting for your content:
1. Add case image
2. Add item images
3. Configure items in JSON
4. Add sound files
5. Set your wallet address
6. Launch!

Good luck with **CaseRush**! 🎰
