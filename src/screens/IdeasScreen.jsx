import { useState } from 'react';
import { Button } from '../design-system/index.js';

export default function IdeasScreen({ onNavigate, onUseIdea, personas, nextVideoIdeas }) {
  const [ideas, setIdeas] = useState(nextVideoIdeas || []);
  const [checking, setChecking] = useState(false);
  const [personaId, setPersonaId] = useState(null);
  const [personaOpen, setPersonaOpen] = useState(false);
  const persona = (personas || []).find((p) => p.id === personaId);

  const checkAgain = () => {
    setChecking(true);
    setTimeout(() => {
      setIdeas((prev) => {
        const arr = prev.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      });
      setChecking(false);
    }, 900);
  };

  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>IDEA ENGINE</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)' }}>
            Never run out of <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>ideas</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>Remix angles modeled on outliers and your tracked creators — live from Blueprint.</div>
        </div>
        <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
          <Button variant="secondary" onClick={() => setPersonaOpen(!personaOpen)}>
            {persona ? persona.name : 'Choose a Persona'}
          </Button>
          {personaOpen && (
            <div style={{ position: 'absolute', top: 44, right: 110, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(0,0,0,0.12)', zIndex: 5, minWidth: 200 }}>
              {(personas || []).map((p) => (
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
              {(!personas || personas.length === 0) && <div style={{ padding: '10px 14px', font: '400 13px var(--font-sans)', color: 'var(--color-text-tertiary)' }}>No personas yet</div>}
            </div>
          )}
          <Button variant="primary" icon="refreshCw" onClick={checkAgain} disabled={checking}>
            {checking ? 'Checking…' : 'Check again'}
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {checking && <div style={{ font: '400 13.5px var(--font-sans)', color: 'var(--color-text-secondary)' }}>Refreshing ideas from Blueprint MCP…</div>}
        {!checking &&
          ideas.map((idea) => (
            <div key={idea.id} style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: idea.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ font: '600 12px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 4 }}>
                  {idea.category} · modeled on {idea.sourceHandle} ({idea.sourceScore})
                </div>
                <div style={{ font: '600 15.5px/1.4 var(--font-sans)' }}>{idea.title}</div>
              </div>
              <Button variant="ghost" icon="zap" style={{ flexShrink: 0 }} onClick={() => onUseIdea && onUseIdea(idea)}>
                Turn into script
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
