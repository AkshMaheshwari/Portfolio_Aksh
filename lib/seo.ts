import { PERSONAL } from '@/lib/data';

export const SITE_URL = 'https://akshmaheshwari.com';
export const SITE_NAME = 'Aksh Maheshwari Portfolio';
export const SITE_TITLE = 'Aksh Maheshwari — Full Stack Developer';
export const SITE_DESCRIPTION =
  'Aksh Maheshwari — Full Stack Developer from India. Building with Next.js, React, Node.js, Supabase and more. ICPC Asia West AIR 251. Open to internship & full-time roles.';

const GITHUB_URL = `https://github.com/${PERSONAL.github}`;
const LINKEDIN_URL = `https://linkedin.com/in/${PERSONAL.linkedin}`;

// Consumed as a single <script type="application/ld+json"> array in the root layout —
// keep this pure/static (no Date.now(), no request data) so its serialized output never
// changes between requests and the CSP script-src hash for it stays valid.
export function buildJsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.name,
    url: SITE_URL,
    jobTitle: PERSONAL.role,
    worksFor: {
      '@type': 'Organization',
      name: PERSONAL.club,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'K.J. Somaiya College of Engineering',
    },
    nationality: {
      '@type': 'Country',
      name: PERSONAL.nationality,
    },
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: [
      'Next.js',
      'React',
      'Node.js',
      'Supabase',
      'JavaScript',
      'TypeScript',
      'C++',
      'Competitive Programming',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    author: { '@type': 'Person', name: PERSONAL.name },
  };

  return [person, website];
}
