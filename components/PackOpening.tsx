'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  angle: (i * 360) / 14,
  dist: 90 + (i % 3) * 45,
}));

export default function PackOpening() {
  const [stage, setStage] = useState<'hidden' | 'pack' | 'card'>('hidden');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!reducedMotion && !sessionStorage.getItem('packOpened')) setStage('pack');
  }, [reducedMotion]);

  const dismiss = () => {
    sessionStorage.setItem('packOpened', '1');
    setStage('hidden');
  };

  return (
    <AnimatePresence>
      {stage !== 'hidden' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[100] bg-[#050a06]/[0.98] flex flex-col items-center justify-center cursor-pointer"
          onClick={() => (stage === 'pack' ? setStage('card') : dismiss())}
        >
          {stage === 'pack' ? (
            <>
              <motion.div
                animate={{ y: [0, -10, 0], boxShadow: ['0 0 40px rgba(245,197,24,0.25)', '0 0 70px rgba(245,197,24,0.5)', '0 0 40px rgba(245,197,24,0.25)'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-52 h-72 rounded-2xl border-2 border-[#f5c518] bg-gradient-to-br from-[#1a3a24] via-[#0d1f14] to-[#080f0a] flex flex-col items-center justify-center gap-3"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#f5c518] bg-[#1a3a24] flex items-center justify-center font-bebas text-2xl text-[#f5c518]">
                  {PERSONAL.firstName[0]}{PERSONAL.lastName[0]}
                </div>
                <span className="font-bebas text-[#f5c518] tracking-[0.3em] text-lg">PLAYER PACK</span>
                <span className="font-inter text-white/60 text-xs">2025/26 SEASON</span>
              </motion.div>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="mt-8 font-bebas tracking-[0.4em] text-white/70"
              >
                TAP TO OPEN
              </motion.span>
            </>
          ) : (
            <>
              {/* Gold particle burst */}
              {PARTICLES.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
                    y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute w-2 h-2 rounded-full bg-[#f5c518]"
                />
              ))}
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                className="w-60 h-80 rounded-2xl border-2 border-[#f5c518] bg-gradient-to-b from-[#f5c518]/15 via-[#0d1f14] to-[#080f0a] flex flex-col items-center justify-center gap-2 shadow-[0_0_60px_rgba(245,197,24,0.35)]"
              >
                <div className="flex items-end gap-3">
                  <span className="font-bebas text-6xl text-[#f5c518] leading-none">{PERSONAL.jerseyNumber}</span>
                  <span className="font-bebas text-2xl text-white/80 leading-none pb-1">DEV</span>
                </div>
                <span className="font-bebas text-3xl text-white tracking-wide mt-2">{PERSONAL.name.toUpperCase()}</span>
                <span className="font-inter text-[#f5c518] text-xs tracking-[0.25em]">{PERSONAL.role.toUpperCase()}</span>
                <span className="font-inter text-white/60 text-xs">{PERSONAL.club}</span>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 font-bebas tracking-[0.4em] text-white/50"
              >
                TAP TO ENTER STADIUM
              </motion.span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
