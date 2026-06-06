export interface FormationConfig {
  name: string;
  label: string;
  players: Player[];
  posLabels: { text: string; y: number }[];
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD' | 'BENCH';
  rating: number;
  icon: string;
  experience: number;
  role: string;
  x: number;
  y: number;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  techStack: string[];
  stars: number;
  description: string;
  highlights: string[];
  liveUrl: string;
  githubUrl: string;
  techCount: number;
  complexity: 'Amateur' | 'Semi-Pro' | 'Professional' | 'Elite' | 'World Class';
}

export interface TransferEntry {
  club: string;
  initials: string;
  color: string;
  role: string;
  startYear: string;
  endYear: string;
  transferType: 'PERMANENT' | 'LOAN' | 'FREE TRANSFER';
  isCurrent: boolean;
  skillNote: string;
}

export interface GitHubStats {
  totalRepos: number;
  publicRepos: number;
  followers: number;
  totalStars: number;
  preferredLanguage: string;
  proSince: number;
}
