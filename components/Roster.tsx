'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import type { Project } from '@/types';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'text-[#f5c518]' : 'text-white/40'}>
          ★
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const hoverCapable = useRef<boolean | null>(null);

  const isHoverDevice = () => {
    if (hoverCapable.current === null) {
      hoverCapable.current =
        typeof window !== 'undefined'
          ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
          : true;
    }
    return hoverCapable.current;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 90, damping: 14 }}
      className="card-3d-wrapper group"
      onMouseEnter={() => { if (isHoverDevice()) setFlipped(true); }}
      onMouseLeave={() => { if (isHoverDevice()) setFlipped(false); }}
      onClick={() => { if (!isHoverDevice()) setFlipped(v => !v); }}
    >
      <motion.div
        className="card-3d-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Front */}
        <div className="card-face card-shimmer w-full h-full bg-[#0d1f14] border border-[#ffffff18] rounded-xl p-6 flex flex-col group-hover:border-[#f5c518]/40 group-hover:shadow-[0_0_28px_rgba(245,197,24,0.12)] transition-all cursor-pointer">
          {/* Header */}
          <div className="mb-4">
            <h3 className="font-bebas text-2xl text-white tracking-wide leading-none mb-1">
              {project.name}
            </h3>
            <div className="font-inter text-xs text-[#f5c518] tracking-wide">{project.role}</div>
          </div>

          {/* Stars */}
          <div className="mb-4">
            <StarRating count={project.stars} />
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-auto">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-[#1a3a24] border border-[#ffffff10] rounded text-white/70 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-[#ffffff10] flex items-center justify-between">
            <span className="text-white/60 text-xs font-inter hidden sm:block">Hover to flip</span>
            <span className="text-white/60 text-xs font-inter sm:hidden">Tap to flip</span>
            <span className="text-white/60 text-xs font-mono">{project.techCount} techs</span>
          </div>
        </div>

        {/* Back */}
        <div className="card-face card-back card-shimmer w-full h-full bg-[#111d14] border border-[#f5c518]/40 rounded-xl p-6 flex flex-col group-hover:shadow-[0_0_28px_rgba(245,197,24,0.12)] transition-shadow">
          <div className="font-bebas text-xl text-[#f5c518] tracking-wide mb-3">
            {project.name.toUpperCase()} — SCOUT REPORT
          </div>

          <p className="font-inter text-white/75 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 mb-auto">
            {project.highlights.map((h) => (
              <div key={h} className="flex items-center gap-1.5">
                <span className="text-[#f5c518] text-xs">▸</span>
                <span className="text-white/70 text-xs font-inter">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-3 pt-3 border-t border-[#ffffff18]">
            <div className="font-mono text-[10px] text-white/60 tracking-widest mb-2">BUILT WITH</div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 bg-[#f5c518]/10 border border-[#f5c518]/25 rounded text-[#f5c518]/80 text-xs font-mono mb-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs — boot-stud press on tap */}
          <div className="flex gap-2">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.93, y: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="flex-1 py-2 bg-[#f5c518] text-[#080f0a] font-bebas tracking-widest text-sm rounded text-center hover:bg-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              HIGHLIGHTS
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.93, y: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="flex-1 py-2 border border-[#f5c518]/50 text-[#f5c518] font-bebas tracking-widest text-sm rounded text-center hover:bg-[#f5c518]/10 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              GITHUB
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Roster() {
  return (
    <section id="roster" className="py-16 section-glow">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-6xl md:text-8xl heading-gradient tracking-wide">SQUAD ROSTER</h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            PROJECT TRANSFER CARDS — HOVER TO FLIP
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
