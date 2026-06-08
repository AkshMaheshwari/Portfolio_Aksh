'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const SEQUENCE = 'GOAL';

function playGolazoSound() {
  try {
    const ctx = new AudioContext();

    // Crowd noise burst
    const bufferSize = ctx.sampleRate * 2.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const crowdFilter = ctx.createBiquadFilter();
    crowdFilter.type = 'bandpass';
    crowdFilter.frequency.value = 500;
    crowdFilter.Q.value = 0.5;

    const crowdGain = ctx.createGain();
    crowdGain.gain.setValueAtTime(0, ctx.currentTime);
    crowdGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
    crowdGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2);
    crowdGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);

    noise.connect(crowdFilter);
    crowdFilter.connect(crowdGain);
    crowdGain.connect(ctx.destination);
    noise.start();

    // Goal horn — two-note blast
    const hornFreqs = [220, 277];
    hornFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.55);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, ctx.currentTime + i * 0.55 + 0.5);

      const hornGain = ctx.createGain();
      hornGain.gain.setValueAtTime(0, ctx.currentTime + i * 0.55);
      hornGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + i * 0.55 + 0.05);
      hornGain.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.55 + 0.5);

      osc.connect(hornGain);
      hornGain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.55);
      osc.stop(ctx.currentTime + i * 0.55 + 0.55);
    });
  } catch {
    // AudioContext not available
  }
}

function fireConfetti() {
  const colors = ['#f5c518', '#ffffff', '#4ade80', '#1a5c2a'];

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x: 0.3, y: 0.5 },
    colors,
    startVelocity: 55,
  });

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { x: 0.7, y: 0.5 },
    colors,
    startVelocity: 55,
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin: { x: 0.5, y: 0.3 },
      colors,
      gravity: 0.8,
    });
  }, 300);
}

export default function GolazoEasterEgg() {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState('');

  const trigger = useCallback(() => {
    setVisible(true);
    playGolazoSound();
    fireConfetti();
    setTimeout(() => setVisible(false), 3500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      const next = (typed + e.key.toUpperCase()).slice(-SEQUENCE.length);
      setTyped(next);
      if (next === SEQUENCE) {
        setTyped('');
        trigger();
      }
    };

    const onEvent = () => trigger();

    window.addEventListener('keydown', onKey);
    window.addEventListener('golazo', onEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('golazo', onEvent);
    };
  }, [typed, trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="golazo"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* GOLAZO text */}
          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ scale: 0.3, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          >
            <div className="font-bebas text-[#f5c518] text-[clamp(5rem,18vw,14rem)] leading-none drop-shadow-[0_0_60px_rgba(245,197,24,0.6)] tracking-wider select-none">
              GOLAZO!
            </div>

            <motion.div
              className="font-inter text-white/70 text-sm tracking-[0.4em] uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ⚽ You found the easter egg
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
