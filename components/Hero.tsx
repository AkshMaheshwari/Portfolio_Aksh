'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

// Quick scale-down + shadow compression, like pressing boot studs into turf
const studPress = {
  whileTap: { scale: 0.93, y: 1 },
  transition: { type: 'spring' as const, stiffness: 500, damping: 22 },
};

export default function Hero() {
  const nameLetters = PERSONAL.name.toUpperCase().split('');
  const reducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 160]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-bg pitch-stripes"
    >
      {/* Pitch center-circle SVG overlay — drifts down slower than the scroll */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-5"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ y: reducedMotion ? 0 : parallaxY }}
        aria-hidden="true"
      >
        <circle cx="400" cy="300" r="200" fill="none" stroke="white" strokeWidth="2" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="white" strokeWidth="1.5" />
        <circle cx="400" cy="300" r="6" fill="white" />
        <rect x="0" y="150" width="110" height="300" fill="none" stroke="white" strokeWidth="1.5" />
        <rect x="690" y="150" width="110" height="300" fill="none" stroke="white" strokeWidth="1.5" />
      </motion.svg>


      {/* Main name */}
      <h1 className="font-bebas text-[clamp(2.8rem,10vw,10rem)] leading-none tracking-tight text-white z-10 flex flex-wrap justify-center px-2">
        {nameLetters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.04, type: 'spring', stiffness: 120, damping: 14 }}
            className={letter === ' ' ? 'w-6 inline-block' : 'inline-block'}
          >
            {letter === ' ' ? ' ' : letter}
          </motion.span>
        ))}
      </h1>

      {/* Position badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: 'spring', stiffness: 100 }}
        className="z-10 mt-6 flex items-center gap-3 px-4"
      >
        <div className="h-px w-8 sm:w-12 bg-[#f5c518] shrink-0" />
        <span className="font-bebas text-[#f5c518] tracking-[0.2em] sm:tracking-[0.3em] text-lg sm:text-xl md:text-2xl text-center">
          #{PERSONAL.jerseyNumber} — {PERSONAL.role.toUpperCase()}
        </span>
        <div className="h-px w-8 sm:w-12 bg-[#f5c518] shrink-0" />
      </motion.div>

      {/* Sub-info row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="z-10 mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white/50 font-inter text-sm px-6 text-center"
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
        <motion.a
          href="#roster"
          {...studPress}
          whileTap={{ ...studPress.whileTap, boxShadow: '0 1px 4px rgba(245,197,24,0.15)' }}
          style={{ boxShadow: '0 6px 18px rgba(245,197,24,0.25)' }}
          className="px-8 py-3 bg-[#f5c518] text-[#080f0a] font-bebas tracking-widest text-lg rounded hover:bg-white transition-colors"
        >
          VIEW ROSTER
        </motion.a>
        <motion.a
          href={`https://github.com/${PERSONAL.github}`}
          target="_blank"
          rel="noopener noreferrer"
          {...studPress}
          whileTap={{ ...studPress.whileTap, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          className="px-8 py-3 border border-[#f5c518]/50 text-[#f5c518] font-bebas tracking-widest text-lg rounded hover:bg-[#f5c518]/10 transition-colors"
        >
          GITHUB PROFILE
        </motion.a>
      </motion.div>

      {/* Scroll indicator — a small ball bouncing on the touchline */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-inter text-xs text-white/60 tracking-widest uppercase">Scroll</span>
        <div className="flex flex-col items-center">
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            aria-hidden="true"
            animate={reducedMotion ? undefined : { y: [0, 12, 0], rotate: [0, 360] }}
            transition={{
              y: { duration: 1.3, repeat: Infinity, times: [0, 0.5, 1], ease: ['easeIn', 'easeOut'] },
              rotate: { duration: 2.6, repeat: Infinity, ease: 'linear' },
            }}
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="#f5c518" strokeWidth="1.6" />
            <path d="M12 7.5 L16.3 10.6 L14.6 15.6 L9.4 15.6 L7.7 10.6 Z" fill="#f5c518" />
          </motion.svg>
          <motion.div
            className="mt-1.5 h-1 w-4 rounded-full bg-[#f5c518]/40 blur-[2px]"
            animate={reducedMotion ? undefined : { scaleX: [0.55, 1.15, 0.55], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 1.3, repeat: Infinity, times: [0, 0.5, 1], ease: ['easeIn', 'easeOut'] }}
          />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080f0a] to-transparent pointer-events-none" />
    </section>
  );
}
