import './globals.css'
import { Poppins } from 'next/font/google'
import WalletContextProvider from "./components/WalletContextProvider";

const inter = Poppins({ subsets: ['latin'], weight: '300' })

export const metadata = {
  title: 'VR DAO',
  description: 'VR Hub and Analytics Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <WalletContextProvider >
        <body className={inter.className}>{children}</body>
      </WalletContextProvider>
    </html>
  )
}
