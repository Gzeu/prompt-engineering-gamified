import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prompt Engineering Gamified - Learn Through Adventure',
  description: 'Master prompt engineering through an immersive gamified learning experience with XP, levels, quests, and community challenges.',
  keywords: 'prompt engineering, AI, machine learning, gamification, education, GPT, chatbots',
  authors: [{ name: 'Prompt Engineering Academy' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Prompt Engineering Gamified',
    description: 'Master prompt engineering through gamified learning',
    type: 'website',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Engineering Gamified Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Engineering Gamified',
    description: 'Master prompt engineering through gamified learning',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-gray-800 text-white border border-gray-700',
            }}
          />
        </Providers>
      </body>
    </html>
  )
}