'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from './components/sidebar';

import { usePathname } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col md:flex-row">
          {path === '/' ? '' : <Sidebar />}          
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}
