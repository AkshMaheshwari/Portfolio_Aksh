'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import { FORMATIONS, BENCH_PLAYERS } from '@/lib/data';
import type { Player } from '@/types';

const PITCH_W = 600;
const PITCH_H = 960;

// Players pop in after the pitch markings finish drawing
const PLAYER_DELAY = 1.05;

interface TooltipState {
  player: Player;
  x: number;
  y: number;
}

const positionLabel: Record<Player['position'], string> = {
  GK: 'Goalkeeper',
  DEF: 'Defender',
  MID: 'Midfielder',
  FWD: 'Forward',
  BENCH: 'Bench',
};

const ratingColor = (r: number) => (r >= 90 ? '#f5c518' : r >= 85 ? '#4ade80' : '#60a5fa');

const POSITION_SPRING = { type: 'spring' as const, stiffness: 60, damping: 13, mass: 0.9 };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

interface PlayerNodeProps {
  player: Player;
  index: number;
  inView: boolean;
  reducedMotion: boolean;
  svgRef: React.RefObject<SVGSVGElement>;
  onHover: (p: Player) => void;
  onLeave: () => void;
  onSelect: (e: React.MouseEvent, p: Player) => void;
}

/*
  Position + drag are driven by motion values set directly from pointer events,
  so dragging never re-renders React and never goes through Framer's (SVG-
  unsupported) drag gesture. Pointer deltas are converted from screen px to
  viewBox units before applying.
*/
function PlayerNode({ player, index, inView, reducedMotion, svgRef, onHover, onLeave, onSelect }: PlayerNodeProps) {
  const x = useMotionValue(player.x);
  const y = useMotionValue(player.y);
  const scale = useMotionValue(1);
  const dragging = useRef(false);
  const moved = useRef(false);
  const start = useRef({ px: 0, py: 0, x: 0, y: 0 });

  // Run to the new formation spot when x/y props change
  useEffect(() => {
    if (dragging.current) return;
    const t = reducedMotion ? { duration: 0 } : POSITION_SPRING;
    const ax = animate(x, player.x, t);
    const ay = animate(y, player.y, t);
    return () => { ax.stop(); ay.stop(); };
  }, [player.x, player.y, reducedMotion, x, y]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, py: e.clientY, x: x.get(), y: y.get() };
    onLeave();
    if (!reducedMotion) animate(scale, 1.12, { duration: 0.15 });
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !svgRef.current) return;
    const pxPerUnit = svgRef.current.getBoundingClientRect().width / PITCH_W;
    const dx = (e.clientX - start.current.px) / pxPerUnit;
    const dy = (e.clientY - start.current.py) / pxPerUnit;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    x.set(clamp(start.current.x + dx, 40, PITCH_W - 40));
    y.set(clamp(start.current.y + dy, 40, PITCH_H - 40));
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const t = reducedMotion ? { duration: 0 } : POSITION_SPRING;
    animate(x, player.x, t);
    animate(y, player.y, t);
    animate(scale, 1, { duration: 0.15 });
  };

  return (
    <motion.g
      style={{ x, y, scale, cursor: 'grab', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onMouseEnter={() => { if (!dragging.current) onHover(player); }}
      onMouseLeave={onLeave}
      onClick={(e) => { if (!moved.current) onSelect(e, player); }}
      role="button"
      tabIndex={0}
      aria-label={`${player.name}, ${positionLabel[player.position]}, rating ${player.rating}`}
      onFocus={() => onHover(player)}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(e as unknown as React.MouseEvent, player);
        }
      }}
    >
      <motion.g
        initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: PLAYER_DELAY + index * 0.07, type: 'spring', stiffness: 180, damping: 14 }}
      >
        {/* Glow ring */}
        <circle cx="0" cy="0" r="40" fill="none" stroke={ratingColor(player.rating)} strokeWidth="1" opacity="0.4" />
        {/* Main circle */}
        <circle cx="0" cy="0" r="33" fill="#0a1a10" stroke={ratingColor(player.rating)} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="28" fill="#1a3a24" />

        {player.iconUrl ? (
          <image href={player.iconUrl} x="-28" y="-28" width="56" height="56" clipPath={`url(#clip-${player.id})`} />
        ) : (
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" fill={ratingColor(player.rating)} fontSize="14" fontWeight="bold" fontFamily="monospace">
            {player.icon}
          </text>
        )}

        {/* Name label */}
        <text x="0" y="52" textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.9)" fontSize="13" fontFamily="Inter, sans-serif">
          {player.name}
        </text>
      </motion.g>
    </motion.g>
  );
}

export default function FormationBoard() {
  const [activeFormation, setActiveFormation] = useState(0);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();

  const currentFormation = FORMATIONS[activeFormation];

  const calcTooltipPos = (player: Player) => {
    if (!svgRef.current || !containerRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const scaleX = svgRect.width / PITCH_W;
    const scaleY = svgRect.height / PITCH_H;
    const rawX = svgRect.left - containerRect.left + player.x * scaleX;
    const clampedX = Math.min(Math.max(rawX, 100), containerRect.width - 100);
    setTooltip({
      player,
      x: clampedX,
      y: svgRect.top - containerRect.top + player.y * scaleY,
    });
  };

  const handleMouseEnter = (player: Player) => calcTooltipPos(player);
  const handleMouseLeave = () => setTooltip(null);

  const handleNodeClick = (e: React.MouseEvent, player: Player) => {
    e.stopPropagation();
    if (tooltip?.player.id === player.id) {
      setTooltip(null);
    } else {
      calcTooltipPos(player);
    }
  };

  // Stroke markings "paint on" via pathLength; opacity snaps in at each delay
  const draw = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: inView ? { pathLength: 1, opacity: 1 } : undefined,
          transition: {
            pathLength: { duration: 0.8, delay, ease: 'easeInOut' as const },
            opacity: { duration: 0.01, delay },
          },
        };

  // Filled elements (spots, goals, background) just fade in
  const fadeIn = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : undefined,
          transition: { duration: 0.5, delay },
        };

  return (
    <section id="formation" className="py-16 bg-[#080f0a]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-bebas text-6xl md:text-8xl heading-gradient tracking-wide">
            SQUAD FORMATION
          </h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            {currentFormation.label} TACTICAL LINEUP
          </p>
        </div>

        {/* Formation selector */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {FORMATIONS.map((f, i) => (
            <button
              key={f.name}
              onClick={() => { setActiveFormation(i); setTooltip(null); }}
              className={`px-5 py-1.5 rounded-full border font-bebas tracking-widest text-sm transition-all duration-200 ${
                i === activeFormation
                  ? 'border-[#f5c518] text-[#f5c518] bg-[#f5c518]/10'
                  : 'border-white/20 text-white/50 hover:border-white/40 hover:text-white/80'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Pitch + tooltip wrapper */}
        <div ref={containerRef} className="relative max-w-lg mx-auto" onClick={() => setTooltip(null)}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${PITCH_W} ${PITCH_H}`}
            className="w-full rounded-xl overflow-visible"
            style={{ filter: 'drop-shadow(0 0 40px rgba(26,58,36,0.5))' }}
            role="group"
            aria-label={`${currentFormation.label} tactical formation pitch. Each player is a focusable button revealing skill rating and experience.`}
          >
            <title>{`${currentFormation.label} tactical skill formation`}</title>
            <defs>
              <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a5c2a" />
                <stop offset="30%" stopColor="#1d6830" />
                <stop offset="50%" stopColor="#1a6030" />
                <stop offset="70%" stopColor="#1d6830" />
                <stop offset="100%" stopColor="#1a5c2a" />
              </linearGradient>
              <pattern id="pitchStripe" x="0" y="0" width={PITCH_W} height="96" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width={PITCH_W} height="48" fill="rgba(0,0,0,0.07)" />
              </pattern>
              {/*
                Per-player clip paths at local (0,0) — each node is drawn inside a
                translated <g>, so the clip travels with the player automatically.
              */}
              {currentFormation.players.map((player) =>
                player.iconUrl ? (
                  <clipPath key={`clip-${player.id}`} id={`clip-${player.id}`}>
                    <circle cx="0" cy="0" r="28" />
                  </clipPath>
                ) : null
              )}
            </defs>

            {/* Pitch background */}
            <motion.rect {...fadeIn(0)} x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#pitchGrad)" rx="12" />
            <motion.rect {...fadeIn(0.1)} x="0" y="0" width={PITCH_W} height={PITCH_H} fill="url(#pitchStripe)" rx="12" />

            {/* Outer border */}
            <motion.rect {...draw(0.15)} x="18" y="18" width={PITCH_W - 36} height={PITCH_H - 36} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" rx="4" />

            {/* Center line */}
            <motion.line {...draw(0.35)} x1="18" y1={PITCH_H / 2} x2={PITCH_W - 18} y2={PITCH_H / 2} stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />

            {/* Center circle */}
            <motion.circle {...draw(0.45)} cx={PITCH_W / 2} cy={PITCH_H / 2} r="82" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <motion.circle {...fadeIn(0.9)} cx={PITCH_W / 2} cy={PITCH_H / 2} r="5" fill="rgba(255,255,255,0.7)" />

            {/* Top penalty area */}
            <motion.rect {...draw(0.55)} x="162" y="18" width="276" height="132" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            {/* Top goal area */}
            <motion.rect {...draw(0.7)} x="228" y="18" width="144" height="50" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            {/* Top goal */}
            <motion.rect {...fadeIn(0.9)} x="262" y="4" width="76" height="16" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            {/* Top penalty spot */}
            <motion.circle {...fadeIn(0.9)} cx="300" cy="143" r="4" fill="rgba(255,255,255,0.7)" />
            {/* Top penalty arc */}
            <motion.path {...draw(0.8)} d="M 210 150 A 82 82 0 0 1 390 150" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />

            {/* Bottom penalty area */}
            <motion.rect {...draw(0.55)} x="162" y={PITCH_H - 150} width="276" height="132" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            {/* Bottom goal area */}
            <motion.rect {...draw(0.7)} x="228" y={PITCH_H - 68} width="144" height="50" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            {/* Bottom goal */}
            <motion.rect {...fadeIn(0.9)} x="262" y={PITCH_H - 20} width="76" height="16" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
            {/* Bottom penalty spot */}
            <motion.circle {...fadeIn(0.9)} cx="300" cy={PITCH_H - 143} r="4" fill="rgba(255,255,255,0.7)" />
            {/* Bottom penalty arc */}
            <motion.path {...draw(0.8)} d={`M 210 ${PITCH_H - 150} A 82 82 0 0 0 390 ${PITCH_H - 150}`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />

            {/* Corner arcs */}
            <motion.path {...draw(0.9)} d="M 18 38 A 18 18 0 0 1 36 18" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <motion.path {...draw(0.9)} d={`M ${PITCH_W - 36} 18 A 18 18 0 0 1 ${PITCH_W - 18} 38`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <motion.path {...draw(0.9)} d={`M 18 ${PITCH_H - 38} A 18 18 0 0 0 36 ${PITCH_H - 18}`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <motion.path {...draw(0.9)} d={`M ${PITCH_W - 36} ${PITCH_H - 18} A 18 18 0 0 0 ${PITCH_W - 18} ${PITCH_H - 38}`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />

            {/*
              Player nodes — keyed by stable player.id so formation changes spring
              each node from its old x/y to the new one (players "run" into place).
              Draggable via pointer events; snaps back to position on release.
            */}
            {currentFormation.players.map((player, i) => (
              <PlayerNode
                key={player.id}
                player={player}
                index={i}
                inView={inView}
                reducedMotion={!!reducedMotion}
                svgRef={svgRef}
                onHover={handleMouseEnter}
                onLeave={handleMouseLeave}
                onSelect={handleNodeClick}
              />
            ))}

            {/* Dynamic position labels from formation config */}
            {currentFormation.posLabels.map(({ text, y }) => (
              <motion.text {...fadeIn(1.0)} key={`${text}-${y}`} x="26" y={y} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">
                {text}
              </motion.text>
            ))}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute z-20 bg-[#0d1f14] border border-[#f5c518]/60 rounded-lg p-3 pointer-events-none min-w-[180px] shadow-xl"
              style={{
                left: tooltip.x,
                top: tooltip.y - 110,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="font-bebas text-[#f5c518] text-xl tracking-wide mb-1">
                {tooltip.player.name}
              </div>
              <div className="text-xs text-white/60 font-inter mb-2">
                {positionLabel[tooltip.player.position]}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/50 text-xs">Rating</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#f5c518] rounded-full"
                    style={{ width: `${tooltip.player.rating}%` }}
                  />
                </div>
                <span className="text-[#f5c518] text-xs font-mono">{tooltip.player.rating}</span>
              </div>
              <div className="text-white/50 text-xs">
                {tooltip.player.experience} yr{tooltip.player.experience !== 1 ? 's' : ''} experience
              </div>
              <div className="text-white/70 text-xs mt-1 leading-snug">{tooltip.player.role}</div>
              {/* Arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3 h-3 bg-[#0d1f14] border-r border-b border-[#f5c518]/60 rotate-45" />
            </div>
          )}
        </div>

        {/* Bench */}
        <div className="mt-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-[#ffffff18]" />
            <span className="font-bebas text-[#f5c518] text-2xl tracking-widest">BENCH</span>
            <div className="h-px flex-1 bg-[#ffffff18]" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {BENCH_PLAYERS.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: '#f5c518' }}
                className="bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-4 text-center w-36 cursor-default transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1a3a24] border-2 border-[#f5c518]/40 group-hover:border-[#f5c518] transition-colors flex items-center justify-center mx-auto mb-2 overflow-hidden">
                  {player.iconUrl ? (
                    <Image
                      src={player.iconUrl}
                      alt={player.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  ) : (
                    <span className="text-[#f5c518] text-xs font-mono font-bold">{player.icon}</span>
                  )}
                </div>
                <div className="text-white text-xs font-semibold font-inter">{player.name}</div>
                <div className="text-[#f5c518] text-xs font-mono mt-0.5">{player.rating}/100</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
