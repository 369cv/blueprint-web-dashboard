// Ported from _ds_bundle.js — components/core/Icon.jsx
const PATHS = {
  calendar: 'M8 2v4M16 2v4M3.5 9h17M4.5 5h15A1.5 1.5 0 0 1 21 6.5v14A1.5 1.5 0 0 1 19.5 22h-15A1.5 1.5 0 0 1 3 20.5v-14A1.5 1.5 0 0 1 4.5 5Z',
  grid: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z',
  fileText: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h8M8 9h2',
  bookmark: 'M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z',
  zap: 'M13 2 4 14h6l-1 8 9-12h-6l1-8Z',
  sparkles: 'M12 3v4M12 17v4M4.5 12h4M15.5 12h4M6 6l2.5 2.5M17.5 15.5 15 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  compass: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm3-13-4 2-2 4 4-2 2-4Z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a8 8 0 0 0-.15-1.55l2-1.55-2-3.46-2.35.95a8 8 0 0 0-2.7-1.55L14.5 2h-5l-.3 2.84a8 8 0 0 0-2.7 1.55l-2.35-.95-2 3.46 2 1.55A8 8 0 0 0 4 12c0 .52.05 1.04.15 1.55l-2 1.55 2 3.46 2.35-.95c.79.68 1.7 1.2 2.7 1.55L9.5 22h5l.3-2.84a8 8 0 0 0 2.7-1.55l2.35.95 2-3.46-2-1.55c.1-.51.15-1.03.15-1.55Z',
  chevronLeft: 'm15 18-6-6 6-6',
  chevronRight: 'm9 18 6-6-6-6',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  x: 'M18 6 6 18M6 6l12 12',
  check: 'm20 6-11 11-5-5',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0',
  lock: 'M6 10V7a6 6 0 1 1 12 0v3M5 10h14v10H5V10Z',
  refreshCw: 'M21 12a9 9 0 0 1-15 6.7L3 16M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M3 21v-5h5',
  plus: 'M12 5v14M5 12h14',
  filter: 'M4 5h16l-6 8v6l-4-2v-4L4 5Z',
  play: 'M6 4.5v15l13-7.5-13-7.5Z',
  arrowUpRight: 'M7 17 17 7M7 7h10v10',
  trendingUp: 'M3 17l6-6 4 4 8-8M15 7h6v6',
};

export default function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 1.75, style }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d={d} />
    </svg>
  );
}
