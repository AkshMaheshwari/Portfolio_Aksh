'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((m) => ({ default: m.GitHubCalendar })),
  { ssr: false, loading: () => <div className="h-[120px] animate-pulse rounded bg-white/5" /> }
);

const theme = {
  dark: ['#0f2318', '#1a4d2a', '#22863a', '#2ea84a', '#4ade80'],
};

export default function ContributionGraph({ username }: { username: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
      className="mt-8 bg-[#0a1a0f] border border-green-900/50 rounded-xl p-5 md:p-7 ring-1 ring-inset ring-white/5"
    >
      <div className="font-mono text-[10px] text-green-600 tracking-widest mb-5 uppercase">
        Pitch Time — Contribution Activity
      </div>

      <div className="flex justify-center overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <GitHubCalendar
          username={username}
          theme={theme}
          colorScheme="dark"
          blockSize={14}
          blockMargin={4}
          fontSize={11}
          labels={{ totalCount: '{{count}} contributions in the last year' }}
          style={{ color: 'rgba(255,255,255,0.30)', fontFamily: 'monospace', width: '100%' }}
        />
      </div>
    </motion.div>
  );
}
