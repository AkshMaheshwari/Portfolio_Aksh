import type { GitHubStats } from '@/types';

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error('GitHub API error');
  }

  const user = await userRes.json();
  const repos: Array<{ stargazers_count: number; language: string | null }> = await reposRes.json();

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const langCount: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  const preferredLanguage =
    Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A';

  return {
    totalRepos: (user.public_repos as number) + ((user.total_private_repos as number) || 0),
    publicRepos: user.public_repos as number,
    followers: user.followers as number,
    totalStars,
    preferredLanguage,
    proSince: new Date(user.created_at as string).getFullYear(),
  };
}
