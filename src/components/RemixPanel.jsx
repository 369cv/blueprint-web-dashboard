import { useState } from 'react';
import { Button, Icon } from '../design-system/index.js';

function Toggle({ on, onClick }) {
  return (
    <div onClick={onClick} style={{ width: 42, height: 24, borderRadius: 100, background: on ? 'var(--color-accent)' : 'var(--color-border-strong)', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 21 : 3, transition: 'left .15s' }} />
    </div>
  );
}

export default function RemixPanel({ source, personas, onClose, onNewPersona, onSubmit }) {
  const [captionOn, setCaptionOn] = useState(true);
  const [onScreenOn, setOnScreenOn] = useState(true);
  const [personaId, setPersonaId] = useState(null);
  const [personaOpen, setPersonaOpen] = useState(false);
  const [instructions, setInstructions] = useState('');
  const persona = personas.find((p) => p.id === personaId);

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ width: 480, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', maxHeight: '86vh', overflow: 'auto' }}>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 8 }}>MAKE IT YOURS</div>
      <div style={{ font: '700 20px var(--font-sans)', marginBottom: 18 }}>Remix into a script</div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--color-surface-sunken)', borderRadius: 12, padding: 12, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--color-border-strong)', flexShrink: 0 }} />
        <div style={{ font: '600 13px/1.3 var(--font-sans)' }}>{source.caption}</div>
      </div>

      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 10 }}>WHAT TO REMIX</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ font: '500 13.5px var(--font-sans)' }}>Caption</span>
        <Toggle on={captionOn} onClick={() => setCaptionOn(!captionOn)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ font: '500 13.5px var(--font-sans)' }}>On-screen text</span>
        <Toggle on={onScreenOn} onClick={() => setOnScreenOn(!onScreenOn)} />
      </div>

      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>PERSONA</div>
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div onClick={() => setPersonaOpen(!personaOpen)} style={{ padding: '11px 14px', border: '1px solid var(--color-border)', borderRadius: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ font: '500 14px var(--font-sans)', color: persona ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>{persona ? persona.name : 'No persona selected'}</span>
          <Icon name="chevronRight" size={14} color="var(--color-text-tertiary)" />
        </div>
        {personaOpen && (
          <div style={{ position: 'absolute', top: 44, left: 0, right: 0, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(0,0,0,0.12)', zIndex: 5 }}>
            {personas.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setPersonaId(p.id);
                  setPersonaOpen(false);
                }}
                style={{ padding: '10px 14px', cursor: 'pointer', font: '500 13.5px var(--font-sans)' }}
              >
                {p.name}
              </div>
            ))}
            <div
              onClick={() => {
                setPersonaOpen(false);
                onNewPersona((p) => setPersonaId(p.id));
              }}
              style={{ padding: '10px 14px', cursor: 'pointer', font: '600 13.5px var(--font-sans)', color: 'var(--color-accent)', borderTop: '1px solid var(--color-border)' }}
            >
              + New persona
            </div>
          </div>
        )}
      </div>

      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>CUSTOM INSTRUCTIONS (OPTIONAL)</div>
      <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Anything specific you want in this script…" style={{ width: '100%', minHeight: 60, padding: 12, border: '1px solid var(--color-border)', borderRadius: 10, font: '400 13.5px var(--font-sans)', boxSizing: 'border-box', marginBottom: 20 }} />

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" icon="sparkles" onClick={() => onSubmit({ captionOn, onScreenOn, persona, instructions })}>
          Remix script · ~20s
        </Button>
      </div>
    </div>
  );
}
