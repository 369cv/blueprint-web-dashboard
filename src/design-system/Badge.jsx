// Ported from _ds_bundle.js — components/data-display/Badge.jsx
export default function Badge({ label, color = 'var(--color-cat-blue)', count, tone = 'dot' }) {
  if (tone === 'solid') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '3px 9px',
          borderRadius: 'var(--radius-sm)',
          background: color,
          color: '#fff',
          font: '700 10.5px var(--font-sans)',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 16px',
        borderRadius: 'var(--radius-pill)',
        background: '#fff',
        border: '1px solid var(--color-border)',
        font: '600 14px var(--font-sans)',
        color: 'var(--color-text-primary)',
      }}
    >
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: color }} />
      {label}
      {count != null && (
        <span
          style={{
            padding: '1px 8px',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--color-surface-sunken)',
            color: 'var(--color-text-secondary)',
            font: '600 12px var(--font-sans)',
          }}
        >
          {count}
        </span>
      )}
    </span>
  );
}
