// Ported from _ds_bundle.js — components/data-display/Avatar.jsx
const PALETTE = ['var(--color-cat-purple)', 'var(--color-cat-pink)', 'var(--color-cat-orange)', 'var(--color-cat-green)', 'var(--color-cat-blue)', 'var(--color-cat-magenta)'];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function Avatar({ initial, imageUrl, size = 40 }) {
  const color = PALETTE[hash(initial || '?') % PALETTE.length];
  if (imageUrl) {
    return <img src={imageUrl} width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover' }} />;
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: `700 ${size * 0.42}px var(--font-sans)`,
      }}
    >
      {(initial || '?').slice(0, 1).toUpperCase()}
    </div>
  );
}
