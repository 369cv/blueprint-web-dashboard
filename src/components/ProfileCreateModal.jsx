import { useState } from 'react';
import { Button } from '../design-system/index.js';

export default function ProfileCreateModal({ inspoVideos, initial, onClose, onCreate, onSave }) {
  const editing = !!initial;
  const [step, setStep] = useState(1);
  const [name, setName] = useState(initial ? initial.name : '');
  const [niche, setNiche] = useState(initial ? initial.niche : '');
  const [picked, setPicked] = useState([]);
  const videos = inspoVideos && inspoVideos.length ? inspoVideos : [{ caption: 'Nietzsche Quote on Independent Thinking' }, { caption: 'The Loneliness of Deep Ideas' }, { caption: 'The Nature of Good vs. Evil' }];
  const toggle = (i) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  if (editing) {
    return (
      <div onClick={(e) => e.stopPropagation()} style={{ width: 420, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ font: '700 18px var(--font-sans)', marginBottom: 16 }}>Edit content profile</div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Profile name" style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 10, font: '400 14px var(--font-sans)', boxSizing: 'border-box', marginBottom: 10 }} />
        <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Type / niche" style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 10, font: '400 14px var(--font-sans)', boxSizing: 'border-box', marginBottom: 20 }} />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!name.trim()} onClick={() => onSave({ ...initial, name, niche })}>
            Save changes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ width: 420, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ font: '700 18px var(--font-sans)', marginBottom: 16 }}>{step === 1 ? 'Create a content profile' : 'Attach reference videos'}</div>
      {step === 1 ? (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Profile name" style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 10, font: '400 14px var(--font-sans)', boxSizing: 'border-box', marginBottom: 10 }} />
          <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Type / niche (e.g. Real estate investing)" style={{ width: '100%', padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 10, font: '400 14px var(--font-sans)', boxSizing: 'border-box', marginBottom: 20 }} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" disabled={!name.trim()} onClick={() => setStep(2)}>
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ font: '400 13px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 14 }}>Pick saved videos from Inspo that sound like this profile.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, maxHeight: 220, overflow: 'auto' }}>
            {videos.map((v, i) => (
              <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: `1px solid ${picked.includes(i) ? 'var(--color-accent)' : 'var(--color-border)'}`, borderRadius: 10, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: 'var(--color-surface-sunken)', flexShrink: 0 }} />
                <span style={{ font: '500 13px var(--font-sans)' }}>{v.caption}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" onClick={() => onCreate({ id: 'persona-' + Date.now(), name, niche, refCount: picked.length })}>
              Create profile
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
