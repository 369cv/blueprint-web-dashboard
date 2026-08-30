import { useState } from 'react';
import { SearchInput, Button, Icon } from '../design-system/index.js';
import { BlueprintCard } from '../data/blueprintData.js';

function formatViews(n) {
  if (typeof n !== 'number') return n;
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

export default function DiscoverScreen({ onOpenOutlier, onOpenFilters, activeNiches, discoverItems }) {
  const [query, setQuery] = useState('');
  const shared = discoverItems || [];
  const active = activeNiches || [];
  const q = query.trim().toLowerCase();
  const DISCOVER_POSTS = shared.filter((p) => (active.length === 0 || active.includes(p.niche)) && (q === '' || p.caption.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)));
  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>EXPLORE</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)' }}>
            Find your next <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>outlier</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>Viral posts beating their creator's own average — save the best to Inspo.</div>
        </div>
        <span style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--color-accent-soft-bg)', color: 'var(--color-accent)', font: '600 12.5px var(--font-mono)' }}>1 / 20 tracked</span>
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 22 }}>
        <SearchInput placeholder="Search viral posts, hooks, creators…" value={query} onChange={setQuery} style={{ flex: 1 }} />
        <Button variant="secondary" icon="filter" onClick={onOpenFilters}>
          Filters
        </Button>
      </div>
      <div style={{ font: '600 12px var(--font-mono)', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', marginBottom: 18 }}>
        {DISCOVER_POSTS.length} RESULTS{active.length ? ' · FILTERED BY ' + active.join(', ').toUpperCase() : ''} · SORTED BY OUTLIER · LIVE FROM BLUEPRINT
      </div>
      {DISCOVER_POSTS.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--color-border-strong)', borderRadius: 'var(--radius-lg)', padding: '48px 0', textAlign: 'center', color: 'var(--color-text-secondary)' }}>No posts match "{query}".</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {DISCOVER_POSTS.map((p, i) => {
            const tint = BlueprintCard.tint(i);
            const scoreColor = BlueprintCard.scoreColor(i);
            return (
              <div key={p.id || i} onClick={() => onOpenOutlier(p)} style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: `linear-gradient(160deg, ${tint}, var(--color-text-primary))` }}>
                  {p.thumbnailUrl && <img src={p.thumbnailUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <div style={{ position: 'absolute', inset: 0, background: tint, opacity: 0.45, mixBlendMode: 'multiply' }} />
                  <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(20,20,20,0.7)', color: '#fff', font: '600 11px var(--font-sans)' }}>{p.niche}</span>
                  <span style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 9px', borderRadius: 'var(--radius-pill)', background: scoreColor, color: '#fff', font: '700 12px var(--font-mono)' }}>
                    <Icon name="zap" size={11} color="#fff" />
                    {p.score}
                  </span>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="play" size={18} color="#fff" />
                  </div>
                </div>
                <div style={{ padding: '12px 2px' }}>
                  <div style={{ font: '700 14px/1.35 var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 4 }}>{p.caption}</div>
                  <div style={{ font: '400 12px var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                    {p.author} · {formatViews(p.views)} views
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
