// Ported from _ds_bundle.js — components/navigation/SidebarNavItem.jsx
import Icon from './Icon.jsx';

export default function SidebarNavItem({ icon, label, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        background: active ? 'var(--color-accent-soft-bg)' : 'transparent',
        color: active ? 'var(--color-accent)' : 'var(--color-text-primary)',
        font: '500 15px var(--font-sans)',
      }}
    >
      <Icon name={icon} size={18} color={active ? 'var(--color-accent)' : 'var(--color-text-secondary)'} />
      {label}
    </div>
  );
}
