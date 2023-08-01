import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./styles.css";


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Car Hub',
  description: 'The Best Car in the World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
        </body>
    </html>
  )
}
