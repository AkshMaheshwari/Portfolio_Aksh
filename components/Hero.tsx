'use client';

import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

const CL_STARS = Array.from({ length: 8 });

export default function Hero() {
  const nameLetters = PERSONAL.name.toUpperCase().split('');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg pitch-stripes"
    >
      {/* Pitch center-circle SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-5"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="400" cy="300" r="200" fill="none" stroke="white" strokeWidth="2" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1.5" />
        <circle cx="400" cy="300" r="6" fill="white" />
        <rect x="0" y="150" width="110" height="300" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="690" y="150" width="110" height="300" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>

      {/* Champions League star row */}
      <div className="flex items-center gap-3 mb-10 z-10">
        {CL_STARS.map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 200 }}
            className="text-[#f5c518] text-xl select-none"
          >
            ★
          </motion.span>
        ))}
      </div>

      {/* Main name */}
      <h1 className="font-bebas text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-white z-10 flex flex-wrap justify-center">
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.04, type: 'spring', stiffness: 120, damping: 14 }}
            className={letter === ' ' ? 'w-6 inline-block' : 'inline-block'}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </h1>

      {/* Position badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 100 }}
        className="z-10 mt-6 flex items-center gap-4"
      >
        <div className="h-px w-12 bg-[#f5c518]" />
        <span className="font-bebas text-[#f5c518] tracking-[0.3em] text-xl md:text-2xl">
          #{PERSONAL.jerseyNumber} — {PERSONAL.role.toUpperCase()}
        </span>
        <div className="h-px w-12 bg-[#f5c518]" />
      </motion.div>

      {/* Sub-info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="z-10 mt-4 flex items-center gap-4 text-white/50 font-inter text-sm"
      >
        <span>{PERSONAL.nationality}</span>
        <span className="text-[#f5c518]">·</span>
        <span>{PERSONAL.club}</span>
        <span className="text-[#f5c518]">·</span>
        {PERSONAL.openToWork ? (
          <span className="text-green-400 font-medium">Available for Transfer</span>
        ) : (
          <span className="text-red-400 font-medium">Under Contract</span>
        )}
      </motion.div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#roster"
          className="px-8 py-3 bg-[#f5c518] text-[#080f0a] font-bebas tracking-widest text-lg rounded hover:bg-white transition-colors"
        >
          VIEW ROSTER
        </a>
        <a
          href={`https://github.com/${PERSONAL.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border border-[#f5c518]/50 text-[#f5c518] font-bebas tracking-widest text-lg rounded hover:bg-[#f5c518]/10 transition-colors"
        >
          GITHUB PROFILE
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-inter text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="heartbeat text-[#f5c518] text-2xl">↓</div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080f0a] to-transparent pointer-events-none" />
    </section>
  );
}
