import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import TerminalFooter from "../components/terminal/TerminalFooter";

const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const GLITCH_CHARS = "/\\|[]{}#%$+=~^?!01";

function build404Grid(cols, rows) {
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const octx = off.getContext("2d");
  octx.clearRect(0, 0, cols, rows);
  octx.fillStyle = "#ffffff";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  const fontPx = Math.floor(rows * 0.92);
  octx.font = `800 ${fontPx}px "Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif`;
  octx.fillText("404", cols * 0.5, rows * 0.54);
  const data = octx.getImageData(0, 0, cols, rows).data;
  const mask = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    mask[i] = data[i * 4 + 3] / 255;
  }
  return mask;
}

const Ascii404Display = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -1, y: -1, hovering: false, burst: 1.0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId = null;
    let cancelled = false;
    let cols = 0;
    let rows = 0;
    let cellW = 8;
    let cellH = 14;
    let fontSize = 13;
    let mask = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = rect.width < 520;
      cellW = compact ? 6.2 : 9.2;
      cellH = compact ? 10.6 : 15.2;
      fontSize = compact ? 10 : 14;
      cols = Math.max(32, Math.floor(rect.width / cellW));
      rows = Math.max(12, Math.floor(rect.height / cellH));
      mask = build404Grid(cols, rows);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointerRef.current.x = (e.clientX - rect.left) / rect.width;
      pointerRef.current.y = (e.clientY - rect.top) / rect.height;
      pointerRef.current.hovering = true;
    };

    const onLeave = () => {
      pointerRef.current.hovering = false;
    };

    const onClick = () => {
      pointerRef.current.burst = 1.0;
    };

    resize();
    document.fonts?.ready?.then(() => {
      if (!cancelled) resize();
    });
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const p = pointerRef.current;
      p.burst *= 0.94;

      if (mask && rect.width > 0 && rect.height > 0) {
        const now = performance.now();
        const t = now * 0.001;
        const tick = Math.floor(t * 14);
        const scanRow = Math.floor(((t * 0.45) % 1) * rows);
        const offsetX = (rect.width - cols * cellW) * 0.5;
        const offsetY = (rect.height - rows * cellH) * 0.5;

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textBaseline = "top";

        for (let r = 0; r < rows; r++) {
          const sliceHash = Math.sin(r * 17.3 + tick * 31.7);
          const isGlitchSlice =
            Math.abs(sliceHash) > 0.92 - p.burst * 0.55 || r === scanRow;
          const rowShift = isGlitchSlice
            ? Math.round(sliceHash * (1.8 + p.burst * 4.5))
            : 0;

          for (let c = 0; c < cols; c++) {
            const val = mask[r * cols + c];
            if (val < 0.08 && !isGlitchSlice) continue;
            if (val < 0.08 && isGlitchSlice && Math.abs(Math.sin(c * 9.1 + tick)) < 0.94) {
              continue;
            }

            const h = Math.abs(Math.sin((c + 1) * 12.9898 + (r + 1) * 78.233 + tick * 0.7));
            const nearScan = r === scanRow;
            let lum = val * (0.72 + 0.28 * Math.sin(c * 0.18 + t * 2.2));

            let ch;
            if (isGlitchSlice && h < 0.28 + p.burst * 0.35) {
              ch = GLITCH_CHARS[Math.floor((h * 997) % GLITCH_CHARS.length)];
            } else {
              const idx = Math.min(RAMP.length - 1, Math.max(1, Math.floor(lum * (RAMP.length - 1))));
              ch = RAMP[idx];
            }

            if (p.hovering) {
              const dx = c / cols - p.x;
              const dy = r / rows - p.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 0.035) {
                lum = Math.min(1, lum + (1 - d2 / 0.035) * 0.35);
              }
            }

            const drawX = offsetX + (c + rowShift) * cellW;
            const drawY = offsetY + r * cellH;

            // Chromatic RGB ghost split on glitch slices or active scanline
            if (isGlitchSlice && val > 0.25) {
              ctx.fillStyle = "rgba(0, 245, 212, 0.52)";
              ctx.fillText(ch, drawX - 2, drawY);
              ctx.fillStyle = "rgba(255, 64, 214, 0.48)";
              ctx.fillText(ch, drawX + 2, drawY);
            }

            if (nearScan) {
              ctx.fillStyle = "#5EEAD4";
            } else if (lum > 0.78) {
              ctx.fillStyle = "#FFFFFF";
            } else if (lum > 0.45) {
              ctx.fillStyle = "#C2C9D2";
            } else {
              ctx.fillStyle = "#5B626D";
            }

            ctx.fillText(ch, drawX, drawY);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii-404-canvas"
      title="Click to re-scramble signal"
      aria-label="404 error displayed in animated chromatic ASCII characters"
    />
  );
};

const Custom404Page = () => {
  return (
    <Layout
      pageTitle="404 // Route Not Found | Terpmetrix"
      ogTitle="404 // Signal Not Found — Terpmetrix"
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <header className="nf-topbar">
        <div className="tmx-container">
          <div className="nf-topbar-inner">
            <Link href="/" passHref className="nf-brand" aria-label="Terpmetrix Home">
              TERPMETRIX<span className="cursor-blink">_</span>
            </Link>

            <div className="nf-status">[ ERR // 404 ]</div>

            <nav className="nf-nav" aria-label="Recovery navigation">
              <Link href="/#ventures" className="nf-nav-link">
                VENTURES
              </Link>
              <Link href="/#access" className="nf-nav-cta">
                INQUIRE &rarr;
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="nf-main">
        <div className="tmx-container">
          <div className="nf-grid">
            <div className="nf-copy">
              <h1>OOPS</h1>

              <div className="nf-actions">
                <Link href="/" className="nf-btn nf-btn-filled">
                  BACK HOME &rarr;
                </Link>
              </div>
            </div>

            <div className="nf-stage">
              <Ascii404Display />
            </div>
          </div>
        </div>
      </main>

      <TerminalFooter />

      <style jsx>{`
        .nf-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid var(--border-line);
          background: rgba(5, 5, 6, 0.86);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .nf-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          height: 60px;
        }

        .nf-brand {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--text-white);
        }

        .nf-status {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--text-dim);
        }

        .nf-nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nf-nav-link {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--text-silver);
          transition: color 0.2s ease;
        }

        .nf-nav-link:hover {
          color: var(--text-white);
        }

        .nf-nav-cta {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 8px 14px;
          border: 1px solid var(--border-strong);
          color: var(--text-white);
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nf-nav-cta:hover {
          background: #ffffff;
          color: #050506;
          border-color: #ffffff;
        }

        .nf-main {
          min-height: calc(100vh - 146px);
          display: flex;
          align-items: center;
          padding: 56px 0 64px;
        }

        .nf-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
          gap: 32px;
          align-items: center;
        }

        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 5.5vw, 4.4rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--text-white);
          margin: 0 0 28px;
        }

        .nf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .nf-btn {
          appearance: none;
          box-sizing: border-box;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding: 0 22px;
          border: 1px solid #ffffff;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.1em;
          white-space: nowrap;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .nf-btn-filled {
          background-color: #ffffff;
          color: #050506;
        }

        .nf-btn-filled:hover {
          background-color: #d8dde6;
          border-color: #d8dde6;
          color: #050506;
        }

        .nf-stage {
          position: relative;
          width: 100%;
          height: 310px;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.045) 0%,
            rgba(5, 5, 6, 0) 68%
          );
        }

        .nf-stage :global(.ascii-404-canvas) {
          width: 100%;
          height: 100%;
          display: block;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .nf-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .nf-stage {
            order: -1;
            height: 210px;
          }
        }

        @media (max-width: 640px) {
          .nf-status,
          .nf-nav-link {
            display: none;
          }

          .nf-btn {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Custom404Page;
