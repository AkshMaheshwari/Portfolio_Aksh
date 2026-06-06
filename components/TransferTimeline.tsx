'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { TIMELINE } from '@/lib/data';
import type { TransferEntry } from '@/types';

const transferBadgeStyle: Record<TransferEntry['transferType'], { bg: string; text: string; border: string }> = {
  PERMANENT: { bg: '#f5c51820', text: '#f5c518', border: '#f5c51840' },
  LOAN: { bg: '#60a5fa20', text: '#60a5fa', border: '#60a5fa40' },
  'FREE TRANSFER': { bg: '#4ade8020', text: '#4ade80', border: '#4ade8040' },
};

// ── Club badge: shows logo if logoUrl is set, falls back to initials ──────────
function ClubBadge({ entry }: { entry: TransferEntry }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showLogo = !!entry.logoUrl && !imgFailed;

  return (
    <div
      className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 font-bebas text-lg tracking-wider flex-shrink-0${entry.isCurrent ? ' shadow-lg' : ''}`}
      style={{
        backgroundColor: '#0d1f14',
        borderColor: entry.color,
        boxShadow: entry.isCurrent ? `0 0 20px ${entry.color}60` : undefined,
      }}
    >
      {showLogo ? (
        <Image
          src={entry.logoUrl!}
          alt={`${entry.club} logo`}
          width={48}
          height={48}
          className="w-10 h-10 object-contain"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span style={{ color: entry.color }}>{entry.initials}</span>
      )}
    </div>
  );
}

interface TimelineEntryProps {
  entry: TransferEntry;
  index: number;
}

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const badge = transferBadgeStyle[entry.transferType];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 80 }}
      className="relative flex gap-6 pb-10"
    >
      {/* Club badge — z-10 keeps it in front of the timeline line */}
      <div className="relative z-10 flex-shrink-0">
        <ClubBadge entry={entry} />
        {entry.isCurrent && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f5c518] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#080f0a]" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Club + dates row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <div>
            <div
              className="font-bebas text-2xl tracking-wide leading-none"
              style={{ color: entry.isCurrent ? '#f5c518' : 'white' }}
            >
              {entry.club}
              {entry.isCurrent && (
                <span className="ml-2 text-sm text-[#f5c518]/60 font-inter normal-case">
                  ← Current
                </span>
              )}
            </div>
            <div className="font-inter text-white/60 text-sm mt-0.5">{entry.role}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-mono text-white/50 text-sm">
              {entry.startYear} — {entry.endYear}
            </div>
            <div
              className="mt-1 px-2 py-0.5 rounded text-xs font-semibold font-mono inline-block"
              style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.border}` }}
            >
              {entry.transferType}
            </div>
          </div>
        </div>

        {/* Skill note */}
        <div className="mt-3 px-4 py-2.5 bg-[#0d1f14] border border-[#ffffff10] rounded-lg">
          <span className="text-[#f5c518]/60 text-xs font-mono uppercase tracking-widest mr-2">
            Transfer Fee →
          </span>
          <span className="text-white/65 text-sm font-inter">{entry.skillNote}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TransferTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: '-80px' });

  return (
    <section id="career" className="py-16 bg-[#080f0a]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">
            TRANSFER HISTORY
          </h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            CAREER TIMELINE
          </p>
        </div>

        {/* Transfer window marker */}
        <div className="flex items-center gap-3 mb-8 px-4 py-3 bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-xl max-w-sm mx-auto text-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#f5c518] animate-pulse" />
          <span className="font-bebas text-[#f5c518] tracking-widest">TRANSFER WINDOW OPEN</span>
        </div>

        {/* Timeline */}
        <div className="relative pl-4">
          {/*
            Line is at left-12 (48px) = padding(16px) + half badge(32px),
            which centres it on the 64px (w-16) circle badges.
          */}
          <div
            className="absolute left-12 top-0 bottom-0 w-px bg-[#ffffff10] overflow-hidden"
            ref={lineRef}
          >
            <motion.div
              className="w-full bg-gradient-to-b from-[#f5c518] to-[#4ade80]"
              initial={{ height: 0 }}
              animate={{ height: isInView ? '100%' : 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </div>

          {TIMELINE.map((entry, i) => (
            <TimelineEntry
              key={entry.club}
              entry={entry}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
