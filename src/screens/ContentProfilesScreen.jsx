import { useState } from 'react';
import { Button, Avatar } from '../design-system/index.js';

export default function ContentProfilesScreen({ personas, onOpenCreate, onEditPersona, onDeletePersona }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const list = personas && personas.length ? personas : [{ id: 'p1', name: 'Money Tracker', profileType: 'creator' }];
  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>CONTENT PROFILES</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)' }}>
            Your content <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>profiles</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>Give Blueprint context on who each profile creates for so every idea and script fits.</div>
        </div>
        <Button variant="primary" icon="plus" onClick={onOpenCreate}>
          Create profile
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {list.map((p, i) => (
          <div key={p.id || i} style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 24, maxWidth: 480 }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <Avatar initial={p.name[0]} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ font: '700 17px var(--font-sans)' }}>{p.name}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--color-accent-soft-bg)', color: 'var(--color-accent)', font: '600 11.5px var(--font-sans)' }}>Creator</span>
                    {i === 0 && <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-pill)', background: 'var(--color-success-bg)', color: 'var(--color-success)', font: '600 11.5px var(--font-sans)' }}>Default</span>}
                  </div>
                </div>
                <div style={{ font: '400 14px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 6 }}>{p.niche || (p.profileType ? 'Type: ' + p.profileType : '')}</div>
                {typeof p.refCount === 'number' && <div style={{ font: '400 13px var(--font-sans)', color: 'var(--color-text-tertiary)', marginTop: 12 }}>{p.refCount} references</div>}
                {confirmDeleteId === p.id ? (
                  <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center' }}>
                    <span style={{ font: '500 13px var(--font-sans)', color: 'var(--color-danger)' }}>Delete this profile?</span>
                    <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteId(null)}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        onDeletePersona && onDeletePersona(p.id);
                        setConfirmDeleteId(null);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                    <Button variant="secondary" size="sm" onClick={() => onEditPersona && onEditPersona(p)}>
                      Edit
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteId(p.id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
