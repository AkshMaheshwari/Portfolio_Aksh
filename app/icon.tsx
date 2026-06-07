import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#1a3a24',
          border: '2px solid #f5c518',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#f5c518',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          AM
        </span>
      </div>
    ),
    { ...size }
  );
}
