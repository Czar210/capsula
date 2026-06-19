/* global React, ReactDOM */
// Cápsula — app shell: grain, vertical scroll-progress bar, brand mark,
// and the 8-scene assembly.
const APP_DS = window.CPsulaDesignSystem_0eba3c;

function ScrollProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: 'fixed', top: '18vh', right: 'clamp(14px, 2.4vw, 34px)', height: '64vh', width: '2px', background: 'var(--egg-10)', borderRadius: '2px', zIndex: 60 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: `${pct * 100}%`, background: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--green-32)' }} />
    </div>
  );
}

function BrandMark() {
  return (
    <div style={{ position: 'fixed', top: 'clamp(16px, 3vw, 32px)', left: 'clamp(16px, 3vw, 40px)', zIndex: 60, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mono)', letterSpacing: 'var(--track-mono)', color: 'var(--text-faint)', mixBlendMode: 'screen' }}>
      <span style={{ color: 'var(--accent)' }}>●</span> cápsula.app
    </div>
  );
}

function App() {
  const { GrainOverlay } = APP_DS;
  return (
    <React.Fragment>
      <BrandMark />
      <ScrollProgress />
      <main>
        <window.SceneOpening />
        <window.SceneArtist />
        <window.SceneTracks />
        <window.SceneArtists />
        <window.SceneGenres />
        <window.SceneTotals />
        <window.SceneEvolution />
        <window.ScenePoster />
      </main>
      <GrainOverlay opacity={0.22} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
