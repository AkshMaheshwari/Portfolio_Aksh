import { fetchCodeforcesStats, fetchLeetCodeStats } from '@/lib/competitive';
import AchievementsDisplay from './AchievementsDisplay';

export default async function Achievements() {
  const [cf, lc] = await Promise.allSettled([
    fetchCodeforcesStats('aksh.maheshwari05'),
    fetchLeetCodeStats('aksh_m'),
  ]);

  return (
    <section id="honours" className="py-16 bg-[#080f0a]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">
            HONOURS BOARD
          </h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            COMPETITIVE PROGRAMMING DISTINCTIONS
          </p>
        </div>

        <AchievementsDisplay
          cf={cf.status === 'fulfilled' ? cf.value : null}
          lc={lc.status === 'fulfilled' ? lc.value : null}
        />
      </div>
    </section>
  );
}
