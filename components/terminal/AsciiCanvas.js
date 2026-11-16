import { useEffect, useRef, useState } from "react";
import terpscoopPoints from "../../data/terpscoopPoints.json";
import nugPoints from "../../data/nugPoints.json";

const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const AsciiCanvas = () => {
  const [isNug, setIsNug] = useState(false);
  const canvasRef = useRef(null);
  const stateRef = useRef({
    rotX: 0,
    rotY: 0.4,
    velX: 0,
    velY: 0,
    dragging: false,
    movedDist: 0,
    lastX: 0,
    lastY: 0,
    hoverX: -1,
    hoverY: -1,
    hovering: false,
    morph: 0,
    targetMorph: 0,
  });

  useEffect(() => {
    stateRef.current.targetMorph = isNug ? 1 : 0;
  }, [isNug]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerDown = (e) => {
      const s = stateRef.current;
      s.dragging = true;
      s.movedDist = 0;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.velX = 0;
      s.velY = 0;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      const s = stateRef.current;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        s.hoverX = (e.clientX - rect.left) / rect.width;
        s.hoverY = (e.clientY - rect.top) / rect.height;
        s.hovering =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      }

      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.movedDist += Math.hypot(dx, dy);
      s.rotY += dx * 0.011;
      s.rotX += dy * 0.011;
      s.velY = dx * 0.0025;
      s.velX = dy * 0.0025;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };

    const onPointerUp = () => {
      const s = stateRef.current;
      if (!s.dragging) return;
      s.dragging = false;
      if (s.movedDist < 6) {
        setIsNug((prev) => !prev);
      }
    };

    const onPointerLeave = () => {
      stateRef.current.hovering = false;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const ptCount = Math.min(terpscoopPoints.length, nugPoints.length);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const s = stateRef.current;

      const diff = s.targetMorph - s.morph;
      if (Math.abs(diff) > 0.001) {
        s.morph += Math.sign(diff) * Math.min(Math.abs(diff), 0.042);
      } else {
        s.morph = s.targetMorph;
      }
      const m = easeInOutCubic(s.morph);

      if (!s.dragging) {
        s.rotY += 0.01 + s.velY;
        s.rotX += s.velX;
        s.velX *= 0.92;
        s.velY *= 0.92;

        if (s.hovering) {
          const targetX = (s.hoverY - 0.5) * 0.65;
          s.rotX += (targetX - s.rotX) * 0.04;
        } else {
          const idleX = Math.sin(performance.now() * 0.00055) * 0.14;
          s.rotX += (idleX - s.rotX) * 0.025;
        }
      }

      if (rect.width > 0 && rect.height > 0) {
        const w = rect.width;
        const h = rect.height;
        const isMobile = window.innerWidth <= 960;
        const isFineMobile = w <= 768;

        // Smaller characters on mobile for sharper detail
        const cellW = isFineMobile ? 4.2 : 6.8;
        const cellH = isFineMobile ? 7.4 : 11.8;
        const fontSize = isFineMobile ? 7 : 11;

        const cols = Math.max(24, Math.floor(w / cellW));
        const rows = Math.max(16, Math.floor(h / cellH));

        const zBuf = new Float32Array(cols * rows).fill(-999);
        const cBuf = new Array(cols * rows).fill(" ");
        const bBuf = new Float32Array(cols * rows).fill(0);

        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);
        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);

        const swirl = Math.sin(m * Math.PI) * 0.25;
        // Generous fill around shared visual COM without clipping; bias scoop higher visually
        const pxRadius = Math.min(w, h) * (isMobile ? 1.18 : 1.14);
        const dist = 4.22;
        const scoopBiasRows = -(1 - m) * ((isMobile ? 40 : 60) / cellH);
        const centerRow = rows * (isMobile ? 0.365 : 0.51) + scoopBiasRows;

        for (let i = 0; i < ptCount; i++) {
          const a = terpscoopPoints[i];
          const b = nugPoints[i];

          const px = a[0] + (b[0] - a[0]) * m + Math.sin(i * 0.7) * swirl;
          const py = a[1] + (b[1] - a[1]) * m;
          const pz = a[2] + (b[2] - a[2]) * m + Math.cos(i * 0.7) * swirl;

          const nx = a[3] + (b[3] - a[3]) * m;
          const ny = a[4] + (b[4] - a[4]) * m;
          const nz = a[5] + (b[5] - a[5]) * m;

          const x1 = px * cosY - pz * sinY;
          const z1 = px * sinY + pz * cosY;
          const y2 = py * cosX - z1 * sinX;
          const z2 = py * sinX + z1 * cosX;

          const nx1 = nx * cosY - nz * sinY;
          const nz1 = nx * sinY + nz * cosY;
          const ny2 = ny * cosX - nz1 * sinX;
          const nz2 = ny * sinX + nz1 * cosX;

          const ooz = 1 / (dist - z2);
          const sx = Math.floor(cols * 0.5 + (x1 * ooz * pxRadius) / cellW);
          const sy = Math.floor(centerRow - (y2 * ooz * pxRadius) / cellH);

          if (sx >= 0 && sx < cols && sy >= 0 && sy < rows) {
            const idx = sy * cols + sx;
            if (ooz > zBuf[idx]) {
              zBuf[idx] = ooz;

              const keyLight = Math.max(0, nx1 * 0.45 + ny2 * 0.55 + nz2 * 0.7);
              const depthShade = Math.max(0, Math.min(1, (z2 + 1.55) / 3.1));
              const raw = keyLight * 0.74 + depthShade * 0.26;
              const contrast = Math.max(
                0.05,
                Math.min(1, Math.pow(raw, 1.35) + 0.04)
              );

              const charIdx = Math.min(
                RAMP.length - 1,
                Math.floor(contrast * (RAMP.length - 1))
              );
              cBuf[idx] = RAMP[charIdx];
              bBuf[idx] = contrast;
            }
          }
        }

        ctx.clearRect(0, 0, w, h);
        ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textBaseline = "top";

        const offsetX = (w - cols * cellW) * 0.5;
        const offsetY = (h - rows * cellH) * 0.5;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const ch = cBuf[r * cols + c];
            if (ch === " ") continue;

            let b = bBuf[r * cols + c];
            let nearCursor = false;

            if (s.hovering) {
              const dx = c / cols - s.hoverX;
              const dy = r / rows - s.hoverY;
              const d2 = dx * dx + dy * dy;
              if (d2 < 0.025) {
                nearCursor = true;
                b = Math.min(1, b + (1 - d2 / 0.025) * 0.35);
              }
            }

            if (nearCursor || b > 0.74) {
              ctx.fillStyle = "#FFFFFF";
              ctx.globalAlpha = 0.7 + b * 0.3;
            } else if (b > 0.46) {
              ctx.fillStyle = "#C2C9D2";
              ctx.globalAlpha = 0.45 + b * 0.5;
            } else if (b > 0.22) {
              ctx.fillStyle = "#5B626D";
              ctx.globalAlpha = 0.4 + b * 0.45;
            } else {
              ctx.fillStyle = "#2A2E35";
              ctx.globalAlpha = 0.55;
            }

            ctx.fillText(ch, offsetX + c * cellW, offsetY + r * cellH);
          }
        }
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="ascii-stage">
      <div className="ascii-viewport">
        <canvas
          ref={canvasRef}
          className="ascii-canvas"
          aria-label="Interactive 3D ASCII sculpture — click to transform, drag to rotate"
        />
      </div>

      <style jsx>{`
        .ascii-stage {
          width: 100%;
          height: 100%;
        }

        .ascii-viewport {
          position: relative;
          height: 740px;
          width: 100%;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0.045) 0%,
            rgba(5, 5, 6, 0) 68%
          );
        }

        .ascii-canvas {
          width: 100%;
          height: 100%;
          display: block;
          cursor: pointer;
          touch-action: none;
        }

        .ascii-canvas:active {
          cursor: grabbing;
        }

        @media (max-width: 960px) {
          .ascii-viewport {
            height: 600px;
            background: radial-gradient(
              circle at 50% 36%,
              rgba(255, 255, 255, 0.05) 0%,
              rgba(5, 5, 6, 0) 60%
            );
          }
        }

        @media (max-width: 520px) {
          .ascii-viewport {
            height: 580px;
          }
        }
      `}</style>
    </div>
  );
};

export default AsciiCanvas;
