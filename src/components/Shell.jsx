import { Avatar, SidebarNavItem, TopBar } from '../design-system';

const WORKSPACE = [
  ['calendar', 'Calendar'],
  ['grid', 'Inspo'],
  ['fileText', 'Scripts'],
  ['bookmark', 'Templates'],
  ['zap', 'Ideas'],
  ['sparkles', 'Content Profiles'],
];
const RESEARCH = [
  ['compass', 'Discover'],
  ['eye', 'Tracked creators'],
];

export default function Shell({ active, onNavigate, children, title, actionLabel, onAction }) {
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 900, background: 'var(--color-bg)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: 240, borderRight: '1px solid var(--color-border)', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ font: '700 22px var(--font-sans)', padding: '0 8px 24px', color: 'var(--color-text-primary)' }}>Blueprint</div>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', padding: '0 8px 6px' }}>WORKSPACE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 20 }}>
            {WORKSPACE.map(([icon, label]) => (
              <SidebarNavItem key={label} icon={icon} label={label} active={active === label} onClick={() => onNavigate(label)} />
            ))}
          </div>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', padding: '0 8px 6px' }}>RESEARCH</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {RESEARCH.map(([icon, label]) => (
              <SidebarNavItem key={label} icon={icon} label={label} active={active === label} onClick={() => onNavigate(label)} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ height: 1, background: 'var(--color-border)', margin: '0 8px 14px' }} />
          <div onClick={() => onNavigate('Settings')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', cursor: 'pointer' }}>
            <Avatar initial="S" size={34} />
            <div>
              <div style={{ font: '600 14px var(--font-sans)' }}>Savage</div>
              <div style={{ font: '400 12.5px var(--font-sans)', color: 'var(--color-text-secondary)' }}>Visionary plan</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <TopBar title={title} actionLabel={actionLabel} onAction={onAction} />
        <div style={{ padding: '40px', flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
