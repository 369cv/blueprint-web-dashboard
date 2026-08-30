// Ported from _ds_bundle.js — components/navigation/TopBar.jsx
import Button from './Button.jsx';

export default function TopBar({ title, actionLabel, actionIcon = 'plus', onAction }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{ font: '600 15px var(--font-sans)', color: 'var(--color-text-primary)' }}>{title}</div>
      {actionLabel && (
        <Button variant="primary" icon={actionIcon} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
