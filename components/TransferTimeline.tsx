'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { TIMELINE } from '@/lib/data';
import type { TransferEntry } from '@/types';

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
          width={64}
          height={64}
          className={`object-${entry.logoFit ?? 'contain'} ${
            entry.logoFit === 'cover' ? 'w-full h-full'
            : entry.logoSize === 'lg' ? 'w-12 h-12'
            : entry.logoSize === 'sm' ? 'w-8 h-8'
            : 'w-10 h-10'
          }`}
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

// Entry slides in from the left, then the badge pops and the content
// follows with a short stagger — like a transfer announcement reveal.
const entryVariants = {
  hidden: { opacity: 0, x: -64 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.12,
      type: 'spring' as const,
      stiffness: 70,
      damping: 16,
      delayChildren: i * 0.12 + 0.15,
      staggerChildren: 0.12,
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 15 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 16 },
  },
};

const noteVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 120, damping: 16 },
  },
};

function TimelineEntry({ entry, index }: TimelineEntryProps) {
  return (
    <motion.div
      variants={entryVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="relative flex gap-6 pb-10"
    >
      {/* Club badge — z-10 keeps it in front of the timeline line */}
      <motion.div variants={badgeVariants} className="relative z-10 flex-shrink-0">
        <ClubBadge entry={entry} />
        {entry.isCurrent && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#080f0a]" />
          </div>
        )}
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <motion.div variants={contentVariants}>
          {/* Club name */}
          <div
            className="font-bebas text-xl sm:text-2xl tracking-wide leading-none mb-0.5"
            style={{ color: entry.isCurrent ? '#4ade80' : 'white' }}
          >
            {entry.club}
            {entry.isCurrent && (
              <span className="ml-2 text-xs sm:text-sm text-green-400/60 font-inter normal-case">
                ← Current
              </span>
            )}
          </div>

          {/* Role + date + badge all inline */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <span className="font-inter text-white/60 text-sm">{entry.role}</span>
            <span className="font-mono text-white/40 text-xs">{entry.startYear} — {entry.endYear}</span>
          </div>
        </motion.div>

        {/* Skill note */}
        <motion.div variants={noteVariants} className="mt-3 px-4 py-2.5 bg-[#0d1f14] border border-[#ffffff10] rounded-lg">
          <span className="text-[#f5c518]/60 text-xs font-mono uppercase tracking-widest mr-2">
            Transfer Fee →
          </span>
          <span className="text-white/65 text-sm font-inter">{entry.skillNote}</span>
        </motion.div>
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
          <h2 className="font-bebas text-6xl md:text-8xl heading-gradient tracking-wide">
            TRANSFER HISTORY
          </h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            CAREER TIMELINE
          </p>
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
