"use client"
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Links from './components/Links'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-[url(/background.png)]">
      <Navbar />

      <div className="flex justify-between w-full">
        <div>
          <Intro />
        </div>
        <div className="mt-auto mb-6">
          <Links />
        </div>
      </div>
    </main>
  )
}
