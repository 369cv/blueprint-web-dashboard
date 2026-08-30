import { useEffect, useState } from 'react';
import { Icon } from '../design-system/index.js';
import { BlueprintDate as BD } from '../data/blueprintData.js';

const BASE_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function CalendarScreen({ weekOffset, onWeekShift, onToday, scheduled }) {
  const days = BASE_DAYS.map((d, i) => [d, BD.serial(weekOffset, i)]);
  const [selected, setSelected] = useState(BD.serial(0, 5));
  useEffect(() => {
    setSelected(BD.serial(weekOffset, 5));
  }, [weekOffset]);
  const [tab, setTab] = useState('To Create');
  const items = (scheduled || []).filter((it) => it.day === selected);
  const monthTotal = (scheduled || []).length;
  const createdTotal = (scheduled || []).filter((it) => it.status === 'Created').length;
  const filtered = items.filter((it) => it.status === tab);

  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>
        {BD.monthShort(selected).toUpperCase()} {BD.fromSerial(selected).getUTCFullYear()}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)', color: 'var(--color-text-primary)' }}>
            This <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>week</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>
            {monthTotal} pieces scheduled · {createdTotal} created · stay one week ahead
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div onClick={() => onWeekShift(-1)} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevronLeft" size={16} />
          </div>
          <div onClick={onToday} style={{ padding: '0 16px', height: 34, borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', cursor: 'pointer', font: '600 14px var(--font-sans)' }}>
            Today
          </div>
          <div onClick={() => onWeekShift(1)} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="chevronRight" size={16} />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 10, marginBottom: 24 }}>
        {days.map(([d, serial]) => {
          const active = serial === selected;
          const hasItems = (scheduled || []).some((it) => it.day === serial);
          return (
            <div
              key={serial}
              onClick={() => setSelected(serial)}
              style={{
                padding: '18px 0',
                textAlign: 'center',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                position: 'relative',
                background: active ? 'var(--color-accent)' : '#fff',
                color: active ? '#fff' : 'var(--color-text-primary)',
                border: active ? 'none' : '1px solid var(--color-border)',
              }}
            >
              <div style={{ font: '600 11px var(--font-sans)', opacity: 0.7, letterSpacing: '0.05em' }}>{d}</div>
              <div style={{ font: '700 26px var(--font-sans)', marginTop: 4 }}>{BD.dayOfMonth(serial)}</div>
              {hasItems && <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#fff' : 'var(--color-accent)', margin: '5px auto 0' }} />}
            </div>
          );
        })}
      </div>
      <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <span style={{ font: '700 20px var(--font-sans)' }}>
              {BD.weekdayLong(selected)}, {BD.label(selected)}
            </span>
            {items.length === 0 && <div style={{ font: '400 14px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 4 }}>Nothing scheduled</div>}
          </div>
          <div style={{ display: 'flex', gap: 4, background: 'var(--color-surface-sunken)', borderRadius: 'var(--radius-pill)', padding: 4 }}>
            {[
              ['To Create', 'var(--color-dot-tocreate)'],
              ['Created', 'var(--color-dot-created)'],
              ['Skipped', 'var(--color-dot-skipped)'],
            ].map(([t, dot]) => (
              <div
                key={t}
                onClick={() => setTab(t)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  font: '600 12.5px var(--font-sans)',
                  background: tab === t ? '#fff' : 'transparent',
                  color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  boxShadow: tab === t ? 'var(--shadow-card)' : 'none',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot }} />
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 20 }} />
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--color-text-secondary)' }}>
            <div style={{ color: 'var(--color-success)', fontSize: 22, marginBottom: 10 }}>✓</div>
            <div style={{ font: '600 15px var(--font-sans)', color: 'var(--color-text-primary)' }}>No {tab.toLowerCase()} items for this day.</div>
            <div style={{ font: '400 14px var(--font-sans)', marginTop: 6 }}>Schedule videos from their detail page, or scripts from the editor.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-surface-sunken)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: '600 13.5px var(--font-sans)' }}>{it.title}</div>
                  <div style={{ font: '400 11.5px var(--font-sans)', color: 'var(--color-text-tertiary)' }}>
                    {it.type} · {it.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
