import type { Player, FormationConfig, Project, TransferEntry } from '@/types';

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SI = 'https://cdn.simpleicons.org';

export const PERSONAL = {
  name: 'Aksh Maheshwari',
  firstName: 'Aksh',
  lastName: 'Maheshwari',
  github: 'AkshMaheshwari',         // ← update to your exact GitHub username
  email: 'aksh.maheshwari05@gmail.com',  // ← update to your contact email
  linkedin: 'aksh-maheshwari-a07609281',      // ← update to your LinkedIn handle (linkedin.com/in/<this>)
  cvUrl: 'https://drive.google.com/file/d/1_RmJ45Z878KSmNf-Z1Z-VkxzyjFFmDzv/view?usp=sharing',  // ← your CV Drive link
  role: 'Full Stack Developer',
  jerseyNumber: 10,
  club: 'Wiglo.ai',
  nationality: 'India',
  openToWork: false,
};

// ─── SKILL POOL ──────────────────────────────────────────────────────────────
// Each skill's base attributes are defined once; formations add position + coordinates.

type SkillBase = Omit<Player, 'position' | 'x' | 'y'>;

function pos(base: SkillBase, position: Player['position'], x: number, y: number): Player {
  return { ...base, position, x, y };
}

const S: Record<string, SkillBase> = {
  nextjs: { id: 'gk',   name: 'Next.js',     rating: 92, icon: 'Nx',   iconUrl: `${DI}/nextjs/nextjs-plain.svg`,             experience: 3, role: 'Primary framework — SSR, App Router, server actions, full-stack across all projects' },
  nodejs: { id: 'def1', name: 'Node.js',      rating: 85, icon: 'Node', iconUrl: `${DI}/nodejs/nodejs-original.svg`,          experience: 3, role: 'Server-side runtime, Express APIs, MERN stack backbone' },
  mongo:  { id: 'def2', name: 'MongoDB',      rating: 83, icon: 'MDB',  iconUrl: `${DI}/mongodb/mongodb-original.svg`,        experience: 2, role: 'NoSQL document modeling, aggregations, MERN stack DB layer' },
  fire:   { id: 'def3', name: 'Firebase',     rating: 84, icon: 'Fire', iconUrl: `${DI}/firebase/firebase-original.svg`,      experience: 2, role: 'Real-time DB, cloud auth, storage — used in ZeroPlate' },
  supa:   { id: 'def4', name: 'Supabase',     rating: 86, icon: 'Supa', iconUrl: `${SI}/supabase/3ECF8E`,                     experience: 2, role: 'Postgres BaaS, realtime, Row Level Security — Syncifi & WE DISTRICT' },
  react:  { id: 'mid1', name: 'React',        rating: 91, icon: 'Re',   iconUrl: `${DI}/react/react-original.svg`,            experience: 3, role: 'Component architecture, hooks, context — used across every project' },
  api:    { id: 'mid2', name: 'REST & OAuth', rating: 87, icon: 'API',                                                        experience: 3, role: 'REST API design, Google OAuth, secure auth flows, integration patterns' },
  prisma: { id: 'mid3', name: 'Prisma',       rating: 82, icon: 'Pr',   iconUrl: `${SI}/prisma/A0AEC0`,                      experience: 1, role: 'Type-safe ORM, schema-first migrations, used in Syncifi' },
  js:     { id: 'fwd1', name: 'JavaScript',   rating: 90, icon: 'JS',   iconUrl: `${DI}/javascript/javascript-original.svg`, experience: 4, role: 'Full-stack JS, async/await, browser APIs, event-driven patterns' },
  cpp:    { id: 'fwd2', name: 'C++  (CP)',    rating: 86, icon: 'C++',  iconUrl: `${DI}/cplusplus/cplusplus-original.svg`,   experience: 4, role: 'Competitive programming, DSA, algorithms — ICPC AIR 251 Asia West' },
  tw:     { id: 'fwd3', name: 'Tailwind CSS', rating: 83, icon: 'TW',   iconUrl: `${DI}/tailwindcss/tailwindcss-original.svg`, experience: 2, role: 'Rapid responsive UI, dark themes, component design systems' },
};

// ─── FORMATIONS ──────────────────────────────────────────────────────────────

export const FORMATIONS: FormationConfig[] = [
  {
    name: '4-3-3',
    label: '4 — 3 — 3',
    posLabels: [
      { text: 'GK', y: 820 }, { text: 'DEF', y: 640 }, { text: 'MID', y: 455 }, { text: 'FWD', y: 255 },
    ],
    players: [
      pos(S.nextjs, 'GK',  300, 820),
      pos(S.nodejs, 'DEF',  90, 640), pos(S.mongo, 'DEF', 210, 640), pos(S.fire, 'DEF', 390, 640), pos(S.supa, 'DEF', 510, 640),
      pos(S.react,  'MID', 155, 460), pos(S.api,   'MID', 300, 440), pos(S.prisma, 'MID', 445, 460),
      pos(S.js,     'FWD', 155, 255), pos(S.cpp,   'FWD', 300, 235), pos(S.tw, 'FWD', 445, 255),
    ],
  },
  {
    name: '4-4-2',
    label: '4 — 4 — 2',
    posLabels: [
      { text: 'GK', y: 820 }, { text: 'DEF', y: 650 }, { text: 'MID', y: 470 }, { text: 'FWD', y: 260 },
    ],
    players: [
      pos(S.nextjs, 'GK',  300, 820),
      pos(S.nodejs, 'DEF',  75, 650), pos(S.mongo, 'DEF', 205, 650), pos(S.fire, 'DEF', 395, 650), pos(S.supa, 'DEF', 525, 650),
      pos(S.react,  'MID',  75, 470), pos(S.api,   'MID', 205, 470), pos(S.prisma, 'MID', 395, 470), pos(S.tw, 'MID', 525, 470),
      pos(S.js,     'FWD', 205, 260), pos(S.cpp,   'FWD', 395, 260),
    ],
  },
  {
    name: '3-5-2',
    label: '3 — 5 — 2',
    posLabels: [
      { text: 'GK', y: 820 }, { text: 'DEF', y: 650 }, { text: 'MID', y: 470 }, { text: 'FWD', y: 260 },
    ],
    players: [
      pos(S.nextjs, 'GK',  300, 820),
      pos(S.nodejs, 'DEF', 130, 650), pos(S.mongo, 'DEF', 300, 650), pos(S.supa, 'DEF', 470, 650),
      pos(S.react,  'MID',  65, 470), pos(S.fire, 'MID', 175, 470), pos(S.api, 'MID', 300, 470), pos(S.prisma, 'MID', 425, 470), pos(S.tw, 'MID', 535, 470),
      pos(S.js,     'FWD', 205, 260), pos(S.cpp, 'FWD', 395, 260),
    ],
  },
  {
    name: '4-2-3-1',
    label: '4 — 2 — 3 — 1',
    posLabels: [
      { text: 'GK', y: 820 }, { text: 'DEF', y: 660 }, { text: 'DM', y: 540 }, { text: 'AM', y: 390 }, { text: 'ST', y: 235 },
    ],
    players: [
      pos(S.nextjs, 'GK',  300, 820),
      pos(S.nodejs, 'DEF',  75, 660), pos(S.mongo, 'DEF', 205, 660), pos(S.fire, 'DEF', 395, 660), pos(S.supa, 'DEF', 525, 660),
      pos(S.react,  'MID', 205, 540), pos(S.api,   'MID', 395, 540),
      pos(S.prisma, 'MID', 120, 390), pos(S.js,    'MID', 300, 380), pos(S.tw,   'MID', 480, 390),
      pos(S.cpp,    'FWD', 300, 235),
    ],
  },
];

export const BENCH_PLAYERS: Player[] = [
  {
    id: 'bench1',
    name: 'Python',
    position: 'BENCH',
    rating: 78,
    icon: 'Py',
    iconUrl: `${DI}/python/python-original.svg`,
    experience: 3,
    role: 'Scripting, data processing, ML basics',
    x: 0,
    y: 0,
  },
  {
    id: 'bench2',
    name: 'Docker',
    position: 'BENCH',
    rating: 75,
    icon: 'Dock',
    iconUrl: `${DI}/docker/docker-original.svg`,
    experience: 1,
    role: 'Containerization, dev environments',
    x: 0,
    y: 0,
  },
  {
    id: 'bench3',
    name: 'Java',
    position: 'BENCH',
    rating: 76,
    icon: 'Java',
    iconUrl: `${DI}/java/java-original.svg`,
    experience: 2,
    role: 'OOP fundamentals, coursework, DSA',
    x: 0,
    y: 0,
  },
  {
    id: 'bench4',
    name: 'Razorpay',
    position: 'BENCH',
    rating: 74,
    icon: 'Rp',
    iconUrl: `${SI}/razorpay/3395FF`,
    experience: 1,
    role: 'Payment integration, webhooks — PawPal',
    x: 0,
    y: 0,
  },
];

// ─── PROJECTS ────────────────────────────────────────────────────────────────
// Update liveUrl / githubUrl with your actual links

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Syncifi',
    role: 'Midfielder — AI Productivity',
    techStack: ['Next.js', 'React', 'Prisma', 'Supabase', 'Google APIs'],
    stars: 5,
    description:
      'AI-assisted productivity platform that turns Gmail threads into Google Calendar events. Parses emails to extract deadlines, routes them through a queue-based approval flow with duplicate detection, and syncs approved items via Google APIs — secured with OAuth on a type-safe Prisma + Supabase data layer.',
    highlights: ['Gmail ↔ Calendar Sync', 'AI Deadline Extraction', 'Google OAuth 2.0', 'Queue Approval Flow', 'Duplicate Prevention', 'Prisma + Supabase'],
    liveUrl: 'https://syncifi.tech',
    githubUrl: '#',
    techCount: 5,
    complexity: 'Elite',
  },
  {
    id: 'p2',
    name: 'ZeroPlate',
    role: 'Forward — Social Impact',
    techStack: ['Next.js', 'React', 'Firebase', 'Geolocation API'],
    stars: 4,
    description:
      'Food-waste redistribution platform connecting surplus-food donors with nearby NGOs before food expires. Geolocation-based NGO discovery, real-time donation analytics on Firebase, voice-based feedback, and coordination tools for shelters and donors.',
    highlights: ['Geolocation NGO Discovery', 'Real-time Analytics', 'Firebase Auth + DB', 'Voice Feedback', 'NGO Coordination', 'Mobile-first UI'],
    liveUrl: 'https://zeroplate.vercel.app',
    githubUrl: '#',
    techCount: 4,
    complexity: 'Professional',
  },
  {
    id: 'p3',
    name: 'PawPal',
    role: 'Striker — Full Stack Platform',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Razorpay'],
    stars: 4,
    description:
      'End-to-end MERN pet adoption platform with separate role-based dashboards for adopters and shelters. Covers the full adoption lifecycle — searchable listings with advanced filters, application submission and status tracking — plus a secure Razorpay donation flow with webhook verification.',
    highlights: ['Razorpay + Webhooks', 'Role-based Dashboards', 'Adoption Lifecycle', 'Advanced Search Filters', 'Express REST API', 'MERN Architecture'],
    liveUrl: 'https://pawpal-psi.vercel.app',
    githubUrl: '#',
    techCount: 5,
    complexity: 'Professional',
  },
];

// ─── TRANSFER TIMELINE ────────────────────────────────────────────────────────

// ─── LOGO INSTRUCTIONS ───────────────────────────────────────────────────────
// Drop logo files into /public/logos/ and set logoUrl below.
// Recommended: square PNG/SVG, at least 80×80px, transparent background.
// Leave logoUrl undefined to show the initials badge as fallback.

export const TIMELINE: TransferEntry[] = [
  {
    club: 'Wiglo.ai',
    initials: 'WG',
    // logoUrl: '/logos/wiglo.png',
    color: '#a78bfa',
    role: 'Full Stack Developer Intern',
    startYear: 'Jun 2026',
    endYear: 'Present',
    transferType: 'PERMANENT',
    isCurrent: true,
    skillNote: 'Building: AI product features end-to-end — LLM integrations, prompt pipelines, and full-stack delivery in a fast-moving startup',
  },
  {
    club: 'MyEzz',
    initials: 'ME',
    logoUrl: '/logos/myezz.svg',
    color: '#4ade80',
    role: 'Full Stack Developer Intern',
    startYear: 'Nov 2025',
    endYear: 'Feb 2026',
    transferType: 'PERMANENT',
    isCurrent: false,
    skillNote: 'Gained: shipped features on a live food-delivery platform — REST API optimization, debugging issues reported by real users in production',
  },
  {
    club: 'WE DISTRICT',
    initials: 'WD',
    logoUrl: '/logos/we-district.png',
    logoFit: 'cover',
    color: '#60a5fa',
    role: 'Full Stack Developer Intern',
    startYear: 'Dec 2025',
    endYear: 'Jan 2026',
    transferType: 'LOAN',
    isCurrent: false,
    skillNote: 'Built & deployed the NGO\'s website end-to-end on Supabase; cut page latency 40% through query and asset optimization',
  },
  {
    club: 'Credence HR Services',
    initials: 'CR',
    logoUrl: '/logos/credence.svg',
    logoSize: 'lg',
    color: '#a78bfa',
    role: 'Research Intern',
    startYear: 'May 2025',
    endYear: 'Jul 2025',
    transferType: 'LOAN',
    isCurrent: false,
    skillNote: 'Built: InductX employee-onboarding workflows with PlayFab gamification; researched & mapped HR-aligned user journeys',
  },
  {
    club: 'K.J. Somaiya College of Engineering',
    initials: 'KJ',
    // logoUrl: '/logos/kj-somaiya.png',
    color: '#f97316',
    role: 'B.Tech Computer Engineering — CGPA 9.5',
    startYear: 'Jul 2023',
    endYear: 'May 2027',
    transferType: 'PERMANENT',
    isCurrent: false,
    skillNote: 'Foundation: DSA, OOP, OS, algorithms — CGPA 9.5, ICPC Asia West AIR 251, CodeChef 3★ (1605)',
  },
];
