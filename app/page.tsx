import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FormationBoard from '@/components/FormationBoard';
import SeasonStats from '@/components/SeasonStats';
import Roster from '@/components/Roster';
import TransferTimeline from '@/components/TransferTimeline';
import Footer from '@/components/Footer';

function StatsSkeleton() {
  return (
    <section id="stats" className="py-20 bg-[#080f0a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-16 w-80 bg-[#0d1f14] rounded mx-auto mb-4 animate-pulse" />
          <div className="h-4 w-48 bg-[#0d1f14] rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 animate-pulse">
              <div className="h-8 w-16 bg-[#1a3a24] rounded mb-3" />
              <div className="h-12 w-24 bg-[#1a3a24] rounded mb-2" />
              <div className="h-4 w-32 bg-[#1a3a24] rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-pitch">
      <Navbar />
      <Hero />

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">4-3-3 FORMATION</span>
      </div>

      <FormationBoard />

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">SEASON STATS</span>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <SeasonStats />
      </Suspense>

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">SQUAD ROSTER</span>
      </div>

      <Roster />

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">TRANSFER HISTORY</span>
      </div>

      <TransferTimeline />

      <Footer />
    </main>
  );
}
