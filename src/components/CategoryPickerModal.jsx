import { useState } from 'react';
import { Button } from '../design-system/index.js';

export default function CategoryPickerModal({ categories, current, onSelect, onAddCategory, onClose }) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ width: 360, background: '#fff', borderRadius: 20, padding: 24, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
      <div style={{ font: '700 17px var(--font-sans)', marginBottom: 14 }}>Choose a category</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 12 }}>
        {categories.map((c) => (
          <div key={c.id} onClick={() => onSelect(c.label)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 6px', cursor: 'pointer' }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${current === c.label ? 'var(--color-accent)' : 'var(--color-border-strong)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {current === c.label && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-accent)' }} />}
            </div>
            <span style={{ font: '500 14px var(--font-sans)' }}>{c.label}</span>
          </div>
        ))}
      </div>
      {adding ? (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name"
            style={{ flex: 1, padding: '9px 12px', border: '1px solid var(--color-border)', borderRadius: 8, font: '400 13.5px var(--font-sans)', boxSizing: 'border-box' }}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (name.trim()) {
                onAddCategory(name.trim());
                setName('');
                setAdding(false);
              }
            }}
          >
            Create
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setAdding(false);
              setName('');
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div onClick={() => setAdding(true)} style={{ padding: '10px 6px', cursor: 'pointer', font: '600 13.5px var(--font-sans)', color: 'var(--color-accent)' }}>
          + Add a category
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}
