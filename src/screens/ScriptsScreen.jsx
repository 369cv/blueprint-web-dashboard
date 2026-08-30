import { useState } from 'react';
import { Badge, Button, Icon } from '../design-system/index.js';
import { BlueprintDate } from '../data/blueprintData.js';

export default function ScriptsScreen({ scripts, onAddScript, avatars, voices, templates, onOpenCategoryPicker, weekDays, onSchedule, onNavigate }) {
  const [selected, setSelected] = useState(0);
  const [voiceId, setVoiceId] = useState(null);
  const [avatarId, setAvatarId] = useState(null);
  const [styleId, setStyleId] = useState(null);
  const [captionStyle, setCaptionStyle] = useState('Reels Bold');
  const [genState, setGenState] = useState(null); // null | 'generating' | 'done'
  const [meta, setMeta] = useState({});
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [scheduleOpenFor, setScheduleOpenFor] = useState(null);
  const [exported, setExported] = useState(false);
  const [posted, setPosted] = useState(false);

  const raw = scripts || [];
  const SCRIPTS = raw.map((s) => ({ id: s.id, title: s.variant + ' — ' + s.label, status: s.status, hook: s.hook, date: s.date }));
  const AV = avatars || [
    { id: 'av1', name: 'Studio Look', color: 'var(--color-cat-blue)' },
    { id: 'av2', name: 'Office B-roll', color: 'var(--color-cat-green)' },
  ];
  const VO = voices || [
    { id: 'v1', name: 'My Voice (cloned)' },
    { id: 'v2', name: 'Adam' },
  ];
  const CAPTIONS = ['Reels Bold', 'Minimal', 'Karaoke'];
  const STYLES = (templates || []).filter((t) => t.status === 'AI Template Ready' || t.status === 'Rendered');
  const WEEK = weekDays || [0, 1, 2, 3, 4, 5, 6].map((i) => BlueprintDate.serial(0, i));
  if (SCRIPTS.length === 0) return null;
  const current = SCRIPTS[selected];
  const setMetaFor = (id, patch) => setMeta((m) => ({ ...m, [id]: { ...m[id], ...patch } }));

  const runGenerate = () => {
    if (!voiceId || !avatarId) return;
    setGenState('generating');
    setTimeout(() => setGenState('done'), 1400);
  };

  const addBlank = () => {
    setNewMenuOpen(false);
    onAddScript({ id: 'blank-' + Date.now(), variant: 'Blank', label: '"Untitled"', hook: 'Write your own hook to get started.', date: 'Today', status: 'To create' });
    setSelected(0);
  };

  return (
    <div>
      <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: 10 }}>SCRIPT WRITER</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <div style={{ font: '800 44px/1.05 var(--font-sans)' }}>
            Written in <em style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500 }}>your voice</em>
          </div>
          <div style={{ font: '400 16px var(--font-sans)', color: 'var(--color-text-secondary)', marginTop: 10 }}>Turn any saved hook into a full script that sounds like you — not like AI.</div>
        </div>
        <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
          <Button variant="secondary" icon="bookmark" onClick={() => onNavigate && onNavigate('Content Profiles')}>
            Content Profiles
          </Button>
          <Button variant="primary" icon="sparkles" onClick={() => setNewMenuOpen(!newMenuOpen)}>
            New script
          </Button>
          {newMenuOpen && (
            <div style={{ position: 'absolute', top: 44, right: 0, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 10, boxShadow: '0 12px 30px rgba(0,0,0,0.12)', zIndex: 5, minWidth: 160 }}>
              <div
                onClick={() => {
                  setNewMenuOpen(false);
                  onNavigate && onNavigate('Templates');
                }}
                style={{ padding: '10px 14px', cursor: 'pointer', font: '500 13.5px var(--font-sans)' }}
              >
                From a Template
              </div>
              <div onClick={addBlank} style={{ padding: '10px 14px', cursor: 'pointer', font: '500 13.5px var(--font-sans)', borderTop: '1px solid var(--color-border)' }}>
                Blank script
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SCRIPTS.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                setSelected(i);
                setGenState(null);
                setExported(false);
                setPosted(false);
              }}
              style={{
                background: '#fff',
                border: `1px solid ${i === selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: 16,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCategoryPicker((meta[s.id] || {}).category, (label) => setMetaFor(s.id, { category: label }));
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Badge tone="solid" label={(meta[s.id] || {}).category || 'Finance'} color="var(--color-cat-green)" />
                </span>
                <span style={{ font: '500 12px var(--font-sans)', color: 'var(--color-accent)' }}>● To create</span>
              </div>
              <div style={{ font: '600 14.5px var(--font-sans)' }}>{s.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ font: '400 12.5px var(--font-sans)', color: 'var(--color-text-tertiary)' }}>{s.date}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setScheduleOpenFor(scheduleOpenFor === s.id ? null : s.id);
                  }}
                  style={{ font: '600 12px var(--font-sans)', color: 'var(--color-accent)', cursor: 'pointer' }}
                >
                  {(meta[s.id] || {}).day ? BlueprintDate.label(meta[s.id].day) : 'Schedule'}
                </span>
              </div>
              {scheduleOpenFor === s.id && (
                <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {WEEK.map((d) => (
                    <div
                      key={d}
                      onClick={() => {
                        setMetaFor(s.id, { day: d });
                        onSchedule && onSchedule(s.id, d, s.title, (meta[s.id] || {}).category || 'Finance');
                        setScheduleOpenFor(null);
                      }}
                      style={{ padding: '5px 9px', borderRadius: 6, background: 'var(--color-surface-sunken)', font: '600 11.5px var(--font-sans)', cursor: 'pointer' }}
                    >
                      {BlueprintDate.label(d)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <Badge tone="solid" label={(meta[current.id] || {}).category || 'Finance'} color="var(--color-cat-green)" />
          <div style={{ font: '700 20px var(--font-sans)', marginTop: 12, marginBottom: 20 }}>{current.title}</div>
          <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.08em', color: 'var(--color-text-tertiary)', marginBottom: 10 }}>YOUR NEW HOOK</div>
          <div style={{ font: 'italic 500 24px/1.5 var(--font-serif)', color: 'var(--color-text-primary)', marginBottom: 28 }}>"{current.hook}"</div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 24 }}>
            <div style={{ font: '700 15px var(--font-sans)', marginBottom: 2 }}>Paste your script. That's the only thing you bring.</div>
            <div style={{ font: '400 13px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 20 }}>One screen. Connected once. Done — voiceover, avatar, captions, export.</div>

            <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>VOICEOVER · ELEVENLABS</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {VO.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setVoiceId(v.id)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: `1px solid ${voiceId === v.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: voiceId === v.id ? 'var(--color-accent-soft-bg)' : '#fff',
                    color: voiceId === v.id ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    font: '600 13px var(--font-sans)',
                    cursor: 'pointer',
                  }}
                >
                  {v.name}
                </div>
              ))}
            </div>

            <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>AVATAR · HEYGEN AVATAR IV</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {AV.map((a) => (
                <div key={a.id} onClick={() => setAvatarId(a.id)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: a.color, border: `2px solid ${avatarId === a.id ? 'var(--color-accent)' : 'transparent'}`, marginBottom: 4 }} />
                  <div style={{ font: '500 11px var(--font-sans)', color: 'var(--color-text-secondary)' }}>{a.name}</div>
                </div>
              ))}
              <div onClick={() => alert('Upload an avatar photo…')} style={{ cursor: 'pointer', width: 56, height: 56, borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="plus" size={16} color="var(--color-text-tertiary)" />
              </div>
            </div>

            <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>CAPTIONS · TUNED FOR REELS</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              {CAPTIONS.map((c) => (
                <div
                  key={c}
                  onClick={() => setCaptionStyle(c)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: `1px solid ${captionStyle === c ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: captionStyle === c ? 'var(--color-accent-soft-bg)' : '#fff',
                    color: captionStyle === c ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    font: '600 13px var(--font-sans)',
                    cursor: 'pointer',
                  }}
                >
                  {c}
                </div>
              ))}
            </div>

            {STYLES.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '0.06em', color: 'var(--color-text-tertiary)', marginBottom: 8 }}>EDITING STYLE · HYPERFRAMES</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <div
                    onClick={() => setStyleId(null)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 'var(--radius-pill)',
                      border: `1px solid ${!styleId ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      background: !styleId ? 'var(--color-accent-soft-bg)' : '#fff',
                      color: !styleId ? 'var(--color-accent)' : 'var(--color-text-primary)',
                      font: '600 13px var(--font-sans)',
                      cursor: 'pointer',
                    }}
                  >
                    No style
                  </div>
                  {STYLES.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setStyleId(t.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 14px 6px 6px',
                        borderRadius: 'var(--radius-pill)',
                        border: `1px solid ${styleId === t.id ? 'var(--color-accent)' : 'var(--color-border)'}`,
                        background: styleId === t.id ? 'var(--color-accent-soft-bg)' : '#fff',
                        color: styleId === t.id ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        font: '600 13px var(--font-sans)',
                        cursor: 'pointer',
                      }}
                    >
                      {t.thumbnailUrl ? <img src={t.thumbnailUrl} style={{ width: 26, height: 26, borderRadius: 6, objectFit: 'cover' }} /> : <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--color-cat-purple)' }} />}
                      {t.title}
                    </div>
                  ))}
                </div>
                <div style={{ font: '400 12px var(--font-sans)', color: 'var(--color-text-tertiary)', marginTop: 8 }}>Applies this cloned edit (cuts, captions, motion) to your avatar's take.</div>
              </div>
            )}

            {genState === 'done' ? (
              <div>
                <div style={{ height: 160, borderRadius: 'var(--radius-lg)', background: 'var(--color-surface-sunken)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="play" size={22} color="var(--color-text-tertiary)" />
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <Button
                    variant="primary"
                    icon="check"
                    onClick={() => {
                      setExported(true);
                      setTimeout(() => setExported(false), 1800);
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="secondary"
                    icon="arrowUpRight"
                    onClick={() => {
                      const day = WEEK[5];
                      onSchedule && onSchedule(current.id, day, current.title, (meta[current.id] || {}).category || 'Finance');
                      setPosted(true);
                    }}
                  >
                    Post
                  </Button>
                </div>
                {exported && <div style={{ padding: '9px 12px', borderRadius: 8, background: 'var(--color-success-bg)', color: 'var(--color-success)', font: '600 13px var(--font-sans)' }}>Link copied — video downloaded ✓</div>}
                {posted && <div style={{ padding: '9px 12px', borderRadius: 8, background: 'var(--color-success-bg)', color: 'var(--color-success)', font: '600 13px var(--font-sans)' }}>Scheduled to today on your Calendar ✓</div>}
                {styleId && <div style={{ marginTop: 10, font: '400 12px var(--font-sans)', color: 'var(--color-text-tertiary)' }}>Styled with {STYLES.find((t) => t.id === styleId).title}</div>}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Button variant="primary" icon="play" onClick={runGenerate} disabled={!voiceId || !avatarId || genState === 'generating'}>
                  {genState === 'generating' ? 'Generating…' : 'Generate. Export. Post.'}
                </Button>
                <Button variant="ghost" icon="sparkles" onClick={() => alert('Handing this script off to Claude in your browser — voice, avatar, and export happen automatically.')}>
                  Hand off to Claude
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
