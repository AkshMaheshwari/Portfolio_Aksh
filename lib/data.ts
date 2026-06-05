import type { Player, Project, TransferEntry } from '@/types';

export const PERSONAL = {
  name: 'Aksh Maheshwari',
  firstName: 'Aksh',
  lastName: 'Maheshwari',
  github: 'AkshMaheshwari',         // ← update to your exact GitHub username
  role: 'Full Stack Developer',
  jerseyNumber: 10,
  club: 'Free Agent',
  nationality: 'India',
  openToWork: true,
};

// ─── 4-3-3 FORMATION ────────────────────────────────────────────────────────
// GK  = foundational skill
// DEF = backend / database / infra
// MID = core frameworks
// FWD = frontend / UI / CP strength
// x, y = SVG coordinates on the pitch (do not change)

export const FORMATION: Player[] = [
  // GK
  {
    id: 'gk',
    name: 'Next.js',
    position: 'GK',
    rating: 92,
    icon: 'Nx',
    experience: 3,
    role: 'Primary framework — SSR, App Router, server actions, full-stack across all projects',
    x: 300,
    y: 820,
  },
  // DEF
  {
    id: 'def1',
    name: 'Node.js',
    position: 'DEF',
    rating: 85,
    icon: 'Node',
    experience: 3,
    role: 'Server-side runtime, Express APIs, MERN stack backbone',
    x: 90,
    y: 640,
  },
  {
    id: 'def2',
    name: 'MongoDB',
    position: 'DEF',
    rating: 83,
    icon: 'MDB',
    experience: 2,
    role: 'NoSQL document modeling, aggregations, MERN stack DB layer',
    x: 210,
    y: 640,
  },
  {
    id: 'def3',
    name: 'Firebase',
    position: 'DEF',
    rating: 84,
    icon: 'Fire',
    experience: 2,
    role: 'Real-time DB, cloud auth, storage — used in ZeroPlate',
    x: 390,
    y: 640,
  },
  {
    id: 'def4',
    name: 'Supabase',
    position: 'DEF',
    rating: 86,
    icon: 'Supa',
    experience: 2,
    role: 'Postgres BaaS, realtime, Row Level Security — Syncifi & WE DISTRICT',
    x: 510,
    y: 640,
  },
  // MID
  {
    id: 'mid1',
    name: 'React',
    position: 'MID',
    rating: 91,
    icon: 'Re',
    experience: 3,
    role: 'Component architecture, hooks, context — used across every project',
    x: 155,
    y: 460,
  },
  {
    id: 'mid2',
    name: 'REST & OAuth',
    position: 'MID',
    rating: 87,
    icon: 'API',
    experience: 3,
    role: 'REST API design, Google OAuth, secure auth flows, integration patterns',
    x: 300,
    y: 440,
  },
  {
    id: 'mid3',
    name: 'Prisma',
    position: 'MID',
    rating: 82,
    icon: 'Pr',
    experience: 1,
    role: 'Type-safe ORM, schema-first migrations, used in Syncifi',
    x: 445,
    y: 460,
  },
  // FWD
  {
    id: 'fwd1',
    name: 'JavaScript',
    position: 'FWD',
    rating: 90,
    icon: 'JS',
    experience: 4,
    role: 'Full-stack JS, async/await, browser APIs, event-driven patterns',
    x: 155,
    y: 255,
  },
  {
    id: 'fwd2',
    name: 'C++  (CP)',
    position: 'FWD',
    rating: 86,
    icon: 'C++',
    experience: 4,
    role: 'Competitive programming, DSA, algorithms — ICPC AIR 250 Asia West',
    x: 300,
    y: 235,
  },
  {
    id: 'fwd3',
    name: 'Tailwind CSS',
    position: 'FWD',
    rating: 83,
    icon: 'TW',
    experience: 2,
    role: 'Rapid responsive UI, dark themes, component design systems',
    x: 445,
    y: 255,
  },
];

export const BENCH_PLAYERS: Player[] = [
  {
    id: 'bench1',
    name: 'Python',
    position: 'BENCH',
    rating: 78,
    icon: 'Py',
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
      'AI-assisted productivity platform that syncs Gmail emails with Google Calendar workflows. Extracts deadlines from email threads via a queue-based approval system.',
    highlights: ['Gmail ↔ Calendar Sync', 'Google OAuth', 'Queue Approval System', 'Duplicate Prevention'],
    liveUrl: '#',        // ← add your demo link
    githubUrl: '#',      // ← add your GitHub repo link
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
      'Food waste management platform with real-time analytics, NGO coordination, and location-based NGO discovery to efficiently redistribute surplus food.',
    highlights: ['Real-time Analytics', 'NGO Discovery', 'Voice Feedback', 'Geolocation API'],
    liveUrl: '#',
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
      'Pet adoption platform with role-based dashboards for users and animal shelters. Secure Razorpay donation flow, advanced listing filters, and application tracking.',
    highlights: ['Razorpay Payments', 'Role-based Dashboards', 'Advanced Filters', 'Application Tracking'],
    liveUrl: '#',
    githubUrl: '#',
    techCount: 5,
    complexity: 'Professional',
  },
];

// ─── TRANSFER TIMELINE ────────────────────────────────────────────────────────

export const TIMELINE: TransferEntry[] = [
  {
    club: 'Free Agent',
    initials: 'FA',
    color: '#f5c518',
    role: 'Full Stack Developer — Open to Opportunities',
    startYear: 'Feb 2026',
    endYear: 'Present',
    transferType: 'FREE TRANSFER',
    isCurrent: true,
    skillNote: 'Building: personal projects, open-source contributions, seeking internship / full-time roles',
  },
  {
    club: 'MyEzz',
    initials: 'ME',
    color: '#4ade80',
    role: 'Full Stack Developer Intern',
    startYear: 'Nov 2025',
    endYear: 'Feb 2026',
    transferType: 'PERMANENT',
    isCurrent: false,
    skillNote: 'Gained: production food delivery platform, REST API optimization, real-user debugging at scale',
  },
  {
    club: 'WE DISTRICT',
    initials: 'WD',
    color: '#60a5fa',
    role: 'Full Stack Developer Intern',
    startYear: 'Dec 2025',
    endYear: 'Jan 2026',
    transferType: 'LOAN',
    isCurrent: false,
    skillNote: 'Built & deployed NGO website with Supabase; slashed latency by 40% through perf optimization',
  },
  {
    club: 'Credence HR Services',
    initials: 'CR',
    color: '#a78bfa',
    role: 'Research Intern',
    startYear: 'May 2025',
    endYear: 'Jul 2025',
    transferType: 'LOAN',
    isCurrent: false,
    skillNote: 'Built: InductX onboarding workflows, PlayFab gamification, HR-aligned journey research',
  },
  {
    club: 'K.J. Somaiya College',
    initials: 'KJ',
    color: '#f97316',
    role: 'B.Tech Computer Engineering — CGPA 9.5',
    startYear: 'Jul 2023',
    endYear: 'May 2027',
    transferType: 'PERMANENT',
    isCurrent: false,
    skillNote: 'Foundation: DSA, OOP, algorithms, OS — ICPC AIR 250 Asia West, CodeChef 3★ (1605)',
  },
];
