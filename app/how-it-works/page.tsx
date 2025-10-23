export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h1>
          <p className="text-text-muted text-lg">
            Everything you need to know about CaseRush
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Connect Wallet */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🔗</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  1. Connect Your Wallet
                </h2>
                <p className="text-text-muted leading-relaxed">
                  Click "Connect Wallet" in the header. We use Privy to support multiple
                  wallet types including MetaMask, Coinbase Wallet, WalletConnect, and
                  social logins (Google, Email). Your wallet must be on the BNB Smart Chain
                  network.
                </p>
              </div>
            </div>
          </div>

          {/* Open Cases */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">📦</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  2. Open the Rush Case
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  Each case costs 0.03 BNB. When you click "Open Case", you'll be prompted
                  to send the payment via your connected wallet. Once the transaction is
                  confirmed, the case will spin and reveal your item!
                </p>
                <p className="text-text-muted leading-relaxed">
                  The opening animation shows all possible items scrolling by. Your winning
                  item is determined by our provably fair system before the animation begins.
                </p>
              </div>
            </div>
          </div>

          {/* Odds & Rarities */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🎲</div>
              <div className="w-full">
                <h2 className="text-2xl font-bold text-white mb-3">
                  3. Odds & Rarities
                </h2>
                <p className="text-text-muted leading-relaxed mb-6">
                  Every case opening has transparent odds programmed directly into the smart
                  contract. Here's exactly what you can win:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700' }}></div>
                      <span className="text-white font-semibold">Legendary Knife (Karambit Fade)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">10 BNB</div>
                      <div className="text-xs text-text-muted">0.02% (1 in 5,000)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFD700' }}></div>
                      <span className="text-white font-semibold">Rare Knife (Butterfly Tiger Tooth)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">1 BNB</div>
                      <div className="text-xs text-text-muted">0.5% (1 in 200)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EB4B4B' }}></div>
                      <span className="text-white font-semibold">Covert Rifle (AK-47 Bloodsport)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">0.25 BNB</div>
                      <div className="text-xs text-text-muted">1.5% (1 in 67)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D32CE6' }}></div>
                      <span className="text-white font-semibold">Classified Rifle (M4A4 Neo-Noir)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">0.1 BNB</div>
                      <div className="text-xs text-text-muted">4% (1 in 25)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8847FF' }}></div>
                      <span className="text-white font-semibold">Restricted AWP (Chromatic Aberration)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">0.025 BNB</div>
                      <div className="text-xs text-text-muted">10% (1 in 10)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4B69FF' }}></div>
                      <span className="text-white font-semibold">Mil-Spec Pistol (Desert Eagle Night)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">0.005 BNB</div>
                      <div className="text-xs text-text-muted">24% (1 in 4)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B0C3D9' }}></div>
                      <span className="text-white font-semibold">Consumer Pistol (P250 Sand Dune)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-gold-bright font-bold">0.0005 BNB</div>
                      <div className="text-xs text-text-muted">59.98% (Most Common)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Contract Item Tracking */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🔍</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  4. How Item Tracking Works
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  When you open a case, the smart contract immediately sends you back a small
                  "identifier" transaction that tells you which item you won. This happens
                  automatically and instantly:
                </p>
                <div className="bg-background/50 rounded-lg p-4 border border-gold/20 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #1 (Legendary Knife):</span>
                      <span className="text-white font-mono">0.00001 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #2 (Rare Knife):</span>
                      <span className="text-white font-mono">0.00002 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #3 (Covert Rifle):</span>
                      <span className="text-white font-mono">0.00003 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #4 (Classified Rifle):</span>
                      <span className="text-white font-mono">0.00004 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #5 (Restricted AWP):</span>
                      <span className="text-white font-mono">0.00005 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #6 (Mil-Spec Pistol):</span>
                      <span className="text-white font-mono">0.00006 BNB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Item #7 (Consumer Pistol):</span>
                      <span className="text-white font-mono">0.00007 BNB</span>
                    </div>
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed">
                  Check your wallet's transaction history to see this identifier. The item is
                  also permanently recorded in the smart contract's inventory system, preventing
                  any fraud or disputes.
                </p>
              </div>
            </div>
          </div>

          {/* Inventory & Automated Selling */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">💰</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  5. Inventory & Instant Payouts
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  All items you win are stored on-chain in your inventory. View them anytime
                  by clicking your wallet address in the header, then selecting "Inventory".
                </p>
                <p className="text-text-muted leading-relaxed mb-4">
                  When you're ready to cash out, simply click "Sell Item" on any item in your
                  inventory. The smart contract will automatically and instantly send you the
                  item's floor price in BNB - no waiting, no manual processing required!
                </p>
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                  <p className="text-sm text-gold-bright font-semibold">
                    ⚡ 100% Automated: The contract verifies ownership and sends payment
                    instantly when you click "Sell Item". No human intervention needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Provably Fair */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🎲</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  6. Provably Fair System
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  CaseRush uses a provably fair randomness system to ensure every case opening
                  is completely random and cannot be manipulated by anyone - not even us.
                </p>
                <div className="space-y-3">
                  <div className="bg-background/50 rounded-lg p-4 border border-gold/20">
                    <div className="font-semibold text-white mb-2">How it works:</div>
                    <ul className="list-disc list-inside text-text-muted space-y-1 text-sm">
                      <li>Each opening combines your client seed + our server seed</li>
                      <li>The blockchain's blockhash adds additional randomness</li>
                      <li>A unique nonce ensures no two openings are identical</li>
                      <li>All of this is hashed together to determine your item</li>
                    </ul>
                  </div>
                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                    <p className="text-sm text-gold-bright font-semibold">
                      ✓ Every opening is recorded on-chain and can be verified by anyone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-card rounded-xl border border-gold/30 p-8">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🛡️</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Safety & Responsibility
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  CaseRush is entertainment for adults only (18+). Please gamble responsibly
                  and never spend more than you can afford to lose.
                </p>
                <ul className="list-disc list-inside text-text-muted space-y-2">
                  <li>All transactions are on-chain and verifiable</li>
                  <li>Odds are transparent and never manipulated</li>
                  <li>Your wallet keys are never stored or accessed by us</li>
                  <li>Set personal limits and take breaks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-gold to-gold-bright hover:from-gold-bright hover:to-gold text-black font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Start Opening Cases
          </a>
        </div>
      </div>
    </div>
  );
}
