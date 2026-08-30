// Ported from _ds_bundle.js — components/data-display/SettingsRow.jsx
import Icon from './Icon.jsx';

export default function SettingsRow({ icon, title, subtitle, danger = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '18px 20px',
        cursor: 'pointer',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 'var(--radius-md)',
          background: danger ? 'var(--color-danger-bg)' : 'var(--color-surface-sunken)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name={icon} size={17} color={danger ? 'var(--color-danger)' : 'var(--color-text-secondary)'} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ font: '600 15px var(--font-sans)', color: danger ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>{title}</div>
        {subtitle && <div style={{ font: '400 13.5px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 2 }}>{subtitle}</div>}
      </div>
      <Icon name="chevronRight" size={16} color="var(--color-text-tertiary)" />
    </div>
  );
}
