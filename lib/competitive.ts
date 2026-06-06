export interface CFStats {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  handle: string;
}

export interface LCStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  globalRanking: number;
}

export async function fetchCodeforcesStats(handle: string): Promise<CFStats> {
  const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('CF API error');
  const data = await res.json();
  if (data.status !== 'OK') throw new Error('CF API error');
  const user = data.result[0];
  return {
    rating: user.rating ?? 0,
    maxRating: user.maxRating ?? 0,
    rank: user.rank ?? 'unrated',
    maxRank: user.maxRank ?? 'unrated',
    handle: user.handle,
  };
}

export async function fetchLeetCodeStats(username: string): Promise<LCStats> {
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({
      query: `query { matchedUser(username: "${username}") { submitStats { acSubmissionNum { difficulty count } } profile { ranking } } }`,
    }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('LC API error');
  const data = await res.json();
  if (!data.data?.matchedUser) throw new Error('LC user not found');
  const user = data.data.matchedUser;
  const stats: { difficulty: string; count: number }[] = user.submitStats.acSubmissionNum;
  const find = (d: string) => stats.find((s) => s.difficulty === d)?.count ?? 0;
  return {
    totalSolved: find('All'),
    easySolved: find('Easy'),
    mediumSolved: find('Medium'),
    hardSolved: find('Hard'),
    globalRanking: user.profile.ranking,
  };
}
