import './globals.css'
import Footer from '../../components/Footer/Footer'
import { Inter } from 'next/font/google'
import Navbar from '../../components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })
const API_KEY=process.env.API_TRACTV

export const metadata = {
  title: 'Tractv - By pranjalkv.com',
  description: 'Tractv a place where you can search , watch trailers for all movies and show around the world',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar API_KEY={API_KEY}></Navbar>
        {children}
              <Footer></Footer>
      </body>
    </html>
  )
}
