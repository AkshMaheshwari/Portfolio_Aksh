import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FormationBoard from '@/components/FormationBoard';
import Achievements from '@/components/Achievements';
import SeasonStats from '@/components/SeasonStats';
import Roster from '@/components/Roster';
import TransferTimeline from '@/components/TransferTimeline';
import Footer from '@/components/Footer';
import DugoutTerminal from '@/components/DugoutTerminal';
import GolazoEasterEgg from '@/components/GolazoEasterEgg';

// Pure-CSS bouncing ball — safe in server components, animations live in globals.css
function BallLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full" aria-hidden>
      <div className="ball-loader-ball" />
      <div className="ball-loader-shadow" />
      <span className="font-bebas tracking-[0.3em] text-[#f5c518]/50 text-sm mt-1">{label}</span>
    </div>
  );
}

function HonoursSkeleton() {
  return (
    <section id="honours" className="py-16 bg-[#080f0a]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-20 w-96 max-w-full bg-[#0d1f14] rounded mx-auto mb-4 skeleton-shimmer" />
          <div className="h-4 w-64 bg-[#0d1f14] rounded mx-auto skeleton-shimmer" />
        </div>
        <div className="h-48 bg-[#0d1f14] border border-[#ffffff10] rounded-2xl mb-8 max-w-3xl mx-auto skeleton-shimmer">
          <BallLoader label="Warming up" />
        </div>
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-[#0d1f14] border border-[#ffffff10] rounded-xl skeleton-shimmer" />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSkeleton() {
  return (
    <section id="stats" className="py-20 bg-[#080f0a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="h-16 w-80 max-w-full bg-[#0d1f14] rounded mx-auto mb-4 skeleton-shimmer" />
          <div className="h-4 w-48 bg-[#0d1f14] rounded mx-auto skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 skeleton-shimmer">
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
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">TRANSFER HISTORY</span>
      </div>

      <TransferTimeline />

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">SQUAD ROSTER</span>
      </div>

      <Roster />

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">HONOURS BOARD</span>
      </div>

      <Suspense fallback={<HonoursSkeleton />}>
        <Achievements />
      </Suspense>

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">SEASON STATS</span>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <SeasonStats />
      </Suspense>

      <div className="section-divider">
        <span className="text-[#f5c518] font-bebas tracking-widest text-sm">TACTICAL FORMATION</span>
      </div>

      <FormationBoard />

      <Footer />
      <DugoutTerminal />
      <GolazoEasterEgg />
    </main>
  );
}
