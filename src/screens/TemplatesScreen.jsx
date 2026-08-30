import { Badge, Button } from '../design-system/index.js';

export default function TemplatesScreen({ onNavigate, templates, onUseTemplate }) {
  const TEMPLATES =
    templates && templates.length
      ? templates
      : [
          { hook: 'deep sleep core', status: 'Hook Only' },
          { hook: 'Girl therapy', status: 'Hook Only' },
          { hook: "If you're managing a real estate portfolio and want to get started with Claude, this video is for you.", status: 'AI Template Ready' },
        ];
  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>TEMPLATES</div>
      <div style={{ font: '800 44px/1.05 var(--font-sans)', marginBottom: 10 }}>
        Your saved <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>hooks</em>
      </div>
      <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 26 }}>
        {TEMPLATES.length} saved · {TEMPLATES.filter((t) => t.status === 'AI Template Ready').length} with AI templates ready to remix
      </div>
      {TEMPLATES.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--color-border-strong)', borderRadius: 'var(--radius-lg)', padding: '64px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          <div style={{ font: '700 17px var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 6 }}>Your saved hooks</div>
          <div style={{ font: '400 14px var(--font-sans)' }}>Save a hook from any outlier's detail page — it'll show up here.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {TEMPLATES.map((t, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid var(--color-border)', borderLeft: `4px solid var(--color-cat-green)`, borderRadius: 'var(--radius-lg)', padding: 24 }}>
              <div style={{ color: 'var(--color-accent-soft-text)', fontSize: 20, marginBottom: 12 }}>"</div>
              <div style={{ font: 'italic 400 19px/1.4 var(--font-serif)', marginBottom: 18 }}>{t.hook}</div>
              <Badge tone="dot" label={t.status} color={t.status === 'AI Template Ready' ? 'var(--color-success)' : 'var(--color-gold)'} />
              <div style={{ marginTop: 16 }}>
                <Button variant={t.status === 'AI Template Ready' ? 'primary' : 'secondary'} icon="sparkles" size="sm" onClick={() => onUseTemplate && onUseTemplate(t)}>
                  {t.status === 'AI Template Ready' ? 'Remix into script' : 'Use template'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
