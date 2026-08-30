// Ported from _ds_bundle.js — components/forms/SearchInput.jsx
import Icon from './Icon.jsx';

export default function SearchInput({ placeholder = 'Search…', value, onChange, style }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 16px',
        background: '#fff',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      <Icon name="search" size={17} color="var(--color-text-tertiary)" />
      <input
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          border: 'none',
          outline: 'none',
          flex: 1,
          font: '400 14.5px var(--font-sans)',
          color: 'var(--color-text-primary)',
          background: 'transparent',
        }}
      />
    </div>
  );
}
