'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { login, logout, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [showInventory, setShowInventory] = useState(false);

  const address = wallets[0]?.address;
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-gold/30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center h-44 gap-12">
          {/* Left Navigation - Inventory */}
          <Link
            href="/inventory"
            className="hidden md:block hover:opacity-90 transition-all transform hover:scale-105"
          >
            <Image
              src="/images/inventory/inventorylogotransparent.png"
              alt="Inventory"
              width={600}
              height={180}
              className="h-[144px] w-auto"
              priority
            />
          </Link>

          {/* Center Logo */}
          <Link href="/" className="flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/logo/caserushlogotransparent.png"
              alt="CaseRush"
              width={600}
              height={180}
              className="h-[144px] w-auto hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Right Navigation - How It Works */}
          <Link
            href="/how-it-works"
            className="hidden md:block hover:opacity-90 transition-all transform hover:scale-105"
          >
            <Image
              src="/images/howitworkslogo/howitworkslogo.png"
              alt="How It Works"
              width={600}
              height={180}
              className="h-[144px] w-auto"
              priority
            />
          </Link>

          {/* Wallet Connect / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {authenticated ? (
              <div className="relative flex items-center gap-3">
                {/* Wallet address inside blank key image */}
                <button
                  onClick={() => setShowInventory(!showInventory)}
                  className="relative hover:opacity-90 transition-all transform hover:scale-105"
                >
                  <Image
                    src="/images/connectwalletlogo/blank.png"
                    alt="Connected"
                    width={600}
                    height={180}
                    className="h-[144px] w-auto"
                  />
                  {/* Overlay wallet address on the key */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-success shadow-lg shadow-success/50 animate-pulse"></div>
                      <span className="text-sm font-bold text-white drop-shadow-lg">{shortAddress}</span>
                    </div>
                  </div>
                </button>

                {/* Powered by Privy logo */}
                <Image
                  src="/images/connectwalletlogo/privylogo.png"
                  alt="Powered by Privy"
                  width={100}
                  height={100}
                  className="h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />

                {showInventory && (
                  <div className="absolute right-0 mt-3 w-52 bg-card/95 backdrop-blur-xl border border-gold/40 rounded-xl shadow-2xl p-2" style={{ top: '100%' }}>
                    <Link
                      href="/inventory"
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-gold/10 rounded-lg transition-colors text-white"
                      onClick={() => setShowInventory(false)}
                    >
                      Inventory
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowInventory(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-error/10 rounded-lg transition-colors text-error"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={login}
                  className="hover:opacity-90 transition-all transform hover:scale-105"
                >
                  <Image
                    src="/images/connectwalletlogo/connectwalletlogo.png"
                    alt="Connect Wallet"
                    width={600}
                    height={180}
                    className="h-[144px] w-auto"
                    priority
                  />
                </button>

                {/* Powered by Privy logo */}
                <Image
                  src="/images/connectwalletlogo/privylogo.png"
                  alt="Powered by Privy"
                  width={100}
                  height={100}
                  className="h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gold/30 bg-background/95 backdrop-blur-xl">
        {/* Mobile Logo */}
        <div className="flex justify-center py-4 border-b border-gold/20">
          <Link href="/">
            <Image
              src="/images/logo/caserushlogotransparent.png"
              alt="CaseRush"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile Nav */}
        <nav className="flex items-center justify-around py-4">
          <Link
            href="/inventory"
            className="text-sm text-white hover:text-gold-bright transition-all font-semibold tracking-wide"
          >
            Inventory
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm text-white hover:text-gold-bright transition-all font-semibold tracking-wide"
          >
            How It Works
          </Link>
        </nav>
      </div>
    </header>
  );
}
