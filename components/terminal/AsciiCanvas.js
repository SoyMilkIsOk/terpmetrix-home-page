import { useEffect, useRef } from "react";
import terpscoopPoints from "../../data/terpscoopPoints.json";
import nugPoints from "../../data/nugPoints.json";
import coasterPoints from "../../data/coasterPoints.json";

const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const LED_SIZE = 64;
const LED_COUNT = LED_SIZE * LED_SIZE;
const BEZEL_END = LED_COUNT + 640;
const LIGHT_W = 64;
const LIGHT_H = 48;
const HUE_BINS = 24;
const LUM_LEVELS = 8;
const MONO_COUNT = 8;
const MUTED_HUES = [0.068, 0.335, 0.355, 0.375, 0.395, 0.415];
const MUTED_OFFSET = MONO_COUNT + HUE_BINS * LUM_LEVELS;
const CYCLE_MS = 6000;
const GLITCH_GLYPHS = "/\\|[]{}#%$+=~^?!01";
const MODELS = [terpscoopPoints, nugPoints, coasterPoints];
const MAX_PTS = Math.max(...MODELS.map((pts) => pts.length));

// Neon 90s 8-color PROYGBIV stops (Pink, Red, Orange, Yellow, Green, Blue, Indigo, Violet)
const PROYGBIV_HUES = [0.89, 0.985, 0.065, 0.145, 0.37, 0.57, 0.69, 0.78];

const LEAFLETS = [
  [0, 35.5, 4.7, 7.5, 0],
  [-38, 29.5, 3.9, 6.0, -0.06],
  [38, 29.5, 3.9, 6.0, 0.06],
  [-76, 23.0, 3.3, 4.5, -0.07],
  [76, 23.0, 3.3, 4.5, 0.07],
  [-116, 13.5, 2.4, 3.0, -0.04],
  [116, 13.5, 2.4, 3.0, 0.04],
];

const MATRIX_SPARKS = [
  [13, 1.4, 7.5, 0.0, 0.14],
  [50, 1.5, 8.2, 1.3, 0.51],
  [22, 1.2, 6.4, 2.4, 0.83],
  [41, 1.3, 7.1, 3.8, 0.36],
  [9, 1.4, 6.8, 0.9, 0.54],
  [55, 1.5, 7.6, 2.1, 0.88],
  [17, 1.2, 5.9, 4.5, 0.28],
  [47, 1.3, 6.3, 5.2, 0.11],
  [27, 1.1, 7.0, 2.9, 0.46],
  [37, 1.1, 6.7, 5.7, 0.78],
];

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function rampChar(contrast) {
  return RAMP[Math.min(RAMP.length - 1, Math.floor(contrast * (RAMP.length - 1)))];
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 1) + 1) % 1 * 6;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp < 1) {
    r1 = c;
    g1 = x;
  } else if (hp < 2) {
    r1 = x;
    g1 = c;
  } else if (hp < 3) {
    g1 = c;
    b1 = x;
  } else if (hp < 4) {
    g1 = x;
    b1 = c;
  } else if (hp < 5) {
    r1 = x;
    b1 = c;
  } else {
    r1 = c;
    b1 = x;
  }
  const m = l - c * 0.5;
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

function rgbToHex(r, g, b) {
  const hex = (v) => v.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/** Builds static zero-GC palette strings + numeric RGB lookup for fast batched draws. */
function buildPalette() {
  const palette = [
    "#17191d",
    "#31353b",
    "#444a53",
    "#8e949b",
    "#aeb5be",
    "#dce0e6",
    "#f2f4f7",
    "#ffffff",
  ];
  const palR = [];
  const palG = [];
  const palB = [];

  for (let i = 0; i < palette.length; i++) {
    const h = palette[i];
    palR.push(parseInt(h.slice(1, 3), 16));
    palG.push(parseInt(h.slice(3, 5), 16));
    palB.push(parseInt(h.slice(5, 7), 16));
  }

  const levelSat = [0.72, 0.85, 0.92, 0.96, 1.0, 1.0, 0.92, 0.84];
  const levelLit = [0.09, 0.17, 0.27, 0.39, 0.51, 0.62, 0.74, 0.86];

  for (let hb = 0; hb < HUE_BINS; hb++) {
    const hue = hb / HUE_BINS;
    for (let lv = 0; lv < LUM_LEVELS; lv++) {
      const [r, g, b] = hslToRgb(hue, levelSat[lv], levelLit[lv]);
      palette.push(rgbToHex(r, g, b));
      palR.push(r);
      palG.push(g);
      palB.push(b);
    }
  }

  // Dedicated 25%-less-saturated organic palette for the nug (6 hues x 8 lum = 48 bins, total 248 <= 255)
  for (let mh = 0; mh < MUTED_HUES.length; mh++) {
    const hue = MUTED_HUES[mh];
    for (let lv = 0; lv < LUM_LEVELS; lv++) {
      const [r, g, b] = hslToRgb(hue, levelSat[lv] * 0.75, levelLit[lv]);
      palette.push(rgbToHex(r, g, b));
      palR.push(r);
      palG.push(g);
      palB.push(b);
    }
  }

  return {
    palette,
    palR: new Uint8Array(palR),
    palG: new Uint8Array(palG),
    palB: new Uint8Array(palB),
  };
}

const { palette: PALETTE, palR: PAL_R, palG: PAL_G, palB: PAL_B } = buildPalette();

function monoBin(b) {
  if (b > 0.93) return 7;
  if (b > 0.82) return 6;
  if (b > 0.74) return 5;
  if (b > 0.58) return 4;
  if (b > 0.46) return 3;
  if (b > 0.33) return 2;
  if (b > 0.22) return 1;
  return 0;
}

function colorBin(hue, b) {
  const hb = Math.floor((((hue % 1) + 1) % 1) * HUE_BINS) % HUE_BINS;
  const lv = Math.max(0, Math.min(LUM_LEVELS - 1, Math.floor(b * LUM_LEVELS)));
  return MONO_COUNT + hb * LUM_LEVELS + lv;
}

function mutedNugBin(hue, b) {
  const mh =
    hue < 0.2 ? 0 : Math.min(MUTED_HUES.length - 1, Math.max(1, 1 + Math.round((hue - 0.335) / 0.02)));
  const lv = Math.max(0, Math.min(LUM_LEVELS - 1, Math.floor(b * LUM_LEVELS)));
  return MUTED_OFFSET + mh * LUM_LEVELS + lv;
}

function lerpHue(h0, h1, t) {
  let diff = h1 - h0;
  if (diff > 0.5) diff -= 1;
  if (diff < -0.5) diff += 1;
  return ((h0 + diff * t) % 1 + 1) % 1;
}

function sampleProygbivHue(phase) {
  const len = PROYGBIV_HUES.length;
  const wrapped = (((phase % 1) + 1) % 1) * len;
  const idx = Math.floor(wrapped) % len;
  const next = (idx + 1) % len;
  return lerpHue(PROYGBIV_HUES[idx], PROYGBIV_HUES[next], wrapped - Math.floor(wrapped));
}

/** Precomputes a 3D-mapped botanical texture (dark/emerald greens + sparse orange hairs) for the nug. */
function buildNugTextureLUT() {
  const count = nugPoints.length;
  const nugHue = new Float32Array(count);
  const nugTone = new Float32Array(count);
  const nugIsHair = new Uint8Array(count);

  for (let i = 0; i < count; i++) {
    const [px, py, pz] = nugPoints[i];
    const calyx =
      Math.sin(px * 6.2 + Math.cos(py * 5.4) * 1.3) *
        Math.cos(pz * 6.5 + Math.sin(px * 4.8) * 1.2) +
      0.5 * Math.sin(py * 9.5 + px * 7.2 - pz * 6.1) +
      0.3 * Math.cos(px * 13.0 - pz * 11.5 + py * 8.4);
    const cNorm = Math.max(0, Math.min(1, (calyx + 1.55) / 3.1));

    const w1 = Math.sin(px * 8.5 + Math.sin(py * 7.0 + pz * 5.5) * 1.5 + pz * 7.5);
    const w2 = Math.cos(py * 8.0 + Math.cos(pz * 6.5 - px * 5.0) * 1.5 - px * 6.0);
    const clusterGate = Math.sin(px * 4.2 + py * 3.6 - pz * 4.4);
    const isHair =
      Math.abs(w1) < 0.44 && Math.abs(w2) < 0.44 && clusterGate > -0.15 && cNorm > 0.3;

    if (isHair) {
      nugIsHair[i] = 1;
      nugHue[i] = 0.068 + 0.014 * clusterGate;
      nugTone[i] = 0.88;
    } else {
      nugHue[i] = 0.34 + 0.065 * (1 - cNorm);
      nugTone[i] = 0.28 + 0.72 * cNorm;
    }
  }

  return { nugHue, nugTone, nugIsHair };
}

const NUG_TEX = buildNugTextureLUT();

/** Precomputes the 64x64 pixel-art cannabis leaf LUT, perimeter index, and corner brackets. */
function buildLeafLUT() {
  const leafShape = new Float32Array(LED_COUNT);
  const leafDist = new Float32Array(LED_COUNT);
  const isCornerBracket = new Uint8Array(LED_COUNT);
  const borderIdx = new Int16Array(LED_COUNT).fill(-1);
  const cx = 31.5;
  const cy = 42.5;

  for (let row = 0; row < LED_SIZE; row++) {
    const py = row + 0.5;
    for (let col = 0; col < LED_SIZE; col++) {
      const px = col + 0.5;
      const idx = row * LED_SIZE + col;
      const dx0 = px - cx;
      const dy0 = cy - py;

      const uEdge = col === 2 || col === 3 || col === 60 || col === 61;
      const vEdge = row === 2 || row === 3 || row === 60 || row === 61;
      if ((uEdge && (row < 8 || row > 55)) || (vEdge && (col < 8 || col > 55))) {
        isCornerBracket[idx] = 1;
      }

      if (row === 1 && col >= 1 && col <= 62) borderIdx[idx] = col - 1;
      else if (col === 62 && row >= 1 && row <= 62) borderIdx[idx] = 61 + row;
      else if (row === 62 && col >= 1 && col <= 62) borderIdx[idx] = 185 - col;
      else if (col === 1 && row >= 1 && row <= 62) borderIdx[idx] = 247 - row;

      let bestNorm = 999;
      let bestT = 0;
      for (let k = 0; k < LEAFLETS.length; k++) {
        const [angDeg, L, W, sfreq, curve] = LEAFLETS[k];
        const th = (angDeg * Math.PI) / 180;
        const ux = Math.cos(th);
        const uy = -Math.sin(th);
        const vx = Math.sin(th);
        const vy = Math.cos(th);
        const v = dx0 * vx + dy0 * vy;
        if (v < -0.5 || v > L + 0.5) continue;

        const t = Math.max(0, Math.min(1, v / L));
        const u = dx0 * ux + dy0 * uy - curve * L * t * t;
        let env = Math.pow(Math.sin(t * Math.PI), 0.9) * (1.12 - 0.34 * t);
        if (t < 0.08) env = Math.max(env, 0.16);
        const serr =
          1 +
          0.2 * Math.sin(t * sfreq * Math.PI * 2) * Math.pow(Math.sin(t * Math.PI), 0.6);
        const halfW = Math.max(0.65, W * env * serr);
        let norm = Math.abs(u) / halfW;
        if (t > 0.93) norm = Math.max(norm, ((t - 0.93) / 0.07) * 0.85 + norm * 0.4);
        if (norm < bestNorm) {
          bestNorm = norm;
          bestT = t;
        }
      }

      if (dy0 >= -14.5 && dy0 <= 0.5) {
        const stT = Math.max(0, -dy0 / 14.5);
        const stemX = 1.6 * Math.sin(stT * 1.5);
        const snorm = Math.abs(dx0 - stemX) / (1.35 - 0.25 * stT);
        if (snorm < bestNorm) {
          bestNorm = snorm;
          bestT = 0;
        }
      }

      if (bestNorm <= 1) {
        leafShape[idx] = bestNorm < 0.16 && bestT > 0.18 ? 0.62 : bestNorm > 0.66 ? 1 : 0.88;
        leafDist[idx] = Math.min(1, Math.hypot(dx0, dy0) / 36);
      }
    }
  }

  return { leafShape, leafDist, isCornerBracket, borderIdx };
}

const LEAF_LUT = buildLeafLUT();

/** Evaluates one full-color animation frame for the 64x64 LED matrix. */
function updateLedFrame(glowBuf, hueBuf, timeSec) {
  const { leafShape, leafDist, isCornerBracket, borderIdx } = LEAF_LUT;
  const breath = 0.88 + 0.12 * Math.sin(timeSec * 2.1);
  const pulsePos = (timeSec * 0.52) % 1.35;
  const auroraShift = timeSec * 0.14;
  const cometPos = (timeSec * 52) % 244;

  for (let row = 0; row < LED_SIZE; row++) {
    const rowOff = row * LED_SIZE;
    const rowFrac = row / LED_SIZE;
    for (let col = 0; col < LED_SIZE; col++) {
      const idx = rowOff + col;
      const shape = leafShape[idx];
      if (shape > 0) {
        const dWave = Math.exp(-Math.pow((leafDist[idx] - pulsePos) * 5.0, 2));
        const glow = Math.min(1, 0.58 * breath + shape * 0.28 + dWave * 0.26);
        // Emerald-mint leaf core with vivid rainbow/terpene aurora crest along wave
        const baseHue = 0.37 + 0.07 * Math.sin(col * 0.13 + timeSec * 1.4) + (rowFrac - 0.5) * 0.06;
        const veinShift = shape < 0.7 ? 0.08 : 0;
        const crestHue = dWave * (0.28 + 0.25 * Math.sin(auroraShift * 2.1 + leafDist[idx] * 3));
        glowBuf[idx] = glow;
        hueBuf[idx] = baseHue + veinShift + crestHue;
      } else if (borderIdx[idx] >= 0) {
        const distComet = (cometPos - borderIdx[idx] + 244) % 244;
        if (distComet < 26) {
          const tail = 1 - distComet / 26;
          glowBuf[idx] = 0.42 + 0.56 * tail * tail;
          hueBuf[idx] = auroraShift * 0.8 + distComet * 0.015 + 0.5;
        } else {
          glowBuf[idx] = 0.06;
          hueBuf[idx] = 0.46 + rowFrac * 0.2;
        }
      } else if (isCornerBracket[idx]) {
        const cornerPhase = (col < 32 ? 0 : 0.25) + (row < 32 ? 0 : 0.5);
        glowBuf[idx] = 0.62 + 0.22 * Math.sin(timeSec * 2.8 + cornerPhase * 6.28);
        hueBuf[idx] = (0.48 + auroraShift * 0.6 + cornerPhase * 0.4) % 1;
      } else {
        const isDot = (col & 3) === 0 && (row & 3) === 0;
        glowBuf[idx] = isDot ? 0.09 : 0.04;
        hueBuf[idx] = 0.44 + 0.18 * Math.sin(auroraShift + rowFrac * 2);
      }
    }
  }

  for (let s = 0; s < MATRIX_SPARKS.length; s++) {
    const [baseCol, driftAmp, speed, phase, sparkHue] = MATRIX_SPARKS[s];
    const progress = ((timeSec * speed * 0.12 + phase) % 1 + 1) % 1;
    const r = Math.floor(60 - progress * 56);
    const c = Math.max(
      4,
      Math.min(59, Math.round(baseCol + Math.sin(timeSec * 1.7 + phase) * driftAmp))
    );
    if (r >= 2 && r <= 61) {
      const idx = r * LED_SIZE + c;
      if (leafShape[idx] === 0) {
        const twinkle = 0.56 + 0.44 * Math.sin(progress * Math.PI);
        if (twinkle > glowBuf[idx]) {
          glowBuf[idx] = twinkle;
          hueBuf[idx] = (sparkHue + auroraShift * 0.5) % 1;
        }
      }
    }
  }
}

/** Fast 2-pass separable box blur over the tiny 64x48 scene light buffer. */
function blurAndPresentLight(accR, accG, accB, tmpR, tmpG, tmpB, imgData, lightCtx, intensity) {
  const w = LIGHT_W;
  const h = LIGHT_H;
  const out = imgData.data;

  // Horizontal blur (acc -> tmp)
  for (let y = 0; y < h; y++) {
    const rowOff = y * w;
    for (let x = 0; x < w; x++) {
      let sr = 0;
      let sg = 0;
      let sb = 0;
      for (let k = -3; k <= 3; k++) {
        const nx = Math.max(0, Math.min(w - 1, x + k));
        const idx = rowOff + nx;
        sr += accR[idx];
        sg += accG[idx];
        sb += accB[idx];
      }
      const o = rowOff + x;
      tmpR[o] = sr * (1 / 7);
      tmpG[o] = sg * (1 / 7);
      tmpB[o] = sb * (1 / 7);
    }
  }

  // Vertical blur (tmp -> acc) + second horizontal/vertical fade to ImageData
  for (let y = 0; y < h; y++) {
    const vEdge = Math.sin((y / (h - 1)) * Math.PI);
    const rowOff = y * w;
    for (let x = 0; x < w; x++) {
      let sr = 0;
      let sg = 0;
      let sb = 0;
      for (let k = -3; k <= 3; k++) {
        const ny = Math.max(0, Math.min(h - 1, y + k));
        const idx = ny * w + x;
        sr += tmpR[idx];
        sg += tmpG[idx];
        sb += tmpB[idx];
      }
      const o = rowOff + x;
      const edgeFade = Math.min(1, Math.sin((x / (w - 1)) * Math.PI) * vEdge * 1.45) * intensity;
      accR[o] = sr * (1 / 7) * edgeFade;
      accG[o] = sg * (1 / 7) * edgeFade;
      accB[o] = sb * (1 / 7) * edgeFade;
    }
  }

  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    out[p] = Math.min(255, Math.round(accR[i]));
    out[p + 1] = Math.min(255, Math.round(accG[i]));
    out[p + 2] = Math.min(255, Math.round(accB[i]));
    out[p + 3] = 255;
  }

  lightCtx.putImageData(imgData, 0, 0);
}

function getPoint(pts, i) {
  return pts[i % pts.length];
}

function shiftGridRow(grid, cols, r, shift, glitchProb, tintBin, seed) {
  const { zBuf, cBuf, bBuf, colBuf, rowZ, rowC, rowB, rowCol } = grid;
  const rowStart = r * cols;
  for (let c = 0; c < cols; c++) {
    rowZ[c] = zBuf[rowStart + c];
    rowC[c] = cBuf[rowStart + c];
    rowB[c] = bBuf[rowStart + c];
    rowCol[c] = colBuf[rowStart + c];
    zBuf[rowStart + c] = -999;
    cBuf[rowStart + c] = " ";
    bBuf[rowStart + c] = 0;
    colBuf[rowStart + c] = 0;
  }
  for (let c = 0; c < cols; c++) {
    const ch = rowC[c];
    if (ch === " ") continue;
    const nc = c + shift;
    if (nc < 0 || nc >= cols) continue;
    const h = Math.abs(Math.sin((c + 1) * 12.9898 + seed * 78.233));
    const useGlitch = glitchProb > 0 && h < glitchProb;
    zBuf[rowStart + nc] = rowZ[c];
    cBuf[rowStart + nc] = useGlitch
      ? GLITCH_GLYPHS[Math.floor((h * 997) % GLITCH_GLYPHS.length)]
      : ch;
    bBuf[rowStart + nc] = useGlitch ? Math.max(0.82, rowB[c]) : rowB[c];
    colBuf[rowStart + nc] = useGlitch && tintBin >= 0 ? tintBin : rowCol[c];
  }
}

/** Applies the thin single-row countdown glitch wave climbing bottom-to-top across the model. */
function applyCountdownWave(grid, cols, topRow, botRow, cycleElapsed, timeSec) {
  if (botRow <= topRow) return;
  const progress = Math.max(0, Math.min(1, cycleElapsed / CYCLE_MS));
  const waveRow = Math.max(topRow, Math.min(botRow, Math.round(botRow - progress * (botRow - topRow))));
  const shear = Math.round(Math.sin(timeSec * 34) * 1.45);
  const cyanBin = colorBin(0.5, 0.9);
  shiftGridRow(grid, cols, waveRow, shear, 0.34, cyanBin, timeSec * 19 + waveRow);
}

/** Applies chromatic RGB scanline tears during model morphs (auto-cycle & click). */
function applyGlitchTear(grid, cols, topRow, botRow, glitchEnv, now, echoC, echoXY) {
  if (botRow < topRow) return 0;
  const tick = Math.floor(now * 0.036);
  const cyanBin = colorBin(0.5, 0.92);
  const magBin = colorBin(0.88, 0.9);
  const yelBin = colorBin(0.145, 0.94);
  const glitchPalette = [cyanBin, magBin, yelBin, 7];

  let echoCount = 0;
  const bandSpan = Math.max(1, Math.min(botRow, grid.rows - 1));
  for (let r = Math.max(0, topRow); r <= bandSpan; r++) {
    const bandHash = Math.sin((r >> 1) * 19.31 + tick * 43.17);
    if (Math.abs(bandHash) <= 1 - glitchEnv * 0.84) continue;

    const shift = Math.round(bandHash * glitchEnv * 9);
    const tintBin = glitchPalette[Math.abs(r + tick) & 3];
    shiftGridRow(grid, cols, r, shift, 0.38 * glitchEnv, tintBin, tick + r);

    if (echoCount < 32 && (r & 1) === 0) {
      const rowStart = r * cols;
      for (let c = 0; c < cols && echoCount < 32; c += 5) {
        const ch = grid.cBuf[rowStart + c];
        if (ch === " ") continue;
        echoC[echoCount] = ch;
        echoXY[echoCount * 2] = c;
        echoXY[echoCount * 2 + 1] = r;
        echoCount++;
      }
    }
  }
  return echoCount;
}

const AsciiCanvas = () => {
  const canvasRef = useRef(null);
  const lightCanvasRef = useRef(null);
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
    fromIdx: 0,
    toIdx: 0,
    morph: 1,
    usingSnap: false,
    fromWeights: [1, 0, 0],
    toWeights: [1, 0, 0],
    scoopPhase: 0,
    localX: -1,
    localY: -1,
    localStrength: 0,
    cycleElapsed: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const lightCanvas = lightCanvasRef.current;
    if (!canvas || !lightCanvas) return;
    const ctx = canvas.getContext("2d");
    const lightCtx = lightCanvas.getContext("2d");
    const lightImg = lightCtx.createImageData(LIGHT_W, LIGHT_H);

    const snapBuf = new Float32Array(MAX_PTS * 6);
    const glowBuf = new Float32Array(LED_COUNT);
    const hueBuf = new Float32Array(LED_COUNT);
    const echoC = new Array(32);
    const echoXY = new Int32Array(64);
    const localEchoC = new Array(16);
    const localEchoXY = new Int32Array(32);
    const localEchoScale = new Float32Array(16);

    const lightSize = LIGHT_W * LIGHT_H;
    const accR = new Float32Array(lightSize);
    const accG = new Float32Array(lightSize);
    const accB = new Float32Array(lightSize);
    const tmpR = new Float32Array(lightSize);
    const tmpG = new Float32Array(lightSize);
    const tmpB = new Float32Array(lightSize);
    const bucketHead = new Int32Array(PALETTE.length);

    let grid = {
      capacity: 0,
      rowCap: 0,
      rows: 0,
      zBuf: null,
      cBuf: null,
      bBuf: null,
      colBuf: null,
      lBuf: null,
      nextCell: null,
      rowZ: null,
      rowC: null,
      rowB: null,
      rowCol: null,
    };

    const viewMetrics = {
      w: 0,
      h: 0,
      offX: 0,
      offY: 0,
      scaleX: 1,
      scaleY: 1,
    };

    let animId = null;
    let lastTick = performance.now();

    const ensureGrid = (cellCount, cols, rows) => {
      if (cellCount > grid.capacity) {
        grid = {
          ...grid,
          capacity: cellCount,
          zBuf: new Float32Array(cellCount),
          cBuf: new Array(cellCount),
          bBuf: new Float32Array(cellCount),
          colBuf: new Uint8Array(cellCount),
          lBuf: new Uint8Array(cellCount),
          nextCell: new Int32Array(cellCount),
        };
      }
      if (cols > grid.rowCap) {
        grid.rowCap = cols;
        grid.rowZ = new Float32Array(cols);
        grid.rowC = new Array(cols);
        grid.rowB = new Float32Array(cols);
        grid.rowCol = new Uint8Array(cols);
      }
      grid.rows = rows;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const lRect = lightCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      viewMetrics.w = rect.width;
      viewMetrics.h = rect.height;
      if (lRect.width > 0 && lRect.height > 0) {
        viewMetrics.offX = rect.left - lRect.left;
        viewMetrics.offY = rect.top - lRect.top;
        viewMetrics.scaleX = LIGHT_W / lRect.width;
        viewMetrics.scaleY = LIGHT_H / lRect.height;
      }
    };

    const advanceModel = () => {
      const s = stateRef.current;
      const m = easeInOutCubic(s.morph);
      const nextIdx = (s.toIdx + 1) % MODELS.length;

      // Capture exact mid-morph coordinates so rapid clicks stay seamless
      if (s.morph < 0.999) {
        const ptsB = MODELS[s.toIdx];
        const ptsA = MODELS[s.fromIdx];
        const prevSnap = s.usingSnap;
        for (let i = 0; i < MAX_PTS; i++) {
          const base = i * 6;
          const b = getPoint(ptsB, i);
          const a = prevSnap ? null : getPoint(ptsA, i);
          for (let k = 0; k < 6; k++) {
            const ak = prevSnap ? snapBuf[base + k] : a[k];
            snapBuf[base + k] = ak + (b[k] - ak) * m;
          }
        }
        s.usingSnap = true;
      } else {
        s.fromIdx = s.toIdx;
        s.usingSnap = false;
      }

      const curW = [0, 1, 2].map(
        (k) => s.fromWeights[k] + (s.toWeights[k] - s.fromWeights[k]) * m
      );
      s.fromWeights = curW;
      s.toWeights = [nextIdx === 0 ? 1 : 0, nextIdx === 1 ? 1 : 0, nextIdx === 2 ? 1 : 0];
      s.toIdx = nextIdx;
      s.morph = 0;
      s.cycleElapsed = 0;
    };

    const onPointerDown = (e) => {
      const s = stateRef.current;
      s.dragging = true;
      s.movedDist = 0;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.velX = 0;
      s.velY = 0;
      const w = viewMetrics.w;
      const h = viewMetrics.h;
      if (w > 0 && h > 0) {
        const rect = canvas.getBoundingClientRect();
        s.localX = Math.max(0, Math.min(1, (e.clientX - rect.left) / w));
        s.localY = Math.max(0, Math.min(1, (e.clientY - rect.top) / h));
        s.localStrength = 0.85;
      }
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      const s = stateRef.current;
      const w = viewMetrics.w;
      const h = viewMetrics.h;

      if (e.pointerType !== "touch" && w > 0 && h > 0) {
        const rect = canvas.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / w;
        const ny = (e.clientY - rect.top) / h;
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        s.hoverX = nx;
        s.hoverY = ny;
        s.hovering = inside;
        if (inside) {
          s.localX = nx;
          s.localY = ny;
          s.localStrength = 0.85;
        }
      }

      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      const step = Math.hypot(dx, dy);
      s.movedDist += step;
      if (w > 0 && h > 0) {
        const rect = canvas.getBoundingClientRect();
        s.localX = Math.max(0, Math.min(1, (e.clientX - rect.left) / w));
        s.localY = Math.max(0, Math.min(1, (e.clientY - rect.top) / h));
        s.localStrength = 0.9;
      }
      s.rotY += dx * 0.011;
      s.rotX += dy * 0.011;
      s.velY = dx * 0.0025;
      s.velX = dy * 0.0025;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };

    const onPointerUp = (e) => {
      const s = stateRef.current;
      if (e.pointerType === "touch") {
        s.hovering = false;
      }
      if (!s.dragging) return;
      s.dragging = false;
      if (s.movedDist < 6) {
        advanceModel();
      }
    };

    const onPointerLeave = () => {
      stateRef.current.hovering = false;
    };

    resize();
    window.addEventListener("resize", resize);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);
    ro?.observe(lightCanvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const render = () => {
      const s = stateRef.current;
      const now = performance.now();
      const dt = Math.min(100, now - lastTick);
      lastTick = now;
      const timeSec = now * 0.001;

      if (s.morph < 1) {
        s.morph = Math.min(1, s.morph + 0.035);
        if (s.morph >= 1) {
          s.fromIdx = s.toIdx;
          s.usingSnap = false;
          s.fromWeights = [...s.toWeights];
        }
      } else if (!s.dragging) {
        s.cycleElapsed += dt;
        if (s.cycleElapsed >= CYCLE_MS) {
          advanceModel();
        }
      }
      const m = easeInOutCubic(s.morph);
      const w0 = s.fromWeights[0] + (s.toWeights[0] - s.fromWeights[0]) * m;
      const w1 = s.fromWeights[1] + (s.toWeights[1] - s.fromWeights[1]) * m;
      const w2 = s.fromWeights[2] + (s.toWeights[2] - s.fromWeights[2]) * m;

      const dtSec = dt * 0.001;
      // 0.095 cycles/sec -> ~4.5 distinct PROYGBIV stops cycled cleanly across the 6s view
      s.scoopPhase += dtSec * 0.095;
      if (s.dragging) {
        // Keep strong subtle interaction feedback while actively dragging
      } else if (s.hovering) {
        s.localStrength = Math.max(0.45, s.localStrength * 0.94);
      } else {
        s.localStrength *= 0.9;
      }

      if (!s.dragging) {
        s.rotY += 0.01 + s.velY;
        s.rotX += s.velX;
        s.velX *= 0.92;
        s.velY *= 0.92;

        if (s.hovering) {
          const targetX = w2 * 0.72 + (s.hoverY - 0.5) * 0.65;
          s.rotX += (targetX - s.rotX) * 0.04;
        } else {
          const normalIdleX = Math.sin(now * 0.00055) * 0.14;
          const coasterIdleX = 0.76 + Math.sin(now * 0.00055) * 0.07;
          const idleX = normalIdleX * (1 - w2) + coasterIdleX * w2;
          s.rotX += (idleX - s.rotX) * 0.025;
        }
      }

      const w = viewMetrics.w;
      const h = viewMetrics.h;

      if (w > 0 && h > 0) {
        const isMobile = window.innerWidth <= 960;
        const isFineMobile = w <= 768;

        const cellW = isFineMobile ? 4.2 : 6.8;
        const cellH = isFineMobile ? 7.4 : 11.8;
        const fontSize = isFineMobile ? 7 : 11;

        const cols = Math.max(24, Math.floor(w / cellW));
        const rows = Math.max(16, Math.floor(h / cellH));
        const cellCount = cols * rows;
        ensureGrid(cellCount, cols, rows);

        const { zBuf, cBuf, bBuf, colBuf, lBuf, nextCell } = grid;
        zBuf.fill(-999, 0, cellCount);
        cBuf.fill(" ", 0, cellCount);
        bBuf.fill(0, 0, cellCount);
        colBuf.fill(0, 0, cellCount);
        lBuf.fill(0, 0, cellCount);
        let topRow = rows;
        let botRow = -1;

        const hasLed = w2 > 0.02;
        if (hasLed) {
          updateLedFrame(glowBuf, hueBuf, timeSec);
        }
        accR.fill(0);
        accG.fill(0);
        accB.fill(0);

        const cosX = Math.cos(s.rotX);
        const sinX = Math.sin(s.rotX);
        const cosY = Math.cos(s.rotY);
        const sinY = Math.sin(s.rotY);

        const morphing = s.morph < 1;
        const glitchEnv = morphing ? Math.sin(m * Math.PI) : 0;
        const swirl = morphing ? glitchEnv * 0.24 : 0;
        const pxRadius = Math.min(w, h) * (isMobile ? 1.18 : 1.14);
        const dist = 4.22;
        const scoopBiasRows = -w0 * ((isMobile ? 40 : 60) / cellH);
        const centerRow = rows * (isMobile ? 0.365 : 0.51) + scoopBiasRows;
        const offsetX = (w - cols * cellW) * 0.5;
        const offsetY = (h - rows * cellH) * 0.5;
        const auroraShift = timeSec * 0.14;
        const scoopBaseHue = sampleProygbivHue(s.scoopPhase);
        const scoopWaveSpread = 0.085;
        const hasScoop = w0 > 0.01;
        const hasNug = w1 > 0.01;
        const nugLen = nugPoints.length;
        // Scoop specifically reduced an additional 50% in emitted glow (0.17 -> 0.085)
        const emWeight = w0 * 0.085 + w1 * 0.18 + w2 * 0.22;

        const ptsA = MODELS[s.fromIdx];
        const ptsB = MODELS[s.toIdx];
        const ptCount =
          s.usingSnap || s.fromIdx === 2 || s.toIdx === 2 ? MAX_PTS : ptsB.length;

        for (let i = 0; i < ptCount; i++) {
          let px;
          let py;
          let pz;
          let nx;
          let ny;
          let nz;

          if (!morphing && !s.usingSnap) {
            const p = getPoint(ptsB, i);
            px = p[0];
            py = p[1];
            pz = p[2];
            nx = p[3];
            ny = p[4];
            nz = p[5];
          } else {
            const b = getPoint(ptsB, i);
            const a = s.usingSnap ? null : getPoint(ptsA, i);
            const base = i * 6;
            const ax = s.usingSnap ? snapBuf[base] : a[0];
            const ay = s.usingSnap ? snapBuf[base + 1] : a[1];
            const az = s.usingSnap ? snapBuf[base + 2] : a[2];
            const anx = s.usingSnap ? snapBuf[base + 3] : a[3];
            const any = s.usingSnap ? snapBuf[base + 4] : a[4];
            const anz = s.usingSnap ? snapBuf[base + 5] : a[5];

            px = ax + (b[0] - ax) * m + Math.sin(i * 0.7) * swirl;
            py = ay + (b[1] - ay) * m;
            pz = az + (b[2] - az) * m + Math.cos(i * 0.7) * swirl;
            nx = anx + (b[3] - anx) * m;
            ny = any + (b[4] - any) * m;
            nz = anz + (b[5] - anz) * m;
          }

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
            const isLed = hasLed && i < LED_COUNT;

            let contrast = 0;
            let hue = scoopBaseHue;
            let colorLevel = 0;
            let useMono = false;

            if (w2 > 0.99 && isLed) {
              const g = glowBuf[i];
              contrast = g > 0.36 ? Math.min(1, 0.56 + g * 0.44) : g;
              hue = hueBuf[i];
              colorLevel = g;
            } else {
              const keyLight = Math.max(0, nx1 * 0.45 + ny2 * 0.55 + nz2 * 0.7);
              const depthShade = Math.max(0, Math.min(1, (z2 + 1.55) / 3.1));
              let litSum = 0;
              let colSum = 0;
              let hueAccum = -1;
              let hueW = 0;

              if (hasScoop) {
                const fresnel = Math.pow(Math.max(0, 1 - Math.abs(nz2)), 1.45);
                const gloss = keyLight * keyLight * keyLight;
                const sLit = Math.max(
                  0.18,
                  Math.min(1, 0.2 + depthShade * 0.2 + fresnel * 0.54 + gloss * 0.38)
                );
                const sCol = Math.min(1, 0.34 + fresnel * 0.38 + gloss * 0.24);
                const sHue = sampleProygbivHue(s.scoopPhase - (px + py) * scoopWaveSpread);
                litSum += sLit * w0;
                colSum += sCol * w0;
                hueAccum = sHue;
                hueW = w0;
              }

              if (hasNug) {
                const nIdx = i % nugLen;
                const nHue = NUG_TEX.nugHue[nIdx];
                const nLit = NUG_TEX.nugIsHair[nIdx]
                  ? Math.min(1, 0.56 + keyLight * 0.32 + depthShade * 0.2)
                  : Math.max(
                      0.1,
                      Math.min(
                        0.96,
                        NUG_TEX.nugTone[nIdx] * (0.3 + 0.58 * keyLight + 0.26 * depthShade)
                      )
                    );
                const nCol = NUG_TEX.nugIsHair[nIdx] ? Math.min(1, nLit * 1.05) : nLit * 0.92;
                litSum += nLit * w1;
                colSum += nCol * w1;
                hueAccum = hueAccum < 0 ? nHue : lerpHue(hueAccum, nHue, w1 / (hueW + w1));
                hueW += w1;
              }

              if (hasLed) {
                if (isLed) {
                  const g = glowBuf[i];
                  const ledLit = g > 0.36 ? Math.min(1, 0.56 + g * 0.44) : g;
                  litSum += ledLit * w2;
                  colSum += g * w2;
                  hueAccum =
                    hueAccum < 0 ? hueBuf[i] : lerpHue(hueAccum, hueBuf[i], w2 / (hueW + w2));
                } else {
                  const isTopBezel = i < BEZEL_END;
                  if (isTopBezel) {
                    litSum += 0.008 * w2;
                    if (w2 > 0.5 && !hasScoop && !hasNug) {
                      useMono = true;
                    }
                  } else {
                    const rim = Math.max(0, 1 - Math.abs(py - 0.06) * 2.8);
                    const wallLit = Math.min(
                      0.46,
                      0.16 + keyLight * 0.18 + depthShade * 0.12 + rim * 0.12
                    );
                    const wallCol = Math.min(0.44, 0.14 + keyLight * 0.14 + rim * 0.12);
                    const baseHue = 0.39 + (px + pz) * 0.14 - auroraShift;
                    litSum += wallLit * w2;
                    colSum += wallCol * w2;
                    hueAccum =
                      hueAccum < 0 ? baseHue : lerpHue(hueAccum, baseHue, w2 / (hueW + w2));
                  }
                }
              }

              contrast = litSum;
              colorLevel = colSum;
              hue = hueAccum < 0 ? scoopBaseHue : hueAccum;
            }

            const cBin = useMono
              ? monoBin(contrast)
              : w1 > 0.5 && !hasScoop && !hasLed
                ? mutedNugBin(hue, colorLevel)
                : colorBin(hue, colorLevel);
            const ledSurfaceWin = isLed && w2 > 0.5;
            let wrote = false;

            if (ledSurfaceWin) {
              const samePlane = lBuf[idx] === 1 && Math.abs(ooz - zBuf[idx]) < 0.015;
              if (samePlane) {
                if (contrast > bBuf[idx]) {
                  zBuf[idx] = Math.max(zBuf[idx], ooz);
                  bBuf[idx] = contrast;
                  colBuf[idx] = cBin;
                  cBuf[idx] = rampChar(contrast);
                  wrote = true;
                }
              } else if (ooz > zBuf[idx]) {
                zBuf[idx] = ooz;
                lBuf[idx] = 1;
                bBuf[idx] = contrast;
                colBuf[idx] = cBin;
                cBuf[idx] = rampChar(contrast);
                wrote = true;
              }
            } else if (ooz > zBuf[idx]) {
              zBuf[idx] = ooz;
              lBuf[idx] = 0;
              bBuf[idx] = contrast;
              colBuf[idx] = cBin;
              cBuf[idx] = rampChar(contrast);
              wrote = true;
            }

            if (wrote && cBuf[idx] !== " ") {
              if (sy < topRow) topRow = sy;
              if (sy > botRow) botRow = sy;
            }

            // All active models cast colored glow into the scene light map
            if ((i & 3) === 0 && contrast > 0.24) {
              const lx = Math.floor(
                (viewMetrics.offX + offsetX + sx * cellW) * viewMetrics.scaleX
              );
              const ly = Math.floor(
                (viewMetrics.offY + offsetY + sy * cellH) * viewMetrics.scaleY
              );
              if (lx >= 0 && lx < LIGHT_W && ly >= 0 && ly < LIGHT_H) {
                const lo = ly * LIGHT_W + lx;
                const em = (ledSurfaceWin ? glowBuf[i] : contrast) * emWeight;
                accR[lo] += PAL_R[cBin] * em;
                accG[lo] += PAL_G[cBin] * em;
                accB[lo] += PAL_B[cBin] * em;
              }
            }
          }
        }

        // Cast directional object glow sweep into surrounding dark hero scene
        {
          const cxL = (viewMetrics.offX + w * 0.5) * viewMetrics.scaleX;
          const cyL = (viewMetrics.offY + (centerRow / rows) * h) * viewMetrics.scaleY;
          const beamDx = Math.sin(s.rotY) * (isMobile ? 8 : 11);
          const beamDy = Math.cos(s.rotY) * 3.5 + (isMobile ? 4 : 6);
          const spillAmp = w0 * 4 + w1 * 7 + w2 * 9.5 + glitchEnv * 9;
          const ledSpillHue = (0.39 + s.rotY * 0.08 - auroraShift) % 1;
          let baseSpillHue = lerpHue(
            lerpHue(scoopBaseHue, 0.36, w1 / Math.max(0.001, w0 + w1)),
            ledSpillHue,
            w2
          );
          if (glitchEnv > 0.1) {
            baseSpillHue = lerpHue(baseSpillHue, (now * 0.004) % 1, glitchEnv * 0.65);
          }

          for (let dy = -11; dy <= 11; dy++) {
            const ly = Math.round(cyL + beamDy + dy);
            if (ly < 0 || ly >= LIGHT_H) continue;
            for (let dx = -22; dx <= 22; dx++) {
              const lx = Math.round(cxL + beamDx + dx);
              if (lx < 0 || lx >= LIGHT_W) continue;
              const d2 = (dx * dx) / 484 + (dy * dy) / 121;
              if (d2 < 1) {
                const falloff = (1 - d2) * (1 - d2) * spillAmp;
                const sb = colorBin(baseSpillHue + dx * 0.012 * (w2 + w0 * 0.35), 0.72);
                const lo = ly * LIGHT_W + lx;
                accR[lo] += PAL_R[sb] * (falloff / 255);
                accG[lo] += PAL_G[sb] * (falloff / 255);
                accB[lo] += PAL_B[sb] * (falloff / 255);
              }
            }
          }

          const blurIntensity = w0 * 0.88 + w1 * 0.84 + w2 * 0.8;
          blurAndPresentLight(accR, accG, accB, tmpR, tmpG, tmpB, lightImg, lightCtx, blurIntensity);
        }

        // Countdown long-axis thin glitch wave (when settled) OR chromatic RGB glitch tear (during morph)
        let echoCount = 0;
        if (morphing) {
          echoCount = applyGlitchTear(grid, cols, topRow, botRow, glitchEnv, now, echoC, echoXY);
        } else {
          applyCountdownWave(grid, cols, topRow, botRow, s.cycleElapsed, timeSec);
        }

        // Batch ASCII characters by palette bin so ctx.fillStyle switches ~35x instead of ~2,000x
        bucketHead.fill(-1);
        let localEchoCount = 0;
        const localTick = Math.floor(timeSec * 22);
        const localCyanBin = colorBin(0.5, 0.88);
        const localMagBin = colorBin(0.88, 0.86);
        const localYelBin = colorBin(0.145, 0.9);
        const localBins = [localCyanBin, localMagBin, localYelBin, 7];
        const localShift = Math.sin(timeSec * 28) * 2.5;
        const midOoz = 1 / dist;
        const centerYNorm = centerRow / rows;
        const aspect = h / Math.max(1, w);
        for (let idx = 0; idx < cellCount; idx++) {
          if (cBuf[idx] === " ") continue;
          let bin = colBuf[idx];

          if (s.localStrength > 0.05 && s.localX >= 0) {
            const c = idx % cols;
            const r = Math.floor(idx / cols);
            const cellOoz = zBuf[idx] > 0 ? zBuf[idx] : midOoz;
            // True perspective scaling & ray parallax from depth Z-buffer (bigger up close, smaller farther back)
            const depthScale = Math.max(0.58, Math.min(1.7, cellOoz / midOoz));
            const parX = (s.localX - 0.5) * (depthScale - 1) * 0.16;
            const parY = (s.localY - centerYNorm) * (depthScale - 1) * 0.16;
            const dx = c / cols - (s.localX + parX);
            const dy = (r / rows - (s.localY + parY)) * aspect;
            const spotR2 = 0.0068 * depthScale * depthScale;
            const d2 = dx * dx + dy * dy;
            if (d2 < spotR2) {
              const falloff = (1 - d2 / spotR2) * s.localStrength;
              const noise = Math.abs(Math.sin(c * 13.7 + r * 29.3 + localTick * 17.3));
              if (falloff > 0.16 && noise > 0.56 - falloff * 0.34) {
                const gCh = GLITCH_GLYPHS[Math.floor((noise * 997) % GLITCH_GLYPHS.length)];
                cBuf[idx] = gCh;
                bin = localBins[(c + r + localTick) & 3];
                if (localEchoCount < 14 && ((idx + localTick) & 1) === 0) {
                  localEchoC[localEchoCount] = gCh;
                  localEchoXY[localEchoCount * 2] = c;
                  localEchoXY[localEchoCount * 2 + 1] = r;
                  localEchoScale[localEchoCount] = depthScale;
                  localEchoCount++;
                }
              } else if (bin < MONO_COUNT) {
                const boosted = Math.min(1, bBuf[idx] + falloff * 0.22);
                bin = monoBin(boosted);
              } else {
                const hb = Math.floor((bin - MONO_COUNT) / LUM_LEVELS);
                const lv = (bin - MONO_COUNT) % LUM_LEVELS;
                const lvBoost = falloff > 0.3 ? 1 : 0;
                bin = MONO_COUNT + hb * LUM_LEVELS + Math.min(LUM_LEVELS - 1, lv + lvBoost);
              }
            }
          }

          nextCell[idx] = bucketHead[bin];
          bucketHead[bin] = idx;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;
        ctx.textBaseline = "top";
        ctx.globalAlpha = 1;

        if (localEchoCount > 0) {
          ctx.globalAlpha = Math.min(0.45, s.localStrength * 0.45);
          ctx.fillStyle = PALETTE[localCyanBin];
          for (let e = 0; e < localEchoCount; e++) {
            ctx.fillText(
              localEchoC[e],
              offsetX + localEchoXY[e * 2] * cellW - localShift * localEchoScale[e],
              offsetY + localEchoXY[e * 2 + 1] * cellH
            );
          }
          ctx.fillStyle = PALETTE[localMagBin];
          for (let e = 0; e < localEchoCount; e++) {
            ctx.fillText(
              localEchoC[e],
              offsetX + localEchoXY[e * 2] * cellW + localShift * localEchoScale[e],
              offsetY + localEchoXY[e * 2 + 1] * cellH
            );
          }
          ctx.globalAlpha = 1;
        }

        if (echoCount > 0) {
          ctx.globalAlpha = Math.min(0.65, glitchEnv * 0.7);
          ctx.fillStyle = PALETTE[colorBin(0.5, 0.88)];
          for (let e = 0; e < echoCount; e++) {
            ctx.fillText(echoC[e], offsetX + echoXY[e * 2] * cellW - 3, offsetY + echoXY[e * 2 + 1] * cellH);
          }
          ctx.fillStyle = PALETTE[colorBin(0.88, 0.88)];
          for (let e = 0; e < echoCount; e++) {
            ctx.fillText(echoC[e], offsetX + echoXY[e * 2] * cellW + 3, offsetY + echoXY[e * 2 + 1] * cellH);
          }
          ctx.globalAlpha = 1;
        }

        for (let p = 0; p < PALETTE.length; p++) {
          let idx = bucketHead[p];
          if (idx === -1) continue;
          ctx.fillStyle = PALETTE[p];
          while (idx !== -1) {
            const c = idx % cols;
            const r = Math.floor(idx / cols);
            ctx.fillText(cBuf[idx], offsetX + c * cellW, offsetY + r * cellH);
            idx = nextCell[idx];
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro?.disconnect();
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
          ref={lightCanvasRef}
          width={LIGHT_W}
          height={LIGHT_H}
          className="ascii-light-aura"
          aria-hidden="true"
        />
        <canvas
          ref={canvasRef}
          className="ascii-canvas"
          aria-label="Interactive 3D ASCII sculpture — click to cycle models, drag to rotate"
        />
      </div>

      <style jsx>{`
        .ascii-stage {
          width: 100%;
          height: 100%;
        }

        .ascii-viewport {
          height: 740px;
          width: 100%;
        }

        .ascii-light-aura {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 0;
        }

        .ascii-canvas {
          position: relative;
          z-index: 1;
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
