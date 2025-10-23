import type { Metadata } from "next";
import "./globals.css";
import PrivyProviderWrapper from "@/components/PrivyProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CaseRush - Premium CS:GO Case Opening",
  description: "Open CS:GO cases with blockchain transparency. Premium case opening experience with provably fair results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <PrivyProviderWrapper>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}
