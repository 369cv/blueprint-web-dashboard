// Ported from blueprint-data.js — same data shapes as the mockup's window.BlueprintData,
// but exported as plain data for the app's top-level React state (App.jsx) instead of a
// mutated global singleton.

export const initialData = {
  inspoCategories: [
    { id: 'uncategorized', label: 'Uncategorized', color: 'var(--color-cat-orange)' },
    { id: 'shortlist-baha', label: 'Shortlist Baha', color: 'var(--color-cat-purple)' },
    { id: 'reels-girl-therapy', label: 'Reels Girl Therapy', color: 'var(--color-cat-pink)' },
    { id: 'real-estate', label: 'Real Estate', color: 'var(--color-cat-blue)' },
  ],
  inspoVideos: [
    { id: 'insp1', category: 'real-estate', color: 'var(--color-cat-blue)', caption: '"The obstacle is the way" — 3 min breakdown', author: '@stoicmind', views: '812K views', time: '2d ago', status: 'To create' },
    { id: 'insp2', category: 'shortlist-baha', color: 'var(--color-cat-purple)', caption: 'Why most founders quit at month 18', author: '@buildinpublic', views: '1.2M views', time: '5d ago', status: 'To create' },
    { id: 'insp3', category: 'reels-girl-therapy', color: 'var(--color-cat-pink)', caption: 'The 6am routine that changed everything', author: '@dailygrind', views: '340K views', time: '1w ago', status: 'Created' },
    { id: 'insp4', category: 'uncategorized', color: 'var(--color-cat-orange)', caption: 'The clone tool everyone is using wrong', author: '@aitoolsdaily', views: '204K views', time: '4d ago', status: 'To create' },
    { id: 'insp5', category: 'shortlist-baha', color: 'var(--color-cat-purple)', caption: 'Talking-head style reference from @imanoubou', author: '@imanoubou', views: '—', time: 'Saved from device', status: 'To create', thumbnailUrl: '/assets/iman-thumb.jpg', videoUrl: '/assets/iman-source.mp4' },
  ],
  scripts: [
    { id: 's1', variant: 'Variant C', label: '"Story/case study"', hook: 'A $19 million fraud case at Apple started the same way small business fraud always does — small allowances, unchecked assumptions, and a leader too busy to look closely.', date: 'Aug 17, 2026', status: 'To create' },
    { id: 's2', variant: 'Variant B', label: '"Systems, not willpower"', hook: 'Ten costly expense mistakes I see business owners make — and the five-minute weekly habit that would have caught every one of them.', date: 'Aug 17, 2026', status: 'To create' },
    { id: 's3', variant: 'Variant A', label: '"Confession"', hook: 'I used to think auditing my own spending was something only broke people needed to do. Then I found $40,000 a year I did not know I was losing.', date: 'Aug 16, 2026', status: 'Created' },
  ],
  // Live from Blueprint MCP (blueprint_find_outliers, global cache) — pulled 2026-08-29
  discoverItems: [
    { id: 'do1', author: '@chriswillx', platform: 'Instagram', views: 734430, likes: 13646, comments: 220, score: '2.1x', niche: 'relationships/personal finance', format: 'Interview/podcast clip', caption: 'I want to know what your bachelor party looked like.', thumbnailUrl: 'https://storage.googleapis.com/creva-e6435-explore-media/thumbnails/instagram:3971044920336492279_330019976.jpg', url: 'https://instagram.com/reel/Dcb_FDHxqb3/' },
    { id: 'do2', author: '@diaryofaceoclip', platform: 'TikTok', views: 204291, likes: 6323, comments: 119, shares: 42, score: '1.5x', niche: 'politics/personal finance', format: 'Interview clip', caption: "It's expensive to live in the White House.", thumbnailUrl: 'https://storage.googleapis.com/creva-e6435-explore-media/thumbnails/tiktok:7677922069106920726.jpg', url: 'https://tiktok.com/@diaryofaceoclip/video/7677922069106920726' },
    { id: 'do3', author: '@clevercapitalfreedom', platform: 'Instagram', views: 56860, likes: 54, comments: 106, score: '25.4x', niche: 'personal finance/storytelling', format: 'Storytelling', caption: 'When you hear your friend tell you their story:', thumbnailUrl: 'https://storage.googleapis.com/creva-e6435-explore-media/thumbnails/instagram:3971848233894506918_54153833881.jpg', url: 'https://instagram.com/reel/Dce1uzLC3Gm/' },
  ],
  // Live from Blueprint MCP (blueprint_get_watchlist_videos) — tracked creators
  trackedCreators: [
    { id: 'instagram:coralsantoro', name: 'Coral Santoro', handle: '@coralsantoro', platform: 'Instagram', trend: 'Best post 2.4M views' },
  ],
  // Per-creator feed — real posts (blueprint_get_watchlist_videos)
  trackedCreatorPosts: {
    'instagram:coralsantoro': [
      { date: '2026-06-28', views: 420315, likes: 7334, comments: 454, hook: 'There is something about birthdays that has nothing to do with getting older.', topic: 'personal growth reflection on a birthday', format: 'Reflective personal essay', url: 'https://instagram.com/reel/DaI0CHbuXuA/' },
      { date: '2026-06-08', views: 1217286, likes: 20366, comments: 629, hook: "Have you ever felt like you're falling behind in life?", topic: 'podcast promo about comparison/success/self-belief', format: 'Podcast promotional post', url: 'https://instagram.com/reel/DZUyhc7uB3W/' },
      { date: '2026-05-07', views: 566038, likes: 20807, comments: 274, hook: 'What you say matters less than what you do.', topic: 'actions over words build trust', format: 'Direct-address monologue', url: 'https://instagram.com/reel/DYDieDwuGAG/' },
      { date: '2026-05-06', views: 1235013, likes: 41913, comments: 438, hook: 'One of the most freeing things you can realize in life is this:', topic: 'living authentically and ignoring outside opinions', format: 'Inspirational monologue', url: 'https://instagram.com/reel/DYA-yDMOeAU/' },
      { date: '2026-05-05', views: 1380728, likes: 53679, comments: 687, hook: 'Looking the part is easy, becoming it is what takes time.', topic: 'substance vs superficial appearance', format: 'Philosophical monologue', url: 'https://instagram.com/reel/DX-arrvOYqB/' },
      { date: '2026-05-05', views: 2419710, likes: 111337, comments: 862, hook: 'Not everyone who enters your life has the same intention.', topic: 'discerning genuine vs convenient relationships', format: 'Direct-address advice', url: 'https://instagram.com/reel/DX-WC9ruUd2/' },
      { date: '2026-05-04', views: 738820, likes: 29388, comments: 188, hook: "It shouldn't feel rare, but it does.", topic: 'honesty and clear communication build trust', format: 'Direct-address monologue', url: 'https://instagram.com/reel/DX7yQYeOMJo/' },
      { date: '2026-05-04', views: 486842, likes: 15852, comments: 152, hook: "I'm saying this with respect... is usually where respect starts disappearing.", topic: 'genuine respect in communication', format: 'Direct-address monologue', url: 'https://instagram.com/reel/DX7xgOhOpy1/' },
      { date: '2026-05-04', views: 1029850, likes: 54357, comments: 546, hook: 'Real progress does not need an announcement.', topic: 'quiet execution over announcing plans', format: 'Direct-advice monologue', url: 'https://instagram.com/reel/DX7whlVOU_Q/' },
      { date: '2026-04-21', views: 1307660, likes: 61391, comments: 434, hook: "Know your place in people's lives, and don't settle for less.", topic: 'self-worth in relationships', format: 'Direct motivational monologue', url: 'https://instagram.com/reel/DXaY9mbu0rH/' },
      { date: '2026-04-21', views: 4515203, likes: 238078, comments: 1241, hook: 'Living abroad is built on first moments.', topic: 'adaptation through small formative moments', format: 'Reflective monologue', url: 'https://instagram.com/reel/DXX3eyPusAb/' },
      { date: '2026-04-16', views: 1382689, likes: 58070, comments: 677, hook: 'Truth is not always comfortable but it is always necessary.', topic: 'importance of truth and honesty for growth', format: 'Written philosophical monologue', url: 'https://instagram.com/reel/DXNjF9kOdF9/' },
    ],
  },
  // Live from Blueprint MCP (blueprint_suggest_next_video) — remix angles modeled on real outlier posts
  nextVideoIdeas: [
    { id: 'idea1', title: 'Remix "When you hear your friend tell you their story:" as a personal-finance storytelling video with one specific lesson the audience can use today.', category: 'Storytelling', color: 'var(--color-cat-blue)', sourceHandle: '@clevercapitalfreedom', sourceScore: '25.4x' },
    { id: 'idea2', title: 'Remix "The highest record of deleted negative items" as a talking-head-with-screen-recording video about credit repair.', category: 'Talking head + screen recording', color: 'var(--color-cat-purple)', sourceHandle: '@clevercapitalfreedom', sourceScore: '2.9x' },
    { id: 'idea3', title: 'Remix "You Might Already Qualify for a Better Capital One Card" as a talking-head-with-screen-recording video.', category: 'Talking head + screen recording', color: 'var(--color-cat-pink)', sourceHandle: '@nickkalstek', sourceScore: '2.5x' },
    { id: 'idea4', title: 'Remix "I want to know what your bachelor party looked like" as an interview/podcast-clip format applied to personal finance.', category: 'Interview/podcast clip', color: 'var(--color-cat-green)', sourceHandle: '@chriswillx', sourceScore: '2.1x' },
    { id: 'idea5', title: 'Remix "Banks Don\'t Want You Knowing About This Claude AI Trick" as a talking-head video.', category: 'Talking head', color: 'var(--color-cat-magenta)', sourceHandle: '@nickkalstek', sourceScore: '1.9x' },
  ],
  // Real content profile pulled from the connected Blueprint account
  personas: [
    { id: '8rSqfut45QpeInCEoE1r', name: 'Money Tracker', profileType: 'creator' },
  ],
  // HeyGen Avatar IV looks trained on this account
  avatars: [
    { id: 'av1', name: 'Savage — Studio Look', orientation: 'Portrait', color: 'var(--color-cat-blue)' },
    { id: 'av2', name: 'Savage — Office B-roll', orientation: 'Landscape', color: 'var(--color-cat-green)' },
  ],
  // ElevenLabs voices connected to this account
  voices: [
    { id: 'v1', name: 'Savage (cloned)', type: 'Cloned', lang: 'English (US)' },
    { id: 'v2', name: 'Adam', type: 'Premade', lang: 'English (US)' },
    { id: 'v3', name: 'Rachel', type: 'Premade', lang: 'English (UK)' },
  ],
  // Saved-hooks swipe file (blueprint-templates skill)
  templates: [
    { id: 'tpl1', hook: 'deep sleep core', title: 'deep sleep core', desc: 'Saved hook', uses: '12 uses', status: 'Hook Only', date: 'Aug 10' },
    { id: 'tpl2', hook: 'Girl therapy', title: 'Girl therapy', desc: 'Saved hook', uses: '8 uses', status: 'Hook Only', date: 'Aug 6' },
    { id: 'tpl3', hook: "If you're managing a real estate portfolio and want to get started with Claude, this video is for you.", title: 'Real estate + Claude template', desc: 'AI-ready template', uses: '31 uses', status: 'AI Template Ready', date: 'Jul 28' },
    { id: 'tpl-iman', hook: 'Talking-head style cloned from @imanoubou', title: 'Iman — Talking Head Style', desc: 'Cloned from @imanoubou', uses: '0 uses', status: 'AI Template Ready', date: 'Aug 29', projectId: 'hf_im4n29x', thumbnailUrl: '/assets/iman-thumb.jpg', sourceVideoUrl: '/assets/iman-source.mp4' },
  ],
  // Shared canonical scheduled-calendar entries — written by both apps' Scripts/Script Detail screens
  scheduled: [],
  connectedAccounts: [
    { name: 'Blueprint', connected: true },
    { name: 'HeyGen', connected: true },
    { name: 'ElevenLabs', connected: true },
    { name: 'HyperFrames', connected: false },
  ],
};

// Shared date-serial helper — avoids "day 24 + offset*7" overflowing past month/year boundaries.
export const BlueprintDate = {
  base: Date.UTC(2026, 7, 24), // Aug 24, 2026 — the fixed "today" anchor both apps use
  serial(weekOffset, dayIndex) {
    return Math.round(this.base / 86400000) + (weekOffset || 0) * 7 + (dayIndex || 0);
  },
  fromSerial(serial) {
    return new Date(serial * 86400000);
  },
  dayOfMonth(serial) {
    return this.fromSerial(serial).getUTCDate();
  },
  monthShort(serial) {
    return this.fromSerial(serial).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  },
  weekdayShort(serial) {
    return this.fromSerial(serial).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).toUpperCase();
  },
  weekdayLong(serial) {
    return this.fromSerial(serial).toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  },
  label(serial) {
    return this.monthShort(serial) + ' ' + this.dayOfMonth(serial);
  },
};

export const BlueprintCard = {
  tints: ['var(--color-cat-purple)', 'var(--color-cat-pink)', 'var(--color-cat-orange)', 'var(--color-cat-green)', 'var(--color-cat-blue)', 'var(--color-cat-magenta)'],
  scoreColors: ['var(--color-accent)', 'var(--color-success)', 'var(--color-gold)', 'var(--color-cat-pink)', 'var(--color-cat-purple)'],
  tint(i) {
    return this.tints[Math.abs(i) % this.tints.length];
  },
  scoreColor(i) {
    return this.scoreColors[Math.abs(i) % this.scoreColors.length];
  },
};
