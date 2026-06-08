'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL, PROJECTS, TIMELINE } from '@/lib/data';

type LineType = 'input' | 'output' | 'system';
interface Line { type: LineType; content: string }

const BOOT: string[] = [
  '╔══════════════════════════════════════════╗',
  '║       DUGOUT CONSOLE  v1.0               ║',
  '╚══════════════════════════════════════════╝',
  '',
  `  Connected : ${PERSONAL.name.toUpperCase()} — ${PERSONAL.role.toUpperCase()}`,
  `  Club      : ${PERSONAL.club.toUpperCase()}`,
  `  Status    : ${PERSONAL.openToWork ? 'FREE AGENT — OPEN TO TRANSFER' : 'UNDER CONTRACT'}`,
  '',
  "  Type 'help' to see available commands.",
  '',
];

function run(cmd: string): string[] {
  switch (cmd.trim().toLowerCase()) {
    case 'help':
      return [
        '',
        '  COMMAND            ACTION',
        '  ─────────────────────────────────────────',
        '  whoami             Player profile & info',
        '  squad              Active skill roster',
        '  projects           Project portfolio',
        '  career             Transfer history',
        '  honours            Trophies & achievements',
        '  stats              Season statistics',
        '  contact            Get in touch',
        '  clear              Clear the terminal',
        '  exit               Close the console',
        '  hint               ...',
        '',
      ];

    case 'whoami':
      return [
        '',
        `  Name        ${PERSONAL.name}`,
        `  Role        ${PERSONAL.role}`,
        `  Club        ${PERSONAL.club}`,
        `  Nationality ${PERSONAL.nationality}`,
        `  Jersey No.  #${PERSONAL.jerseyNumber}`,
        `  Status      ${PERSONAL.openToWork ? 'OPEN TO WORK' : 'UNDER CONTRACT'}`,
        '',
      ];

    case 'squad':
    case 'roster':
      return [
        '',
        '  STARTING XI',
        '  ───────────────────────────────────────',
        '  #  PLAYER            POS    RAT',
        '  ───────────────────────────────────────',
        '   1  Next.js           GK     92',
        '   2  Node.js           DEF    85',
        '   3  MongoDB           DEF    83',
        '   4  Firebase          DEF    84',
        '   5  Supabase          DEF    86',
        '   6  React             MID    91',
        '   7  REST & OAuth      MID    87',
        '   8  Prisma            MID    82',
        '   9  JavaScript        FWD    90',
        '  10  C++ (CP)          FWD    86',
        '  11  Tailwind CSS      FWD    83',
        '',
        '  BENCH: Python (78)  Docker (75)  Java (76)  Razorpay (74)',
        '',
      ];

    case 'projects':
      return [
        '',
        '  PROJECT PORTFOLIO',
        '  ───────────────────────────────────────',
        ...PROJECTS.flatMap((p) => [
          `  [${p.complexity.toUpperCase()}]  ${p.name.toUpperCase()}`,
          `  ${p.role}`,
          `  Stack: ${p.techStack.join(' · ')}`,
          `  ${p.description.length > 72 ? p.description.slice(0, 72) + '…' : p.description}`,
          '',
        ]),
      ];

    case 'career':
    case 'transfer':
      return [
        '',
        '  TRANSFER HISTORY',
        '  ───────────────────────────────────────',
        ...TIMELINE.map(
          (t) =>
            `  ${t.startYear.padEnd(9)}  ${t.club.padEnd(24)} ${t.transferType}`
        ),
        '',
      ];

    case 'honours':
    case 'trophies':
      return [
        '',
        '  HONOURS BOARD',
        '  ───────────────────────────────────────',
        '  ICPC Asia West            AIR 251',
        '  CodeChef                  3 Star — 1605 rating',
        '  Codeforces                Active competitive programmer',
        '  LeetCode                  Active problem solver',
        '  B.Tech Computer Eng.      CGPA 9.5  @  KJ Somaiya',
        '  Internships               2 completed (Full Stack)',
        '',
      ];

    case 'stats':
      return [
        '',
        '  SEASON STATISTICS',
        '  ───────────────────────────────────────',
        '  Projects Built       3+',
        '  Technologies         11 starting + 4 bench',
        '  CGPA                 9.5 / 10',
        '  ICPC Rank            AIR 251  (Asia West)',
        '  CP Rating            1605  (CodeChef 3★)',
        '  Internships          2  (MyEzz · WE DISTRICT)',
        '',
        "  → Scroll to 'SEASON STATS' for live GitHub data.",
        '',
      ];

    case 'contact':
      return [
        '',
        '  CONTACT',
        '  ───────────────────────────────────────',
        `  GitHub    github.com/${PERSONAL.github}`,
        '  Status    ' + (PERSONAL.openToWork ? 'OPEN TO OPPORTUNITIES' : 'UNDER CONTRACT'),
        '',
      ];

    case 'hint':
      return [
        '',
        '  ⚽  CLASSIFIED INTEL',
        '  ───────────────────────────────────────',
        '  The crowd goes wild for one word.',
        '  Four letters. The kind that shakes a stadium.',
        '  Type it — anywhere on the page. Or right here.',
        '',
        '  [ ACCESS LEVEL: SUPERFAN ]',
        '',
      ];

    case 'goal':
      return ['__GOLAZO__'];

    case 'clear':
      return ['__CLEAR__'];

    case 'exit':
      return ['__EXIT__'];

    default:
      return [
        '',
        `  bash: ${cmd}: command not found`,
        "  Type 'help' for available commands.",
        '',
      ];
  }
}

export default function DugoutTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>(() =>
    BOOT.map((content) => ({ type: 'system' as LineType, content }))
  );
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Backtick hotkey when not focused in another input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === '`' &&
        !e.ctrlKey &&
        !e.metaKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const submit = useCallback(() => {
    const cmd = input.trim();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    const output = run(cmd);

    if (output[0] === '__CLEAR__') {
      setLines(BOOT.map((content) => ({ type: 'system', content })));
      return;
    }
    if (output[0] === '__EXIT__') {
      setOpen(false);
      return;
    }
    if (output[0] === '__GOLAZO__') {
      window.dispatchEvent(new CustomEvent('golazo'));
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: 'input', content: cmd },
      ...output.map((content) => ({ type: 'output' as LineType, content })),
    ]);
  }, [input]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, cmdHistory.length - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
        return next;
      });
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        title="Dugout Console  (press `)"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#010a03] border border-green-800 flex items-center justify-center shadow-lg shadow-green-950/60 hover:border-green-500 hover:shadow-green-800/50 transition-all group"
      >
        <span className="font-mono text-green-400 text-xs font-bold leading-none group-hover:text-green-200 select-none">
          {open ? '×' : '>_'}
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[440px] max-w-[calc(100vw-3rem)] h-80 flex flex-col rounded-xl overflow-hidden border border-green-900/80 shadow-2xl shadow-black/90"
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#010a03] border-b border-green-900/50 shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-700/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-700/60" />
                <span className="w-3 h-3 rounded-full bg-green-800" />
              </div>
              <span className="flex-1 text-center text-green-700 text-xs tracking-widest font-mono">
                DUGOUT CONSOLE — {PERSONAL.name.toUpperCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-green-800 hover:text-green-400 text-xs font-mono transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Output */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-[#000d02] px-4 py-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="leading-5">
                  {line.type === 'input' ? (
                    <p className="text-green-300 text-xs font-mono break-all">
                      <span className="text-green-600">$ </span>
                      {line.content}
                    </p>
                  ) : (
                    <p
                      className={`text-xs font-mono whitespace-pre-wrap break-words ${
                        line.type === 'system' ? 'text-green-800' : 'text-green-400'
                      }`}
                    >
                      {line.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#000d02] border-t border-green-900/50 shrink-0">
              <span className="text-green-600 text-xs font-mono select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent text-green-300 text-xs font-mono outline-none placeholder-green-900 caret-green-400"
                placeholder="enter command…"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
