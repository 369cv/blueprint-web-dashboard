import { useState } from 'react';
import { Button } from '../design-system/index.js';

export default function TrackCreatorModal({ onClose, onTrack }) {
  const [handle, setHandle] = useState('');
  const suggested = ['@mrbeast', '@aliabdaal'];
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ width: 380, background: '#fff', borderRadius: 20, padding: 24, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ font: '700 17px var(--font-sans)', marginBottom: 14 }}>Track a creator</div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>SUGGESTED</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
        {suggested.map((h) => (
          <div key={h} onClick={() => onTrack(h)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 6px', cursor: 'pointer' }}>
            <span style={{ font: '500 14px var(--font-sans)' }}>{h}</span>
            <span style={{ font: '600 12.5px var(--font-sans)', color: 'var(--color-accent)' }}>+ Add</span>
          </div>
        ))}
      </div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>OR ADD BY HANDLE</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@handle" style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, font: '400 14px var(--font-sans)', boxSizing: 'border-box' }} />
        <Button variant="primary" size="sm" disabled={!handle.trim()} onClick={() => onTrack(handle.trim())}>
          Add
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
