"use client"
import Navbar from '../components/Navbar';
import Popular from './components/Popular';




export default function Analytics() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-[url(/background.png)]">
      <Navbar />
      <div className="mt-10 p-0">
        <Popular />
      </div>
    </main>
  )
}