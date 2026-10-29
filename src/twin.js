/* Gemelo digital del héroe (prototipo interactivo en desarrollo).
   Dibuja en canvas un esquema de proceso (estilo P&ID / unifilar) con lecturas y controles interactivos.
   Los valores salen de modelos dinámicos del tiempo y acciones del usuario: no son datos de ningún cliente.
   Se pausa fuera de pantalla y respeta prefers-reduced-motion. */

const W = 800, H = 440;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const bump = (phase, a, b) => (phase > a && phase < b ? Math.sin(Math.PI * (phase - a) / (b - a)) : 0);
const fmtNum = (v, d) => v.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d });

/* ---------- Color ---------- */
function rgba(h, a = 1) {
  h = String(h).trim();
  if (h[0] !== '#') return h;
  if (h.length === 4) h = '#' + [...h.slice(1)].map((c) => c + c).join('');
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
function readColors(el = document.documentElement) {
  const cs = getComputedStyle(el);
  const g = (n) => cs.getPropertyValue(n).trim();
  return { fg: g('--fg'), muted: g('--muted'), line: g('--line'), accent: g('--accent'), surface: g('--surface'), alarm: g('--alarm'), mono: g('--f-mono') || 'monospace' };
}

/* ---------- Primitivas de dibujo (coordenadas virtuales 800×440) ---------- */
function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function trace(ctx, pts) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
}
function pipe(ctx, c, S, id, pts, flow) {
  S.ph[id] = (S.ph[id] || 0) + S.dt * 30 * flow;
  ctx.lineJoin = 'round'; ctx.lineCap = 'butt'; ctx.setLineDash([]);
  trace(ctx, pts); ctx.strokeStyle = rgba(c.muted, 0.65); ctx.lineWidth = 8; ctx.stroke();
  trace(ctx, pts); ctx.strokeStyle = c.surface; ctx.lineWidth = 5.5; ctx.stroke();
  if (flow > 0.02) {
    ctx.setLineDash([6, 13]); ctx.lineDashOffset = -S.ph[id];
    trace(ctx, pts); ctx.strokeStyle = rgba(c.accent, 0.95); ctx.lineWidth = 2; ctx.stroke();
    ctx.setLineDash([]);
  }
}
function arrow(ctx, c, x, y) {
  ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x + 10, y); ctx.lineTo(x, y + 6); ctx.closePath();
  ctx.fillStyle = c.accent; ctx.fill();
}
function valve(ctx, c, x, y, open) {
  const s = 9, h = 7;
  ctx.beginPath();
  ctx.moveTo(x - s, y - h); ctx.lineTo(x + s, y + h); ctx.lineTo(x + s, y - h); ctx.lineTo(x - s, y + h); ctx.closePath();
  ctx.fillStyle = rgba(c.accent, 0.15 + 0.6 * open); ctx.fill();
  ctx.strokeStyle = c.fg; ctx.lineWidth = 1.4; ctx.stroke();
}
function pump(ctx, c, x, y, r, ang) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = c.surface; ctx.fill(); ctx.strokeStyle = c.fg; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.strokeStyle = c.accent; ctx.lineWidth = 1.8;
  for (let k = 0; k < 3; k++) {
    const a = ang + (k * Math.PI * 2) / 3;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a) * r * 0.72, y + Math.sin(a) * r * 0.72); ctx.stroke();
  }
}
function liquid(ctx, x0, x1, topY, botY, color, t, amp = 1.2) {
  ctx.beginPath(); ctx.moveTo(x0, botY);
  for (let x = x0; x <= x1; x += 6) ctx.lineTo(x, topY + amp * Math.sin(x * 0.06 + t * 1.8));
  ctx.lineTo(x1, botY); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}
function surface(ctx, x0, x1, topY, color, t, amp = 1.2) {
  ctx.beginPath();
  for (let x = x0; x <= x1; x += 6) { const y = topY + amp * Math.sin(x * 0.06 + t * 1.8); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.stroke();
}
function text(ctx, c, fs, str, x, y, align = 'left', color = c.muted, weight = 400) {
  ctx.font = `${weight} ${fs}px ${c.mono}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  ctx.fillStyle = color; ctx.fillText(str, x, y);
}
/* Instrumento: nombre y valor en dos líneas, con línea de enlace al equipo. */
function tag(ctx, c, S, fs, cx, cy, name, val, alarm, to) {
  const pad = fs * 0.38, f1 = fs * 0.8;
  ctx.font = `500 ${f1}px ${c.mono}`; const w1 = ctx.measureText(name).width;
  ctx.font = `500 ${fs}px ${c.mono}`; const w2 = ctx.measureText(val).width;
  const w = Math.max(w1, w2) + pad * 2.4, h = f1 + fs + pad * 2.1, x = cx - w / 2, y = cy - h / 2;
  if (to) {
    ctx.beginPath(); ctx.moveTo(cx, to[1] > cy ? y + h : y); ctx.lineTo(to[0], to[1]);
    ctx.strokeStyle = rgba(alarm ? c.alarm : c.muted, 0.7); ctx.lineWidth = 1; ctx.setLineDash([]); ctx.stroke();
  }
  ctx.fillStyle = rgba(c.surface, 0.97); ctx.fillRect(x, y, w, h);
  if (alarm) { ctx.fillStyle = rgba(c.alarm, 0.12 + 0.1 * (0.5 + 0.5 * Math.sin(S.time * 6))); ctx.fillRect(x, y, w, h); }
  ctx.strokeStyle = alarm ? c.alarm : rgba(c.muted, 0.65); ctx.lineWidth = alarm ? 1.8 : 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  text(ctx, c, f1, name, cx, y + pad * 1.05 + f1 / 2, 'center', c.muted, 500);
  text(ctx, c, fs, val, cx, y + h - pad * 1.05 - fs / 2, 'center', alarm ? c.alarm : c.fg, 500);
}

/* ---------- Escenas ---------- */
const OIL = {
  label: 'Petróleo y gas',
  title: 'Batería de producción · separación trifásica',
  aria: 'Esquema animado e interactivo de una batería de producción de petróleo con valores simulados',
  vals: {
    'LIT-101': { desc: 'Nivel del separador', key: 'L', unit: '%', dec: 1 },
    'PIT-101': { desc: 'Presión de gas', key: 'P', unit: 'psi', dec: 0 },
    'FT-201': { desc: 'Caudal de crudo', key: 'Q', unit: 'bpd', dec: 0 },
    'LV-101': { desc: 'Válvula de salida', key: 'lv', unit: '%', dec: 0 },
    'TIT-101': { desc: 'Temperatura de entrada', key: 'T', unit: '°C', dec: 0 }
  },
  read: ['LIT-101', 'PIT-101', 'FT-201', 'LV-101'],
  alarms: { 'LIT-101': 'nivel alto (> 78 %)' },
  trend: { key: 'L', lo: 35, hi: 95, limit: 78 },
  sim(t, ctrl = {}) {
    const sp = ctrl.oilSp ?? 52;
    const manualSurge = ctrl.surgeUntil && t < ctrl.surgeUntil
      ? Math.sin(Math.PI * clamp((ctrl.surgeUntil - t) / 9, 0, 1))
      : 0;
    const autoSurge = ctrl.surgeUntil ? 0 : bump(t % 28, 19, 26);
    const surge = Math.max(manualSurge, autoSurge);
    const L = clamp(sp + 3.2 * Math.sin(t * 0.55) + 1.4 * Math.sin(t * 1.9 + 1) + 29 * surge, 36, 94);
    const lv = clamp(46 + (L - 52) * 1.65, 8, 100);
    return {
      L, lv, sp,
      surgeActive: manualSurge > 0.05,
      P: 612 + 9 * Math.sin(t * 0.8) - 8 * surge,
      Q: 428 + (lv - 46) * 3.2 + 6 * Math.sin(t * 2),
      T: 68 + 0.8 * Math.sin(t * 0.3),
      gasFlow: 0.85 + 0.1 * Math.sin(t * 0.7),
      oilFlow: clamp(lv / 55, 0.2, 1.6),
      tank: 0.25 + 0.55 * ((t % 60) / 60),
      alarmTag: L > 78 ? 'LIT-101' : null
    };
  },
  draw(ctx, c, S, fs, small) {
    const s = S.s, V = S.V;
    pipe(ctx, c, S, 'in', [[40, 215], [210, 215]], s.surgeActive ? 1.65 : 1);
    pipe(ctx, c, S, 'gas', [[430, 150], [430, 80], [722, 80]], s.gasFlow);
    pipe(ctx, c, S, 'oil', [[510, 235], [650, 235]], s.oilFlow);
    pipe(ctx, c, S, 'wat', [[442, 280], [442, 380], [632, 380]], 0.5);
    arrow(ctx, c, 722, 80); arrow(ctx, c, 632, 380);

    // Separador V-101
    const vx = 210, vy = 150, vw = 300, vh = 130, bot = vy + vh;
    const liqTop = bot - vh * (s.L / 100), watTop = bot - vh * 0.22;
    const hot = s.alarmTag === 'LIT-101';
    ctx.save();
    rr(ctx, vx, vy, vw, vh, 62); ctx.fillStyle = c.surface; ctx.fill(); ctx.clip();
    liquid(ctx, vx, vx + vw, liqTop, watTop, rgba(c.accent, 0.3), S.time);
    liquid(ctx, vx, vx + vw, watTop, bot, rgba(c.fg, 0.13), S.time * 0.7, 0.8);
    surface(ctx, vx, vx + vw, liqTop, hot ? c.alarm : c.accent, S.time);
    // Línea de Setpoint (SP) en el separador
    const spY = bot - vh * ((s.sp || 52) / 100);
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(vx + 12, spY); ctx.lineTo(vx + vw - 48, spY);
    ctx.strokeStyle = rgba(c.fg, 0.45); ctx.lineWidth = 1; ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(465, bot); ctx.lineTo(465, vy + vh * 0.38);
    ctx.strokeStyle = rgba(c.muted, 0.8); ctx.lineWidth = 1.4; ctx.stroke();
    ctx.restore();
    rr(ctx, vx, vy, vw, vh, 62); ctx.strokeStyle = hot ? c.alarm : rgba(c.fg, 0.85); ctx.lineWidth = 1.6; ctx.stroke();

    // Bomba, válvulas y tanque
    valve(ctx, c, 125, 215, 1);
    valve(ctx, c, 545, 235, s.lv / 100);
    pump(ctx, c, 598, 235, 15, S.time * 4 * s.oilFlow);
    rr(ctx, 650, 165, 90, 135, 6); ctx.fillStyle = c.surface; ctx.fill();
    ctx.save(); rr(ctx, 650, 165, 90, 135, 6); ctx.clip();
    liquid(ctx, 650, 740, 300 - 135 * s.tank, 300, rgba(c.accent, 0.28), S.time * 0.8, 0.8);
    ctx.restore();
    rr(ctx, 650, 165, 90, 135, 6); ctx.strokeStyle = rgba(c.fg, 0.85); ctx.lineWidth = 1.6; ctx.stroke();
    ctx.beginPath(); ctx.arc(40, 215, 6, 0, Math.PI * 2); ctx.fillStyle = c.accent; ctx.fill();

    // Rótulos de equipo
    if (!small) {
      const lf = fs * 0.76;
      text(ctx, c, lf, `V-101 SEPARADOR (SP ${s.sp ?? 52}%)`, 204, 304);
      text(ctx, c, lf, 'T-201', 695, 318, 'center');
      text(ctx, c, lf, 'GAS A COMPRESIÓN', 790, 102, 'right');
      text(ctx, c, lf, 'AGUA A TRATAMIENTO', 650, 380);
      text(ctx, c, lf, 'POZOS', 40, 240, 'center');
    }
    // Instrumentos
    const a = (t) => s.alarmTag === t;
    tag(ctx, c, S, fs, 340, 108, 'LIT-101', V('LIT-101'), a('LIT-101'), [340, 150]);
    tag(ctx, c, S, fs, 575, 40, 'PIT-101', V('PIT-101'), false, [575, 80]);
    tag(ctx, c, S, fs, 585, 284, 'FT-201', V('FT-201'), false, [585, 235]);
    tag(ctx, c, S, fs, 85, 175, 'TIT-101', V('TIT-101'), false, [85, 215]);
  }
};

/* Respaldo eléctrico: red, grupo electrógeno y transferencia automática (ATS).
   Soporta ciclo automático de 36 s o control manual de corte/restauración de red. */
const ramp = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
const ELEC = {
  label: 'Respaldo eléctrico',
  title: 'Respaldo eléctrico · grupo electrógeno y ATS',
  aria: 'Esquema animado e interactivo de un sistema de respaldo con grupo electrógeno y transferencia automática',
  vals: {
    'VT-01': { desc: 'Tensión de red', key: 'gridV', unit: 'V', dec: 0 },
    'VT-02': { desc: 'Tensión del generador', key: 'genV', unit: 'V', dec: 0 },
    'JT-01': { desc: 'Potencia de carga', key: 'kw', unit: 'kW', dec: 0 },
    'SIT-02': { desc: 'Frecuencia del generador', key: 'hz', unit: 'Hz', dec: 1 }
  },
  read: ['VT-01', 'VT-02', 'JT-01', 'SIT-02'],
  alarms: { 'VT-01': 'falla de red comercial' },
  trend: { key: 'busV', lo: 0, hi: 480, limit: 396 },
  sim(t, ctrl = {}) {
    let gridOk, crank, run, pos;
    if (ctrl.elecMode === 'outage') {
      const dt = Math.max(0, t - (ctrl.elecSince || 0));
      gridOk = false;
      crank = dt >= 0.4 && dt < 1.9;
      run = ramp(dt, 1.9, 4.2);
      pos = dt < 4.5 ? 0 : ramp(dt, 4.5, 5.1);
    } else if (ctrl.elecMode === 'restore') {
      const dt = Math.max(0, t - (ctrl.elecSince || 0));
      gridOk = true;
      crank = false;
      pos = 1 - ramp(dt, 0.8, 1.4);
      run = dt < 4.0 ? 1 : 1 - ramp(dt, 4.0, 5.8);
    } else {
      const p = ((t % 36) + 36) % 36;
      gridOk = !(p >= 14 && p < 26);
      crank = p >= 15 && p < 16.5;
      run = p < 33 ? ramp(p, 16.5, 19) : 1 - ramp(p, 33, 34.5);
      pos = p < 19.5 ? 0 : p < 20 ? ramp(p, 19.5, 20) : p < 29.5 ? 1 : 1 - ramp(p, 29.5, 30);
    }

    const gridV = gridOk ? 440 + 3 * Math.sin(t * 0.9) : 0;
    const genV = 440 * run + (run > 0.98 ? 2 * Math.sin(t * 1.7) : 0);
    const onGrid = pos < 0.02 && gridOk, onGen = pos > 0.98 && run > 0.95;
    const bus = onGrid || onGen;
    return {
      gridOk, crank, run, pos, bus, onGen,
      gridV, genV,
      hz: 60 * run + (run > 0.98 ? 0.12 * Math.sin(t * 1.3) : 0),
      busV: onGrid ? gridV : onGen ? genV : 0,
      kw: bus ? 286 + 12 * Math.sin(t * 0.9) + 5 * Math.sin(t * 2.3) : 0,
      alarmTag: gridOk ? null : 'VT-01'
    };
  },
  draw(ctx, c, S, fs, small) {
    const s = S.s, V = S.V;
    const live = (on) => (on ? 1 : 0);

    // Conductores (el trazo animado indica que están energizados)
    pipe(ctx, c, S, 'grid', [[96, 112], [262, 112], [262, 190], [340, 190]], live(s.gridOk));
    pipe(ctx, c, S, 'gen', [[200, 342], [282, 342], [282, 262], [340, 262]], live(s.run > 0.95));
    pipe(ctx, c, S, 'out', [[480, 226], [568, 226]], live(s.bus));
    const loads = [[150, 'BOMBEO'], [226, 'PROCESO'], [302, 'AUXILIARES']];
    loads.forEach(([y], i) => pipe(ctx, c, S, 'ld' + i, [[568, y], [650, y]], live(s.bus)));
    // Barraje
    ctx.beginPath(); ctx.moveTo(568, 138); ctx.lineTo(568, 314);
    ctx.strokeStyle = s.bus ? c.accent : rgba(c.muted, 0.8); ctx.lineWidth = 6; ctx.lineCap = 'square'; ctx.stroke(); ctx.lineCap = 'butt';

    // Red: transformador (dos devanados)
    ctx.lineWidth = 1.6;
    [[60, 100], [60, 124]].forEach(([x, y]) => {
      ctx.beginPath(); ctx.arc(x, y, 17, 0, Math.PI * 2);
      ctx.fillStyle = c.surface; ctx.fill();
      ctx.strokeStyle = s.gridOk ? rgba(c.fg, 0.85) : c.alarm; ctx.stroke();
    });
    if (!s.gridOk) { text(ctx, c, fs * 1.4, '×', 60, 66, 'center', c.alarm, 600); }

    // Grupo electrógeno
    rr(ctx, 30, 306, 170, 74, 4); ctx.fillStyle = c.surface; ctx.fill();
    ctx.strokeStyle = rgba(c.fg, 0.85); ctx.lineWidth = 1.6; ctx.stroke();
    for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(44 + k * 10, 318); ctx.lineTo(44 + k * 10, 368); ctx.strokeStyle = rgba(c.muted, 0.6); ctx.lineWidth = 1.2; ctx.stroke(); }
    S.ph.rotor = (S.ph.rotor || 0) + S.dt * (s.crank ? 4 : 14 * s.run);
    pump(ctx, c, 150, 343, 22, S.ph.rotor);
    ctx.strokeStyle = rgba(c.fg, 0.85); ctx.lineWidth = 1.4; ctx.strokeRect(96, 290, 12, 16);
    // Humo de escape mientras arranca u opera
    const smoke = s.crank ? 1 : s.run;
    if (smoke > 0.05) {
      for (let k = 0; k < 4; k++) {
        const f = ((S.time * 0.6 + k / 4) % 1);
        ctx.beginPath(); ctx.arc(102 + 8 * Math.sin(f * 5 + k), 284 - f * 40, 3 + f * 7, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c.muted, 0.35 * (1 - f) * smoke); ctx.fill();
      }
    }

    // ATS
    rr(ctx, 340, 150, 140, 152, 4); ctx.fillStyle = c.surface; ctx.fill();
    ctx.strokeStyle = s.gridOk ? rgba(c.fg, 0.85) : c.alarm; ctx.lineWidth = 1.6; ctx.stroke();
    const A = [372, 190], B = [372, 262], P = [448, 226];
    ctx.beginPath(); ctx.moveTo(340, 190); ctx.lineTo(A[0], A[1]); ctx.moveTo(340, 262); ctx.lineTo(B[0], B[1]); ctx.moveTo(P[0], P[1]); ctx.lineTo(480, 226);
    ctx.strokeStyle = rgba(c.fg, 0.85); ctx.lineWidth = 2; ctx.stroke();
    [A, B, P].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = c.fg; ctx.fill(); });
    const tx = A[0] + (B[0] - A[0]) * s.pos, ty = A[1] + (B[1] - A[1]) * s.pos;
    const ang = Math.atan2(ty - P[1], tx - P[0]);
    ctx.beginPath(); ctx.moveTo(P[0], P[1]); ctx.lineTo(P[0] + Math.cos(ang) * 74, P[1] + Math.sin(ang) * 74);
    ctx.strokeStyle = s.bus ? c.accent : c.alarm; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt';
    const atsTxt = s.pos > 0.02 && s.pos < 0.98 ? 'TRANSFIRIENDO' : s.pos >= 0.98 ? 'GENERADOR' : s.gridOk ? 'RED' : 'SIN FUENTE';
    text(ctx, c, fs * 0.82, 'ATS-01', 410, 166, 'center', c.muted, 500);
    text(ctx, c, fs * 0.82, atsTxt, 410, 288, 'center', s.bus ? c.accent : c.alarm, 600);

    // Cargas
    loads.forEach(([y, name]) => {
      rr(ctx, 650, y - 18, 128, 36, 3); ctx.fillStyle = s.bus ? rgba(c.accent, 0.16) : c.surface; ctx.fill();
      ctx.strokeStyle = rgba(c.fg, 0.85); ctx.lineWidth = 1.4; ctx.stroke();
      text(ctx, c, fs * 0.78, name, 714, y, 'center', s.bus ? c.fg : c.muted, 500);
    });

    if (!small) {
      const lf = fs * 0.78;
      text(ctx, c, lf, 'RED · TR-01', 60, 154, 'center');
      text(ctx, c, lf, 'G-01 GRUPO ELECTRÓGENO', 30, 398);
      text(ctx, c, lf, 'BARRAJE DE CARGA', 568, 336, 'center');
    }
    const a = (t) => s.alarmTag === t;
    tag(ctx, c, S, fs, 180, 66, 'VT-01', V('VT-01'), a('VT-01'), [180, 112]);
    tag(ctx, c, S, fs, 236, 404, 'VT-02', V('VT-02'), false, [236, 342]);
    tag(ctx, c, S, fs, 524, 180, 'JT-01', V('JT-01'), false, [524, 226]);
  }
};

const SCENES = { oil: OIL, elec: ELEC };

/* ---------- Montaje ---------- */
export function initTwin(video = {}) {
  const root = document.getElementById('twin');
  if (!root) return;
  const $ = (id) => document.getElementById(id);
  const cv = $('twin-canvas'), tr = $('twin-trend'), ctrlBox = $('twin-ctrl'), ctx = cv.getContext('2d'), tctx = tr.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const STEP = 0.25, N = 120;

  let colors = readColors(root);
  let key = 'oil', scene = SCENES.oil;
  let dpr = 1, sc = 1;
  let ctrl = { oilSp: 52, surgeUntil: 0, elecMode: 'auto', elecSince: 0 };
  let S = { time: 9, dt: 0, ph: {}, s: scene.sim(9, ctrl), V: () => '' };
  let hist = [];
  let running = false, visible = true, raf = 0, last = 0, acc = 0;

  // Pestañas
  const keys = Object.keys(SCENES);
  const tabs = keys.map((k) => ({ k, label: SCENES[k].label }));
  if (video.src) tabs.push({ k: 'video', label: 'Planta' });
  $('twin-tabs').innerHTML = tabs.map((t) => `<button class="twin-tab" type="button" data-k="${t.k}" aria-pressed="false">${t.label}</button>`).join('');
  if (video.src) {
    const q = (v) => String(v).replace(/"/g, '&quot;');
    $('twin-video').innerHTML = `<video src="${q(video.src)}" ${video.poster ? `poster="${q(video.poster)}"` : ''} autoplay muted loop playsinline></video>`;
  }

  const V = (tagName) => {
    const d = scene.vals[tagName];
    return fmtNum(S.s[d.key], d.dec) + (d.unit ? ' ' + d.unit : '');
  };
  S.V = V;

  function seedHistory() {
    const { key: k } = scene.trend;
    hist = [];
    for (let i = N - 1; i >= 0; i--) hist.push(scene.sim(S.time - i * STEP, ctrl)[k]);
  }

  function buildControls() {
    if (!ctrlBox) return;
    if (key === 'oil') {
      const surgeOn = ctrl.surgeUntil > S.time;
      ctrlBox.innerHTML = `
        <div class="tc-group">
          <span class="tc-lbl">Prueba HMI:</span>
          <button class="tc-btn${surgeOn ? ' hot' : ''}" type="button" data-act="surge" aria-pressed="${surgeOn}">
            ${surgeOn ? '⚡ Golpe de flujo activo (Restablecer)' : '⚡ Simular golpe de flujo (Surge)'}
          </button>
        </div>
        <div class="tc-group">
          <span class="tc-lbl">Setpoint LIT-101:</span>
          ${[45, 52, 65].map((sp) => `<button class="tc-btn sm${ctrl.oilSp === sp ? ' on' : ''}" type="button" data-sp="${sp}">${sp}%</button>`).join('')}
        </div>`;
    } else if (key === 'elec') {
      const m = ctrl.elecMode;
      ctrlBox.innerHTML = `
        <div class="tc-group">
          <span class="tc-lbl">Maniobra ATS:</span>
          <button class="tc-btn${m === 'outage' ? ' hot' : ''}" type="button" data-elec="outage" aria-pressed="${m === 'outage'}">
            ⚡ Cortar red comercial
          </button>
          <button class="tc-btn${m === 'restore' ? ' on' : ''}" type="button" data-elec="restore" aria-pressed="${m === 'restore'}">
            ↺ Restaurar red
          </button>
          <button class="tc-btn sm${m === 'auto' ? ' on' : ''}" type="button" data-elec="auto">
            Ciclo auto
          </button>
        </div>`;
    } else {
      ctrlBox.innerHTML = '';
    }
  }

  function buildReadouts() {
    $('twin-read').innerHTML = scene.read.map((t) => {
      const d = scene.vals[t];
      return `<div class="rd" data-tag="${t}"><span class="rd-tag">${t}</span><span class="rd-desc">${d.desc}</span><b class="rd-val"><span class="v"></span><small>${d.unit}</small></b></div>`;
    }).join('');
  }
  function updateReadouts() {
    const head = $('twin-head'), st = $('twin-status');
    root.querySelectorAll('.rd').forEach((el) => {
      const t = el.dataset.tag, d = scene.vals[t];
      el.querySelector('.v').textContent = fmtNum(S.s[d.key], d.dec);
      el.classList.toggle('alarm', S.s.alarmTag === t);
    });
    const at = S.s.alarmTag;
    head.classList.toggle('alarm', !!at);
    st.textContent = at ? `Alarma · ${at} ${scene.alarms[at]}` : 'En línea · Simulación';
    if (key === 'oil' && ctrl.surgeUntil && S.time >= ctrl.surgeUntil) {
      ctrl.surgeUntil = 0;
      buildControls();
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth;
    if (!w) return;
    sc = w / W;
    cv.width = Math.round(w * dpr); cv.height = Math.round((w * H / W) * dpr);
    tr.width = Math.round(tr.clientWidth * dpr); tr.height = Math.round(tr.clientHeight * dpr);
  }

  function drawScene() {
    if (!cv.width) return;
    ctx.setTransform(dpr * sc, 0, 0, dpr * sc, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const fs = Math.max(11, 10.5 / sc);
    scene.draw(ctx, colors, S, fs, sc < 0.62);
  }
  function drawTrend() {
    const w = tr.width, h = tr.height;
    if (!w) return;
    const { lo, hi, limit } = scene.trend, d = dpr;
    const y = (v) => h - 4 * d - ((clamp(v, lo, hi) - lo) / (hi - lo)) * (h - 8 * d);
    const x = (i) => (i / (N - 1)) * (w - 6 * d);
    tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, w, h);
    tctx.setLineDash([4 * d, 4 * d]); tctx.beginPath(); tctx.moveTo(0, y(limit)); tctx.lineTo(w, y(limit));
    tctx.strokeStyle = rgba(colors.alarm, 0.85); tctx.lineWidth = d; tctx.stroke(); tctx.setLineDash([]);
    tctx.beginPath(); tctx.moveTo(0, h);
    hist.forEach((v, i) => tctx.lineTo(x(i), y(v)));
    tctx.lineTo(x(N - 1), h); tctx.closePath(); tctx.fillStyle = rgba(colors.accent, 0.14); tctx.fill();
    tctx.beginPath(); hist.forEach((v, i) => (i ? tctx.lineTo(x(i), y(v)) : tctx.moveTo(x(i), y(v))));
    tctx.strokeStyle = colors.fg; tctx.lineWidth = 1.5 * d; tctx.lineJoin = 'round'; tctx.stroke();
    tctx.beginPath(); tctx.arc(x(N - 1), y(hist[N - 1]), 3 * d, 0, Math.PI * 2); tctx.fillStyle = colors.accent; tctx.fill();
  }
  const drawAll = () => { drawScene(); drawTrend(); };

  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now; S.dt = dt; S.time += dt; S.s = scene.sim(S.time, ctrl);
    acc += dt;
    if (acc >= STEP) {
      acc = 0; hist.push(S.s[scene.trend.key]); hist.shift(); updateReadouts(); drawTrend();
    }
    drawScene();
    raf = requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduce.matches || !visible || document.hidden || key === 'video') return;
    running = true; last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  function setScene(k) {
    stop();
    key = k;
    const isVideo = k === 'video';
    $('twin-body').hidden = isVideo;
    $('twin-video').hidden = !isVideo;
    root.querySelectorAll('.twin-tab').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    if (isVideo) {
      $('twin-title').textContent = 'Planta en operación';
      $('twin-status').textContent = '';
      $('twin-head').classList.remove('alarm');
      return;
    }
    scene = SCENES[k];
    S.ph = {}; S.dt = 0; S.s = scene.sim(S.time, ctrl);
    $('twin-title').textContent = scene.title;
    cv.setAttribute('aria-label', scene.aria);
    buildControls(); buildReadouts(); seedHistory(); updateReadouts();
    resize(); drawAll(); start();
  }

  root.addEventListener('click', (e) => {
    const tab = e.target.closest('.twin-tab');
    if (tab && tab.dataset.k !== key) { setScene(tab.dataset.k); return; }

    const surgeBtn = e.target.closest('[data-act="surge"]');
    if (surgeBtn) {
      ctrl.surgeUntil = ctrl.surgeUntil > S.time ? 0 : S.time + 9;
      S.s = scene.sim(S.time, ctrl);
      buildControls(); updateReadouts(); drawAll();
      return;
    }

    const spBtn = e.target.closest('[data-sp]');
    if (spBtn) {
      ctrl.oilSp = Number(spBtn.dataset.sp);
      S.s = scene.sim(S.time, ctrl);
      buildControls(); updateReadouts(); drawAll();
      return;
    }

    const elecBtn = e.target.closest('[data-elec]');
    if (elecBtn) {
      const targetMode = elecBtn.dataset.elec;
      ctrl.elecMode = targetMode;
      ctrl.elecSince = S.time;
      S.s = scene.sim(S.time, ctrl);
      buildControls(); updateReadouts(); drawAll();
    }
  });

  // Colores según tema
  const refreshColors = () => { colors = readColors(root); if (!running) drawAll(); };
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', refreshColors);
  new MutationObserver(refreshColors).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (document.fonts?.ready) document.fonts.ready.then(refreshColors);

  // Redimensionar borra ambos lienzos: se redibujan siempre, también con la animación en marcha.
  new ResizeObserver(() => { resize(); drawAll(); }).observe(cv);
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(root);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduce.addEventListener('change', () => (reduce.matches ? stop() : start()));

  setScene('oil');
}
