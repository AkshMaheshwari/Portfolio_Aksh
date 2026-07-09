'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import type { GitHubStats } from '@/types';

interface StatCardProps {
  label: string;
  value: number | string;
  sublabel: string;
  index: number;
  isText?: boolean;
}

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: 'easeOut' });
    }
  }, [isInView, target, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function StatCard({ label, value, sublabel, index, isText }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
      className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 hover:border-[#f5c518]/40 transition-colors group"
    >
      <div className="text-[#f5c518] font-bebas text-sm tracking-widest mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
        {label}
      </div>
      <div className="font-bebas text-4xl md:text-5xl text-white leading-none mb-2">
        {isText ? (
          <span>{value}</span>
        ) : (
          <AnimatedNumber target={value as number} />
        )}
      </div>
      <div className="font-inter text-xs text-white/60 tracking-wide">{sublabel}</div>
    </motion.div>
  );
}

interface Props {
  stats: GitHubStats;
}

export default function StatsGrid({ stats }: Props) {
  const cards = [
    {
      label: 'MATCHES PLAYED',
      value: stats.totalRepos,
      sublabel: 'Total repositories',
    },
    {
      label: 'STARTS',
      value: stats.publicRepos,
      sublabel: 'Public repositories',
    },
    {
      label: 'FAN BASE',
      value: stats.followers,
      sublabel: 'GitHub followers',
    },
    {
      label: 'GOALS SCORED',
      value: stats.totalStars,
      sublabel: 'Stars across all repos',
    },
    {
      label: 'PREFERRED POSITION',
      value: stats.preferredLanguage,
      sublabel: 'Most used language',
      isText: true,
    },
    {
      label: 'PRO SINCE',
      value: stats.proSince,
      sublabel: 'Year account created',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <StatCard
          key={card.label}
          label={card.label}
          value={card.value}
          sublabel={card.sublabel}
          index={i}
          isText={card.isText}
        />
      ))}
    </div>
  );
}
