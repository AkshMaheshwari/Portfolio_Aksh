'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

const NAV_LINKS = [
  { label: 'PITCH', href: '#hero' },
  { label: 'FORMATION', href: '#formation' },
  { label: 'STATS', href: '#stats' },
  { label: 'ROSTER', href: '#roster' },
  { label: 'CAREER', href: '#career' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const initials = `${PERSONAL.firstName[0]}${PERSONAL.lastName[0]}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080f0a]/95 backdrop-blur-md border-b border-[#ffffff18]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Crest */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full border-2 border-[#f5c518] bg-[#1a3a24] flex items-center justify-center">
              <span className="font-bebas text-[#f5c518] text-sm tracking-wider">{initials}</span>
            </div>
            <span className="font-bebas text-white text-lg tracking-widest hidden sm:block group-hover:text-[#f5c518] transition-colors">
              {PERSONAL.name.toUpperCase()}
            </span>
          </a>

          {/* Match tabs — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 font-bebas tracking-widest text-sm text-white/70 hover:text-[#f5c518] hover:bg-[#1a3a24] rounded transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: clock + badge */}
          <div className="hidden md:flex items-center gap-3">
            <span className="font-mono text-xs text-white/40 tabular-nums">{clock}</span>
            {PERSONAL.openToWork ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-semibold animate-pulse_green">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                OPEN TO WORK
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                UNDER CONTRACT
              </span>
            )}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#080f0a]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMenuOpen(false)}
                className="font-bebas text-5xl tracking-widest text-white hover:text-[#f5c518] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="font-mono text-white/40 text-sm tabular-nums">{clock}</span>
              {PERSONAL.openToWork ? (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  OPEN TO WORK
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-semibold">
                  UNDER CONTRACT
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
