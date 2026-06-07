import { fetchGitHubStats } from '@/lib/github';
import { PERSONAL } from '@/lib/data';
import StatsGrid from './StatsGrid';

function ErrorState() {
  return (
    <div className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-12 text-center max-w-md mx-auto">
      <div className="text-4xl mb-4">⏸</div>
      <div className="font-bebas text-2xl text-[#f5c518] tracking-wide mb-2">
        MATCH POSTPONED
      </div>
      <div className="font-inter text-white/50 text-sm">Stats unavailable — GitHub API unreachable</div>
    </div>
  );
}

export default async function SeasonStats() {
  let stats;
  try {
    stats = await fetchGitHubStats(PERSONAL.github);
  } catch {
    return (
      <section id="stats" className="py-20 bg-[#080f0a]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">SEASON STATS</h2>
            <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
              LIVE GITHUB PERFORMANCE DATA
            </p>
          </div>
          <ErrorState />
        </div>
      </section>
    );
  }

  return (
    <section id="stats" className="py-20 bg-[#080f0a]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Scoreboard header */}
        <div className="text-center mb-12">
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">SEASON STATS</h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            LIVE GITHUB PERFORMANCE DATA
          </p>
        </div>

        {/* Scoreboard bar */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-[#0d1f14] border border-[#ffffff18] rounded-xl px-6 py-4 mb-8 max-w-2xl mx-auto gap-4 sm:gap-0 divide-y sm:divide-y-0 divide-[#ffffff10]">
          <div className="text-center sm:text-left w-full sm:w-auto pt-0">
            <div className="font-bebas text-xs text-[#f5c518]/60 tracking-widest">PLAYER</div>
            <div className="font-bebas text-xl text-white tracking-wide">{PERSONAL.name.toUpperCase()}</div>
          </div>
          <div className="text-center w-full sm:w-auto py-2 sm:py-0">
            <div className="font-bebas text-xs text-[#f5c518]/60 tracking-widest">POSITION</div>
            <div className="font-bebas text-xl text-[#f5c518]">#{PERSONAL.jerseyNumber}</div>
          </div>
          <div className="text-center sm:text-right w-full sm:w-auto pb-0">
            <div className="font-bebas text-xs text-[#f5c518]/60 tracking-widest">SEASON</div>
            <div className="font-bebas text-xl text-white">
              {stats.proSince}–{new Date().getFullYear()}
            </div>
          </div>
        </div>

        <StatsGrid stats={stats} />
      </div>
    </section>
  );
}
