import { Button, Avatar, Icon } from '../design-system/index.js';
import { BlueprintCard } from '../data/blueprintData.js';

function formatCompact(n) {
  if (n == null) return '';
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function TrackedCreatorsScreen({ tracked, onOpenTrackModal, filterHandle, onFilterHandle, trackedCreatorPosts }) {
  const creators = tracked || [];
  const postsById = trackedCreatorPosts || {};
  const active = filterHandle ? creators.find((c) => c.handle === filterHandle) : null;
  const scoredPosts = (creatorId, handle) => {
    const posts = postsById[creatorId] || [];
    const avg = posts.length ? posts.reduce((sum, p) => sum + p.views, 0) / posts.length : 0;
    return posts.map((p) => ({ category: p.format, caption: p.hook, views: p.views, timeAgo: formatDate(p.date), author: handle, score: avg ? (p.views / avg).toFixed(1) + 'x' : '—' }));
  };
  const activePosts = active ? scoredPosts(active.id, active.handle) : [];
  const combinedPosts = active ? activePosts : creators.flatMap((c) => scoredPosts(c.id, c.handle));

  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>EXPLORE</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)' }}>
            Creators you <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>track</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>Follow competitors — tap a creator to see just their posts.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ padding: '6px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--color-accent-soft-bg)', color: 'var(--color-accent)', font: '600 12.5px var(--font-mono)' }}>{creators.length} / 20 tracked</span>
          <Button variant="primary" icon="plus" onClick={onOpenTrackModal}>
            Track a creator
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
        {creators.map((c) => (
          <div key={c.handle} onClick={() => onFilterHandle(filterHandle === c.handle ? null : c.handle)} style={{ width: 110, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: 110, height: 110, borderRadius: 'var(--radius-lg)', background: '#fff', border: `1px solid ${filterHandle === c.handle ? 'var(--color-accent)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Avatar initial={c.name[0]} size={44} />
              <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
            </div>
            <div style={{ font: '600 13px var(--font-sans)', marginTop: 8 }}>{c.handle}</div>
          </div>
        ))}
        <div onClick={onOpenTrackModal} style={{ width: 110, height: 110, borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)', font: '500 12.5px var(--font-sans)', textAlign: 'center', cursor: 'pointer' }}>
          + Track a creator
        </div>
      </div>
      {active && <div style={{ font: '400 12.5px var(--font-sans)', color: 'var(--color-text-tertiary)', marginBottom: 20 }}>{active.trend}</div>}
      {!active && <div style={{ marginBottom: 20 }} />}
      <div style={{ font: '700 20px var(--font-sans)', marginBottom: 16 }}>{active ? 'New from ' + active.handle : 'Latest from your creators'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {combinedPosts.length === 0 && <div style={{ font: '400 14px var(--font-sans)', color: 'var(--color-text-secondary)' }}>No posts synced yet for this creator.</div>}
        {combinedPosts.map((p, i) => {
          const tint = BlueprintCard.tint(i + 2);
          const scoreColor = BlueprintCard.scoreColor(i + 2);
          return (
            <div key={i}>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: `linear-gradient(160deg, ${tint}, var(--color-text-primary))` }}>
                <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(20,20,20,0.7)', color: '#fff', font: '600 11px var(--font-sans)' }}>{p.category}</span>
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
                  {p.author} · {formatCompact(p.views)} views
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
