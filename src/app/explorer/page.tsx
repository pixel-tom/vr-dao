"use client"
import Navbar from '../components/Navbar'


export default function Explorer() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-[url(/background.png)]">
      <Navbar activePage={'explorer'} />
    </main>
  )
}