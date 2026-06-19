/* global React */
// Cápsula — Section 8: the final poster. Sparse, vertical, print-minded.
// Exportable as a high-res PNG via html-to-image.
const POSTER_DS = window.CPsulaDesignSystem_0eba3c;

function PosterArtboard({ innerRef }) {
  const { Ring, GrainOverlay } = POSTER_DS;
  return (
    <div
      ref={innerRef}
      id="capsula-poster"
      style={{
        position: 'relative',
        width: 'min(560px, 88vw)',
        aspectRatio: '4 / 5',
        background: 'var(--bg-deep)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        flexDirection: 'column',
        padding: '7cqw',
        boxSizing: 'border-box',
        containerType: 'inline-size',
      }}
    >
      <Ring
        size={520}
        count={3}
        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '92cqw', height: '92cqw' }}
      />

      {/* header */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: '4.4cqw' }}>cápsula</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.1cqw', letterSpacing: '.16em', color: 'var(--text-secondary)' }}>RETROSPECTIVA</span>
      </div>

      {/* artist */}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <span className="cap-eyebrow" style={{ fontSize: '2.3cqw' }}>o artista do período</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: '12cqw', lineHeight: 0.96, letterSpacing: '-0.02em', margin: '1.5cqw 0 0' }}>
          Tame<br />Impala
        </h2>
      </div>

      {/* big number */}
      <div style={{ position: 'relative', marginTop: '6cqw' }}>
        <span className="cap-eyebrow" style={{ fontSize: '2.3cqw' }}>minutos em fones de ouvido</span>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '17.5cqw', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--accent)', marginTop: '0.5cqw' }}>
          84.207
        </div>
      </div>

      {/* genres */}
      <div style={{ position: 'relative', marginTop: '5cqw', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '4.2cqw', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
        indie <span style={{ color: 'var(--text-faint)' }}>·</span> psicodelia <span style={{ color: 'var(--text-faint)' }}>·</span> mpb
      </div>

      {/* signature */}
      <div style={{ position: 'relative', textAlign: 'center', marginTop: '7cqw', paddingTop: '4.5cqw', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '8.5cqw', letterSpacing: '-0.01em', lineHeight: 1 }}>
          2023 <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>—</span> 2026
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2cqw', letterSpacing: '.22em', color: 'var(--text-secondary)', marginTop: '1.6cqw' }}>CÁPSULA.APP</div>
      </div>

      <GrainOverlay fixed={false} opacity={0.24} />
    </div>
  );
}

function ScenePoster() {
  const { Button } = POSTER_DS;
  const posterRef = React.useRef(null);
  const [busy, setBusy] = React.useState(false);
  const [note, setNote] = React.useState('PNG 2240×2800 · pensado para impressão');

  async function renderPng() {
    const node = posterRef.current;
    if (!node || !window.htmlToImage) return null;
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) {}
    }
    return window.htmlToImage.toPng(node, {
      pixelRatio: node.offsetWidth ? 2240 / node.offsetWidth : 4,
      cacheBust: true,
      backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-deep').trim() || '#0A0A18',
    });
  }

  async function handleDownload() {
    setBusy(true);
    setNote('Gerando imagem…');
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) throw new Error('no-image');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'capsula-2023-2026.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setNote('Pronto — imagem salva.');
    } catch (e) {
      setNote('Não foi possível gerar. Tente novamente.');
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    setBusy(true);
    setNote('Preparando…');
    try {
      const dataUrl = await renderPng();
      if (!dataUrl) throw new Error('no-image');
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'capsula-2023-2026.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Cápsula 2023 — 2026', text: 'Minha retrospectiva musical.' });
        setNote('Compartilhado.');
      } else {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'capsula-2023-2026.png';
        a.click();
        setNote('Compartilhamento indisponível — imagem baixada.');
      }
    } catch (e) {
      setNote(e && e.name === 'AbortError' ? 'PNG 2240×2800 · pensado para impressão' : 'Não foi possível compartilhar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      data-screen-label="08 — O cartaz"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-11) var(--gutter)',
        position: 'relative',
      }}
    >
      <span className="cap-eyebrow" style={{ marginBottom: 'var(--space-6)' }}>// o cartaz</span>
      <PosterArtboard innerRef={posterRef} />
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-7)', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary" size="lg" onClick={handleDownload} disabled={busy}>
          {busy ? 'Gerando…' : 'Baixar imagem (alta resolução)'}
        </Button>
        <Button variant="secondary" size="lg" arrow onClick={handleShare} disabled={busy}>Compartilhar</Button>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--text-faint)', marginTop: 'var(--space-4)' }}>{note}</p>
    </section>
  );
}

window.ScenePoster = ScenePoster;
