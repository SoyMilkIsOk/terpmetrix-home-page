import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import scoopPoints from "../data/terpscoopPoints.json";
import {
  DEFAULT_PARAMS,
  OG_HEIGHT,
  OG_PRESETS,
  OG_WIDTH,
  findPlanarPitchDeg,
  renderOgScene,
} from "../lib/ogScoopRenderer";

const STORAGE_KEY = "tmx_og_framer_v1";

function SliderRow({
  label,
  value,
  min,
  max,
  step = 0.5,
  unit = "",
  onChange,
}) {
  return (
    <label className="ogf-row">
      <div className="ogf-row-head">
        <span>{label}</span>
        <input
          type="number"
          className="ogf-num"
          value={Number.isFinite(value) ? Number(value.toFixed(2)) : 0}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const next = parseFloat(e.target.value);
            if (Number.isFinite(next)) onChange(next);
          }}
        />
        {unit ? <span className="ogf-unit">{unit}</span> : null}
      </div>
      <input
        type="range"
        className="ogf-range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

export default function OgFramerPage() {
  const [params, setParams] = useState(DEFAULT_PARAMS);
  const [dragMode, setDragMode] = useState("pitchRoll");
  const [showGuides, setShowGuides] = useState(true);
  const [linkGlow, setLinkGlow] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [telemetry, setTelemetry] = useState({
    bbox: { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 },
    bowlMeanZ: 0,
    handleMeanZ: 0,
    axisZDeg: 0,
  });

  const canvasRef = useRef(null);
  const thumbCanvasRef = useRef(null);
  const dragRef = useRef(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setParams((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // Ignore malformed draft
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch {
      // Ignore storage quota errors
    }
  }, [params]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stats = renderOgScene(canvas, scoopPoints, paramsRef.current);
    if (stats) setTelemetry(stats);

    const thumb = thumbCanvasRef.current;
    if (thumb) {
      const tctx = thumb.getContext("2d");
      if (tctx) {
        tctx.clearRect(0, 0, thumb.width, thumb.height);
        tctx.drawImage(canvas, 0, 0, thumb.width, thumb.height);
      }
    }
  }, []);

  useEffect(() => {
    redraw();
  }, [params, redraw]);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => redraw());
    }
  }, [redraw]);

  const updateParam = useCallback(
    (key, value) => {
      setParams((prev) => {
        const next = { ...prev, [key]: value };
        if (key === "dist" && prev.lockSizeOnDist && prev.dist > 0.2) {
          const ratio = value / prev.dist;
          next.pxR = Math.round(prev.pxR * ratio * 10) / 10;
        }
        if (linkGlow && (key === "centerX" || key === "centerY")) {
          next.glowX = next.centerX;
          next.glowY = Math.round((next.centerY + 18) * 10) / 10;
        }
        return next;
      });
    },
    [linkGlow]
  );

  const handleSnapPlanar = useCallback(() => {
    const snapped = findPlanarPitchDeg(scoopPoints, paramsRef.current);
    setParams((prev) => ({ ...prev, bowlPush: snapped }));
    setStatusMsg(`Snapped bowlPush to ${snapped}° (bowl & handle planar)`);
  }, []);

  const handlePointerDown = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startParams: { ...paramsRef.current },
      rect: canvas.getBoundingClientRect(),
      button: e.button,
    };
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const sp = drag.startParams;

    if (e.altKey) {
      setParams((prev) => ({
        ...prev,
        screenRoll: Math.round((sp.screenRoll + dx * 0.25) * 10) / 10,
      }));
      return;
    }

    if (dragMode === "pan" || e.shiftKey || drag.button === 2) {
      const scaleX = OG_WIDTH / Math.max(1, drag.rect.width);
      const scaleY = OG_HEIGHT / Math.max(1, drag.rect.height);
      const cx = Math.round((sp.centerX + dx * scaleX) * 10) / 10;
      const cy = Math.round((sp.centerY + dy * scaleY) * 10) / 10;
      setParams((prev) => ({
        ...prev,
        centerX: cx,
        centerY: cy,
        ...(linkGlow ? { glowX: cx, glowY: cy + 18 } : {}),
      }));
      return;
    }

    if (dragMode === "orbit") {
      setParams((prev) => ({
        ...prev,
        rotY: Math.round((sp.rotY + dx * 0.3) * 10) / 10,
        rotX: Math.round((sp.rotX + dy * 0.3) * 10) / 10,
      }));
      return;
    }

    setParams((prev) => ({
      ...prev,
      axisRoll: Math.round((sp.axisRoll + dx * 0.32) * 10) / 10,
      bowlPush: Math.round((sp.bowlPush + dy * 0.28) * 10) / 10,
    }));
  };

  const handlePointerUp = (e) => {
    if (dragRef.current && canvasRef.current?.hasPointerCapture(e.pointerId)) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.03 : 0.97;
    setParams((prev) => ({
      ...prev,
      pxR: Math.max(150, Math.min(4000, Math.round(prev.pxR * factor * 10) / 10)),
    }));
  };

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "og-image.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setStatusMsg("Downloaded 1200x630 og-image.png");
    }, "image/png");
  };

  const handleSaveToDisk = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSaving(true);
    setStatusMsg("Saving public/og-image.png...");
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const res = await fetch("/api/og-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataUrl }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatusMsg(json.error || "Save failed");
      } else {
        setStatusMsg(`Saved ${json.path} (${Math.round(json.bytes / 1024)} KB)`);
      }
    } catch (err) {
      setStatusMsg(err.message || "Network error while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleCopyParams = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(params, null, 2));
      setStatusMsg("Copied framing JSON to clipboard");
    } catch {
      setStatusMsg("Clipboard copy failed");
    }
  };

  const deltaZ = telemetry.bowlMeanZ - telemetry.handleMeanZ;
  const isPlanar = Math.abs(deltaZ) < 0.08;

  const margins = useMemo(() => {
    const { bbox } = telemetry;
    return {
      top: bbox.minY,
      bottom: Math.max(0, OG_HEIGHT - bbox.maxY),
      right: Math.max(0, OG_WIDTH - bbox.maxX),
      leftGapToText: bbox.minX - 430,
    };
  }, [telemetry]);

  return (
    <>
      <Head>
        <title>OG Framer — Terpmetrix Internal Tool</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@700;800&display=swap");
      `}</style>

      <div className="ogf-shell">
        <header className="ogf-topbar">
          <div className="ogf-brand">
            <span className="ogf-kicker">INTERNAL_TOOL // OG_FRAMER</span>
            <span className="ogf-dim">1200 × 630 ASCII SCOOP COMPOSER</span>
          </div>

          <div className="ogf-actions">
            <button
              type="button"
              className="ogf-btn ogf-btn-accent"
              onClick={handleSnapPlanar}
              title="Solve bowlPush so upper bowl & lower handle sit at equal camera depth"
            >
              Snap Planar (Z=Z)
            </button>
            <button type="button" className="ogf-btn" onClick={handleCopyParams}>
              Copy JSON
            </button>
            <button type="button" className="ogf-btn" onClick={handleDownloadPng}>
              Download PNG
            </button>
            <button
              type="button"
              className="ogf-btn ogf-btn-primary"
              onClick={handleSaveToDisk}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save to public/og-image.png"}
            </button>
          </div>
        </header>

        <div className="ogf-presets">
          <div className="ogf-preset-group">
            <span className="ogf-label">PRESETS:</span>
            {OG_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="ogf-chip"
                onClick={() => {
                  setParams({ ...preset.params });
                  setStatusMsg(`Loaded preset: ${preset.label}`);
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
          {statusMsg ? <span className="ogf-status">{statusMsg}</span> : null}
        </div>

        <div className="ogf-main">
          <section className="ogf-stage-col">
            <div className="ogf-stage-toolbar">
              <div className="ogf-seg">
                <button
                  type="button"
                  className={dragMode === "pitchRoll" ? "active" : ""}
                  onClick={() => setDragMode("pitchRoll")}
                >
                  Drag: Roll + Bowl Push
                </button>
                <button
                  type="button"
                  className={dragMode === "orbit" ? "active" : ""}
                  onClick={() => setDragMode("orbit")}
                >
                  Drag: Orbit (Y/X)
                </button>
                <button
                  type="button"
                  className={dragMode === "pan" ? "active" : ""}
                  onClick={() => setDragMode("pan")}
                >
                  Drag: Pan Position
                </button>
              </div>
              <div className="ogf-hint">
                Shift+Drag: Pan · Alt+Drag: Screen Tilt · Scroll: Scale ·{" "}
                <label className="ogf-inline-check">
                  <input
                    type="checkbox"
                    checked={showGuides}
                    onChange={(e) => setShowGuides(e.target.checked)}
                  />
                  Guides
                </label>
              </div>
            </div>

            <div className="ogf-canvas-wrap">
              <canvas
                ref={canvasRef}
                width={OG_WIDTH}
                height={OG_HEIGHT}
                className="ogf-canvas"
                onContextMenu={(e) => e.preventDefault()}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onWheel={handleWheel}
              />

              {showGuides ? (
                <svg
                  className="ogf-guides"
                  viewBox={`0 0 ${OG_WIDTH} ${OG_HEIGHT}`}
                  preserveAspectRatio="none"
                >
                  <rect
                    x="36"
                    y="36"
                    width={OG_WIDTH - 72}
                    height={OG_HEIGHT - 72}
                    fill="none"
                    stroke="rgba(255,255,255,0.10)"
                    strokeDasharray="6 6"
                  />
                  <line
                    x1="400"
                    y1="0"
                    x2="400"
                    y2={OG_HEIGHT}
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <line
                    x1="800"
                    y1="0"
                    x2="800"
                    y2={OG_HEIGHT}
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <line
                    x1="0"
                    y1="210"
                    x2={OG_WIDTH}
                    y2="210"
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <line
                    x1="0"
                    y1="420"
                    x2={OG_WIDTH}
                    y2="420"
                    stroke="rgba(255,255,255,0.06)"
                  />
                  <rect
                    x={telemetry.bbox.minX}
                    y={telemetry.bbox.minY}
                    width={telemetry.bbox.width}
                    height={telemetry.bbox.height}
                    fill="none"
                    stroke="rgba(166, 226, 175, 0.35)"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx={params.centerX}
                    cy={params.centerY}
                    r="5"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                  />
                </svg>
              ) : null}
            </div>

            <div className="ogf-telemetry">
              <div>
                <span className="ogf-k">BBOX</span>
                <span>
                  ({telemetry.bbox.minX}, {telemetry.bbox.minY}) → ({telemetry.bbox.maxX},{" "}
                  {telemetry.bbox.maxY}) [{telemetry.bbox.width}×{telemetry.bbox.height}]
                </span>
              </div>
              <div>
                <span className="ogf-k">MARGINS</span>
                <span>
                  T:{margins.top}px · B:{margins.bottom}px · R:{margins.right}px
                </span>
              </div>
              <div className={isPlanar ? "ogf-planar-ok" : "ogf-planar-warn"}>
                <span className="ogf-k">PLANARITY</span>
                <span>
                  BowlZ:{telemetry.bowlMeanZ.toFixed(2)} · HandleZ:
                  {telemetry.handleMeanZ.toFixed(2)} · ΔZ:{deltaZ >= 0 ? "+" : ""}
                  {deltaZ.toFixed(2)} · SpinePitch:{telemetry.axisZDeg.toFixed(1)}°
                </span>
              </div>
            </div>

            <div className="ogf-mobile-mock-wrap">
              <div className="ogf-label">MOBILE LINK PREVIEW SIMULATION</div>
              <div className="ogf-mobile-card">
                <canvas
                  ref={thumbCanvasRef}
                  width={600}
                  height={315}
                  className="ogf-mobile-thumb"
                />
                <div className="ogf-mobile-meta">
                  <div className="ogf-mobile-title">
                    Terpmetrix — Precision Cannabis Technology & Hardware
                  </div>
                  <div className="ogf-mobile-domain">terpmetrix.com</div>
                </div>
              </div>
            </div>
          </section>

          <aside className="ogf-inspector">
            <div className="ogf-group">
              <h3>01 // POSE & PLANARITY</h3>
              <SliderRow
                label="Long-Axis Roll"
                value={params.axisRoll}
                min={-180}
                max={180}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("axisRoll", v)}
              />
              <SliderRow
                label="Bowl Push Back"
                value={params.bowlPush}
                min={-45}
                max={60}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("bowlPush", v)}
              />
              <SliderRow
                label="Screen Tilt (2D)"
                value={params.screenRoll}
                min={-45}
                max={45}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("screenRoll", v)}
              />
              <SliderRow
                label="Base Rot Y"
                value={params.rotY}
                min={-180}
                max={180}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("rotY", v)}
              />
              <SliderRow
                label="Base Rot X"
                value={params.rotX}
                min={-90}
                max={90}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("rotX", v)}
              />
              <SliderRow
                label="Base Tilt Z"
                value={params.tiltZ}
                min={-45}
                max={45}
                step={0.5}
                unit="°"
                onChange={(v) => updateParam("tiltZ", v)}
              />
            </div>

            <div className="ogf-group">
              <h3>02 // CAMERA & FRAMING</h3>
              <SliderRow
                label="Center X"
                value={params.centerX}
                min={300}
                max={1150}
                step={1}
                unit="px"
                onChange={(v) => updateParam("centerX", v)}
              />
              <SliderRow
                label="Center Y"
                value={params.centerY}
                min={80}
                max={550}
                step={1}
                unit="px"
                onChange={(v) => updateParam("centerY", v)}
              />
              <SliderRow
                label="Scale (pxR)"
                value={params.pxR}
                min={250}
                max={3200}
                step={5}
                onChange={(v) => updateParam("pxR", v)}
              />
              <SliderRow
                label="Camera Dist (Ortho ↑)"
                value={params.dist}
                min={2.4}
                max={12.0}
                step={0.05}
                onChange={(v) => updateParam("dist", v)}
              />
              <label className="ogf-check">
                <input
                  type="checkbox"
                  checked={params.lockSizeOnDist}
                  onChange={(e) => updateParam("lockSizeOnDist", e.target.checked)}
                />
                Lock visual scale when changing Camera Dist
              </label>
              <label className="ogf-check">
                <input
                  type="checkbox"
                  checked={linkGlow}
                  onChange={(e) => setLinkGlow(e.target.checked)}
                />
                Keep radial glow centered behind scoop
              </label>
            </div>

            <div className="ogf-group">
              <h3>03 // ASCII & LIGHTING</h3>
              <SliderRow
                label="Cell Width"
                value={params.cellW}
                min={4.5}
                max={14}
                step={0.1}
                unit="px"
                onChange={(v) => updateParam("cellW", v)}
              />
              <SliderRow
                label="Cell Height"
                value={params.cellH}
                min={7}
                max={20}
                step={0.1}
                unit="px"
                onChange={(v) => updateParam("cellH", v)}
              />
              <SliderRow
                label="ASCII Font Size"
                value={params.fontSize}
                min={8}
                max={18}
                step={0.5}
                unit="px"
                onChange={(v) => updateParam("fontSize", v)}
              />
              <SliderRow
                label="Contrast Gamma"
                value={params.gamma}
                min={0.6}
                max={2.4}
                step={0.02}
                onChange={(v) => updateParam("gamma", v)}
              />
              <SliderRow
                label="Light X"
                value={params.lightX}
                min={-1}
                max={1}
                step={0.05}
                onChange={(v) => updateParam("lightX", v)}
              />
              <SliderRow
                label="Light Y"
                value={params.lightY}
                min={-1}
                max={1}
                step={0.05}
                onChange={(v) => updateParam("lightY", v)}
              />
              <SliderRow
                label="Light Z"
                value={params.lightZ}
                min={0}
                max={1.5}
                step={0.05}
                onChange={(v) => updateParam("lightZ", v)}
              />
            </div>

            <div className="ogf-group">
              <h3>04 // TEXT & BACKDROP</h3>
              <label className="ogf-check">
                <input
                  type="checkbox"
                  checked={params.showText}
                  onChange={(e) => updateParam("showText", e.target.checked)}
                />
                Render TERPMETRIX_ + Headline Lockup
              </label>
              <label className="ogf-row">
                <div className="ogf-row-head">
                  <span>Headline Font</span>
                  <select
                    className="ogf-select"
                    value={params.displayFontFamily}
                    onChange={(e) => updateParam("displayFontFamily", e.target.value)}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Space Grotesk">Space Grotesk</option>
                  </select>
                </div>
              </label>
              <SliderRow
                label="Text Offset X"
                value={params.textOffsetX}
                min={-60}
                max={160}
                step={1}
                unit="px"
                onChange={(v) => updateParam("textOffsetX", v)}
              />
              <SliderRow
                label="Text Offset Y"
                value={params.textOffsetY}
                min={-180}
                max={120}
                step={1}
                unit="px"
                onChange={(v) => updateParam("textOffsetY", v)}
              />
              <SliderRow
                label="Glow Radius"
                value={params.glowR}
                min={100}
                max={750}
                step={10}
                unit="px"
                onChange={(v) => updateParam("glowR", v)}
              />
              <SliderRow
                label="Glow Strength"
                value={params.glowStrength}
                min={0}
                max={32}
                step={0.5}
                onChange={(v) => updateParam("glowStrength", v)}
              />
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .ogf-shell {
          min-height: 100vh;
          background: #050506;
          color: #f4f5f7;
          font-family: var(--font-mono);
          padding: 18px 22px 42px;
        }
        .ogf-topbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.13);
        }
        .ogf-brand {
          display: flex;
          align-items: baseline;
          gap: 14px;
          flex-wrap: wrap;
        }
        .ogf-kicker {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #ffffff;
        }
        .ogf-dim {
          font-size: 11px;
          color: #8e95a0;
          letter-spacing: 0.06em;
        }
        .ogf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ogf-btn {
          background: #111317;
          color: #f4f5f7;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 7px 12px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.04em;
          cursor: pointer;
        }
        .ogf-btn:hover:not(:disabled) {
          border-color: rgba(255, 255, 255, 0.6);
          background: #181b21;
        }
        .ogf-btn:disabled {
          opacity: 0.5;
          cursor: wait;
        }
        .ogf-btn-primary {
          background: #f4f5f7;
          color: #050506;
          border-color: #f4f5f7;
          font-weight: 700;
        }
        .ogf-btn-primary:hover:not(:disabled) {
          background: #ffffff;
        }
        .ogf-btn-accent {
          border-color: rgba(166, 226, 175, 0.5);
          color: #c9f7d0;
        }
        .ogf-presets {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
        }
        .ogf-preset-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }
        .ogf-label {
          font-size: 10px;
          color: #8e95a0;
          letter-spacing: 0.1em;
        }
        .ogf-chip {
          background: #0a0b0d;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #c2c9d2;
          padding: 4px 9px;
          font-size: 11px;
          font-family: var(--font-mono);
          cursor: pointer;
        }
        .ogf-chip:hover {
          border-color: rgba(255, 255, 255, 0.45);
          color: #ffffff;
        }
        .ogf-status {
          font-size: 11px;
          color: #c9f7d0;
        }
        .ogf-main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 20px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .ogf-main {
            grid-template-columns: 1fr;
          }
        }
        .ogf-stage-toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .ogf-seg {
          display: inline-flex;
          border: 1px solid rgba(255, 255, 255, 0.16);
        }
        .ogf-seg button {
          background: #0a0b0d;
          color: #8e95a0;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.16);
          padding: 5px 10px;
          font-size: 11px;
          font-family: var(--font-mono);
          cursor: pointer;
        }
        .ogf-seg button:last-child {
          border-right: none;
        }
        .ogf-seg button.active {
          background: #1b1e25;
          color: #ffffff;
        }
        .ogf-hint {
          font-size: 11px;
          color: #8e95a0;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ogf-inline-check {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #f4f5f7;
          cursor: pointer;
        }
        .ogf-canvas-wrap {
          position: relative;
          width: 100%;
          max-width: 1200px;
          aspect-ratio: 1200 / 630;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: #050506;
          user-select: none;
        }
        .ogf-canvas {
          width: 100%;
          height: 100%;
          display: block;
          cursor: grab;
          touch-action: none;
        }
        .ogf-canvas:active {
          cursor: grabbing;
        }
        .ogf-guides {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .ogf-telemetry {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          padding: 10px 12px;
          background: #0a0b0d;
          border: 1px solid rgba(255, 255, 255, 0.13);
          font-size: 11px;
          color: #c2c9d2;
        }
        .ogf-telemetry .ogf-k {
          color: #636b76;
          margin-right: 6px;
        }
        .ogf-planar-ok {
          color: #c9f7d0;
        }
        .ogf-planar-warn {
          color: #f7d996;
        }
        .ogf-mobile-mock-wrap {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .ogf-mobile-card {
          width: 340px;
          max-width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #141519;
          border: 1px solid rgba(255, 255, 255, 0.14);
        }
        .ogf-mobile-thumb {
          width: 100%;
          height: auto;
          display: block;
        }
        .ogf-mobile-meta {
          padding: 10px 12px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .ogf-mobile-title {
          font-size: 13px;
          font-weight: 600;
          color: #f4f5f7;
          line-height: 1.3;
        }
        .ogf-mobile-domain {
          margin-top: 3px;
          font-size: 11px;
          color: #8e95a0;
        }
        .ogf-inspector {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: calc(100vh - 130px);
          overflow-y: auto;
          padding-right: 4px;
        }
        .ogf-group {
          background: #0a0b0d;
          border: 1px solid rgba(255, 255, 255, 0.13);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ogf-group h3 {
          margin: 0;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #ffffff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 6px;
        }
        .ogf-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 11px;
          color: #a6aeb8;
        }
        .ogf-row-head {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ogf-row-head span:first-child {
          flex: 1;
        }
        .ogf-num {
          width: 68px;
          background: #111317;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f4f5f7;
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 2px 5px;
          text-align: right;
        }
        .ogf-select {
          background: #111317;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f4f5f7;
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 3px 6px;
        }
        .ogf-unit {
          color: #636b76;
          min-width: 14px;
        }
        .ogf-range {
          width: 100%;
          accent-color: #f4f5f7;
          cursor: pointer;
        }
        .ogf-check {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #c2c9d2;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
