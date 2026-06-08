'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CFStats, LCStats } from '@/lib/competitive';

let uclAudio: HTMLAudioElement | null = null;

function playUCLAnthem() {
  if (!uclAudio) {
    uclAudio = new Audio('/ucl-anthem.mp3');
    uclAudio.volume = 0.75;
  }
  uclAudio.currentTime = 0;
  uclAudio.play().catch(() => {});
}

interface Props {
  cf: CFStats | null;
  lc: LCStats | null;
}

// Dark-mode friendly Codeforces tier colours
function cfColor(rating: number): string {
  if (rating >= 2400) return '#ef4444';
  if (rating >= 2100) return '#f97316';
  if (rating >= 1900) return '#a855f7';
  if (rating >= 1600) return '#3b82f6';
  if (rating >= 1400) return '#22d3ee';
  if (rating >= 1200) return '#22c55e';
  return '#9ca3af';
}

function cfTierLabel(rank: string): string {
  return rank.replace(/\b\w/g, (c) => c.toUpperCase());
}

// 3★ CodeChef = blue
const CC_COLOR = '#3b82f6';
const CC_RATING: number = 1605;
const CC_STARS: number = 3;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, type: 'spring' as const, stiffness: 80, damping: 16 },
});

function PlatformUnavailable({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-2">
      <div className="text-3xl">⏸</div>
      <div className="font-bebas text-[#f5c518] tracking-widest text-lg">MATCH POSTPONED</div>
      <div className="text-white/40 text-xs font-inter">{name} data unavailable</div>
    </div>
  );
}

export default function AchievementsDisplay({ cf, lc }: Props) {
  const cfCol = cf ? cfColor(cf.rating) : '#9ca3af';
  const cfPct = cf ? Math.min((cf.rating / 2800) * 100, 100) : 0;
  const lcMax = lc ? Math.max(lc.easySolved, lc.mediumSolved, 1) : 1;

  const [trophyClicks, setTrophyClicks] = useState(0);
  const [anthemPlaying, setAnthemPlaying] = useState(false);

  const handleTrophyClick = useCallback(() => {
    const next = trophyClicks + 1;
    setTrophyClicks(next);
    if (next >= 3) {
      setTrophyClicks(0);
      setAnthemPlaying(true);
      playUCLAnthem();
      setTimeout(() => {
        setAnthemPlaying(false);
        uclAudio?.pause();
        if (uclAudio) uclAudio.currentTime = 0;
      }, 3500);
    }
  }, [trophyClicks]);

  return (
    <div className="space-y-8">

      {/* ── ICPC Trophy Card ─────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(0)}
        className="relative overflow-hidden rounded-2xl border border-[#f5c518]/50 bg-gradient-to-br from-[#f5c518]/10 via-[#0d1f14] to-[#0a1a10] p-8 max-w-3xl mx-auto"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#f5c518]/8 blur-3xl" />
        </div>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Trophy icon — click 3× for UCL anthem */}
          <div
            onClick={handleTrophyClick}
            className={`relative flex-shrink-0 w-20 h-20 rounded-2xl border-2 flex items-center justify-center text-4xl cursor-pointer select-none transition-all duration-300 ${
              anthemPlaying
                ? 'border-[#f5c518] bg-[#f5c518]/25 shadow-[0_0_32px_rgba(245,197,24,0.5)]'
                : 'border-[#f5c518]/60 bg-[#f5c518]/10 hover:border-[#f5c518]/90 hover:bg-[#f5c518]/20'
            }`}
          >
            <span className={anthemPlaying ? 'animate-bounce' : ''}>🏆</span>
          </div>

          {/* Champions toast */}
          <AnimatePresence>
            {anthemPlaying && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute top-2 left-2 bg-[#0d1f14] border border-[#f5c518]/60 rounded-lg px-3 py-1.5 pointer-events-none shadow-xl"
              >
                <span className="font-bebas text-[#f5c518] tracking-widest text-sm">🎺 THE CHAMPIONS</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              
            </div>
            <div className="font-bebas text-3xl md:text-4xl text-white tracking-wide leading-none mb-1">
              ICPC ASIA WEST REGIONALS
            </div>
            <div className="font-inter text-white/50 text-sm mb-4">
              International Collegiate Programming Contest
            </div>

            <div className="flex flex-wrap gap-6">
              <div>
                <div className="font-bebas text-5xl text-[#f5c518] leading-none">#251</div>
                <div className="text-white/40 text-xs font-mono mt-0.5">ALL INDIA RANK</div>
              </div>
              <div className="self-end pb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f5c518] animate-pulse" />
                  <span className="text-[#f5c518]/80 text-sm font-inter">
                    Top collegiate CP competition in Asia Pacific
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Platform Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Codeforces */}
        <motion.div
          {...fadeUp(0.1)}
          className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 flex flex-col hover:border-[#ffffff30] transition-colors"
        >
          {cf ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] text-white/40 tracking-widest">CODEFORCES</div>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
                  style={{
                    color: cfCol,
                    background: cfCol + '20',
                    border: `1px solid ${cfCol}50`,
                  }}
                >
                  {cfTierLabel(cf.rank)}
                </span>
              </div>

              {/* Rating */}
              <div className="mb-1">
                <span className="font-bebas leading-none" style={{ fontSize: 56, color: cfCol }}>
                  {cf.rating}
                </span>
              </div>
              <div className="text-white/40 text-xs font-mono mb-4">CURRENT RATING</div>

              {/* Rating progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1">
                  <span>0</span>
                  <span>1200</span>
                  <span>1600</span>
                  <span>2400</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: cfCol }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cfPct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
                {/* Tier boundary markers */}
                <div className="relative h-0">
                  {[1200, 1400, 1600, 1900, 2100, 2400].map((t) => (
                    <div
                      key={t}
                      className="absolute top-0 w-px h-2 bg-white/20"
                      style={{ left: `${(t / 2800) * 100}%`, transform: 'translateY(-8px)' }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-3 border-t border-[#ffffff10] flex items-center justify-between">
                <div className="text-white/40 text-xs font-inter">
                  Peak <span className="font-mono" style={{ color: cfCol }}>{cf.maxRating}</span>
                </div>
                <div className="text-white/30 text-xs font-mono">@{cf.handle}</div>
              </div>
            </>
          ) : (
            <PlatformUnavailable name="Codeforces" />
          )}
        </motion.div>

        {/* CodeChef */}
        <motion.div
          {...fadeUp(0.2)}
          className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 flex flex-col hover:border-[#ffffff30] transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-mono text-[10px] text-white/40 tracking-widest">CODECHEF</div>
            <span
              className="px-2 py-0.5 rounded text-xs font-mono font-semibold"
              style={{
                color: CC_COLOR,
                background: CC_COLOR + '20',
                border: `1px solid ${CC_COLOR}50`,
              }}
            >
              DIV {CC_STARS === 1 ? 4 : CC_STARS === 2 ? 3 : CC_STARS === 3 ? 3 : CC_STARS === 4 ? 2 : 1}
            </span>
          </div>

          {/* Rating */}
          <div className="mb-1">
            <span className="font-bebas leading-none" style={{ fontSize: 56, color: CC_COLOR }}>
              {CC_RATING}
            </span>
          </div>
          <div className="text-white/40 text-xs font-mono mb-4">CURRENT RATING</div>

          {/* Stars */}
          <div className="flex gap-1.5 mb-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="text-xl"
                style={{ color: i < CC_STARS ? CC_COLOR : 'rgba(255,255,255,0.12)' }}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-white/40 text-xs font-mono mb-4">{CC_STARS} STAR RATED</div>

          {/* Rating bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[10px] font-mono text-white/30 mb-1">
              <span>0</span>
              <span>1600</span>
              <span>2000</span>
              <span>2500</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: CC_COLOR }}
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min((CC_RATING / 2500) * 100, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              />
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-[#ffffff10]">
            <div className="text-white/40 text-xs font-inter">Competitive Programming · India</div>
          </div>
        </motion.div>

        {/* LeetCode */}
        <motion.div
          {...fadeUp(0.3)}
          className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 flex flex-col hover:border-[#ffffff30] transition-colors"
        >
          {lc ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] text-white/40 tracking-widest">LEETCODE</div>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-[#ffa116]/20 text-[#ffa116] border border-[#ffa116]/40">
                  #{lc.globalRanking.toLocaleString('en-US')}
                </span>
              </div>

              {/* Total */}
              <div className="mb-1">
                <span className="font-bebas text-[56px] text-[#ffa116] leading-none">
                  {lc.totalSolved}
                </span>
              </div>
              <div className="text-white/40 text-xs font-mono mb-5">PROBLEMS SOLVED</div>

              {/* Difficulty breakdown */}
              <div className="space-y-2.5 mb-3">
                {[
                  { label: 'Easy',   count: lc.easySolved,   color: '#22c55e' },
                  { label: 'Medium', count: lc.mediumSolved,  color: '#fbbf24' },
                  { label: 'Hard',   count: lc.hardSolved,    color: '#f87171' },
                ].map(({ label, count, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] font-mono mb-1" style={{ color }}>
                      <span>{label.toUpperCase()}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(count / lcMax) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-[#ffffff10]">
                <div className="text-white/30 text-xs font-mono">@aksh_m</div>
              </div>
            </>
          ) : (
            <PlatformUnavailable name="LeetCode" />
          )}
        </motion.div>
      </div>
    </div>
  );
}
