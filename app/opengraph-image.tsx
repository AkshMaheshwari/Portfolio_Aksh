import { ImageResponse } from 'next/og';
import { PERSONAL } from '@/lib/data';

export const alt = 'Aksh Maheshwari — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, #12321c 0%, #080f0a 60%), #080f0a',
          position: 'relative',
        }}
      >
        {/* Pitch corner border frame */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '2px solid rgba(245,197,24,0.35)',
            borderRadius: 20,
            display: 'flex',
          }}
        />

        {/* Jersey number badge */}
        <div
          style={{
            position: 'absolute',
            top: 64,
            right: 72,
            width: 96,
            height: 96,
            borderRadius: 999,
            border: '3px solid #f5c518',
            background: '#1a3a24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 42,
            fontWeight: 700,
            color: '#f5c518',
            letterSpacing: -1,
          }}
        >
          #{PERSONAL.jerseyNumber}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 10, height: 64, background: '#f5c518', display: 'flex' }} />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              color: '#f5c518',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            FULL STACK DEVELOPER
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 108,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: -2,
            marginTop: 18,
            lineHeight: 1.05,
          }}
        >
          {PERSONAL.name.toUpperCase()}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 30,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: 1,
          }}
        >
          Next.js · React · Node.js · Supabase · ICPC Asia West AIR 251
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 24,
            color: '#4ade80',
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          akshmaheshwari.com
        </div>
      </div>
    ),
    { ...size }
  );
}
