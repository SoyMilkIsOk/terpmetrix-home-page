export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const RAMP =
  " .'`^\",:;Il!i><~+_-?][}{1)(|\\/*tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export const DEFAULT_PARAMS = {
  tiltZ: 6.0,
  rotY: 38.0,
  rotX: -10.0,
  axisRoll: 90.0,
  bowlPush: 15.5,
  screenRoll: 0.0,
  centerX: 875.0,
  centerY: 342.0,
  pxR: 810.0,
  dist: 4.22,
  lockSizeOnDist: true,
  cellW: 7.4,
  cellH: 12.6,
  fontSize: 12.0,
  keyStrength: 0.72,
  depthStrength: 0.28,
  gamma: 1.28,
  floorBoost: 0.06,
  lightX: 0.45,
  lightY: 0.55,
  lightZ: 0.7,
  glowX: 875.0,
  glowY: 360.0,
  glowR: 450.0,
  glowStrength: 14.0,
  showText: true,
  textOffsetX: 0.0,
  textOffsetY: 0.0,
  displayFontFamily: "Inter",
};

export const OG_PRESETS = [
  {
    id: "current-planar",
    label: "Current (+90° Planar)",
    params: { ...DEFAULT_PARAMS },
  },
  {
    id: "ortho-flat",
    label: "Flat Ortho (+90°, High Dist)",
    params: {
      ...DEFAULT_PARAMS,
      bowlPush: 14.4,
      dist: 8.5,
      pxR: 1631.0,
      centerY: 342.0,
    },
  },
  {
    id: "pre-push",
    label: "+90° Bowl Front (Pre-Push)",
    params: {
      ...DEFAULT_PARAMS,
      bowlPush: 0.0,
      centerY: 368.0,
      glowY: 385.0,
    },
  },
  {
    id: "side-profile",
    label: "3/4 Side Profile (+52°)",
    params: {
      ...DEFAULT_PARAMS,
      axisRoll: 52.0,
      bowlPush: 0.0,
      centerY: 368.0,
      glowY: 385.0,
    },
  },
];

const DEG2RAD = Math.PI / 180;

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

/**
 * Rodrigues rotation of vector v around unit axis k by theta radians.
 */
function rodrigues(v, k, theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const kxv = cross(k, v);
  const kdv = dot(k, v) * (1 - c);
  return [
    v[0] * c + kxv[0] * s + k[0] * kdv,
    v[1] * c + kxv[1] * s + k[1] * kdv,
    v[2] * c + kxv[2] * s + k[2] * kdv,
  ];
}

/**
 * Computes the dominant principal axis (pointing toward +Y) of posed 3D points via 3x3 Jacobi eigensolver.
 */
function computePrincipalAxis(posedPts) {
  let mx = 0;
  let my = 0;
  let mz = 0;
  const n = posedPts.length || 1;
  for (let i = 0; i < posedPts.length; i++) {
    mx += posedPts[i][0];
    my += posedPts[i][1];
    mz += posedPts[i][2];
  }
  mx /= n;
  my /= n;
  mz /= n;

  const cov = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < posedPts.length; i++) {
    const dx = posedPts[i][0] - mx;
    const dy = posedPts[i][1] - my;
    const dz = posedPts[i][2] - mz;
    cov[0][0] += dx * dx;
    cov[0][1] += dx * dy;
    cov[0][2] += dx * dz;
    cov[1][1] += dy * dy;
    cov[1][2] += dy * dz;
    cov[2][2] += dz * dz;
  }
  cov[1][0] = cov[0][1];
  cov[2][0] = cov[0][2];
  cov[2][1] = cov[1][2];

  const v = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  for (let sweep = 0; sweep < 18; sweep++) {
    for (let p = 0; p < 2; p++) {
      for (let q = p + 1; q < 3; q++) {
        const apq = cov[p][q];
        if (Math.abs(apq) < 1e-12) continue;
        const tau = (cov[q][q] - cov[p][p]) / (2 * apq);
        const t =
          tau >= 0
            ? 1 / (tau + Math.sqrt(1 + tau * tau))
            : -1 / (-tau + Math.sqrt(1 + tau * tau));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = t * c;

        const app = cov[p][p] - t * apq;
        const aqq = cov[q][q] + t * apq;
        cov[p][p] = app;
        cov[q][q] = aqq;
        cov[p][q] = 0;
        cov[q][p] = 0;

        for (let r = 0; r < 3; r++) {
          if (r !== p && r !== q) {
            const arp = cov[r][p];
            const arq = cov[r][q];
            cov[r][p] = c * arp - s * arq;
            cov[p][r] = cov[r][p];
            cov[r][q] = s * arp + c * arq;
            cov[q][r] = cov[r][q];
          }
          const vrp = v[r][p];
          const vrq = v[r][q];
          v[r][p] = c * vrp - s * vrq;
          v[r][q] = s * vrp + c * vrq;
        }
      }
    }
  }

  let bestIdx = 0;
  if (cov[1][1] > cov[bestIdx][bestIdx]) bestIdx = 1;
  if (cov[2][2] > cov[bestIdx][bestIdx]) bestIdx = 2;

  const axis = normalize([v[0][bestIdx], v[1][bestIdx], v[2][bestIdx]]);
  return axis[1] < 0 ? [-axis[0], -axis[1], -axis[2]] : axis;
}

/**
 * Applies base tiltZ -> rotY -> rotX pose and extracts principal spine axis + orthogonal push axis.
 */
export function computeBasePoseAndAxis(pts, params) {
  const tiltZ = params.tiltZ * DEG2RAD;
  const rotY = params.rotY * DEG2RAD;
  const rotX = params.rotX * DEG2RAD;

  const ct = Math.cos(tiltZ);
  const st = Math.sin(tiltZ);
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);

  const posed = new Array(pts.length);
  for (let i = 0; i < pts.length; i++) {
    const [px, py, pz, nx, ny, nz] = pts[i];
    const tx = px * ct - py * st;
    const ty = px * st + py * ct;
    const tnx = nx * ct - ny * st;
    const tny = nx * st + ny * ct;

    const x1 = tx * cosY - pz * sinY;
    const z1 = tx * sinY + pz * cosY;
    const y2 = ty * cosX - z1 * sinX;
    const z2 = ty * sinX + z1 * cosX;

    const nx1 = tnx * cosY - nz * sinY;
    const nz1 = tnx * sinY + nz * cosY;
    const ny2 = tny * cosX - nz1 * sinX;
    const nz2 = tny * sinX + nz1 * cosX;

    posed[i] = [x1, y2, z2, nx1, ny2, nz2];
  }

  const axis = computePrincipalAxis(posed);
  const pitchAxis = normalize([-axis[1], axis[0], 0]);
  return { posed, axis, pitchAxis };
}

/**
 * Computes the bowlPush angle (degrees) that makes upper bowl and lower handle lie at equal Z depth.
 */
export function findPlanarPitchDeg(pts, params) {
  const { posed, axis, pitchAxis } = computeBasePoseAndAxis(pts, params);
  const rollRad = params.axisRoll * DEG2RAD;
  const rolledPts = posed.map((p) => rodrigues([p[0], p[1], p[2]], axis, rollRad));

  const depthDiffAt = (deg) => {
    const th = deg * DEG2RAD;
    let topZ = 0;
    let topCount = 0;
    let botZ = 0;
    let botCount = 0;
    for (let i = 0; i < rolledPts.length; i++) {
      const rp = rodrigues(rolledPts[i], pitchAxis, th);
      if (rp[1] > 0.5) {
        topZ += rp[2];
        topCount++;
      } else if (rp[1] < -0.5) {
        botZ += rp[2];
        botCount++;
      }
    }
    const meanTop = topCount ? topZ / topCount : 0;
    const meanBot = botCount ? botZ / botCount : 0;
    return meanTop - meanBot;
  };

  const approxSpinePlanar = Math.asin(Math.max(-0.99, Math.min(0.99, axis[2]))) / DEG2RAD;
  let lo = approxSpinePlanar - 18;
  let hi = approxSpinePlanar + 18;
  let dLo = depthDiffAt(lo);
  const dHi = depthDiffAt(hi);
  if ((dLo > 0 && dHi > 0) || (dLo < 0 && dHi < 0)) {
    return Math.round(approxSpinePlanar * 10) / 10;
  }
  for (let i = 0; i < 24; i++) {
    const mid = 0.5 * (lo + hi);
    const dMid = depthDiffAt(mid);
    if ((dLo >= 0 && dMid >= 0) || (dLo <= 0 && dMid <= 0)) {
      lo = mid;
      dLo = dMid;
    } else {
      hi = mid;
    }
  }
  return Math.round(0.5 * (lo + hi) * 10) / 10;
}

let cachedGlowKey = "";
let cachedGlowImageData = null;

function getGlowBackground(ctx, params) {
  const key = `${params.glowX}|${params.glowY}|${params.glowR}|${params.glowStrength}`;
  if (cachedGlowKey === key && cachedGlowImageData) {
    return cachedGlowImageData;
  }

  const imgData = ctx.createImageData(OG_WIDTH, OG_HEIGHT);
  const data = imgData.data;
  const { glowX, glowY, glowR, glowStrength } = params;

  for (let y = 0; y < OG_HEIGHT; y++) {
    const dy = y - glowY;
    for (let x = 0; x < OG_WIDTH; x++) {
      const dx = x - glowX;
      const d = Math.hypot(dx, dy);
      let add = 0;
      if (d < glowR && glowR > 0) {
        const t = Math.pow(1 - d / glowR, 1.9);
        const val = glowStrength * t;
        const hash = (((x * 73856093) ^ (y * 19349663)) & 255) / 255 - 0.5;
        add = Math.max(0, Math.floor(val + hash + 0.5));
      }
      const idx = (y * OG_WIDTH + x) * 4;
      data[idx] = Math.min(255, 5 + add);
      data[idx + 1] = Math.min(255, 5 + add);
      data[idx + 2] = Math.min(255, 6 + add + (add > 2 ? 1 : 0));
      data[idx + 3] = 255;
    }
  }

  cachedGlowKey = key;
  cachedGlowImageData = imgData;
  return imgData;
}

function drawSpacedText(ctx, text, startX, y, trackingPx) {
  let cx = startX;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    ctx.fillText(ch, cx, y);
    cx += ctx.measureText(ch).width + trackingPx;
  }
}

/**
 * Renders the 1200x630 OG image onto target 2D canvas and returns bounding-box & depth telemetry.
 */
export function renderOgScene(canvas, pts, params) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.putImageData(getGlowBackground(ctx, params), 0, 0);

  const { posed, axis, pitchAxis } = computeBasePoseAndAxis(pts, params);
  const rollRad = params.axisRoll * DEG2RAD;
  const pushRad = params.bowlPush * DEG2RAD;
  const screenRad = params.screenRoll * DEG2RAD;
  const cosS = Math.cos(screenRad);
  const sinS = Math.sin(screenRad);

  const transformedAxis = rodrigues(axis, pitchAxis, pushRad);
  const axisZDeg = Math.asin(Math.max(-1, Math.min(1, transformedAxis[2]))) / DEG2RAD;

  const cellW = Math.max(3, params.cellW);
  const cellH = Math.max(5, params.cellH);
  const cols = Math.floor(OG_WIDTH / cellW);
  const rows = Math.floor(OG_HEIGHT / cellH);
  const zbuf = new Float32Array(cols * rows).fill(-999);
  const cbuf = new Int16Array(cols * rows).fill(-1);
  const bbuf = new Float32Array(cols * rows);

  const centerCol = params.centerX / cellW;
  const centerRow = params.centerY / cellH;
  const { pxR, dist, keyStrength, depthStrength, gamma, floorBoost } = params;
  const [lx, ly, lz] = normalize([params.lightX, params.lightY, params.lightZ]);

  let topZSum = 0;
  let topCount = 0;
  let botZSum = 0;
  let botCount = 0;

  for (let i = 0; i < posed.length; i++) {
    const p = posed[i];
    const rp0 = rodrigues(rodrigues([p[0], p[1], p[2]], axis, rollRad), pitchAxis, pushRad);
    const rn0 = rodrigues(rodrigues([p[3], p[4], p[5]], axis, rollRad), pitchAxis, pushRad);

    const x1 = rp0[0] * cosS - rp0[1] * sinS;
    const y2 = rp0[0] * sinS + rp0[1] * cosS;
    const z2 = rp0[2];

    const nx1 = rn0[0] * cosS - rn0[1] * sinS;
    const ny2 = rn0[0] * sinS + rn0[1] * cosS;
    const nz2 = rn0[2];

    if (y2 > 0.5) {
      topZSum += z2;
      topCount++;
    } else if (y2 < -0.5) {
      botZSum += z2;
      botCount++;
    }

    const denom = dist - z2;
    if (denom <= 0.15) continue;
    const ooz = 1 / denom;
    const sx = Math.floor(centerCol + (x1 * ooz * pxR) / cellW);
    const sy = Math.floor(centerRow - (y2 * ooz * pxR) / cellH);

    if (sx >= 0 && sx < cols && sy >= 0 && sy < rows) {
      const idx = sy * cols + sx;
      if (ooz > zbuf[idx]) {
        zbuf[idx] = ooz;
        const key = Math.max(0, nx1 * lx + ny2 * ly + nz2 * lz);
        const dep = Math.max(0, Math.min(1, (z2 + 1.55) / 3.1));
        const raw = key * keyStrength + dep * depthStrength;
        const contrast = Math.max(0.08, Math.min(1, Math.pow(raw, gamma) + floorBoost));
        cbuf[idx] = Math.min(RAMP.length - 1, Math.floor(contrast * (RAMP.length - 1)));
        bbuf[idx] = contrast;
      }
    }
  }

  ctx.save();
  ctx.textBaseline = "top";
  ctx.font = `${params.fontSize}px "SF Mono", SFMono-Regular, "JetBrains Mono", Menlo, Monaco, monospace`;

  let minX = OG_WIDTH;
  let maxX = 0;
  let minY = OG_HEIGHT;
  let maxY = 0;

  for (let r = 0; r < rows; r++) {
    const y = r * cellH;
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const rampIdx = cbuf[idx];
      if (rampIdx <= 0) continue;
      const ch = RAMP[rampIdx];
      if (ch === " ") continue;
      const b = bbuf[idx];

      if (b > 0.74) {
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.72 + b * 0.28).toFixed(3)})`;
      } else if (b > 0.46) {
        ctx.fillStyle = `rgba(194, 201, 210, ${(0.48 + b * 0.48).toFixed(3)})`;
      } else if (b > 0.22) {
        ctx.fillStyle = `rgba(91, 98, 109, ${(0.45 + b * 0.45).toFixed(3)})`;
      } else {
        ctx.fillStyle = "rgba(54, 60, 70, 0.65)";
      }

      const x = c * cellW;
      ctx.fillText(ch, x, y);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  ctx.restore();

  if (params.showText) {
    ctx.save();
    ctx.textBaseline = "top";
    const ox = params.textOffsetX;
    const oy = params.textOffsetY;

    ctx.font = '400 20px "SF Mono", SFMono-Regular, "JetBrains Mono", Menlo, monospace';
    ctx.fillStyle = "rgb(142, 149, 160)";
    drawSpacedText(ctx, "TERPMETRIX_", 66 + ox, 314 + oy, 1.8);

    const fontStack =
      params.displayFontFamily === "Space Grotesk"
        ? '"Space Grotesk", Inter, -apple-system, sans-serif'
        : 'Inter, -apple-system, BlinkMacSystemFont, "Space Grotesk", sans-serif';
    ctx.font = `750 62px ${fontStack}`;
    ctx.fillStyle = "rgb(247, 248, 250)";
    const lines = ["PRECISION", "BUILT FOR", "THE PLANT."];
    let ly = 362 + oy;
    for (let i = 0; i < lines.length; i++) {
      drawSpacedText(ctx, lines[i], 64 + ox, ly, -1.2);
      ly += 66;
    }
    ctx.restore();
  }

  return {
    bbox: {
      minX: Math.round(minX),
      minY: Math.round(minY),
      maxX: Math.round(maxX),
      maxY: Math.round(maxY),
      width: Math.max(0, Math.round(maxX - minX)),
      height: Math.max(0, Math.round(maxY - minY)),
    },
    bowlMeanZ: topCount ? topZSum / topCount : 0,
    handleMeanZ: botCount ? botZSum / botCount : 0,
    axisZDeg,
  };
}
