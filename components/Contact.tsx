'use client';

import { motion } from 'framer-motion';
import { PERSONAL } from '@/lib/data';

// Fires the GOLAZO celebration (GolazoEasterEgg listens for this event)
const celebrate = () => window.dispatchEvent(new Event('golazo'));

const CHANNELS = [
  {
    label: 'EMAIL',
    value: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    icon: '✉',
    note: 'Direct line to the player',
    external: false,
  },
  {
    label: 'GITHUB',
    value: `@${PERSONAL.github}`,
    href: `https://github.com/${PERSONAL.github}`,
    icon: '⌨',
    note: 'Match footage & highlights',
    external: true,
  },
  {
    label: 'LINKEDIN',
    value: `/in/${PERSONAL.linkedin}`,
    href: `https://linkedin.com/in/${PERSONAL.linkedin}`,
    icon: '🔗',
    note: 'Official transfer portal',
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 section-glow">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-6xl md:text-8xl heading-gradient tracking-wide">
            TRANSFER ENQUIRIES
          </h2>
          <p className="font-inter text-[#f5c518] tracking-[0.3em] text-sm mt-1">
            AGENT CONTACT — ALL OFFERS CONSIDERED
          </p>
        </div>

        {/* Contact channels — clicking one scores a goal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              onClick={celebrate}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 90, damping: 14 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95, y: 1 }}
              className="group bg-[#0d1f14] border border-[#ffffff18] hover:border-[#f5c518]/50 hover:shadow-[0_0_28px_rgba(245,197,24,0.1)] rounded-xl p-6 text-center transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#1a3a24] border-2 border-[#f5c518]/40 group-hover:border-[#f5c518] transition-colors flex items-center justify-center mx-auto mb-3 text-xl">
                {c.icon}
              </div>
              <div className="font-bebas text-[#f5c518] tracking-widest text-lg">{c.label}</div>
              <div className="font-inter text-white/70 text-sm break-all">{c.value}</div>
              <div className="font-inter text-white/30 text-xs mt-2">{c.note}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
