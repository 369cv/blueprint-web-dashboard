// Ported from _ds_bundle.js — components/core/Button.jsx
import Icon from './Icon.jsx';

const SIZES = {
  sm: { padding: '7px 14px', fontSize: 13, gap: 6 },
  md: { padding: '10px 18px', fontSize: 14.5, gap: 7 },
};

function look(variant, disabled) {
  if (disabled) {
    return { background: 'var(--color-surface-sunken)', color: 'var(--color-text-tertiary)', border: '1px solid var(--color-border)' };
  }
  switch (variant) {
    case 'primary':
      return { background: 'var(--color-accent)', color: '#fff', border: '1px solid var(--color-accent)' };
    case 'danger':
      return { background: '#fff', color: 'var(--color-danger)', border: '1px solid var(--color-border)' };
    case 'ghost':
      return { background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid transparent' };
    default:
      return { background: '#fff', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' };
  }
}

export default function Button({ variant = 'secondary', size = 'md', icon, iconPosition = 'left', children, onClick, disabled = false, style }) {
  const s = SIZES[size];
  const l = look(variant, disabled);
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background .15s ease, opacity .15s ease',
        ...l,
        ...style,
      }}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={16} />}
      {children}
      {icon && iconPosition === 'right' && <Icon name={icon} size={16} />}
    </button>
  );
}
