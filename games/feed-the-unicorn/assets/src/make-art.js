// Generates Feed-the-Unicorn art as SVG sources + PNG exports.
// Run from anywhere: node games/feed-the-unicorn/assets/src/make-art.js (needs Playwright).
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const OUT = path.join(__dirname, "..");  // writes PNGs into assets/
const SRC = path.join(OUT, 'src');
fs.mkdirSync(SRC, { recursive: true });

const OL = '#5A3A7E';          // outline
const SW = 16;                 // outline width on the 1200 canvas
const PINK = '#FFB8DA', PINK_D = '#F27AB0', LAV = '#CDB6FF', MINT = '#A8EFD2', SKY = '#A9DBFF', YEL = '#FFE38A';

const svg = (w, h, body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}</svg>`;

// a "tube" strand: outline, colour, highlight
const strand = (d, w, col, hi) =>
  `<path d="${d}" fill="none" stroke="${OL}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${hi}" stroke-width="${w * .28}" stroke-linecap="round" stroke-linejoin="round" opacity=".75" transform="translate(-${w * .18},-${w * .12})"/>`;

const sparkle = (x, y, s, fill) =>
  `<path d="M${x},${y - s}Q${x + s * .18},${y - s * .18} ${x + s},${y}Q${x + s * .18},${y + s * .18} ${x},${y + s}Q${x - s * .18},${y + s * .18} ${x - s},${y}Q${x - s * .18},${y - s * .18} ${x},${y - s}Z" fill="${fill}"/>`;

function starPath(cx, cy, R, r, n = 5, rot = -90){
  let d = '';
  for (let i = 0; i < n * 2; i++){
    const a = (rot + i * 180 / n) * Math.PI / 180, rr = i % 2 ? r : R;
    d += (i ? 'L' : 'M') + (cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1);
  }
  return d + 'Z';
}

const furGrad = (id) => `<radialGradient id="${id}" cx=".42" cy=".32" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".65" stop-color="#FFF1F8"/><stop offset="1" stop-color="#F9DDEE"/></radialGradient>`;

/* ===================== UNICORN (1200 x 1320) ===================== */
const U = {};
const W = 1200, H = 1320;

// Wing: base near (400,1020), feathers fan up-left.
const wingShape = `
  <path d="M440 1030 C400 900 300 810 170 800 C110 796 80 840 110 870 C70 880 62 930 110 945 C76 965 84 1015 135 1020 C112 1050 130 1090 180 1085 C175 1120 215 1135 250 1115 C320 1110 400 1080 440 1050 Z"
        fill="url(#wingG)" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M400 1010 C340 930 260 880 170 870" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" opacity=".8"/>
  <path d="M400 1040 C330 990 250 960 150 948" fill="none" stroke="${PINK}" stroke-width="12" stroke-linecap="round"/>
  <path d="M410 1060 C340 1040 270 1030 190 1030" fill="none" stroke="${SKY}" stroke-width="12" stroke-linecap="round"/>`;
const wingDefs = `<linearGradient id="wingG" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFE3F1"/><stop offset=".55" stop-color="#E9DCFF"/><stop offset="1" stop-color="${LAV}"/></linearGradient>`;
const wingBig = `<g transform="translate(430 1040) rotate(15) scale(1.3) translate(-430 -1040)">${wingShape}</g>`;
U['unicorn-wing-left'] = svg(W, H, wingBig, wingDefs);
U['unicorn-wing-right'] = svg(W, H, `<g transform="translate(1200,0) scale(-1,1)">${wingBig}</g>`, wingDefs);

// Tail: rainbow strands from (860,1160) curling up-right
const tailBase = 'M830 1190 C930 1230 1060 1180 1080 1060 C1095 970 1040 900 990 930';
U['unicorn-tail'] = svg(W, H, [
  strand('M830 1180 C930 1230 1060 1180 1080 1060 C1095 970 1040 900 990 930', 110, PINK, '#FFE1F0'),
  strand('M840 1160 C920 1180 1010 1140 1020 1060 C1028 1000 990 970 960 990', 60, LAV, '#F1E9FF'),
  strand('M850 1210 C940 1270 1060 1250 1100 1180', 60, MINT, '#E3FFF4'),
  strand('M850 1200 C900 1240 960 1240 1000 1225', 40, YEL, '#FFF7D6'),
].join(''));

// Body: sitting, facing us
U['unicorn-body'] = svg(W, H, `
  <ellipse cx="380" cy="1190" rx="120" ry="90" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <ellipse cx="820" cy="1190" rx="120" ry="90" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <ellipse cx="320" cy="1240" rx="78" ry="44" fill="${LAV}" stroke="${OL}" stroke-width="${SW}"/>
  <ellipse cx="880" cy="1240" rx="78" ry="44" fill="${LAV}" stroke="${OL}" stroke-width="${SW}"/>
  <path d="M600 860 C800 860 880 960 880 1080 C880 1190 760 1250 600 1250 C440 1250 320 1190 320 1080 C320 960 400 860 600 860Z" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <ellipse cx="600" cy="1090" rx="140" ry="110" fill="#FFF8FC" opacity=".9"/>
  <rect x="452" y="1050" width="124" height="230" rx="62" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <rect x="624" y="1050" width="124" height="230" rx="62" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <path d="M452 1210 H576 V1218 A62 62 0 0 1 452 1218Z" fill="${LAV}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M624 1210 H748 V1218 A62 62 0 0 1 624 1218Z" fill="${LAV}" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M480 1090 Q490 1060 520 1056" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M652 1090 Q662 1060 692 1056" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>`, furGrad('fur'));

// Mane: flowing rainbow locks behind the head
U['unicorn-mane'] = svg(W, H, [
  strand('M640 330 C880 300 1000 470 930 640 C880 760 980 850 900 990', 130, PINK, '#FFE1F0'),
  strand('M700 380 C900 440 910 600 860 720 C820 820 890 900 830 1000', 90, LAV, '#F1E9FF'),
  strand('M760 470 C900 560 870 700 820 800 C790 870 820 920 790 960', 60, MINT, '#E3FFF4'),
  strand('M520 330 C320 320 230 470 280 620 C310 720 250 790 300 900', 120, SKY, '#E6F5FF'),
  strand('M480 400 C340 430 310 560 350 660 C380 740 330 800 360 860', 70, YEL, '#FFF7D6'),
  strand('M440 470 C360 520 370 620 400 700', 50, PINK, '#FFE1F0'),
].join(''));

// Head: no eyes, no mouth
U['unicorn-head'] = svg(W, H, `
  <path d="M360 440 L370 200 L540 360 Z" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M392 392 L398 270 L486 356 Z" fill="${PINK}"/>
  <path d="M840 440 L830 200 L660 360 Z" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}" stroke-linejoin="round"/>
  <path d="M808 392 L802 270 L714 356 Z" fill="${PINK}"/>
  <ellipse cx="600" cy="620" rx="305" ry="270" fill="url(#fur)" stroke="${OL}" stroke-width="${SW}"/>
  <ellipse cx="600" cy="775" rx="180" ry="112" fill="#FFE3F0"/>
  <ellipse cx="548" cy="742" rx="15" ry="11" fill="#E7A0C6"/><ellipse cx="652" cy="742" rx="15" ry="11" fill="#E7A0C6"/>
  <ellipse cx="385" cy="710" rx="58" ry="36" fill="#FFB3D1" opacity=".8"/>
  <ellipse cx="815" cy="710" rx="58" ry="36" fill="#FFB3D1" opacity=".8"/>
  <path d="M360 560 Q370 470 440 420" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/>
  ${strand('M500 420 C470 380 500 340 545 345', 70, PINK, '#FFE1F0')}
  ${strand('M700 420 C730 380 700 340 655 345', 70, LAV, '#F1E9FF')}
  ${strand('M560 430 C560 400 600 380 640 410', 50, MINT, '#E3FFF4')}
  <path d="M538 384 L600 70 L662 384 Q600 408 538 384Z" fill="url(#horn)" stroke="#D99A1E" stroke-width="14" stroke-linejoin="round"/>
  <path d="M552 318 L640 282 M566 248 L630 222 M580 178 L618 162" stroke="#D99A1E" stroke-width="13" stroke-linecap="round"/>
  <path d="M575 330 L590 140" stroke="#FFF8D8" stroke-width="12" stroke-linecap="round" opacity=".9"/>
  ${sparkle(730, 150, 38, YEL)}`,
  furGrad('fur') + `<linearGradient id="horn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF6C4"/><stop offset=".55" stop-color="#FFD35C"/><stop offset="1" stop-color="#F5B23A"/></linearGradient>`);

// Eyes (centre ~ 600,592)
const eyeOpen = (x) => `
  <ellipse cx="${x}" cy="600" rx="60" ry="74" fill="#3E2560"/>
  <ellipse cx="${x}" cy="628" rx="44" ry="36" fill="#8B5FD0" opacity=".85"/>
  <circle cx="${x + 20}" cy="572" r="22" fill="#fff"/>
  <circle cx="${x - 22}" cy="630" r="9" fill="#fff"/>`;
U['unicorn-eyes-open'] = svg(W, H, eyeOpen(480) + eyeOpen(720) + `
  <path d="M428 556 l-38 -22 M440 538 l-26 -36 M772 556 l38 -22 M760 538 l26 -36" stroke="#3E2560" stroke-width="14" stroke-linecap="round"/>`);
U['unicorn-eyes-happy'] = svg(W, H, `
  <path d="M420 616 Q480 536 540 616 M660 616 Q720 536 780 616" stroke="#3E2560" stroke-width="22" fill="none" stroke-linecap="round"/>`);
U['unicorn-eyes-closed'] = svg(W, H, `
  <path d="M424 590 Q480 640 536 590 M664 590 Q720 640 776 590" stroke="#3E2560" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M440 612 l-16 22 M480 624 l0 26 M520 612 l16 22 M680 612 l-16 22 M720 624 l0 26 M760 612 l16 22" stroke="#3E2560" stroke-width="10" stroke-linecap="round"/>`);

// Mouths (centre 600,816)
U['unicorn-mouth-closed'] = svg(W, H, `
  <path d="M536 800 Q568 840 600 806 Q632 840 664 800" stroke="#7A3A68" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
U['unicorn-mouth-open'] = svg(W, H, `
  <path d="M532 790 Q600 770 668 790 Q680 880 600 884 Q520 880 532 790Z" fill="#7A2E5E" stroke="${OL}" stroke-width="12" stroke-linejoin="round"/>
  <ellipse cx="600" cy="852" rx="44" ry="22" fill="#FF8FB8"/>
  <path d="M556 790 h88 v14 q-44 10 -88 0z" fill="#fff"/>`);

/* ===================== FOODS (600 x 600) ===================== */
const F = {};
const fsw = 12; // food outline
// badge centre for each food, used by the game (x, y in px on 600 canvas)
const BADGE = {};

// Cupcake
BADGE['food-cupcake'] = [300, 452];
F['food-cupcake'] = svg(600, 600, `
  <path d="M130 330 L470 330 L420 560 Q300 584 180 560 Z" fill="#BFE9FF" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M190 336 L214 566 M250 336 L262 574 M350 336 L338 574 M410 336 L386 566" stroke="#8FD0F5" stroke-width="22"/>
  <path d="M110 340 C80 300 120 250 170 262 C160 200 230 170 270 200 C290 150 370 150 390 200 C440 180 490 220 470 270 C520 280 520 340 480 350 Z"
        fill="${PINK}" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M170 300 C230 280 330 280 430 300" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M190 220 C240 120 360 120 410 220 C380 250 220 250 190 220Z" fill="${LAV}" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M250 170 C290 140 330 140 360 170" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M300 120 C305 90 330 70 350 60" stroke="#3FA36F" stroke-width="10" fill="none" stroke-linecap="round"/>
  <circle cx="300" cy="118" r="40" fill="#FF5F8F" stroke="${OL}" stroke-width="${fsw}"/>
  <circle cx="286" cy="104" r="11" fill="#fff" opacity=".8"/>
  <rect x="205" y="262" width="26" height="10" rx="5" fill="${YEL}" transform="rotate(-20 218 267)"/>
  <rect x="380" y="250" width="26" height="10" rx="5" fill="${MINT}" transform="rotate(25 393 255)"/>
  <rect x="300" y="200" width="26" height="10" rx="5" fill="${SKY}" transform="rotate(10 313 205)"/>`);

// Star cookie
BADGE['food-star-cookie'] = [300, 330];
F['food-star-cookie'] = svg(600, 600, `
  <path d="${starPath(300, 320, 270, 140)}" fill="#F8C982" stroke="${OL}" stroke-width="${fsw * 2.6}" stroke-linejoin="round"/>
  <path d="${starPath(300, 320, 270, 140)}" fill="#F8C982" stroke="#F8C982" stroke-width="${fsw * 0.8}" stroke-linejoin="round"/>
  <path d="${starPath(300, 322, 205, 106)}" fill="${PINK}" stroke="#FFF" stroke-width="22" stroke-linejoin="round"/>
  <path d="M190 230 Q230 200 270 210" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".8"/>
  <circle cx="200" cy="300" r="8" fill="${YEL}"/><circle cx="410" cy="300" r="8" fill="${MINT}"/>
  <circle cx="300" cy="190" r="8" fill="${SKY}"/><circle cx="240" cy="440" r="8" fill="${LAV}"/><circle cx="360" cy="440" r="8" fill="${YEL}"/>`);

// Donut
BADGE['food-donut'] = [300, 300];
const sprinkles = [[160,200,30],[230,140,-40],[370,140,20],[440,210,-30],[470,320,60],[420,430,-20],[300,480,10],[180,430,40],[130,320,-60],[200,290,70],[400,290,-70],[300,170,0]]
  .map(([x, y, r], i) => `<rect x="${x - 16}" y="${y - 6}" width="32" height="12" rx="6" fill="${[YEL, MINT, SKY, '#fff', LAV][i % 5]}" transform="rotate(${r} ${x} ${y})"/>`).join('');
F['food-donut'] = svg(600, 600, `
  <circle cx="300" cy="310" r="250" fill="#F4BE7C" stroke="${OL}" stroke-width="${fsw}"/>
  <path d="M300 70 C420 70 520 140 530 250 C545 300 500 290 505 340 C510 400 450 380 440 430 C430 480 360 470 330 500 C290 530 260 480 210 490 C150 500 150 440 110 420 C60 395 90 340 70 300 C60 170 170 70 300 70Z"
        fill="${PINK}" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M150 210 Q200 130 290 115" stroke="#fff" stroke-width="20" fill="none" stroke-linecap="round" opacity=".7"/>
  ${sprinkles}
  <circle cx="300" cy="300" r="92" fill="#F4BE7C" stroke="${OL}" stroke-width="${fsw}"/>
  <circle cx="300" cy="300" r="62" fill="#FFF6E6"/>`);

// Moon candy (round swirl lollipop with a little moon)
BADGE['food-moon-candy'] = [290, 250];
const swirl = (() => { let d = 'M290 250'; for (let t = 0; t <= 6 * Math.PI; t += .25){ const r = 9 * t; d += ` L${(290 + r * Math.cos(t)).toFixed(1)} ${(250 + r * Math.sin(t)).toFixed(1)}`; } return d; })();
F['food-moon-candy'] = svg(600, 600, `
  <path d="M300 420 L300 585" stroke="${OL}" stroke-width="46" stroke-linecap="round"/>
  <path d="M300 420 L300 585" stroke="#FFFFFF" stroke-width="22" stroke-linecap="round"/>
  <path d="M290 470 l22 -10 M290 520 l22 -10" stroke="${PINK}" stroke-width="10" stroke-linecap="round"/>
  <circle cx="290" cy="250" r="200" fill="${LAV}" stroke="${OL}" stroke-width="${fsw}"/>
  <clipPath id="lc"><circle cx="290" cy="250" r="190"/></clipPath>
  <path d="${swirl}" stroke="${PINK}" stroke-width="40" fill="none" stroke-linecap="round" clip-path="url(#lc)"/>
  <path d="M150 170 Q190 95 270 75" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".85"/>
  <path d="M500 40 A90 90 0 1 0 540 190 A70 70 0 1 1 500 40Z" fill="${YEL}" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  ${sparkle(110, 470, 24, YEL)}${sparkle(520, 330, 22, '#FFF')}`);

// Apple
BADGE['food-apple'] = [300, 370];
F['food-apple'] = svg(600, 600, `
  <path d="M300 160 C240 110 90 110 70 270 C55 400 140 560 240 560 C270 560 285 545 300 545 C315 545 330 560 360 560 C460 560 545 400 530 270 C510 110 360 110 300 160Z"
        fill="url(#ap)" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M140 230 Q160 170 220 160" stroke="#fff" stroke-width="24" fill="none" stroke-linecap="round" opacity=".85"/>
  <circle cx="132" cy="280" r="12" fill="#fff" opacity=".85"/>
  <path d="M300 170 C300 120 290 80 270 50" stroke="#8A5A3A" stroke-width="22" fill="none" stroke-linecap="round"/>
  <path d="M310 110 C340 40 430 30 470 60 C440 120 360 140 310 110Z" fill="#8EE6A8" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M330 100 C370 80 410 70 440 68" stroke="#4FBF7A" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${sparkle(470, 450, 26, '#fff')}`,
  `<radialGradient id="ap" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#FF9FBF"/><stop offset=".6" stop-color="#FF6B98"/><stop offset="1" stop-color="#E64C7E"/></radialGradient>`);

// Cotton candy
BADGE['food-cotton-candy'] = [300, 250];
const puffs = [[300,120,95,PINK],[180,190,95,LAV],[420,190,95,SKY],[150,310,85,PINK],[450,310,85,LAV],[230,350,90,SKY],[370,350,90,PINK],[300,250,120,'#FFD6EC']];
F['food-cotton-candy'] = svg(600, 600, `
  <path d="M240 400 L300 585 L360 400Z" fill="${YEL}" stroke="${OL}" stroke-width="${fsw}" stroke-linejoin="round"/>
  <path d="M262 440 L338 440 M276 490 L324 490 M288 535 L312 535" stroke="#F0B93A" stroke-width="10" stroke-linecap="round"/>
  ${puffs.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${OL}"/>`).join('')}
  ${puffs.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r - fsw}" fill="${c}"/>`).join('')}
  ${puffs.slice(0, 7).map(([x, y, r]) => `<circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .22}" fill="#fff" opacity=".6"/>`).join('')}
  ${sparkle(470, 80, 28, YEL)}`);

/* ===================== REWARD STAR (512) ===================== */
const R = {};
R['star-reward'] = svg(512, 512, `
  <path d="${starPath(256, 272, 210, 105)}" fill="url(#sg)" stroke="#D99A1E" stroke-width="44" stroke-linejoin="round"/>
  <path d="${starPath(256, 272, 210, 105)}" fill="url(#sg)" stroke="url(#sg)" stroke-width="16" stroke-linejoin="round"/>
  <path d="M170 210 Q200 160 240 150" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" opacity=".85"/>
  <ellipse cx="196" cy="290" rx="26" ry="16" fill="#FFB3A0" opacity=".6"/><ellipse cx="316" cy="290" rx="26" ry="16" fill="#FFB3A0" opacity=".6"/>
  <ellipse cx="222" cy="262" rx="12" ry="17" fill="#7A4A10"/><ellipse cx="290" cy="262" rx="12" ry="17" fill="#7A4A10"/>
  <path d="M234 300 Q256 322 278 300" stroke="#7A4A10" stroke-width="10" fill="none" stroke-linecap="round"/>
  ${sparkle(450, 90, 34, '#FFE38A')}${sparkle(60, 120, 22, '#FFE38A')}`,
  `<linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF2A8"/><stop offset=".55" stop-color="#FFD35C"/><stop offset="1" stop-color="#F7B83A"/></linearGradient>`);

/* ===================== export ===================== */
(async () => {
  const all = { ...U, ...F, ...R };
  for (const [n, s] of Object.entries(all)) fs.writeFileSync(path.join(SRC, n + '.svg'), s);
  fs.writeFileSync(path.join(SRC, 'food-badges.json'), JSON.stringify(BADGE, null, 2));
  const b = await chromium.launch();
  for (const [n, s] of Object.entries(all)){
    const [, w, h] = s.match(/width="(\d+)" height="(\d+)"/);
    const p = await b.newPage({ viewport: { width: +w, height: +h } });
    await p.setContent(`<html><body style="margin:0;background:transparent">${s}</body></html>`);
    await p.screenshot({ path: path.join(OUT, n + '.png'), omitBackground: true });
    await p.close();
  }
  await b.close();
})();
