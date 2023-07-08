"use client";
import Navbar from "../components/Navbar";
import NftPortfolio from "./components/NftPortfolio";
import Pfp from "./components/Pfp";
import SplPortfolio from "./components/SplPortfolio";

export default function Treasury() {
  return (
    <main className="min-h-screen items-center justify-between bg-[url(/background.png)]">
      <Navbar />
      <div className="mx-24 mt-8">
        <Pfp />
      </div>
      <div className="flex flex-row w-5/6 mt-12 mx-auto">
        <div className="w-2/5">
          <SplPortfolio />
        </div>
        <div className="w-3/5">
          <NftPortfolio />
        </div>
        
      </div>
    </main>
  );
}
