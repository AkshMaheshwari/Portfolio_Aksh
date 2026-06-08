import { NextRequest, NextResponse } from 'next/server';

const DAILY_LIMIT = 5;

// In-memory store: ip → { count, date }
const rateMap = new Map<string, { count: number; date: string }>();

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function isAllowed(ip: string): { ok: boolean; remaining: number } {
  const today = getToday();
  const entry = rateMap.get(ip);

  if (!entry || entry.date !== today) {
    rateMap.set(ip, { count: 1, date: today });
    return { ok: true, remaining: DAILY_LIMIT - 1 };
  }

  if (entry.count >= DAILY_LIMIT) {
    return { ok: false, remaining: 0 };
  }

  entry.count++;
  return { ok: true, remaining: DAILY_LIMIT - entry.count };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const { ok, remaining } = isAllowed(ip);

  if (!ok) {
    return NextResponse.json(
      { error: `Daily scouting limit reached (${DAILY_LIMIT}/day). Come back tomorrow.` },
      { status: 429 }
    );
  }

  const { team } = await req.json();

  if (!team || typeof team !== 'string') {
    return NextResponse.json({ error: 'No team provided' }, { status: 400 });
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 180,
      messages: [
        {
          role: 'system',
          content: `You are a savage football pundit writing brutally funny roasts for a hacker terminal.

Rules:
- Roast the CLUB only — their season, trophy drought, transfer mess, league finish, cup exits, managerial chaos, ownership, fanbase delusions. Never name or mock individual players.
- Only state facts you are highly confident about. If unsure of a specific result or stat, roast the broader narrative instead — the club's identity, spending vs results, historical embarrassments, title-winning odds.
- Focus on the most recent completed season (2024-25) or ongoing 2025-26 season if you have data.
- 3 punchy lines max. No emojis. No intro. No filler. Plain text only. Go straight for the jugular.`,
        },
        {
          role: 'user',
          content: `Roast ${team.trim()}.`,
        },
      ],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Groq request failed' }, { status: 500 });
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? '';

  return NextResponse.json({ roast: text, remaining });
}
