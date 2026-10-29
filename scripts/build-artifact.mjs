// Genera preview/artifact.html: la misma página en un solo archivo, sin Vite.
// Sirve para previsualizar o publicar cuando no hay acceso a npm.
// Uso: node scripts/build-artifact.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(resolve(root, p), 'utf8');

const html = read('index.html');
const css = read('src/styles.css');
const config = read('src/config.js').replace(/^export /gm, '');
const twin = read('src/twin.js').replace(/^export /gm, '');
const main = read('src/main.js').replace(/^import .*$/gm, '');

const title = html.match(/<title>[\s\S]*?<\/title>/)[0];
const fit = html.match(/<meta name="claude:viewport-fit-sides"[^>]*>/)[0];
// En el sitio las fuentes van incluidas (@fontsource); en esta vista previa se cargan desde Google Fonts.
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap">';
const body = html
  .match(/<body>([\s\S]*)<\/body>/)[1]
  .replace(/<script type="module"[^>]*><\/script>/, '');

const out = `${title}\n${fit}\n${fonts}\n<style>\n${css}\n</style>\n${body}\n<script type="module">\n${config}\n${twin}\n${main}\n</script>\n`;

mkdirSync(resolve(root, 'preview'), { recursive: true });
writeFileSync(resolve(root, 'preview/artifact.html'), out);
console.log('preview/artifact.html', (out.length / 1024).toFixed(1) + ' KB');
