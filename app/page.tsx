'use client'

import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Worlds } from '@/components/landing/Worlds'
import { Stats } from '@/components/landing/Stats'
import { CTA } from '@/components/landing/CTA'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
      <Navigation />
      <Hero />
      <Features />
      <Worlds />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}