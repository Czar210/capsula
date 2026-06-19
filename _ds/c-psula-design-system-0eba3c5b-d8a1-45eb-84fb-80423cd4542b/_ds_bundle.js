/* @ds-bundle: {"format":3,"namespace":"CPsulaDesignSystem_0eba3c","components":[{"name":"GrainOverlay","sourcePath":"components/brand/GrainOverlay.jsx"},{"name":"Ring","sourcePath":"components/brand/Ring.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"TrackRow","sourcePath":"components/data/TrackRow.jsx"},{"name":"YearTabs","sourcePath":"components/navigation/YearTabs.jsx"}],"sourceHashes":{"components/brand/GrainOverlay.jsx":"8de3a5ca62f1","components/brand/Ring.jsx":"0f8c17c26dd2","components/core/Button.jsx":"b64ebbf76a83","components/core/Card.jsx":"9d224552d3ab","components/core/Tag.jsx":"0cf08bba82a7","components/data/Stat.jsx":"6fdfd603cfc3","components/data/TrackRow.jsx":"939c639c7e28","components/navigation/YearTabs.jsx":"f6c53c9fd447","ui_kits/capsula/Poster.jsx":"a31f9cdd8c73","ui_kits/capsula/Scenes.jsx":"d0c5761449b6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CPsulaDesignSystem_0eba3c = window.CPsulaDesignSystem_0eba3c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/GrainOverlay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * GrainOverlay — the organic paper-grain texture, perceptible and analog.
 * Drop once near the root for a page-wide overlay (fixed), or set
 * `fixed={false}` inside a positioned container to grain just that surface.
 */
function GrainOverlay({
  opacity = 0.24,
  fixed = true,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: fixed ? 'fixed' : 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 50,
      opacity,
      mixBlendMode: 'screen',
      backgroundSize: '90px 90px',
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='0.8' intercept='0'/%3E%3CfeFuncG type='linear' slope='0.8' intercept='0'/%3E%3CfeFuncB type='linear' slope='0.8' intercept='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { GrainOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GrainOverlay.jsx", error: String((e && e.message) || e) }); }

// components/brand/Ring.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ring — the recurring thin green circle motif (the "Romanos" device).
 * `count` draws concentric rings; `size` is the outer diameter in px.
 * Decorative by default (aria-hidden); position it absolutely behind
 * content. `glow` adds the accent halo on the outer ring.
 */
function Ring({
  size = 240,
  count = 1,
  glow = false,
  style,
  ...props
}) {
  const rings = Array.from({
    length: count
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0,
      pointerEvents: 'none',
      ...style
    }
  }, props), rings.map((_, i) => {
    const inset = i / count * (size * 0.42);
    const isOuter = i === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        inset: `${inset}px`,
        border: '1px solid',
        borderColor: isOuter ? 'var(--ring)' : `var(--green-${i === 1 ? '16' : '08'})`,
        borderRadius: '50%',
        boxShadow: isOuter && glow ? 'var(--shadow-glow)' : 'none'
      }
    });
  }));
}
Object.assign(__ds_scope, { Ring });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Ring.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Cápsula's primary action. Pill-shaped, calm motion.
 * Primary = radioactive green with dark ink; secondary = hairline outline;
 * ghost = quiet text. Optional trailing arrow for "Ver projetos →" links.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  arrow = false,
  disabled = false,
  style,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '13px'
    },
    md: {
      padding: '12px 22px',
      fontSize: '15px'
    },
    lg: {
      padding: '16px 30px',
      fontSize: '17px'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    border: '1px solid transparent',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), border-color var(--dur-fast), transform var(--dur-fast)',
    opacity: disabled ? 0.45 : 1,
    transform: press && !disabled ? 'scale(0.97)' : 'scale(1)',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: hover && !disabled ? 'var(--accent-press)' : 'var(--accent)',
      color: 'var(--text-on-accent)',
      boxShadow: hover && !disabled ? 'var(--shadow-glow)' : 'none'
    },
    secondary: {
      background: hover && !disabled ? 'var(--accent-tint)' : 'transparent',
      color: 'var(--text-primary)',
      borderColor: hover && !disabled ? 'var(--ring-faint)' : 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: hover && !disabled ? 'var(--text-primary)' : 'var(--text-secondary)'
    }
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    disabled: as === 'button' ? disabled : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, props), children, arrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 400
    }
  }, "→"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the blueberry surface container. Soft radius, light shadow,
 * optional hairline. Set `hover` for a gentle lift + ring on interaction,
 * `grain` to layer the paper texture inside.
 */
function Card({
  children,
  hover = false,
  grain = false,
  padding = 'var(--space-6)',
  style,
  ...props
}) {
  const [isHover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: grain ? 'cap-grain-bg' : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: 'var(--surface)',
      border: '1px solid',
      borderColor: hover && isHover ? 'var(--ring-faint)' : 'var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: hover && isHover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      transform: hover && isHover ? 'translateY(-3px)' : 'translateY(0)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base)',
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — small mono-typed label for genres, tech stacks, ranks.
 * "outline" is the default hairline chip; "accent" glows green;
 * "solid" fills with the surface for stacked metadata.
 */
function Tag({
  children,
  variant = 'outline',
  style,
  ...props
}) {
  const variants = {
    outline: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-strong)'
    },
    accent: {
      background: 'var(--accent-tint)',
      color: 'var(--accent)',
      border: '1px solid var(--ring-faint)'
    },
    solid: {
      background: 'var(--surface-hover)',
      color: 'var(--text-primary)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      letterSpacing: '0.04em',
      lineHeight: 1,
      padding: '6px 11px',
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...variants[variant],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat — a big-impact number rendered as a printed receipt figure.
 * Geist Mono numerals, mono uppercase label. `size="mega"` is the
 * poster-scale total; "lg" and "md" step down for stat grids.
 * `accent` paints the number radioactive green.
 */
function Stat({
  value,
  label,
  unit,
  size = 'lg',
  accent = false,
  align = 'left',
  style,
  ...props
}) {
  const sizes = {
    mega: 'var(--text-stat)',
    lg: 'clamp(2.5rem, 6vw, 4.5rem)',
    md: 'clamp(1.75rem, 4vw, 2.5rem)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, props), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-mono)',
      letterSpacing: 'var(--track-mono)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: sizes[size],
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: accent ? 'var(--accent)' : 'var(--text-primary)',
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: '0.3em'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.32em',
      color: 'var(--text-secondary)',
      letterSpacing: '0.08em'
    }
  }, unit)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/TrackRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TrackRow — a ranked entry in a "top 5" list (songs or artists).
 * Big mono rank, Fraunces title, secondary subtitle, optional mono meta
 * (plays / minutes) on the right. Hairline divider underneath.
 */
function TrackRow({
  rank,
  title,
  subtitle,
  meta,
  active = false,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) 0',
      borderBottom: '1px solid var(--border)',
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.25rem',
      fontWeight: 500,
      color: active ? 'var(--accent)' : 'var(--text-faint)',
      minWidth: '2.2ch',
      flexShrink: 0
    }
  }, String(rank).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
      fontWeight: 500,
      lineHeight: 1.1,
      color: 'var(--text-primary)',
      fontStyle: active ? 'italic' : 'normal'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: '4px'
    }
  }, subtitle)), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-mono)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, meta));
}
Object.assign(__ds_scope, { TrackRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TrackRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/YearTabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * YearTabs — segmented year switcher for the "evolution" scene.
 * Controlled: pass `value` and `onChange`. The active year fills with
 * the surface and gets a green underline; the rest stay quiet.
 */
function YearTabs({
  years,
  value,
  onChange,
  style,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 'var(--space-1)',
      padding: 'var(--space-1)',
      background: 'var(--bg-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, props), years.map(year => {
    const isActive = year === value;
    return /*#__PURE__*/React.createElement("button", {
      key: year,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => onChange && onChange(year),
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-mono)',
        letterSpacing: '0.06em',
        padding: '9px 18px',
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        background: isActive ? 'var(--surface-hover)' : 'transparent',
        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
        boxShadow: isActive ? 'inset 0 -2px 0 var(--accent)' : 'none',
        transition: 'color var(--dur-fast), background var(--dur-fast)'
      }
    }, year);
  }));
}
Object.assign(__ds_scope, { YearTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/YearTabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/capsula/Poster.jsx
try { (() => {
/* global React */
// Cápsula — the final shareable poster. Sparse synthesis: artist in Fraunces
// italic, the minutes number huge in green, genres, ring motif, the
// 2023 — 2026 signature, and the cápsula.app mark. Built to print.
const DSP = window.CPsulaDesignSystem_0eba3c;

// The poster artboard itself (4:5). Everything scales from a 600px design
// width via k, so it renders crisp at any size — screen or print/PDF.
function PosterArt({
  width = 'min(600px, 92vw)',
  designW = 600,
  grain = 0.24
}) {
  const {
    Tag,
    Ring,
    GrainOverlay
  } = DSP;
  const k = px => `${px * (designW / 600)}px`; // px relative to 600 design
  return /*#__PURE__*/React.createElement("div", {
    id: "capsula-poster",
    style: {
      position: 'relative',
      width,
      aspectRatio: '4 / 5',
      background: 'var(--bg-deep)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      padding: '7.3cqw',
      boxSizing: 'border-box',
      containerType: 'inline-size'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: designW * 0.9,
    count: 3,
    style: {
      position: 'absolute',
      top: '34%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: '4.2cqw'
    }
  }, "c\xE1psula"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '2.1cqw',
      letterSpacing: '.14em',
      color: 'var(--text-secondary)'
    }
  }, "RETROSPECTIVA")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-eyebrow",
    style: {
      fontSize: '2.3cqw'
    }
  }, "artista do per\xEDodo"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: '11.5cqw',
      lineHeight: 0.98,
      letterSpacing: '-0.02em',
      margin: '1.5cqw 0 0'
    }
  }, "Tame", /*#__PURE__*/React.createElement("br", null), "Impala")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: '5cqw'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-eyebrow",
    style: {
      fontSize: '2.3cqw'
    }
  }, "minutos ouvidos"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: '17cqw',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--accent)'
    }
  }, "87.420")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.4cqw',
      marginTop: '4cqw'
    }
  }, ['indie pop', 'dream pop', 'psicodelia', 'lo-fi'].map(g => /*#__PURE__*/React.createElement(Tag, {
    key: g,
    style: {
      fontSize: '2.3cqw',
      padding: '1cqw 2cqw'
    }
  }, g))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      textAlign: 'center',
      marginTop: '6cqw',
      paddingTop: '4cqw',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: '8cqw',
      letterSpacing: '-0.01em'
    }
  }, "2023 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontStyle: 'italic'
    }
  }, "—"), " 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '2cqw',
      letterSpacing: '.2em',
      color: 'var(--text-secondary)',
      marginTop: '1.2cqw'
    }
  }, "C\xC1PSULA.APP")), /*#__PURE__*/React.createElement(GrainOverlay, {
    fixed: false,
    opacity: grain
  }));
}

// The full screen scene: eyebrow + artboard + share/download actions.
function FinalPoster() {
  const {
    Button
  } = DSP;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-10) var(--gutter)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cap-eyebrow",
    style: {
      marginBottom: 'var(--space-6)'
    }
  }, "// o cartaz"), /*#__PURE__*/React.createElement(PosterArt, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-7)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => window.print()
  }, "Baixar em alta resolu\xE7\xE3o"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    arrow: true
  }, "Compartilhar")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-faint)',
      marginTop: 'var(--space-4)'
    }
  }, "PNG 2160\xD72700 \xB7 pensado para impress\xE3o"));
}
window.CapPosterArt = PosterArt;
window.CapFinalPoster = FinalPoster;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/capsula/Poster.jsx", error: String((e && e.message) || e) }); }

// ui_kits/capsula/Scenes.jsx
try { (() => {
/* global React */
// Cápsula — narrative scroll scenes. Each scene is "a breath": one idea,
// full-viewport, revealed on scroll. Composes the DS primitives.
const DS = window.CPsulaDesignSystem_0eba3c;
const {
  Button,
  Tag,
  Stat,
  TrackRow,
  YearTabs,
  Ring
} = DS;

/* ---- Reveal: fade + rise when scrolled into view ---- */
function Reveal({
  children,
  delay = 0,
  style
}) {
  const ref = React.useRef(null);
  // shown = visible end-state; animate = whether to ease in (only for scroll-ins).
  const [shown, setShown] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0;
    };
    // Already visible or reduced motion → paint end-state immediately, no transition.
    if (reduced || inView()) {
      setShown(true);
      return;
    }
    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          setAnimate(true);
          setShown(true);
          io.disconnect();
        }
      }, {
        threshold: 0,
        rootMargin: '0px 0px -8% 0px'
      });
      io.observe(el);
    }
    // Fallback: never leave content trapped at opacity:0.
    const t = setTimeout(() => setShown(true), 1200);
    return () => {
      if (io) io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(24px)',
      transition: animate ? `opacity var(--dur-slow) var(--ease-out) ${delay}ms, transform var(--dur-slow) var(--ease-out) ${delay}ms` : 'none',
      ...style
    }
  }, children);
}
const Scene = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("section", {
  style: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 'var(--space-10) var(--gutter)',
    maxWidth: 'var(--max-content)',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    ...style
  }
}, children);
const Eyebrow = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: "cap-eyebrow"
}, children);

/* ---- 1 · Opening ---- */
function OpeningScene() {
  return /*#__PURE__*/React.createElement(Scene, {
    style: {
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    size: 620,
    count: 3,
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "// abertura"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 'var(--text-mega)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      margin: '24px 0 0'
    }
  }, "2023 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)',
      fontStyle: 'italic'
    }
  }, "—"), " 2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      color: 'var(--text-primary)',
      maxWidth: '20ch',
      margin: '32px auto 0',
      lineHeight: 1.25
    }
  }, "Foram 4 anos. Vamos ouvir de novo?")));
}

/* ---- 2 · Artist of the period ---- */
function ArtistScene() {
  return /*#__PURE__*/React.createElement(Scene, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// o artista do per\xEDodo")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      color: 'var(--text-secondary)',
      maxWidth: 'var(--measure-narrow)',
      margin: '20px 0 0',
      lineHeight: 1.5
    }
  }, "Quem mais te acompanhou nessa caminhada inteira.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 220
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: 'var(--text-display)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      margin: '24px 0 0'
    }
  }, "Tame Impala")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 320,
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "minutos",
    value: "14.380",
    accent: true,
    size: "md"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "faixas tocadas",
    value: "42",
    size: "md"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "desde",
    value: "2023",
    size: "md"
  })));
}

/* ---- 3 · Top tracks ---- */
function TopTracksScene() {
  const tracks = [{
    title: 'Ribs',
    sub: 'Lorde · Pure Heroine',
    meta: '412 plays'
  }, {
    title: 'The Less I Know the Better',
    sub: 'Tame Impala',
    meta: '388 plays'
  }, {
    title: 'Motion Sickness',
    sub: 'Phoebe Bridgers',
    meta: '341 plays'
  }, {
    title: 'Glimpse of Us',
    sub: 'Joji',
    meta: '309 plays'
  }, {
    title: 'Espresso',
    sub: 'Sabrina Carpenter',
    meta: '288 plays'
  }];
  return /*#__PURE__*/React.createElement(Scene, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// as 5 m\xFAsicas mais ouvidas")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, tracks.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.title,
    delay: i * 90
  }, /*#__PURE__*/React.createElement(TrackRow, {
    rank: i + 1,
    title: t.title,
    subtitle: t.sub,
    meta: t.meta,
    active: i === 0
  })))));
}

/* ---- 4 · Top artists ---- */
function TopArtistsScene() {
  const artists = [{
    title: 'Tame Impala',
    meta: '14.380 min'
  }, {
    title: 'Lorde',
    meta: '9.910 min'
  }, {
    title: 'Phoebe Bridgers',
    meta: '7.640 min'
  }, {
    title: 'Mac DeMarco',
    meta: '6.205 min'
  }, {
    title: 'Clairo',
    meta: '5.880 min'
  }];
  return /*#__PURE__*/React.createElement(Scene, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// os 5 artistas mais ouvidos")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, artists.map((a, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: a.title,
    delay: i * 90
  }, /*#__PURE__*/React.createElement(TrackRow, {
    rank: i + 1,
    title: a.title,
    meta: a.meta,
    active: i === 0
  })))));
}

/* ---- 5 · Genres ---- */
function GenresScene() {
  const genres = ['indie pop', 'bedroom pop', 'indie rock', 'dream pop', 'lo-fi', 'art pop', 'folk', 'psicodelia'];
  return /*#__PURE__*/React.createElement(Scene, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// minha paleta sonora")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'var(--text-h1)',
      margin: '20px 0 0',
      lineHeight: 1.05
    }
  }, "Os g\xEAneros que ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--accent)'
    }
  }, "pintaram"), " esses anos.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-7)',
      maxWidth: '46ch'
    }
  }, genres.map((g, i) => /*#__PURE__*/React.createElement(Tag, {
    key: g,
    variant: i === 0 ? 'accent' : 'outline'
  }, g))));
}

/* ---- 6 · Totals ---- */
function TotalsScene() {
  return /*#__PURE__*/React.createElement(Scene, {
    style: {
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// os totais")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "minutos ouvidos",
    value: "87.420",
    accent: true,
    size: "mega",
    align: "center"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 260,
    style: {
      display: 'flex',
      gap: 'var(--space-9)',
      marginTop: 'var(--space-8)',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "faixas distintas",
    value: "1.204",
    size: "md",
    align: "center"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "artistas",
    value: "318",
    size: "md",
    align: "center"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "≈ dias inteiros",
    value: "60",
    size: "md",
    align: "center"
  })));
}

/* ---- 7 · Evolution (year switcher) ---- */
function EvolutionScene() {
  const byYear = {
    '2023': {
      artist: 'Mac DeMarco',
      mood: 'lo-fi & desacelerar',
      min: '18.220'
    },
    '2024': {
      artist: 'Phoebe Bridgers',
      mood: 'melancolia luminosa',
      min: '24.910'
    },
    '2025': {
      artist: 'Lorde',
      mood: 'pop expansivo',
      min: '22.180'
    },
    '2026': {
      artist: 'Tame Impala',
      mood: 'psicodelia & foco',
      min: '22.110'
    }
  };
  const [year, setYear] = React.useState('2023');
  const d = byYear[year];
  return /*#__PURE__*/React.createElement(Scene, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, null, "// como meu gosto mudou")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120,
    style: {
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(YearTabs, {
    years: ['2023', '2024', '2025', '2026'],
    value: year,
    onChange: setYear
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 200,
    style: {
      marginTop: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "artista do ano"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: 'var(--text-display)',
      margin: '10px 0 0',
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, d.artist), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-6)',
      flexWrap: 'wrap',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lead)',
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d.mood), /*#__PURE__*/React.createElement(Stat, {
    label: "minutos no ano",
    value: d.min,
    accent: true,
    size: "md"
  }))));
}
Object.assign(window, {
  CapReveal: Reveal,
  CapOpeningScene: OpeningScene,
  CapArtistScene: ArtistScene,
  CapTopTracksScene: TopTracksScene,
  CapTopArtistsScene: TopArtistsScene,
  CapGenresScene: GenresScene,
  CapTotalsScene: TotalsScene,
  CapEvolutionScene: EvolutionScene
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/capsula/Scenes.jsx", error: String((e && e.message) || e) }); }

__ds_ns.GrainOverlay = __ds_scope.GrainOverlay;

__ds_ns.Ring = __ds_scope.Ring;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.TrackRow = __ds_scope.TrackRow;

__ds_ns.YearTabs = __ds_scope.YearTabs;

})();
