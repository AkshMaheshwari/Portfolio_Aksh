'use client';

import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();
  const initials = `${PERSONAL.firstName[0]}${PERSONAL.lastName[0]}`;

  return (
    <footer className="bg-[#0d1f14] border-t border-[#ffffff10] py-16">
      {/* Center circle SVG */}
      <div className="flex justify-center mb-8">
        <svg viewBox="0 0 120 120" width="80" height="80" className="opacity-20">
          <circle cx="60" cy="60" r="55" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="5" fill="white" />
          <line x1="5" y1="60" x2="115" y2="60" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 rounded-full border-2 border-[#f5c518] bg-[#1a3a24] flex items-center justify-center mx-auto mb-6"
        >
          <span className="font-bebas text-[#f5c518] text-3xl tracking-wider">{initials}</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-bebas text-4xl text-white tracking-widest mb-2"
        >
          {PERSONAL.name.toUpperCase()}
        </motion.h3>

        <p className="font-inter text-white/40 text-sm mb-8">
          #{PERSONAL.jerseyNumber} · {PERSONAL.role} · {PERSONAL.nationality}
        </p>

        {/* Contact / links row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <a
            href={`https://github.com/${PERSONAL.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-white/50 hover:text-[#f5c518] transition-colors text-sm flex items-center gap-2"
          >
            <span>⌨</span> GitHub
          </a>
          <span className="text-white/20">·</span>
          {PERSONAL.openToWork ? (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
              OPEN TO WORK
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-semibold">
              UNDER CONTRACT
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#ffffff10] mb-8 max-w-sm mx-auto" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white/30 text-xs font-inter">
          <span>© {year} {PERSONAL.name}</span>
          <span className="hidden sm:block">·</span>
          <span>Built with Next.js 14 + Framer Motion</span>
          <span className="hidden sm:block">·</span>
          <span className="text-[#f5c518]/50">⚽ Footballer Theme</span>
        </div>
      </div>
    </footer>
  );
}
