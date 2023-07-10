"use client"
import Navbar from "../components/Navbar";
import Collections from "./components/Collections"

export default function LoanAgg() {
  
  return (
    <main className="min-h-screen items-center justify-between bg-[url(/background.png)]">
      <Navbar activePage={"loanAgg"} />
      <Collections />
    </main>
  );
}
