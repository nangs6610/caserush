# CaseRush - Asset Organization Guide

## 📁 Folder Structure

```
caserush/
├── public/
│   ├── images/
│   │   ├── case/
│   │   │   └── rush_case.png          ← PUT YOUR CASE IMAGE HERE
│   │   └── items/
│   │       ├── item_1.png             ← PUT ITEM IMAGES HERE
│   │       ├── item_2.png
│   │       └── ...
│   └── sounds/
│       ├── case_open.mp3              ← Case opening sound
│       ├── tick.mp3                   ← Ticking sound during spin
│       ├── win_common.mp3             ← Win sounds by rarity
│       ├── win_rare.mp3
│       ├── win_epic.mp3
│       ├── win_legendary.mp3
│       ├── button_click.mp3           ← UI click sound
│       └── reveal.mp3                 ← Final reveal sound
└── data/
    └── rush_case_items.json           ← ITEM DATA (see below)
```

## 🖼️ Image Guidelines

### Case Image (`public/images/case/rush_case.png`)
- **Size**: 512x512px or 1024x1024px
- **Format**: PNG with transparency
- **Style**: CS:GO case style (glossy, 3D render)

### Item Images (`public/images/items/`)
- **Naming**: Use descriptive names (e.g., `ak47_redline.png`, `awp_asiimov.png`)
- **Size**: 256x256px or 512x512px (consistent sizes)
- **Format**: PNG with transparency
- **Background**: Transparent or solid color

## 🔊 Sound File Guidelines

### Required Sounds:
1. **tick.mp3** - Short click/tick (plays rapidly during spin)
2. **reveal.mp3** - Final reveal sound when case stops
3. **win_common.mp3** - Gray/white rarity wins
4. **win_rare.mp3** - Blue rarity wins
5. **win_epic.mp3** - Purple rarity wins
6. **win_legendary.mp3** - Red/gold rarity wins
7. **button_click.mp3** - UI button clicks

### Format:
- **Type**: MP3 or WAV
- **Duration**: 0.1-2 seconds for most effects
- **Quality**: 128kbps+ for MP3

## 📊 Item Data File (`data/rush_case_items.json`)

This file defines all items in your Rush Case. Example structure:

```json
{
  "caseName": "Rush Case",
  "caseImage": "/images/case/rush_case.png",
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
    },
    {
      "id": 2,
      "name": "AWP | Asiimov",
      "weapon": "AWP",
      "skin": "Asiimov",
      "rarity": "covert",
      "image_url": "/images/items/awp_asiimov.png",
      "probability": 0.05,
      "floor_price": 85.00
    }
  ]
}
```

### Rarity Values (must match exactly):
- `consumer` - Gray/White
- `industrial` - Light Blue
- `mil-spec` - Blue
- `restricted` - Purple
- `classified` - Pink/Magenta
- `covert` - Red
- `special` - Gold (knives, gloves)

### Important Rules:
✅ All `probability` values must sum to **1.0** (100%)
✅ Use `/images/...` paths (relative to public folder)
✅ `floor_price` in USD
✅ Each item needs a unique `id`

## 🚀 Quick Start

1. **Add Case Image**:
   - Place your case image at `public/images/case/rush_case.png`

2. **Add Item Images**:
   - Place all skin images in `public/images/items/`
   - Name them clearly (e.g., `ak47_redline.png`)

3. **Add Sound Files**:
   - Place CS:GO sounds in `public/sounds/`
   - At minimum: `tick.mp3` and `reveal.mp3`

4. **Create Item Data**:
   - Edit `data/rush_case_items.json`
   - List all items with correct image paths
   - Ensure probabilities sum to 1.0

5. **Update Wallet Address**:
   - Open `.env.local`
   - Replace `YOUR_BNB_WALLET_ADDRESS_HERE` with your actual BNB wallet

## ✅ Validation

The app will automatically:
- Check if probabilities sum to ~1.0
- Display errors if images are missing
- Show warnings if sounds can't load

## 📝 Example Item Entry

```json
{
  "id": 5,
  "name": "M4A4 | Howl",
  "weapon": "M4A4",
  "skin": "Howl",
  "rarity": "covert",
  "image_url": "/images/items/m4a4_howl.png",
  "probability": 0.008,
  "floor_price": 4500.00
}
```

Good luck with CaseRush! 🎰
