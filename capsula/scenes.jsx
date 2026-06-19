/* global React */
// Cápsula — narrative scroll scenes 1–7. Each is "a breath": one idea,
// full-viewport, revealed on scroll. Composes the DS primitives.
const CAP_DS = window.CPsulaDesignSystem_0eba3c;
const { Tag, Stat, TrackRow, YearTabs, Ring } = CAP_DS;
const Reveal = window.CapReveal;

/* ---- shared scaffolding ---- */
function CapScene({ children, center = false, label, style }) {
  return (
    <section
      data-screen-label={label}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: center ? 'center' : 'flex-start',
        textAlign: center ? 'center' : 'left',
        padding: 'var(--space-11) var(--gutter)',
        maxWidth: 'var(--max-content)',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </section>
  );
}

const CapEyebrow = ({ children, style }) => (
  <span className="cap-eyebrow" style={style}>{children}</span>
);

/* ====== 1 · ABERTURA ====== */
function SceneOpening() {
  return (
    <CapScene center label="01 — Abertura">
      <Ring
        size={680}
        count={3}
        glow
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', maxWidth: '92vw', maxHeight: '92vw' }}
      />
      <Reveal style={{ position: 'relative' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'var(--text-mega)',
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          2023 <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>—</span> 2026
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--text-primary)',
            maxWidth: '22ch',
            margin: '36px auto 0',
            lineHeight: 1.25,
          }}
        >
          Foram 4 anos. Vamos ouvir de novo?
        </p>
      </Reveal>
      <Reveal delay={500} style={{ position: 'absolute', bottom: 'var(--space-8)', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mono)', letterSpacing: 'var(--track-mono)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>role pra baixo</span>
          <span className="cap-scroll-cue" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '1.25rem', lineHeight: 1 }}>↓</span>
        </div>
      </Reveal>
    </CapScene>
  );
}

/* ====== 2 · O ARTISTA DO PERÍODO ====== */
function SceneArtist() {
  return (
    <CapScene label="02 — Artista do período">
      <Ring
        size={460}
        count={2}
        style={{ position: 'absolute', top: '50%', right: 'calc(-1 * var(--space-7))', transform: 'translateY(-50%)', opacity: 0.9 }}
      />
      <Reveal><CapEyebrow style={{ color: 'var(--accent)' }}>// o artista do período</CapEyebrow></Reveal>
      <Reveal delay={140}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 'var(--text-display)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: '24px 0 0',
            position: 'relative',
          }}
        >
          Tame Impala
        </h2>
      </Reveal>
      <Reveal delay={280} style={{ marginTop: 'var(--space-7)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-mono)', letterSpacing: 'var(--track-mono)', color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--accent)' }}>327</span> horas ouvidas
        </span>
      </Reveal>
    </CapScene>
  );
}

/* ====== 3 · AS 5 MÚSICAS ====== */
function SceneTracks() {
  const tracks = [
    { title: 'The Less I Know The Better', sub: 'Tame Impala' },
    { title: 'Redbone', sub: 'Childish Gambino' },
    { title: 'Tongues', sub: 'Joods' },
    { title: 'Motion Sickness', sub: 'Phoebe Bridgers' },
    { title: 'Está Escrito', sub: 'Los Hermanos' },
  ];
  return (
    <CapScene label="03 — As 5 músicas">
      <Reveal><CapEyebrow>// as 5 músicas</CapEyebrow></Reveal>
      <Reveal delay={120}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-h1)', margin: '20px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          As músicas que <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>tocaram</span> a faculdade.
        </h2>
      </Reveal>
      <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {tracks.map((t, i) => (
          <Reveal key={t.title} delay={i * 110}>
            <TrackRow rank={i + 1} title={t.title} subtitle={t.sub} active={i === 0} />
          </Reveal>
        ))}
      </div>
    </CapScene>
  );
}

/* ====== 4 · OS 5 ARTISTAS ====== */
function SceneArtists() {
  const artists = ['Tame Impala', 'Childish Gambino', 'Phoebe Bridgers', 'Mac DeMarco', 'Los Hermanos'];
  return (
    <CapScene label="04 — Os 5 artistas">
      <Reveal><CapEyebrow>// os 5 artistas</CapEyebrow></Reveal>
      <Reveal delay={120}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-h1)', margin: '20px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          As vozes que mais <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>voltaram</span>.
        </h2>
      </Reveal>
      <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {artists.map((a, i) => (
          <Reveal key={a} delay={i * 110}>
            <TrackRow rank={i + 1} title={a} active={i === 0} />
          </Reveal>
        ))}
      </div>
    </CapScene>
  );
}

/* ====== 5 · OS GÊNEROS (PALETA SONORA) ====== */
function SceneGenres() {
  // size + opacity encode how much each genre was heard.
  const genres = [
    { name: 'indie', size: 'clamp(4rem, 13vw, 11rem)', op: 1, italic: false, accent: true },
    { name: 'psicodelia', size: 'clamp(3rem, 9vw, 7.5rem)', op: 0.92, italic: true, accent: false },
    { name: 'mpb', size: 'clamp(3.5rem, 11vw, 9rem)', op: 0.82, italic: false, accent: false },
    { name: 'shoegaze', size: 'clamp(2rem, 5.5vw, 4.25rem)', op: 0.5, italic: true, accent: false },
    { name: 'soul', size: 'clamp(2.25rem, 6.5vw, 5.25rem)', op: 0.62, italic: false, accent: false },
  ];
  return (
    <CapScene label="05 — Os gêneros">
      <Reveal><CapEyebrow>// sua paleta sonora</CapEyebrow></Reveal>
      <Reveal delay={120}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-h3)', color: 'var(--text-secondary)', margin: '18px 0 0', lineHeight: 1.3, maxWidth: '34ch' }}>
          Sua paleta sonora — os tons que se misturaram nesses anos.
        </h2>
      </Reveal>
      <div
        style={{
          marginTop: 'var(--space-9)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          columnGap: 'clamp(1.5rem, 4vw, 3.5rem)',
          rowGap: 'clamp(0.5rem, 2vw, 1.5rem)',
        }}
      >
        {genres.map((g, i) => (
          <Reveal key={g.name} delay={i * 130}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: g.accent ? 600 : 500,
                fontStyle: g.italic ? 'italic' : 'normal',
                fontSize: g.size,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: g.accent ? 'var(--accent)' : 'var(--text-primary)',
                opacity: g.op,
                display: 'inline-block',
              }}
            >
              {g.name}
            </span>
          </Reveal>
        ))}
      </div>
    </CapScene>
  );
}

/* ====== 6 · OS TOTAIS ====== */
function SceneTotals() {
  return (
    <CapScene center label="06 — Os totais">
      <Ring
        size={760}
        count={3}
        style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%,-50%)', maxWidth: '96vw', maxHeight: '96vw', opacity: 0.7 }}
      />
      <Reveal style={{ position: 'relative' }}><CapEyebrow>// os totais</CapEyebrow></Reveal>
      <Reveal delay={120} style={{ position: 'relative', marginTop: 'var(--space-6)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: 'var(--text-stat)', lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--accent)' }}>
          84.207
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.2vw, 1.375rem)', letterSpacing: 'var(--track-mono)', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
          minutos em fones de ouvido
        </div>
      </Reveal>
      <Reveal delay={280} style={{ position: 'relative', display: 'flex', gap: 'clamp(2rem, 6vw, 6rem)', marginTop: 'var(--space-10)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Stat label="faixas distintas" value="1.284" size="md" align="center" />
        <Stat label="artistas" value="312" size="md" align="center" />
        <Stat label="dias ouvindo" value="58" size="md" align="center" />
      </Reveal>
    </CapScene>
  );
}

/* ====== 7 · A EVOLUÇÃO (FATIAS POR ANO) ====== */
function SceneEvolution() {
  const byYear = {
    '2023': { track: 'Está Escrito', artist: 'Los Hermanos', genre: 'mpb' },
    '2024': { track: 'Redbone', artist: 'Childish Gambino', genre: 'soul' },
    '2025': { track: 'Motion Sickness', artist: 'Phoebe Bridgers', genre: 'indie' },
    '2026': { track: 'The Less I Know The Better', artist: 'Tame Impala', genre: 'psicodelia' },
  };
  const [year, setYear] = React.useState('2023');
  const d = byYear[year];
  return (
    <CapScene label="07 — A evolução">
      <Reveal><CapEyebrow>// como meu gosto mudou</CapEyebrow></Reveal>
      <Reveal delay={120}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'var(--text-h1)', margin: '18px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
          Como meu gosto <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>mudou</span>.
        </h2>
      </Reveal>
      <Reveal delay={200} style={{ marginTop: 'var(--space-7)' }}>
        <YearTabs years={['2023', '2024', '2025', '2026']} value={year} onChange={setYear} />
      </Reveal>
      <div key={year} className="cap-year-panel" style={{ marginTop: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-7)' }}>
        <div>
          <CapEyebrow>música #1</CapEyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 'var(--text-h2)', margin: '12px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em' }}>{d.track}</h3>
        </div>
        <div>
          <CapEyebrow>artista #1</CapEyebrow>
          <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 'var(--text-h2)', margin: '12px 0 0', lineHeight: 1.05, letterSpacing: '-0.01em' }}>{d.artist}</h3>
        </div>
        <div>
          <CapEyebrow>gênero dominante</CapEyebrow>
          <div style={{ marginTop: '14px' }}>
            <Tag variant="accent" style={{ fontSize: '15px', padding: '9px 16px' }}>{d.genre}</Tag>
          </div>
        </div>
      </div>
    </CapScene>
  );
}

Object.assign(window, {
  SceneOpening, SceneArtist, SceneTracks, SceneArtists,
  SceneGenres, SceneTotals, SceneEvolution, CapScene, CapEyebrow,
});
