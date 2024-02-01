import { Inter } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ['latin'] })
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Binary Money Management',
  description: 'Optimize your binary trading profits with effective money management strategies. Qutox Money Management app provides comprehensive tools for successful trading.',
  keywords: 'money management, binary trading, financial planning, trading strategies, investment, risk management',
  author: 'Manohar Bhadu',
  url: 'https://mngmny.vercel.app/',
  siteName: 'Binary Money Management', 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
