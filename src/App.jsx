import { useRef, useState } from 'react';
import Shell from './components/Shell.jsx';
import RemixPanel from './components/RemixPanel.jsx';
import CategoryPickerModal from './components/CategoryPickerModal.jsx';
import ProfileCreateModal from './components/ProfileCreateModal.jsx';
import TrackCreatorModal from './components/TrackCreatorModal.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';
import InspoScreen from './screens/InspoScreen.jsx';
import ScriptsScreen from './screens/ScriptsScreen.jsx';
import TemplatesScreen from './screens/TemplatesScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import IdeasScreen from './screens/IdeasScreen.jsx';
import ContentProfilesScreen from './screens/ContentProfilesScreen.jsx';
import DiscoverScreen from './screens/DiscoverScreen.jsx';
import TrackedCreatorsScreen from './screens/TrackedCreatorsScreen.jsx';
import OutlierDetailScreen from './screens/OutlierDetailScreen.jsx';
import { Button } from './design-system/index.js';
import { initialData, BlueprintDate } from './data/blueprintData.js';

const ACTION_LABELS = {
  Calendar: 'Save video',
  Inspo: 'Save video',
  Scripts: null,
  Templates: 'Save video',
  Settings: null,
  Ideas: null,
  'Content Profiles': null,
  Discover: 'Save video',
  'Tracked creators': 'Save video',
};

export default function App() {
  // ---- top-level state (ported from the .dc.html Component's `state` + renderVals()) ----
  const [nav, setNav] = useState('Calendar');
  const [modalStep, setModalStep] = useState(null); // null | 'input' | 'fetching' | 'transcribing' | 'done'
  const [pastedUrl, setPastedUrl] = useState('');
  const [weekOffset, setWeekOffset] = useState(0);

  const [scheduled, setScheduled] = useState(initialData.scheduled.slice());
  const [categories, setCategories] = useState(initialData.inspoCategories.map((c) => ({ id: c.id, label: c.label, color: c.color })));
  const [personas, setPersonas] = useState(initialData.personas.slice());
  const [templates, setTemplates] = useState(initialData.templates.slice());
  const [inspoVideos, setInspoVideos] = useState(initialData.inspoVideos.slice());
  const [scripts, setScripts] = useState(initialData.scripts.slice());

  const [outlierPost, setOutlierPost] = useState(null);
  const [outlierSaved, setOutlierSaved] = useState(false);
  const [outlierTemplateSaved, setOutlierTemplateSaved] = useState(false);
  const [outlierCategory, setOutlierCategory] = useState(null);
  const [outlierDescription, setOutlierDescription] = useState('');
  const [outlierNotes, setOutlierNotes] = useState('');

  const [remixOpen, setRemixOpen] = useState(false);

  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  const [categoryPickerCurrent, setCategoryPickerCurrent] = useState(null);
  const categoryPickerOnSelectRef = useRef(null);

  const [profileCreateOpen, setProfileCreateOpen] = useState(false);
  const [profileEditTarget, setProfileEditTarget] = useState(null);
  const profileCreateOnDoneRef = useRef(null);

  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackedCreators, setTrackedCreators] = useState(initialData.trackedCreators.slice());
  const [filterHandle, setFilterHandle] = useState(null);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [nicheFilters, setNicheFilters] = useState({});

  const timersRef = useRef([]);

  // ---- derived values ----
  const isCalendar = nav === 'Calendar';
  const isInspo = nav === 'Inspo';
  const isScripts = nav === 'Scripts';
  const isTemplates = nav === 'Templates';
  const isSettings = nav === 'Settings';
  const isIdeas = nav === 'Ideas';
  const isProfiles = nav === 'Content Profiles';
  const isDiscover = nav === 'Discover' && !outlierPost;
  const isTracked = nav === 'Tracked creators';
  const isOutlierDetail = !!outlierPost;

  const actionLabel = isOutlierDetail ? null : ACTION_LABELS[nav] || null;
  const topBarTitle = isOutlierDetail ? 'Outlier Detail' : nav;

  const modalOpen = !!modalStep;
  const isModalInput = modalStep === 'input';
  const isModalProgress = modalStep === 'fetching' || modalStep === 'transcribing';
  const isModalDone = modalStep === 'done';
  const progressLabel = modalStep === 'fetching' ? 'Fetching video…' : 'Extracting transcript…';

  const weekDays = [0, 1, 2, 3, 4, 5, 6].map((i) => BlueprintDate.serial(weekOffset, i));
  const niches = Array.from(new Set(initialData.discoverItems.map((d) => d.niche)));
  const nicheOptions = niches.map((n) => ({
    label: n,
    checked: !!nicheFilters[n],
    border: nicheFilters[n] ? 'var(--color-accent)' : 'var(--color-border-strong)',
    onClick: () => setNicheFilters((prev) => ({ ...prev, [n]: !prev[n] })),
  }));
  const activeNiches = niches.filter((n) => nicheFilters[n]);

  // ---- handlers ----
  const onNavigate = (n) => {
    setNav(n);
    setOutlierPost(null);
  };

  const openSaveModal = () => setModalStep('input');
  const closeSaveModal = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setModalStep(null);
    setPastedUrl('');
  };
  const stop = (e) => e.stopPropagation();

  const startImport = () => {
    setModalStep('fetching');
    const t1 = setTimeout(() => setModalStep('transcribing'), 900);
    const t2 = setTimeout(() => {
      const entry = { id: 'insp-' + Date.now(), category: 'uncategorized', color: 'var(--color-cat-orange)', caption: 'Imported from TikTok', author: '@saved_creator', views: '—', time: 'just now' };
      setInspoVideos((prev) => [entry, ...prev]);
      setModalStep('done');
    }, 1900);
    timersRef.current.push(t1, t2);
  };
  const viewInInspo = () => {
    setModalStep(null);
    setNav('Inspo');
  };

  const onWeekShift = (dir) => setWeekOffset((w) => w + dir);
  const onToday = () => setWeekOffset(0);
  const scheduleItem = (scriptId, day, title, category) => {
    const entry = { scriptId, day, title, category, type: 'Script', status: 'To Create' };
    setScheduled((prev) => [...prev.filter((it) => it.scriptId !== scriptId), entry]);
  };

  const addCategory = (label) => setCategories((prev) => [...prev, { id: 'cat-' + Date.now(), label }]);
  const openCategoryPicker = (current, onSelect) => {
    categoryPickerOnSelectRef.current = typeof onSelect === 'function' ? onSelect : null;
    setCategoryPickerCurrent(current);
    setCategoryPickerOpen(true);
  };
  const closeCategoryPicker = () => {
    setCategoryPickerOpen(false);
    categoryPickerOnSelectRef.current = null;
  };
  const categoryPickerSelect = (label) => {
    if (categoryPickerOnSelectRef.current) categoryPickerOnSelectRef.current(label);
    setCategoryPickerCurrent(label);
  };

  const openProfileCreate = (onDone) => {
    profileCreateOnDoneRef.current = typeof onDone === 'function' ? onDone : null;
    setProfileEditTarget(null);
    setProfileCreateOpen(true);
  };
  const closeProfileCreate = () => {
    setProfileCreateOpen(false);
    setProfileEditTarget(null);
    profileCreateOnDoneRef.current = null;
  };
  const editPersona = (p) => {
    setProfileEditTarget(p);
    setProfileCreateOpen(true);
  };
  const saveProfileEdit = (updated) => {
    setPersonas((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setProfileCreateOpen(false);
    setProfileEditTarget(null);
  };
  const deletePersona = (id) => setPersonas((prev) => prev.filter((p) => p.id !== id));
  const createProfile = (p) => {
    setPersonas((prev) => [...prev, p]);
    setProfileCreateOpen(false);
    if (profileCreateOnDoneRef.current) profileCreateOnDoneRef.current(p);
  };

  const openTrackModal = () => setTrackModalOpen(true);
  const closeTrackModal = () => setTrackModalOpen(false);
  const trackCreator = (handle) => {
    const normalizedHandle = handle.startsWith('@') ? handle : '@' + handle;
    const id = 'manual:' + normalizedHandle.replace('@', '').toLowerCase();
    setTrackedCreators((prev) => [...prev, { id, name: handle.replace('@', ''), handle: normalizedHandle, trend: 'New — tracking started' }]);
    setTrackModalOpen(false);
  };

  const openFilters = () => setFiltersOpen(true);
  const closeFilters = () => setFiltersOpen(false);

  const openOutlier = (post) => {
    setOutlierPost(post);
    setOutlierSaved(false);
    setOutlierTemplateSaved(false);
    setOutlierCategory(null);
    setOutlierDescription('');
    setOutlierNotes('');
  };
  const closeOutlier = () => setOutlierPost(null);
  const saveOutlierToInspo = () => {
    const catObj = categories.find((c) => c.label === outlierCategory);
    const catId = catObj ? catObj.id : 'uncategorized';
    const entry = { id: 'insp-' + Date.now(), category: catId, color: 'var(--color-accent)', caption: outlierPost.caption, author: outlierPost.author, views: outlierPost.views, time: 'Found via Explore' };
    setInspoVideos((prev) => [entry, ...prev]);
    setOutlierSaved(true);
  };
  const openOutlierCategoryPicker = () => openCategoryPicker(outlierCategory, setOutlierCategory);
  const saveOutlierAsTemplate = () => {
    const hookText = outlierPost.spokenHook || outlierPost.caption;
    const entry = { id: 'tpl-' + Date.now(), hook: hookText, title: hookText.slice(0, 30), desc: 'Saved from Explore', uses: '0 uses', status: 'AI Template Ready', date: 'Today' };
    setTemplates((prev) => [entry, ...prev]);
    setOutlierTemplateSaved(true);
  };

  const openRemix = () => setRemixOpen(true);
  const closeRemix = () => setRemixOpen(false);
  const submitRemix = (opts) => {
    const id = 'remix-' + Date.now();
    const persona = opts && opts.persona;
    const hook = outlierPost.caption + (opts && opts.instructions ? ' — ' + opts.instructions : '');
    const entry = {
      id,
      variant: persona ? persona.name : 'Remix',
      label: '"' + outlierPost.caption.slice(0, 26) + '…"',
      hook,
      date: 'Today',
      status: 'To create',
      includeCaption: !!(opts && opts.captionOn),
      includeOnScreenText: !!(opts && opts.onScreenOn),
      personaId: persona ? persona.id : null,
    };
    setScripts((prev) => [entry, ...prev]);
    setRemixOpen(false);
    setOutlierPost(null);
    setNav('Scripts');
  };

  const useTemplate = (tp) => {
    const hook = tp.hook || tp.title;
    const entry = { id: 'tpl-use-' + Date.now(), variant: 'Template', label: '"' + (tp.title || hook).slice(0, 30) + '"', hook, date: 'Today', status: 'To create' };
    setScripts((prev) => [entry, ...prev]);
    setNav('Scripts');
  };
  const useIdea = (idea) => {
    // idea.title already reads as a full sentence with its own embedded quotes (e.g. Remix "...").
    // Don't wrap it in another pair of quotes — that produces confusing triple-nested quoting.
    const entry = { id: 'idea-use-' + Date.now(), variant: 'Idea', label: idea.title.slice(0, 40) + (idea.title.length > 40 ? '…' : ''), hook: idea.title, date: 'Today', status: 'To create' };
    setScripts((prev) => [entry, ...prev]);
    setNav('Scripts');
  };
  const addScript = (entry) => setScripts((prev) => [entry, ...prev]);

  const signOut = () => {
    setNav('Calendar');
    setOutlierPost(null);
    setRemixOpen(false);
    setModalStep(null);
    setFiltersOpen(false);
  };

  // ---- screen content ----
  let screen = null;
  if (isCalendar) {
    screen = <CalendarScreen weekOffset={weekOffset} onWeekShift={onWeekShift} onToday={onToday} scheduled={scheduled} />;
  } else if (isInspo) {
    screen = <InspoScreen categories={categories} videos={inspoVideos} />;
  } else if (isScripts) {
    screen = <ScriptsScreen scripts={scripts} onAddScript={addScript} avatars={initialData.avatars} voices={initialData.voices} templates={templates} onOpenCategoryPicker={openCategoryPicker} weekDays={weekDays} onSchedule={scheduleItem} onNavigate={onNavigate} />;
  } else if (isTemplates) {
    screen = <TemplatesScreen onNavigate={onNavigate} templates={templates} onUseTemplate={useTemplate} />;
  } else if (isSettings) {
    screen = <SettingsScreen onSignOut={signOut} connectedAccounts={initialData.connectedAccounts} />;
  } else if (isIdeas) {
    screen = <IdeasScreen onNavigate={onNavigate} onUseIdea={useIdea} personas={personas} nextVideoIdeas={initialData.nextVideoIdeas} />;
  } else if (isProfiles) {
    screen = <ContentProfilesScreen personas={personas} onOpenCreate={openProfileCreate} onEditPersona={editPersona} onDeletePersona={deletePersona} />;
  } else if (isDiscover) {
    screen = <DiscoverScreen onOpenOutlier={openOutlier} onOpenFilters={openFilters} activeNiches={activeNiches} discoverItems={initialData.discoverItems} />;
  } else if (isTracked) {
    screen = <TrackedCreatorsScreen tracked={trackedCreators} onOpenTrackModal={openTrackModal} filterHandle={filterHandle} onFilterHandle={setFilterHandle} trackedCreatorPosts={initialData.trackedCreatorPosts} />;
  } else if (isOutlierDetail) {
    screen = (
      <OutlierDetailScreen
        post={outlierPost}
        onSaveToInspo={saveOutlierToInspo}
        saved={outlierSaved}
        onRemix={openRemix}
        onSaveTemplate={saveOutlierAsTemplate}
        templateSaved={outlierTemplateSaved}
        category={outlierCategory}
        onOpenCategoryPicker={openOutlierCategoryPicker}
        description={outlierDescription}
        onDescriptionChange={setOutlierDescription}
        notes={outlierNotes}
        onNotesChange={setOutlierNotes}
      />
    );
  }

  return (
    <div style={{ height: '100vh', overflow: 'auto', background: 'var(--color-bg)' }}>
      <Shell active={nav} onNavigate={onNavigate} title={topBarTitle} actionLabel={actionLabel} onAction={openSaveModal}>
        {screen}
      </Shell>

      {isOutlierDetail && (
        <div style={{ position: 'fixed', top: 20, left: 280, zIndex: 60 }}>
          <Button variant="secondary" icon="chevronLeft" onClick={closeOutlier} style={{ height: 36 }}>
            Back to Discover
          </Button>
        </div>
      )}

      {modalOpen && (
        <div onClick={closeSaveModal} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={stop} style={{ width: 420, background: '#fff', borderRadius: 20, padding: 28, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
            {isModalInput && (
              <div>
                <div style={{ font: '600 11px var(--font-mono)', letterSpacing: '.08em', color: 'var(--color-accent)', marginBottom: 8 }}>SAVE VIDEO</div>
                <div style={{ font: '700 20px var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 6 }}>Save from TikTok or Instagram</div>
                <div style={{ font: '400 13.5px/1.5 var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 18 }}>On mobile, share a video to Blueprint directly from the share sheet. On web, paste the link below — Blueprint fetches the video and extracts its transcript automatically.</div>
                <input value={pastedUrl} onChange={(e) => setPastedUrl(e.target.value)} placeholder="https://www.tiktok.com/@creator/video/…" style={{ width: '100%', padding: '13px 16px', border: '1px solid var(--color-border)', borderRadius: 12, font: '400 14px var(--font-sans)', outline: 'none', boxSizing: 'border-box', marginBottom: 18 }} />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <Button variant="secondary" onClick={closeSaveModal} style={{ height: 40 }}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={startImport} style={{ height: 40 }}>
                    Import
                  </Button>
                </div>
              </div>
            )}

            {isModalProgress && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid var(--color-accent-soft-bg)', borderTopColor: 'var(--color-accent)', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
                <div style={{ font: '600 15px var(--font-sans)', color: 'var(--color-text-primary)' }}>{progressLabel}</div>
              </div>
            )}

            {isModalDone && (
              <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', font: '700 20px var(--font-sans)' }}>✓</div>
                <div style={{ font: '700 17px var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 6 }}>Saved to Inspo</div>
                <div style={{ font: '400 13.5px var(--font-sans)', color: 'var(--color-text-secondary)', marginBottom: 20 }}>Transcript extracted — ready to turn into a script.</div>
                <Button variant="primary" onClick={viewInInspo} style={{ width: '100%', height: 42 }}>
                  View in Inspo
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {filtersOpen && (
        <div onClick={closeFilters} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={stop} style={{ width: 340, background: '#fff', borderRadius: 20, padding: 24, boxSizing: 'border-box', boxShadow: '0 30px 80px rgba(0,0,0,0.3)' }}>
            <div style={{ font: '700 17px var(--font-sans)', color: 'var(--color-text-primary)', marginBottom: 14 }}>Filter by niche</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 16 }}>
              {nicheOptions.map((n) => (
                <div key={n.label} onClick={n.onClick} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 6px', cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${n.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {n.checked && <div style={{ width: 8, height: 8, background: 'var(--color-accent)' }} />}
                  </div>
                  <span style={{ font: '500 14px var(--font-sans)' }}>{n.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" size="sm" onClick={closeFilters}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}

      {remixOpen && (
        <div onClick={closeRemix} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RemixPanel source={outlierPost} personas={personas} onClose={closeRemix} onNewPersona={openProfileCreate} onSubmit={submitRemix} />
        </div>
      )}

      {categoryPickerOpen && (
        <div onClick={closeCategoryPicker} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CategoryPickerModal categories={categories} current={categoryPickerCurrent} onSelect={categoryPickerSelect} onAddCategory={addCategory} onClose={closeCategoryPicker} />
        </div>
      )}

      {profileCreateOpen && (
        <div onClick={closeProfileCreate} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ProfileCreateModal inspoVideos={inspoVideos} initial={profileEditTarget} onClose={closeProfileCreate} onCreate={createProfile} onSave={saveProfileEdit} />
        </div>
      )}

      {trackModalOpen && (
        <div onClick={closeTrackModal} style={{ position: 'fixed', inset: 0, background: 'rgba(23,24,28,0.55)', zIndex: 85, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TrackCreatorModal onClose={closeTrackModal} onTrack={trackCreator} />
        </div>
      )}
    </div>
  );
}
