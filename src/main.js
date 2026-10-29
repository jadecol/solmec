// Fuentes incluidas en el proyecto (no dependen de Google Fonts ni de internet).
import '@fontsource/barlow-condensed/latin-500.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import { CONFIG } from './config.js';
import { initTwin } from './twin.js';

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = (n) => String(n).padStart(2, '0');
const list = (arr) => arr.map((t) => `<li>${esc(t)}</li>`).join('');
// En "npm run dev" se ven los espacios pendientes; en el sitio publicado nunca.
const DEV = Boolean(import.meta.env && import.meta.env.DEV);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const waLink = (num, msg) => `https://wa.me/${num}${msg ? '?text=' + encodeURIComponent(msg) : ''}`;
const safeScrollX = (el, left, smooth = true) => {
  if (!el) return;
  try {
    el.scrollTo({ left, behavior: (!smooth || reduceMotion.matches) ? 'auto' : 'smooth' });
  } catch {
    el.scrollLeft = left;
  }
};

const ICON = {
  foto: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="6" width="26" height="20"/><path d="M3 22l7-7 6 6 4-4 9 9"/><circle cx="21" cy="12" r="2"/></svg>',
  video: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/><path d="M13 10.5v11l9-5.5z"/></svg>',
  emblem: '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M23.5 7 12 22.5h8.2L16.8 33 28.5 17.2h-8.4z" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18.5 5.3 15A7.5 7.5 0 1 1 9 18.3z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/></svg>'
};

/* ---------- Contenedores de foto y video ----------
   Siempre muestran algo digno: mientras carga, un fondo sobrio; si el archivo falla o falta,
   un respaldo con el emblema de SOLMEC y la descripción. Nunca un ícono de imagen rota. */
function fallback(label) {
  return `<span class="slot-fb" aria-hidden="true">${ICON.emblem}<span>${esc(label || 'SOLMEC S.A.S.')}</span></span>`;
}
function slot(m, o = {}) {
  const kind = m.tipo === 'video' ? 'video' : 'foto';
  const ratio = o.fill ? '' : `aspect-ratio:${m.ratio || '16/9'};`;
  const label = m.alt || m.titulo || '';
  if (m.src) {
    const inner = kind === 'video'
      ? `<video src="${esc(m.src)}#t=0.1" ${m.poster ? `poster="${esc(m.poster)}"` : ''} muted playsinline preload="metadata"${o.loop ? ' loop' : ''}></video>${m.poster ? `<img class="vposter-print" src="${esc(m.poster)}" alt="${esc(label)}" loading="lazy" decoding="async">` : ''}`
      : `<img src="${esc(m.src)}" alt="${esc(m.alt)}" loading="lazy" decoding="async">`;
    return `<span class="slot" style="${ratio}">${inner}${fallback(label)}</span>`;
  }
  if (DEV) {
    const rt = (m.ratio || '').replace('/', ':');
    return `<span class="slot ph pend" style="${ratio}">${ICON[kind]}<b>${kind === 'video' ? 'VIDEO' : 'FOTO'}${rt ? ' · ' + esc(rt) : ''}</b><span>${esc(m.spec || '')}</span><code>${esc(m.ruta || '')}</code></span>`;
  }
  return `<span class="slot failed" style="${ratio}">${fallback(label)}</span>`;
}
function watchMedia(root = document) {
  root.querySelectorAll('.slot > img:not(.vposter-print), .slot > video').forEach((el) => {
    const box = el.closest('.slot');
    if (box.dataset.watched) return;
    box.dataset.watched = '1';
    const ok = () => box.classList.add('loaded');
    const bad = () => { box.classList.add('failed'); el.remove(); };
    if (el.tagName === 'IMG') {
      if (el.complete) (el.naturalWidth ? ok() : bad());
      else { el.addEventListener('load', ok, { once: true }); el.addEventListener('error', bad, { once: true }); }
    } else {
      if (el.readyState >= 1) ok();
      else {
        el.addEventListener('loadedmetadata', ok, { once: true });
        el.addEventListener('loadeddata', ok, { once: true });
        el.addEventListener('error', bad, { once: true });
      }
    }
  });
}

function head(id, d) {
  $(id).innerHTML = `<p class="lbl">${esc(d.etiqueta)}</p><h2>${esc(d.titulo)}</h2><p class="intro">${esc(d.intro)}</p>`;
}

/* ---------- Render ---------- */
function render() {
  const C = CONFIG;

  // Marca (usa media/logo-solmec.png como emblema, o el logo horizontal completo si usarLogoCompleto: true)
  const bust = DEV ? `?t=${Date.now()}` : '';
  const emSrc = C.marca.emblema ? `${C.marca.emblema}${bust}` : '';
  const logoSrc = C.marca.logo ? `${C.marca.logo}${bust}` : '';
  document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((lk) => {
    if (emSrc) lk.href = emSrc;
  });

  if (C.marca.usarLogoCompleto && logoSrc) {
    $('brand').innerHTML = `<img class="brand-logo" src="${esc(logoSrc)}" alt="${esc(C.marca.nombre)}">`;
  } else {
    $('brand').innerHTML = `<img class="emblem" src="${esc(emSrc)}" alt="" width="38" height="38"><span style="min-width:0"><b>${esc(C.marca.nombre)}</b><small>${esc(C.marca.descriptor)}</small></span>`;
    const em = $('brand').querySelector('.emblem');
    const hideEm = () => em.remove();
    if (em.complete && !em.naturalWidth) hideEm(); else em.addEventListener('error', hideEm, { once: true });
  }

  // Videos con archivo: si no hay ninguno (fuera de "npm run dev"), la sección y su enlace desaparecen.
  const videos = C.obras.items.filter((v) => v.src || DEV);
  const nav = C.nav.filter((n) => n.href !== '#obras' || videos.length);

  // Navegación: escritorio (con menú de servicios) y móvil
  const grupos = C.servicios.grupos;
  const total = grupos.reduce((a, g) => a + g.items.length, 0);
  const menuItems = [
    ...grupos.map((g) => ({ href: `#grupo-${g.id}`, nombre: g.nombre, resumen: g.resumen })),
    { href: '#software', nombre: 'Software y gemelos digitales', resumen: 'Software activo · gemelos en piloto' }
  ];
  $('nav').innerHTML = nav.map((n) => n.menu
    ? `<button class="navbtn" id="svc-btn" type="button" aria-expanded="false" aria-controls="mega">${esc(n.texto)}</button>`
    : `<a href="${esc(n.href)}">${esc(n.texto)}</a>`).join('');

  $('mega').innerHTML = `<div class="wrap"><ul class="mega-grid">${menuItems.map((s) =>
    `<li><a href="${esc(s.href)}"><b>${esc(s.nombre)}</b><span>${esc(s.resumen)}</span></a></li>`).join('')}
    <li class="all"><a href="#servicios"><b>Todos los servicios</b><span>Las ${total} líneas de ingeniería y ficha técnica</span></a></li></ul></div>`;

  $('drawer').innerHTML = `<div class="wrap"><ul>${nav.map((n) => n.menu
    ? `<li><details><summary>${esc(n.texto)}</summary><ul class="sub">${menuItems.map((s) =>
      `<li><a href="${esc(s.href)}">${esc(s.nombre)}<small>${esc(s.resumen)}</small></a></li>`).join('')}</ul></details></li>`
    : `<li><a href="${esc(n.href)}">${esc(n.texto)}</a></li>`).join('')}</ul>
    <div class="drawer-cta">
      <a class="btn sm" href="${esc(waLink(C.contacto.whatsapp.numero, C.contacto.whatsapp.mensaje))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp Línea 1</a>
      <a class="btn ghost sm" href="${esc(waLink('573224088866', C.contacto.whatsapp.mensaje))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp Línea 2</a>
      <button class="btn ghost sm" type="button" data-print>${ICON.doc}Dossier PDF</button>
    </div></div>`;

  const waNum = C.contacto.whatsapp.numero;

  // Portada
  const H = C.hero;
  $('h-eyebrow').textContent = H.eyebrow;
  $('h-title').textContent = H.titulo;
  $('h-text').textContent = H.texto;
  $('h-tags').innerHTML = H.sectores.map((s, i) => `<span class="tag${i === 0 ? ' hot' : ''}">${esc(s)}</span>`).join('');
  if ($('h-specs') && H.especialidades?.length) {
    $('h-specs').innerHTML = H.especialidades.map((sp) => `<li>${esc(sp)}</li>`).join('');
  }
  $('h-cta').innerHTML = `<a class="btn" href="${esc(H.cta1[1])}">${esc(H.cta1[0])}<span class="arr" aria-hidden="true">→</span></a><a class="btn ghost" href="${esc(waLink(waNum, C.contacto.whatsapp.mensaje))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp directo</a><a class="btn ghost" href="${esc(H.cta2[1])}">${esc(H.cta2[0])}</a>`;
  $('h-meta').innerHTML = H.meta.map((t) => `<span>${esc(t)}</span>`).join('');
  $('twin-strip').innerHTML = `<span class="pill">Interactivo</span>${esc(H.gemelo.franja)}`;
  $('twin-note').textContent = H.gemelo.nota;

  // Resumen ejecutivo
  const R = C.resumen;
  $('resumen-text').innerHTML = `<p class="lbl">${esc(R.etiqueta)}</p><h2>${esc(R.titulo)}</h2><p class="lead">${esc(R.texto)}</p>
    <div class="exec-actions">
      <button class="btn ghost sm" type="button" data-print>${ICON.doc}Guardar Dossier Corporativo (PDF)</button>
      <a class="btn sm" href="#casos">Ver proyectos ejecutados <span class="arr" aria-hidden="true">→</span></a>
    </div>`;
  $('resumen-figs').innerHTML = R.cifras.map(([v, l]) => `<div class="fig"><b data-count="${esc(v)}">${esc(v)}</b><span>${esc(l)}</span></div>`).join('');
  $('resumen-pillars').innerHTML = R.pilares.map(([t, d], i) => `<div class="pillar"><h3><i>${pad(i + 1)}</i>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('');

  // Capacidades estratégicas (carrusel)
  const K = C.capacidades;
  head('capacidades-head', K);
  $('car-track').innerHTML = K.items.map((c, i) => `
    <article class="slide" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${K.items.length}: ${esc(c.titulo)}">
      <div class="slide-media">
        ${slot({ tipo: 'foto', ratio: '2/1', src: c.foto, alt: c.alt })}
        <div class="slide-foot">
          <p class="mini">Servicios relacionados</p>
          <ul class="chips">${c.servicios.map((t) => `<li class="chip">${esc(t)}</li>`).join('')}</ul>
          <div class="slide-links">
            ${c.enlace ? `<a class="more" href="${esc(c.enlace)}">Ver en el portafolio <span aria-hidden="true">→</span></a>` : ''}
            <a class="more wa-more" href="${esc(waLink(waNum, `Hola SOLMEC S.A.S., quisiera consultar sobre: ${c.titulo}.`))}" target="_blank" rel="noopener">WhatsApp ↗</a>
          </div>
        </div>
      </div>
      <div class="body">
        <p class="slide-kick"><i>${pad(i + 1)}</i>Operaciones críticas</p>
        <h3>${esc(c.titulo)}</h3>
        <p class="slide-text">${esc(c.texto)}</p>
        <div class="slide-app"><p class="mini">Aplicación en campo</p><p>${esc(c.aplicacion)}</p></div>
      </div>
    </article>`).join('');

  // Sectores
  head('sectores-head', C.sectores);
  $('sectores-body').innerHTML = C.sectores.items.map((s) => `
    <article class="panel">
      ${slot(s.medio)}
      <div class="body">
        <h3>${esc(s.nombre)}</h3>
        <div><p class="mini">Aplicaciones de nuestros servicios</p><ul class="rows">${list(s.aplicaciones)}</ul></div>
        <div><p class="mini">Retos de campo</p><ul class="rows">${list(s.retos)}</ul></div>
      </div>
    </article>`).join('');

  // Servicios: tres grupos con tarjetas numeradas de forma continua y ficha técnica desplegable
  head('servicios-head', C.servicios);
  let n = 0;
  const allServiceNames = [];
  $('servicios-body').innerHTML = grupos.map((g) => {
    const first = n + 1;
    const cards = g.items.map((s) => {
      n += 1;
      const codeTitle = `${pad(n)} · ${s.titulo}`;
      allServiceNames.push(codeTitle);
      const hasTech = (s.specs && s.specs.length) || (s.entregables && s.entregables.length);
      return `
      <article class="card">
        ${slot({ tipo: 'foto', ratio: '21/9', src: s.foto, alt: s.alt })}
        <div class="card-body">
          <p class="card-kick"><i>${pad(n)}</i>${esc(s.kick)}</p>
          <h4>${esc(s.titulo)}</h4>
          <p class="card-desc">${esc(s.texto)}</p>
          ${hasTech ? `
          <details class="card-tech">
            <summary>Especificaciones y entregables</summary>
            <div class="card-tech-body">
              ${s.specs?.length ? `<div><p class="mini">Alcance técnico</p><ul class="tech-list">${list(s.specs)}</ul></div>` : ''}
              ${s.entregables?.length ? `<div><p class="mini">Entregables de ingeniería</p><ul class="tech-list">${list(s.entregables)}</ul></div>` : ''}
              <div class="card-actions">
                <button class="card-cta" type="button" data-rfq-service="${esc(codeTitle)}">Cotizar en pliego →</button>
                <a class="card-cta wa" href="${esc(waLink(waNum, `Hola SOLMEC S.A.S., quisiera solicitar información / cotización para el servicio: ${codeTitle}.`))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp ↗</a>
              </div>
            </div>
          </details>` : ''}
        </div>
      </article>`;
    }).join('');
    return `
    <div class="sgroup" id="grupo-${esc(g.id)}">
      <div class="sgroup-head"><span class="range">${pad(first)} — ${pad(n)}</span><h3>${esc(g.nombre)}</h3><p>${esc(g.resumen)}</p></div>
      <div class="cards">${cards}</div>
    </div>`;
  }).join('');

  // Casos de Éxito / Proyectos Tipo
  if (C.casos && $('casos')) {
    const CS = C.casos;
    head('casos-head', CS);
    $('casos-filter').innerHTML = CS.filtros.map((f, i) =>
      `<button class="cf-btn" type="button" role="tab" data-filter="${esc(f)}" aria-selected="${i === 0}">${esc(f)}</button>`
    ).join('');
    $('casos-body').innerHTML = CS.items.map((c) => `
      <article class="case-card" data-sector="${esc(c.sector)}">
        <div class="case-top">
          ${slot({ tipo: 'foto', ratio: '16/9', src: c.foto, alt: c.alt })}
          <div class="case-metrics">
            ${c.metricas.map(([v, l]) => `<div class="cm"><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}
          </div>
        </div>
        <div class="case-body">
          <div class="case-meta">
            <span class="case-code">${esc(c.codigo)}</span>
            <span class="case-sec">${esc(c.sector)}</span>
            <span class="case-loc">${esc(c.ubicacion)}</span>
          </div>
          <h3>${esc(c.titulo)}</h3>
          <div class="case-cols">
            <div>
              <p class="mini">Reto operativo</p>
              <p>${esc(c.reto)}</p>
            </div>
            <div>
              <p class="mini">Solución de ingeniería SOLMEC</p>
              <p>${esc(c.solucion)}</p>
            </div>
          </div>
          <div class="case-deliv">
            <p class="mini">Entregables y validación en campo</p>
            <ul class="chips">${c.entregables.map((e) => `<li class="chip">${esc(e)}</li>`).join('')}</ul>
          </div>
        </div>
      </article>`).join('');
  }

  // HSEQ y Normatividad Técnica
  if (C.hseq && $('hseq')) {
    const HQ = C.hseq;
    head('hseq-head', HQ);
    $('hseq-body').innerHTML = HQ.normas.map((nm) => `
      <article class="hseq-card">
        <span class="hseq-badge">${esc(nm.sigla)}</span>
        <h3>${esc(nm.ambito)}</h3>
        <p>${esc(nm.detalle)}</p>
      </article>`).join('');
    $('hseq-strip').innerHTML = HQ.compromisos.map(([t, d], i) => `
      <div class="hseq-pillar">
        <span class="hp-num">HSEQ · ${pad(i + 1)}</span>
        <h4>${esc(t)}</h4>
        <p>${esc(d)}</p>
      </div>`).join('');
  }

  // Obras en video
  const O = C.obras;
  $('obras').hidden = !videos.length;
  head('obras-head', O);
  $('obras-body').innerHTML = videos.map((v) => {
    const i = O.items.indexOf(v);
    const media = slot({ tipo: 'video', ratio: '9/16', src: v.src, poster: v.poster, titulo: v.titulo, spec: 'MP4 · vertical 9:16 · 720×1280', ruta: v.ruta }, { loop: true });
    return `
    <figure class="vcard">
      <button class="vplay" type="button" data-video="${i}" aria-label="Reproducir video: ${esc(v.titulo)}"${v.src ? '' : ' disabled'}>
        ${media}
        ${v.src ? `<span class="vicon" aria-hidden="true">${ICON.play}</span><span class="vdur" aria-hidden="true"></span>` : ''}
      </button>
      <figcaption><b>${esc(v.titulo)}</b><span>${esc(v.lugar)}${v.tiktok ? ` · <a href="${esc(v.tiktok)}" target="_blank" rel="noopener">TikTok ↗</a>` : ''}</span></figcaption>
    </figure>`;
  }).join('');

  // Marcas (carrusel de plataformas + tarjetas por especialidad con enlaces a WhatsApp)
  const M = C.marcas;
  head('marcas-head', M);
  if (M.carrusel && $('marcas-carousel')) {
    $('marcas-carousel').innerHTML = `
      <div class="bcar-bar">
        <span class="bcar-status"><i class="bcar-dot"></i>PLATAFORMAS Y FABRICANTES INTEGRADOS</span>
        <div class="bcar-actions">
          <button class="bcar-btn" id="bcar-toggle" type="button" aria-pressed="false" title="Pausar o reanudar">Pausar</button>
          <button class="bcar-nav" id="bcar-prev" type="button" aria-label="Fabricante anterior">‹</button>
          <button class="bcar-nav" id="bcar-next" type="button" aria-label="Fabricante siguiente">›</button>
        </div>
      </div>
      <div class="bcar-viewport" id="bcar-viewport" tabindex="0">
        <div class="bcar-track" id="bcar-track">
          ${M.carrusel.map((item, idx) => `
            <article class="bcar-card" data-bcar="${idx}">
              <div class="bcar-top">
                <span class="bcar-code">${esc(item.codigo || pad(idx + 1))}</span>
                <span class="bcar-cat">${esc(item.cat)}</span>
              </div>
              <h3 class="bcar-name">${esc(item.nombre)}</h3>
              <p class="bcar-sub">${esc(item.detalle)}</p>
              <a class="bcar-wa" href="${esc(waLink(waNum, `Hola SOLMEC S.A.S., quisiera consultar sobre integración / soporte en equipos ${item.nombre} (${item.cat}).`))}" target="_blank" rel="noopener">${ICON.chat}<span>Consultar por WhatsApp ↗</span></a>
            </article>
          `).join('')}
        </div>
      </div>`;
  }
  $('marcas-body').innerHTML = M.grupos.map((g, gi) => `
    <div class="brand-group">
      <div class="bg-head">
        <span class="bg-num">ESPECIALIDAD ${pad(gi + 1)}</span>
        <p class="mini">${esc(g.nombre)}</p>
      </div>
      <ul>${g.items.map((b) => `<li class="brand-item"><div class="bi-head">${b.logo
    ? `<img src="${esc(b.logo)}" alt="${esc(b.nombre)}" loading="lazy" data-name="${esc(b.nombre)}">`
    : `<span class="bn">${esc(b.nombre)}</span>`}<a class="brand-wa" href="${esc(waLink(waNum, `Hola SOLMEC S.A.S., requiero información o soporte técnico sobre equipos ${b.nombre} (${g.nombre}).`))}" target="_blank" rel="noopener" aria-label="Consultar ${esc(b.nombre)} por WhatsApp">WhatsApp ↗</a></div>${b.sub ? `<small>${esc(b.sub)}</small>` : ''}</li>`).join('')}</ul>
    </div>`).join('');
  $('marcas-note').textContent = M.nota;
  $('marcas-body').querySelectorAll('img[data-name]').forEach((img) => {
    const swap = () => img.replaceWith(Object.assign(document.createElement('span'), { className: 'bn', textContent: img.dataset.name }));
    if (img.complete && !img.naturalWidth) swap(); else img.addEventListener('error', swap, { once: true });
  });

  // Software y gemelos digitales
  const S = C.software;
  head('software-head', S);
  $('software-body').innerHTML = S.bloques.map((b) => `
    <div class="box${b.piloto ? ' pilot' : ''}">
      <p class="status${b.piloto ? ' pilot' : ''}"><span></span>${esc(b.estado)}</p>
      <h3>${esc(b.nombre)}</h3>
      <p class="box-text">${esc(b.texto)}</p>
      ${b.piloto ? '<p class="mini">Objetivos del piloto</p>' : ''}
      <ul class="ticks">${list(b.puntos)}</ul>
      ${b.cierre ? `<p class="box-close">${esc(b.cierre)}</p>` : ''}
      <div class="box-actions">
        ${b.enlace ? `<a class="btn ghost sm" href="${esc(b.enlace[1])}">${esc(b.enlace[0])} ↑</a>` : ''}
        <a class="btn ghost sm" href="${esc(waLink(waNum, `Hola SOLMEC S.A.S., me interesa información sobre: ${b.nombre}.`))}" target="_blank" rel="noopener">${ICON.chat}Consultar por WhatsApp</a>
      </div>
    </div>`).join('');

  // Método
  head('metodo-head', C.metodo);
  $('metodo-body').innerHTML = C.metodo.pasos.map(([t, d], i) => `
    <div class="step"><i>${pad(i + 1)}</i><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('');

  // Contacto y Configurador RFQ
  const T = C.contacto;
  $('c-lbl').textContent = T.etiqueta;
  $('c-title').textContent = T.titulo;
  $('c-text').textContent = T.texto;
  $('c-cta').innerHTML = `<a class="btn" href="${esc(waLink(T.whatsapp.numero, T.whatsapp.mensaje))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp Línea 1</a>
    <a class="btn ghost" href="${esc(waLink('573224088866', T.whatsapp.mensaje))}" target="_blank" rel="noopener">${ICON.chat}WhatsApp Línea 2</a>
    <button class="btn ghost" type="button" data-print>${ICON.doc}Dossier PDF</button>`;
  $('c-list').innerHTML = T.datos.map((d, i) => `
    <li><span class="k">${esc(d.k)}</span>${d.href
      ? `<a class="v" id="cv${i}" href="${esc(d.href)}">${esc(d.v)}</a>`
      : `<span class="v" id="cv${i}">${esc(d.v)}</span>`}
    <span class="acts">${d.wa ? `<a class="btn ghost sm" href="${esc(waLink(d.wa, T.whatsapp.mensaje))}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(d.v)}">WhatsApp</a>` : ''}<button class="btn ghost sm" type="button" data-copy="${i}" aria-label="Copiar ${esc(d.k.toLowerCase())}">Copiar</button></span></li>`).join('');

  if ($('wa-fab')) {
    $('wa-fab').href = waLink(T.whatsapp.numero, T.whatsapp.mensaje);
    $('wa-fab').innerHTML = `${ICON.chat}<span>WhatsApp</span>`;
  }

  if (T.rfq && $('c-rfq')) {
    const Q = T.rfq;
    const serviceOpts = [
      ...allServiceNames,
      `${pad(n + 1)} · Software industrial, SCADA y telemetría`,
      `${pad(n + 2)} · Piloto de Gemelo Digital`,
      'Múltiples líneas / Proyecto integral EPC'
    ];
    $('c-rfq').innerHTML = `
      <form class="rfq-form" id="rfq-form" novalidate>
        <div class="rfq-head">
          <span class="pill">RFQ · Cotización</span>
          <h3>${esc(Q.titulo)}</h3>
          <p>${esc(Q.subtitulo)}</p>
        </div>
        <div class="rfq-grid">
          <label class="rfq-field">
            <span>Sector operativo</span>
            <select id="rfq-sector" name="sector">
              ${Q.sectores.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}
            </select>
          </label>
          <label class="rfq-field">
            <span>Modalidad requerida</span>
            <select id="rfq-mod" name="modalidad">
              ${Q.modalidades.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join('')}
            </select>
          </label>
          <label class="rfq-field full">
            <span>Línea de servicio principal</span>
            <select id="rfq-service" name="servicio">
              ${serviceOpts.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}
            </select>
          </label>
          <label class="rfq-field">
            <span>Empresa / Entidad</span>
            <input type="text" id="rfq-company" name="empresa" placeholder="Nombre de su empresa o proyecto" autocomplete="organization">
          </label>
          <label class="rfq-field">
            <span>Ubicación / Planta / Campo</span>
            <input type="text" id="rfq-loc" name="ubicacion" placeholder="Ciudad, municipio o facilidad">
          </label>
          <label class="rfq-field full">
            <span>Alcance o necesidad técnica</span>
            <textarea id="rfq-notes" name="notas" rows="3" placeholder="Ej.: Requerimos mantenimiento a subestación de 500 kVA, banco de condensadores o integración de tablero ATS..."></textarea>
          </label>
        </div>
        <div class="rfq-actions">
          <button class="btn" type="submit" data-rfq-channel="wa">${ICON.chat}Enviar solicitud por WhatsApp</button>
          <button class="btn ghost" type="button" data-rfq-channel="mail">${ICON.mail}Enviar por correo</button>
          <button class="btn ghost sm" type="button" data-rfq-channel="copy">Copiar pliego</button>
        </div>
      </form>`;
  }

  const yr = new Date().getFullYear();
  const rights = C.marca.derechos || 'Todos los derechos reservados.';
  const dev = C.marca.desarrollador || 'DE ECOZAN';
  $('foot').innerHTML = `
    <div class="foot-main">
      <span>© ${yr} <b>${esc(C.marca.nombre)}</b> · NIT ${esc(C.marca.nit)} · ${esc(rights)}</span>
      <span class="foot-lema">${esc(C.marca.lema)}</span>
    </div>
    <div class="foot-dev">
      <span>Desarrollado por <strong class="dev-brand">${esc(dev)}</strong> · Todos los derechos reservados</span>
    </div>`;
}

/* ---------- Menú ---------- */
function initMenu() {
  const top = $('top'), mega = $('mega'), drawer = $('drawer'), burger = $('burger'), svc = $('svc-btn');
  const desktop = matchMedia('(min-width: 1120px)');
  const canHover = matchMedia('(hover: hover)');

  // Con ratón el menú se abre al pasar; el clic siguiente lo mantiene abierto en lugar de cerrarlo.
  let openedByHover = false;
  const setMega = (open) => {
    mega.hidden = !open;
    svc.setAttribute('aria-expanded', String(open));
    if (!open) openedByHover = false;
  };
  const setDrawer = (open) => {
    drawer.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  const closeAll = () => { setMega(false); setDrawer(false); };

  svc.addEventListener('click', () => {
    if (openedByHover) { openedByHover = false; return; }
    setMega(mega.hidden);
  });
  svc.addEventListener('mouseenter', () => {
    if (canHover.matches && desktop.matches && mega.hidden) { setMega(true); openedByHover = true; }
  });
  top.addEventListener('mouseleave', () => { if (canHover.matches) setMega(false); });
  burger.addEventListener('click', () => setDrawer(drawer.hidden));
  mega.addEventListener('click', (e) => { if (e.target.closest('a')) closeAll(); });
  drawer.addEventListener('click', (e) => { if (e.target.closest('a, [data-print]')) closeAll(); });
  document.addEventListener('click', (e) => { if (!top.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const wasOpen = !mega.hidden || !drawer.hidden;
    const focusBtn = !mega.hidden ? svc : burger;
    closeAll();
    if (wasOpen) focusBtn.focus();
  });
  desktop.addEventListener('change', closeAll);

  // Sombra discreta del encabezado al desplazarse
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Carrusel de capacidades (con avance automático) ---------- */
function initCarousel() {
  const track = $('car-track');
  const box = track?.closest('.carousel');
  const slides = track ? [...track.children] : [];
  if (!slides.length) return;
  const dots = $('car-dots'), prev = $('car-prev'), next = $('car-next'), count = $('car-count');
  const last = slides.length - 1;
  let idx = 0;
  let timer = null;
  let paused = false;

  dots.innerHTML = slides.map((_, i) => `<button class="dot" type="button" data-i="${i}" aria-label="Ir a la capacidad ${i + 1}"></button>`).join('');

  const set = (i) => {
    idx = i;
    count.textContent = `${pad(i + 1)} / ${pad(slides.length)}`;
    dots.querySelectorAll('.dot').forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    prev.disabled = i === 0;
    next.disabled = i === last;
  };
  const go = (i) => {
    const n = Math.max(0, Math.min(last, i));
    safeScrollX(track, slides[n].offsetLeft, true);
    set(n);
  };
  const startAuto = () => {
    clearInterval(timer);
    if (reduceMotion.matches || paused) return;
    timer = setInterval(() => {
      if (document.hidden || paused) return;
      go(idx >= last ? 0 : idx + 1);
    }, 5500);
  };

  let raf;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const i = Math.max(0, Math.min(last, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
      if (i !== idx) set(i);
    });
  }, { passive: true });

  prev.addEventListener('click', () => { go(idx - 1); startAuto(); });
  next.addEventListener('click', () => { go(idx + 1); startAuto(); });
  dots.addEventListener('click', (e) => { const d = e.target.closest('.dot'); if (d) { go(Number(d.dataset.i)); startAuto(); } });
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); startAuto(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); startAuto(); }
  });
  if (box) {
    box.addEventListener('mouseenter', () => { paused = true; clearInterval(timer); });
    box.addEventListener('mouseleave', () => { paused = false; startAuto(); });
    box.addEventListener('focusin', () => { paused = true; clearInterval(timer); });
    box.addEventListener('focusout', () => { paused = false; startAuto(); });
    box.addEventListener('touchstart', () => { paused = true; clearInterval(timer); }, { passive: true });
    box.addEventListener('touchend', () => { paused = false; startAuto(); }, { passive: true });
  }
  addEventListener('beforeprint', () => { paused = true; clearInterval(timer); });
  addEventListener('afterprint', () => { paused = false; startAuto(); });
  addEventListener('resize', () => safeScrollX(track, slides[idx].offsetLeft, false));
  set(0);
  startAuto();
}

/* ---------- Carrusel de Marcas y Tecnologías ---------- */
function initBrandCarousel() {
  const wrap = $('marcas-carousel');
  const vp = $('bcar-viewport');
  const track = $('bcar-track');
  if (!wrap || !vp || !track) return;
  const cards = [...track.children];
  if (!cards.length) return;
  const toggleBtn = $('bcar-toggle');
  const prevBtn = $('bcar-prev');
  const nextBtn = $('bcar-next');

  let idx = 0;
  let userPaused = false;
  let hoverPaused = false;
  let timer = null;

  const setActive = (i) => {
    idx = (i + cards.length) % cards.length;
    cards.forEach((c, k) => c.classList.toggle('active', k === idx));
  };

  const scrollToCard = (i) => {
    const targetIdx = (i + cards.length) % cards.length;
    setActive(targetIdx);
    const card = cards[targetIdx];
    if (!card) return;
    const maxScroll = Math.max(0, vp.scrollWidth - vp.clientWidth);
    const left = Math.min(card.offsetLeft, maxScroll);
    safeScrollX(vp, left, true);
  };

  const stepNext = () => {
    const maxScroll = Math.max(0, vp.scrollWidth - vp.clientWidth);
    if (vp.scrollLeft >= maxScroll - 8 && idx > 0) {
      scrollToCard(0);
    } else {
      scrollToCard(idx + 1);
    }
  };

  const start = () => {
    clearInterval(timer);
    if (reduceMotion.matches || userPaused || hoverPaused) return;
    timer = setInterval(() => {
      if (!document.hidden && !userPaused && !hoverPaused) stepNext();
    }, 3000);
  };

  let raf;
  vp.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const cardW = cards[0]?.offsetWidth || 1;
      const approx = Math.max(0, Math.min(cards.length - 1, Math.round(vp.scrollLeft / cardW)));
      if (hoverPaused && approx !== idx) setActive(approx);
    });
  }, { passive: true });

  prevBtn?.addEventListener('click', () => { scrollToCard(idx - 1); start(); });
  nextBtn?.addEventListener('click', () => { stepNext(); start(); });
  toggleBtn?.addEventListener('click', () => {
    userPaused = !userPaused;
    toggleBtn.setAttribute('aria-pressed', String(userPaused));
    toggleBtn.textContent = userPaused ? 'Reanudar' : 'Pausar';
    wrap.classList.toggle('paused', userPaused);
    start();
  });

  cards.forEach((c, k) => {
    c.addEventListener('click', () => { setActive(k); start(); });
  });

  wrap.addEventListener('mouseenter', () => { hoverPaused = true; clearInterval(timer); });
  wrap.addEventListener('mouseleave', () => { hoverPaused = false; start(); });
  wrap.addEventListener('focusin', () => { hoverPaused = true; clearInterval(timer); });
  wrap.addEventListener('focusout', () => { hoverPaused = false; start(); });
  wrap.addEventListener('touchstart', () => { hoverPaused = true; clearInterval(timer); }, { passive: true });
  wrap.addEventListener('touchend', () => { hoverPaused = false; start(); }, { passive: true });
  addEventListener('beforeprint', () => { hoverPaused = true; clearInterval(timer); });
  addEventListener('afterprint', () => { hoverPaused = false; start(); });
  addEventListener('resize', () => {
    const card = cards[idx];
    if (card) safeScrollX(vp, Math.min(card.offsetLeft, Math.max(0, vp.scrollWidth - vp.clientWidth)), false);
  });

  setActive(0);
  start();
}

/* ---------- Filtro de casos de éxito ---------- */
function initCasesFilter() {
  const bar = $('casos-filter'), grid = $('casos-body');
  if (!bar || !grid) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.cf-btn');
    if (!btn) return;
    const f = btn.dataset.filter;
    bar.querySelectorAll('.cf-btn').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    grid.querySelectorAll('.case-card').forEach((card) => {
      card.hidden = f !== 'Todos' && card.dataset.sector !== f;
    });
  });
}

/* ---------- Configurador RFQ y Impresión de Dossier ---------- */
async function prepareAndPrint() {
  document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'));
  const imgs = [...document.querySelectorAll('img[loading="lazy"]')];
  imgs.forEach((img) => { img.loading = 'eager'; });
  const pending = imgs.filter((img) => !img.complete);
  if (pending.length) {
    await Promise.race([
      Promise.all(pending.map((img) => new Promise((res) => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      }))),
      new Promise((res) => setTimeout(res, 650))
    ]);
  }
  window.print();
}

function initRFQ() {
  const form = $('rfq-form');
  document.addEventListener('click', (e) => {
    const printBtn = e.target.closest('#print-btn, [data-print]');
    if (printBtn) {
      prepareAndPrint();
      return;
    }
    const svcJump = e.target.closest('[data-rfq-service]');
    if (svcJump && form) {
      const sel = $('rfq-service');
      if (sel) sel.value = svcJump.dataset.rfqService;
      $('contacto')?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      setTimeout(() => $('rfq-company')?.focus(), 450);
    }
  });

  if (!form) return;
  const buildBrief = () => {
    const sector = $('rfq-sector')?.value || '';
    const mod = $('rfq-mod')?.value || '';
    const svc = $('rfq-service')?.value || '';
    const comp = ($('rfq-company')?.value || '').trim();
    const loc = ($('rfq-loc')?.value || '').trim();
    const notes = ($('rfq-notes')?.value || '').trim();
    const lines = [
      'SOLICITUD TÉCNICA / COTIZACIÓN — SOLMEC S.A.S.',
      `• Sector: ${sector}`,
      `• Línea de servicio: ${svc}`,
      `• Modalidad: ${mod}`,
      comp ? `• Empresa / Proyecto: ${comp}` : null,
      loc ? `• Ubicación / Planta: ${loc}` : null,
      notes ? `• Alcance técnico: ${notes}` : null
    ].filter(Boolean);
    return lines.join('\n');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = buildBrief();
    window.open(waLink(CONFIG.contacto.whatsapp.numero, msg), '_blank', 'noopener');
  });

  form.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-rfq-channel]');
    if (!btn || btn.type === 'submit') return;
    const ch = btn.dataset.rfqChannel;
    const msg = buildBrief();
    if (ch === 'mail') {
      const svc = $('rfq-service')?.value || 'Servicio de ingeniería';
      const comp = ($('rfq-company')?.value || '').trim();
      const subj = `Solicitud de Cotización: ${svc}${comp ? ' — ' + comp : ''}`;
      window.location.href = `mailto:ponessolmec@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(msg)}`;
    } else if (ch === 'copy') {
      try {
        await navigator.clipboard.writeText(msg);
        toast('Pliego técnico copiado al portapapeles');
      } catch {
        toast('No fue posible copiar automáticamente');
      }
    }
  });
}

/* ---------- Videos: vista previa silenciosa al pasar y reproducción en ventana ---------- */
function initVideos() {
  const modal = $('vmodal'), player = $('vmodal-video'), cap = $('vmodal-cap');
  const canHover = matchMedia('(hover: hover)');
  const items = CONFIG.obras.items;

  // Duración en la esquina de cada tarjeta
  document.querySelectorAll('.vplay video').forEach((v) => {
    const put = () => {
      const s = Math.round(v.duration);
      if (!Number.isFinite(s)) return;
      v.closest('.vplay').querySelector('.vdur').textContent = `${Math.floor(s / 60)}:${pad(s % 60)}`;
    };
    if (v.readyState >= 1) put(); else v.addEventListener('loadedmetadata', put, { once: true });
  });

  document.querySelectorAll('.vplay').forEach((b) => {
    if (!canHover.matches || reduceMotion.matches) return;
    b.addEventListener('mouseenter', () => { const v = b.querySelector('video'); if (v) v.play().catch(() => { }); });
    b.addEventListener('mouseleave', () => { const v = b.querySelector('video'); if (v) v.pause(); });
  });

  const close = () => { player.pause(); player.removeAttribute('src'); player.load(); };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.vplay');
    if (!b || b.disabled) return;
    const v = items[Number(b.dataset.video)];
    // Si el video falló al cargar y existe TikTok, se abre allí como respaldo.
    if (b.querySelector('.slot.failed')) { if (v.tiktok) window.open(v.tiktok, '_blank', 'noopener'); return; }
    b.querySelector('video')?.pause();
    player.src = v.src;
    if (v.poster) player.poster = v.poster; else player.removeAttribute('poster');
    cap.innerHTML = `<b>${esc(v.titulo)}</b><span>${esc(v.lugar)}</span>`;
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    player.play().catch(() => { });
  });
  $('vmodal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', close);
  player.addEventListener('error', () => { if (player.getAttribute('src')) cap.insertAdjacentHTML('beforeend', '<span class="vmodal-err">No fue posible reproducir este video.</span>'); });
}

/* ---------- Efectos sobrios: aparición al desplazarse y cifras ---------- */
function initReveal() {
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
  const sel = '.sec .head, .fig, .pillar, .carousel, .panel, .card, .case-card, .hseq-card, .hseq-pillar, .vcard, .brand-group, .box, .step, .clist li, .rfq-form';
  const els = [...document.querySelectorAll(sel)];
  els.forEach((el) => {
    const sibs = [...el.parentElement.children];
    el.style.setProperty('--d', `${Math.min(sibs.indexOf(el) % 4, 3) * 70}ms`);
    el.classList.add('rv');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
      const b = en.target.querySelector('b[data-count]');
      if (b) countUp(b);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach((el) => io.observe(el));
  // Al imprimir, todo visible
  addEventListener('beforeprint', () => els.forEach((el) => el.classList.add('in')));
}
function countUp(b) {
  const end = Number(b.dataset.count);
  if (!Number.isInteger(end) || end < 2) return;
  const t0 = performance.now(), dur = 1100;
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    b.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Copiar contacto ---------- */
let toastTimer;
function toast(t) {
  let el = document.querySelector('.toast');
  if (!el) { el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = t; el.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 1800);
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-copy]');
  if (!b) return;
  const span = $('cv' + b.dataset.copy);
  try { await navigator.clipboard.writeText(span.textContent); toast('Copiado'); }
  catch (err) {
    const r = document.createRange(); r.selectNodeContents(span);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Texto seleccionado');
  }
});

/* ---------- Marcas de reemplazo ---------- */
function setHl(on) {
  document.body.classList.toggle('hl', on);
  $('switch').textContent = on ? 'Ocultar marcas de reemplazo' : 'Mostrar marcas de reemplazo';
}
$('switch').addEventListener('click', () => setHl(!document.body.classList.contains('hl')));

render();
watchMedia();
initMenu();
initCarousel();
initBrandCarousel();
initCasesFilter();
initRFQ();
initVideos();
initReveal();
initTwin(CONFIG.hero.medio);
setHl(!!CONFIG.resaltarPendientes);
$('switch').hidden = !CONFIG.resaltarPendientes;
