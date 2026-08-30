import { useState } from 'react';
import { Badge, Icon } from '../design-system/index.js';
import { BlueprintCard } from '../data/blueprintData.js';

export default function InspoScreen({ categories, videos }) {
  const cats = categories || [];
  const vids = videos || [];
  const [categoryId, setCategoryId] = useState((cats[0] || {}).id);
  const category = cats.find((c) => c.id === categoryId) || cats[0];
  const filteredVideos = vids.filter((v) => v.category === categoryId);
  const totalVideos = vids.length;

  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>YOUR LIBRARY</div>
      <div style={{ font: '800 44px/1.05 var(--font-sans)', marginBottom: 10 }}>
        Saved <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>inspiration</em>
      </div>
      <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 22 }}>
        {totalVideos} videos saved · {cats.length} categories
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
        {cats.map((c) => (
          <div key={c.id} onClick={() => setCategoryId(c.id)} style={{ cursor: 'pointer', borderRadius: 'var(--radius-pill)', outline: categoryId === c.id ? '2px solid var(--color-accent)' : 'none' }}>
            <Badge tone="dot" label={c.label} color={c.color} count={vids.filter((v) => v.category === c.id).length} />
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 12 }} />
      <div style={{ font: '700 20px var(--font-sans)', marginBottom: 16 }}>
        {category ? category.label : ''} <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 500, fontSize: 15 }}>{filteredVideos.length}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
        {filteredVideos.length === 0 && <div style={{ font: '400 14px var(--font-sans)', color: 'var(--color-text-secondary)' }}>Nothing saved in this category yet.</div>}
        {filteredVideos.map((v, i) => {
          const tint = BlueprintCard.tint(i + 4);
          return (
            <div key={v.id || i}>
              <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: `linear-gradient(160deg, ${tint}, var(--color-text-primary))` }}>
                {v.thumbnailUrl && <img src={v.thumbnailUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                <div style={{ position: 'absolute', inset: 0, background: tint, opacity: 0.45, mixBlendMode: 'multiply' }} />
                <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 'var(--radius-pill)', background: 'rgba(20,20,20,0.7)', color: '#fff', font: '600 11px var(--font-sans)' }}>{category ? category.label : ''}</span>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="play" size={18} color="#fff" />
                </div>
              </div>
              <div style={{ padding: '12px 2px' }}>
                <div style={{ font: '700 14px/1.35 var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 4 }}>{v.caption}</div>
                <div style={{ font: '400 12px var(--font-sans)', color: 'var(--color-text-secondary)' }}>
                  {v.author} · {v.views}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
