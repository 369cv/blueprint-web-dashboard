import { Badge, Button } from '../design-system/index.js';

export default function OutlierDetailScreen({ post, onSaveToInspo, saved, onRemix, onSaveTemplate, templateSaved, category, onOpenCategoryPicker, description, onDescriptionChange, notes, onNotesChange }) {
  if (!post) return null;
  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>OUTLIER DETAIL</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {(post.niche || '')
          .split('/')
          .filter(Boolean)
          .map((n) => (
            <Badge key={n} tone="solid" label={n.trim()} color="var(--color-cat-blue)" />
          ))}
        <span onClick={onOpenCategoryPicker} style={{ cursor: 'pointer', padding: '4px 12px', borderRadius: 'var(--radius-pill)', border: '1px dashed var(--color-border-strong)', color: 'var(--color-text-secondary)', font: '600 12px var(--font-sans)' }}>
          {category || 'Set category'}
        </span>
      </div>
      <div style={{ height: 220, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-sunken)', marginBottom: 20, overflow: 'hidden' }}>{post.thumbnailUrl && <img src={post.thumbnailUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}</div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-pill)', background: 'var(--color-accent-soft-bg)', color: 'var(--color-accent)', font: '700 12.5px var(--font-mono)' }}>{post.score} outlier</span>
        <span style={{ font: '400 13px var(--font-sans)', color: 'var(--color-text-secondary)' }}>
          {post.author} · {typeof post.views === 'number' ? post.views.toLocaleString() : post.views} views
        </span>
        {post.url && (
          <a href={post.url} target="_blank" rel="noreferrer" style={{ font: '600 12.5px var(--font-sans)', color: 'var(--color-accent)' }}>
            View original ↗
          </a>
        )}
      </div>

      {post.hasSpokenHook && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>SPOKEN HOOK</div>
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 18, font: 'italic 500 18px/1.5 var(--font-serif)' }}>"{post.spokenHook}"</div>
        </div>
      )}
      <div style={{ marginBottom: 20 }}>
        <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>{post.hasSpokenHook ? 'VISUAL HOOK' : 'HOOK'}</div>
        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 18, font: post.hasSpokenHook ? '400 14.5px/1.5 var(--font-sans)' : 'italic 500 18px/1.5 var(--font-serif)', color: 'var(--color-text-primary)' }}>{post.visualHook || post.caption}</div>
      </div>

      <div style={{ background: 'var(--color-accent-soft-bg)', borderRadius: 'var(--radius-lg)', padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ font: '700 13px var(--font-sans)', color: 'var(--color-accent)' }}>AI ANALYSIS · WHY THIS WORKS</span>
          {post.format && <Badge tone="solid" label={'Format: ' + post.format} color="var(--color-accent)" />}
        </div>
        <div style={{ font: '400 14px/1.6 var(--font-sans)', color: 'var(--color-text-primary)' }}>Full hook-pattern analysis isn't available from Blueprint's research API for this post — only the metrics and hook text shown here are real account data.</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)' }}>TRANSCRIPT</span>
          <Badge tone="dot" label="Not captured" color="var(--color-text-tertiary)" />
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 18, font: '400 14px/1.7 var(--font-sans)', color: 'var(--color-text-tertiary)' }}>
          Transcript not available for this post — Blueprint's research API returns the hook and engagement metrics, not a full transcript.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        <div>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>ENGAGEMENT</div>
          <div style={{ font: '400 13.5px var(--font-sans)' }}>
            {post.likes != null ? post.likes.toLocaleString() + ' likes · ' : ''}
            {post.comments != null ? post.comments.toLocaleString() + ' comments' : ''}
            {post.shares != null ? ' · ' + post.shares.toLocaleString() + ' shares' : ''}
          </div>
        </div>
        <div>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>CAPTION</div>
          <div style={{ font: '400 13.5px var(--font-sans)' }}>{post.caption}</div>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>DESCRIPTION</div>
        <textarea value={description} onChange={(e) => onDescriptionChange(e.target.value)} placeholder="Add a description…" style={{ width: '100%', minHeight: 60, padding: 12, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', font: '400 13.5px var(--font-sans)', boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>NOTES</div>
        <textarea value={notes} onChange={(e) => onNotesChange(e.target.value)} placeholder="Private notes for yourself…" style={{ width: '100%', minHeight: 60, padding: 12, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', font: '400 13.5px var(--font-sans)', boxSizing: 'border-box' }} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        {!saved && (
          <Button variant="primary" icon="bookmark" onClick={onSaveToInspo}>
            Save to Inspo
          </Button>
        )}
        {saved && (
          <Button variant="primary" icon="sparkles" onClick={onRemix}>
            Remix into script
          </Button>
        )}
        <Button variant="secondary" icon={templateSaved ? 'check' : 'fileText'} onClick={onSaveTemplate} disabled={templateSaved}>
          {templateSaved ? 'Saved as Template' : 'Save as Template'}
        </Button>
      </div>
    </div>
  );
}
