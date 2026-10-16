/* OpenZirndorf – Demo-Seite für den Messestand.
   Reines JS ohne Build-Schritt, funktioniert auch per file://.
   Inhalte (Projekte, Folien) stehen oben in diesem File und lassen sich direkt anpassen. */

'use strict';

// ─────────────────────────────────────────────────────────────
// Inhalte
// ─────────────────────────────────────────────────────────────

/** embed: lässt sich die Seite im iframe anzeigen? (ideen.openzirndorf.de verbietet das per CSP)
    phone: im Handy-Rahmen anzeigen (reine Mobil-Apps) */
const APPS = [
  { id: 'mobil', name: 'Zirndorf Mobil', url: 'https://mobil.openzirndorf.de/', status: 'Live · Beta', live: true, embed: true, phone: false,
    desc: 'Busse, S4 und RB11 rund um Zirndorf live auf der Karte, mit Echtzeit-Verspätungen.' },
  { id: 'ideen', name: 'Ideenbörse', url: 'https://ideen.openzirndorf.de/', status: 'Live · Mitmachen', live: true, embed: false, phone: false,
    desc: 'Ideen für Zirndorf einreichen, diskutieren und gemeinsam abstimmen.' },
  { id: 'wahl2026', name: 'Wahlanalyse 2026', url: 'https://wahl2026.openzirndorf.de/', status: 'Online · Kommunalwahl 2026', live: true, embed: true, phone: false,
    desc: 'Ergebnisse nach Stimmbezirk und ein transparenter KI-Vergleich der Bürgermeisterkandidaten.' },
  { id: 'garagenflohmarkt', name: 'Garagenflohmarkt', url: 'https://garagenflohmarkt.openzirndorf.de/', status: 'Rückblick · 4. Oktober 2026', live: false, embed: true, phone: false,
    desc: 'Stadtweiter Flohmarkt vor der eigenen Haustür: Stände anmelden und auf der Karte finden.' },
  { id: 'erfahre', name: 'Erfahre Zirndorf', url: 'https://erfahre.openzirndorf.de/', status: 'Beendet · Juli 2026', live: false, embed: true, phone: true,
    desc: 'Fahrrad-Aktion: Stationen per GPS-Check-in entdecken, mit Team-Rangliste und Preisen.' },
  { id: 'sommerdetektive', name: 'Zirndorfer Sommerdetektive', url: 'https://sommerdetektive.openzirndorf.de/', status: 'Beendet · Sommerferien 2026', live: false, embed: true, phone: true,
    desc: 'Rätsel-Stadtrallye für Familien: 26 Stationen zu Fuß quer durch Zirndorf.' },
  { id: 'bad', name: 'Bibertbad Digital', url: 'https://bad.openzirndorf.de/', status: 'Aprilscherz 2026', live: false, embed: true, phone: true,
    desc: 'Unser Aprilscherz: das Zirndorfer Freibad, plötzlich ganz digital.' },
];

/** Ausblick: bewusst nicht im Haupt-Raster, sondern dezent darunter. */
const OUTLOOK = { id: 'sozialnavigator', name: 'Hilfenavigator Zirndorf', url: 'https://f-hrtmnn.github.io/sozialnavigator/', status: 'Ausblick · Prototyp', live: false, embed: true, phone: false, qr: false, showUrl: false,
  desc: 'Anlaufstellen für Hilfe und Beratung in Zirndorf und im Landkreis Fürth, schnell gefunden, ohne Login und ohne Tracking.' };

const ALL_APPS = [...APPS, OUTLOOK];

const ICON = {
  code:   '<path d="M8 6l-6 6 6 6M16 6l6 6-6 6"/>',
  pin:    '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  scale:  '<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3.5 3.5 0 0 0 6 0zM18 7l-3 7a3.5 3.5 0 0 0 6 0z"/>',
  users:  '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  eye:    '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  tool:   '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  heart:  '<path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.5 3.8 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.2 0 5.5 3 4.3 6.3C19.5 15.4 12 20 12 20z"/>',
  book:   '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/>',
  ext:    '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[name]}</svg>`;

/** Folien der Präsentation „Der Verein“. ms = Anzeigedauer im Automatik-Modus. */
const SLIDES = [
  { ms: 10000, cls: 'slide--title', html: `
    <div class="slide-inner">
      <div>
        <p class="eyebrow" data-step style="--d:0">OpenZirndorf e.V.</p>
        <h2 data-step style="--d:1">Digitale Möglichkeiten <span class="accent">für Zirndorf.</span></h2>
        <p class="slide-lead" data-step style="--d:2">Ein ehrenamtlicher, überparteilicher Verein von Bürgerinnen und Bürgern, der digitale Werkzeuge für die eigene Stadt baut.</p>
      </div>
      <img src="assets/img/logo.png" alt="Logo von OpenZirndorf" data-step style="--d:1" />
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner">
      <p class="eyebrow" data-step style="--d:0">Wer wir sind</p>
      <h2 data-step style="--d:1">Menschen aus Zirndorf, für Zirndorf.</h2>
      <p class="slide-lead" data-step style="--d:2">Nachbarinnen und Nachbarn, die in ihrer Freizeit digitale Werkzeuge bauen, damit das Leben in Zirndorf ein bisschen einfacher und transparenter wird.</p>
      <div class="cards cards-4">
        <div class="card" data-step style="--d:3"><div class="card-num">2026</div><h3>Gegründet</h3><p>Seit dem 6. August eingetragener Verein.</p></div>
        <div class="card" data-step style="--d:4"><div class="card-num">7</div><h3>Projekte</h3><p>Seit Anfang 2026 gestartet, von der Wahl bis zum Flohmarkt.</p></div>
        <div class="card" data-step style="--d:5"><div class="card-num">100&nbsp;%</div><h3>Ehrenamtlich</h3><p>Kein Unternehmen dahinter, kein Gewinninteresse.</p></div>
        <div class="card" data-step style="--d:6"><div class="card-num">0&nbsp;€</div><h3>Bisherige Kosten</h3><p>Alle bisherigen Apps und Aktionen waren für Bürgerinnen und Bürger frei nutzbar.</p></div>
      </div>
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner">
      <p class="eyebrow" data-step style="--d:0">Wofür wir stehen</p>
      <h2 data-step style="--d:1">Vier Grundsätze für alles, was wir tun.</h2>
      <div class="cards cards-4">
        <div class="card" data-step style="--d:2"><div class="card-icon">${icon('code')}</div><h3>Open Source</h3><p>Unsere eigenen Werkzeuge sind öffentlich einsehbar. Jede und jeder kann nachvollziehen, wie sie funktionieren.</p></div>
        <div class="card" data-step style="--d:3"><div class="card-icon">${icon('pin')}</div><h3>Aus Zirndorf</h3><p>Wir kennen die Stadt, weil wir hier leben. Unsere Projekte lösen Fragen von hier.</p></div>
        <div class="card" data-step style="--d:4"><div class="card-icon">${icon('scale')}</div><h3>Überparteilich</h3><p>Wir bereiten Informationen auf, ohne Partei zu ergreifen. Bewerten sollen die Bürgerinnen und Bürger selbst.</p></div>
        <div class="card" data-step style="--d:5"><div class="card-icon">${icon('users')}</div><h3>Für alle offen</h3><p>Verständlich auch für alle, die sich nicht mit Technik beschäftigen. Mitmachen kann jede und jeder.</p></div>
      </div>
    </div>` },

  { ms: 15000, cls: 'slide--wide', html: `
    <div class="slide-inner">
      <p class="eyebrow" data-step style="--d:0">Rückblick</p>
      <h2 data-step style="--d:1">Unser erstes Jahr.</h2>
      <ol class="timeline">
        <li data-step style="--d:2"><time>März 2026</time><strong>Wahlanalyse 2026</strong><span>Die Kommunalwahl verständlich aufbereitet, bis in jeden Stimmbezirk.</span></li>
        <li data-step style="--d:3"><time>April 2026</time><strong>Bibertbad Digital</strong><span>Ein Aprilscherz, der zeigt: Digitale Ideen wecken Neugier.</span></li>
        <li data-step style="--d:4"><time>bis Juli 2026</time><strong>Erfahre Zirndorf</strong><span>Mit dem Rad Stationen in der ganzen Stadt entdecken.</span></li>
        <li data-step style="--d:5"><time>6. August 2026</time><strong>Vereinsgründung</strong><span>Aus der Initiative wird OpenZirndorf e.V.</span></li>
        <li data-step style="--d:6"><time>Aug. – Sept. 2026</time><strong>Sommerdetektive</strong><span>26 Rätsel-Stationen für Familien in den Sommerferien.</span></li>
        <li data-step style="--d:7"><time>4. Oktober 2026</time><strong>Garagenflohmarkt</strong><span>Ganz Zirndorf öffnet Garage, Hof und Vorgarten.</span></li>
      </ol>
      <p class="fine" data-step style="--d:8" >Laufend im Einsatz: <strong>Zirndorf Mobil</strong> mit Echtzeit-Abfahrten und die <strong>Ideenbörse</strong> für Vorschläge aus der Bürgerschaft.</p>
    </div>` },

  { ms: 15000, cls: 'slide--dark', html: `
    <div class="slide-inner">
      <p class="eyebrow" data-step style="--d:0">Was wir vorhaben</p>
      <h2 data-step style="--d:1">Digitale Werkzeuge, die Zirndorf weiterbringen.</h2>
      <div class="cards cards-2">
        <div class="card" data-step style="--d:2"><div class="card-icon">${icon('eye')}</div><h3>Lokale Politik verständlich machen</h3><p>Informationen so aufbereiten, dass sie alle verstehen, nicht nur die, die sich schon auskennen.</p></div>
        <div class="card" data-step style="--d:3"><div class="card-icon">${icon('tool')}</div><h3>Praktische Hilfe im Alltag</h3><p>Digitale Werkzeuge für Fragen, die sich hier jeden Tag stellen: unterwegs, beim Einkaufen, bei der Suche nach Hilfe.</p></div>
        <div class="card" data-step style="--d:4"><div class="card-icon">${icon('heart')}</div><h3>Gemeinschaft stärken</h3><p>Aktionen, die Menschen zusammenbringen, von der Stadtrallye bis zum Flohmarkt.</p></div>
        <div class="card" data-step style="--d:5"><div class="card-icon">${icon('book')}</div><h3>Wissen teilen</h3><p>Im OpenZirndorf-Workshop zeigen wir, wie digitale Werkzeuge entstehen, und wie du selbst mitmachen kannst.</p></div>
      </div>
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner">
      <p class="eyebrow" data-step style="--d:0">So arbeiten wir</p>
      <h2 data-step style="--d:1">Von der Idee zum fertigen Werkzeug.</h2>
      <div class="flow">
        <div class="card" data-step style="--d:2"><h3>Idee</h3><p>Vorschläge kommen aus der Ideenbörse, vom Stammtisch oder direkt aus der Nachbarschaft.</p></div>
        <div class="card" data-step style="--d:3"><h3>Gemeinsam planen</h3><p>Wir prüfen, was gebraucht wird und was mit vertretbarem Aufwand machbar ist.</p></div>
        <div class="card" data-step style="--d:4"><h3>Ehrenamtlich bauen</h3><p>Mitglieder entwickeln, testen und verbessern das Werkzeug in ihrer Freizeit.</p></div>
        <div class="card" data-step style="--d:5"><h3>Offen bereitstellen</h3><p>Für alle zugänglich, der Quellcode öffentlich einsehbar.</p></div>
      </div>
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner cta-slide">
      <div>
        <p class="eyebrow" data-step style="--d:0">Mitmachen</p>
        <h2 data-step style="--d:1">Der OpenZirndorf-Workshop.</h2>
        <p class="slide-lead" data-step style="--d:2">Du willst sehen, wie unsere Projekte entstehen, oder selbst mitmachen? Melde unverbindlich dein Interesse an. Wir melden uns mit Termin und Details.</p>
        <ul class="bullets" data-step style="--d:3">
          <li>Unverbindlich anmelden</li>
          <li>Keine Vorkenntnisse nötig</li>
        </ul>
      </div>
      <div class="cta-qr" data-step style="--d:2"><img src="assets/qr/workshop.svg" alt="QR-Code zur Interessenanmeldung" /><span>Scannen &amp; Interesse anmelden</span></div>
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner cta-slide">
      <div>
        <p class="eyebrow" data-step style="--d:0">Mitglied werden</p>
        <h2 data-step style="--d:1">Nicht nur nutzen, sondern mitbestimmen.</h2>
        <p class="slide-lead" data-step style="--d:2">Dein Beitrag finanziert ehrenamtliche Projekte für ganz Zirndorf. Als ordentliches Mitglied hast du volles Stimmrecht in der Mitgliederversammlung.</p>
        <ul class="bullets" data-step style="--d:3">
          <li><span>Ordentliche Mitgliedschaft <strong>ab 24&nbsp;€ im Jahr</strong></span></li>
          <li><span>Fördermitgliedschaft <strong>ab 42&nbsp;€ im Jahr</strong>, für Vereine ab 50&nbsp;€, für Unternehmen ab 100&nbsp;€</span></li>
          <li><span>Beitrittserklärung online ausfüllen, als PDF speichern und unterschrieben an <strong>mitgliedsantrag@openzirndorf.de</strong> senden</span></li>
        </ul>
      </div>
      <div class="cta-qr" data-step style="--d:2"><img src="assets/qr/beitritt.svg" alt="QR-Code zur Beitrittserklärung" /><span>Scannen &amp; beitreten</span></div>
    </div>` },

  { ms: 13000, html: `
    <div class="slide-inner team">
      <figure data-step style="--d:1">
        <img src="assets/img/gruppenbild.jpg" alt="Der Vorstand von OpenZirndorf bei der Gründungsversammlung" />
        <figcaption>Gründungsversammlung am 6. August 2026</figcaption>
      </figure>
      <div>
        <p class="eyebrow" data-step style="--d:0">Wer dahintersteckt</p>
        <h2 data-step style="--d:1">Unser Vorstand.</h2>
        <ul class="roles" data-step style="--d:2">
          <li><span>Vorsitzender</span><strong>Fabian Hartmann</strong></li>
          <li><span>Stellv. Vorsitzender</span><strong>Andreas Bechtloff</strong></li>
          <li><span>Schatzmeisterin</span><strong>Sigrun Seifert</strong></li>
          <li><span>Schriftführer</span><strong>Christoph Müller</strong></li>
          <li><span>Beisitz</span><strong>Sarah Bauer, Jochen Felbinger, Daniel Schädlich</strong></li>
          <li><span>Kassenprüfung</span><strong>Jenny Hartmann, Daniel Schmidt</strong></li>
        </ul>
      </div>
    </div>` },

  { ms: 12000, cls: 'slide--title', html: `
    <div class="slide-inner cta-slide">
      <div>
        <p class="eyebrow" data-step style="--d:0">Lerne uns kennen</p>
        <h2 data-step style="--d:1">Sprich uns an, wir sind hier am Stand.</h2>
        <p class="slide-lead" data-step style="--d:2">Oder komm zum nächsten Stammtisch: <strong>Montag, 9. November 2026, 19:00 Uhr</strong>, Hotel Knorz, Zirndorf. Unverbindlich, alle sind willkommen.</p>
        <div class="mascots" data-step style="--d:3">
          <img src="assets/img/maskottchen/tuxi.png" alt="Tuxi" />
          <img src="assets/img/maskottchen/paul.png" alt="Paul" />
          <img src="assets/img/maskottchen/kreiselix.png" alt="Kreiselix" />
          <img src="assets/img/maskottchen/fynn.png" alt="Fynn" />
        </div>
      </div>
      <div class="cta-qr" data-step style="--d:2"><img src="assets/qr/website.svg" alt="QR-Code zu openzirndorf.de" /><span>openzirndorf.de</span></div>
    </div>` },
];

// ─────────────────────────────────────────────────────────────
// Einstellungen Messestand
// ─────────────────────────────────────────────────────────────

const params = new URLSearchParams(location.search);
const KIOSK = params.get('kiosk') !== '0';          // ?kiosk=0 schaltet die Automatik ab
const IDLE_MS = 90_000;                               // Übersicht/Mitmachen → Präsentation
const IDLE_VIEWER_MS = 240_000;                       // in einer App länger warten …
const PROMPT_S = 20;                                  // … und vorher nachfragen
const RESUME_DECK_MS = 45_000;                        // pausierte Präsentation läuft wieder an

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const host = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

// ─────────────────────────────────────────────────────────────
// Projekt-Kacheln
// ─────────────────────────────────────────────────────────────

function tile(app) {
  return `
    <button class="app-tile" type="button" data-app="${app.id}">
      <span class="app-shot"><img src="assets/shots/${app.id}.jpg" alt="" loading="lazy" /></span>
      <span class="app-info">
        <h3>${esc(app.name)}</h3>
        <span class="status${app.live ? ' status--live' : ''}">${esc(app.status)}</span>
        <p>${esc(app.desc)}</p>
        ${app.showUrl !== false ? `<span class="app-host">${esc(host(app.url))}</span>` : ''}
      </span>
    </button>`;
}

function renderApps() {
  $('#app-grid').innerHTML = APPS.map(tile).join('');
  $('#app-grid').insertAdjacentHTML('afterend', `
    <div class="outlook">
      <p class="eyebrow">Ausblick: was noch möglich wäre</p>
      <div class="outlook-row">${tile(OUTLOOK)}</div>
    </div>`);
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-app]');
    if (t) location.hash = `#app/${t.dataset.app}`;
  });
}

// ─────────────────────────────────────────────────────────────
// App-Ansicht (iframe mit Zurück-Knopf und QR-Code)
// ─────────────────────────────────────────────────────────────

const viewer = $('#viewer');
let lastView = 'start';

function openViewer(id) {
  const app = ALL_APPS.find((a) => a.id === id);
  if (!app) { location.hash = '#start'; return; }
  $('#viewer-title').textContent = app.name;
  const showUrl = app.showUrl !== false;
  $('#viewer-url').textContent = showUrl ? host(app.url) : '';
  $('#viewer-open').href = app.url;
  $('#viewer-open').hidden = !showUrl;
  $('#viewer-status').textContent = app.status;
  $('#viewer-desc').textContent = app.desc;
  const hasQr = app.qr !== false;
  $('#viewer-qr-fig').hidden = !hasQr;
  $('#viewer-qr').src = hasQr ? `assets/qr/${app.id}.svg` : '';
  $('#viewer-qr').alt = hasQr ? `QR-Code zu ${host(app.url)}` : '';
  $('#viewer-reload').hidden = !app.embed;

  const wrap = $('#viewer-frame-wrap');
  wrap.classList.toggle('is-phone', app.phone);
  if (!navigator.onLine) {
    wrap.innerHTML = noEmbed(app, 'Gerade keine Internetverbindung',
      'Die Projekte sind Webseiten und brauchen Netz. Scanne den QR-Code, um sie auf deinem Handy zu öffnen.');
  } else if (!app.embed) {
    wrap.innerHTML = noEmbed(app, app.name,
      'Diese Seite lässt sich nicht eingebettet anzeigen. Scanne den QR-Code oder öffne sie im Browser.', true);
  } else {
    wrap.innerHTML = `<iframe src="${esc(app.url)}" title="${esc(app.name)}" allow="geolocation; fullscreen; clipboard-write" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#viewer-close').focus();
}

function noEmbed(app, title, text, withButton) {
  return `
    <div class="noembed">
      ${app.qr !== false ? `<img src="assets/qr/${app.id}.svg" alt="QR-Code zu ${esc(host(app.url))}" />` : ''}
      <div>
        <h3>${esc(title)}</h3>
        <p>${esc(text)}</p>
        ${withButton ? `<a class="btn btn-primary btn-lg" href="${esc(app.url)}" target="_blank" rel="noopener">Im Browser öffnen</a>` : ''}
      </div>
    </div>`;
}

function closeViewer() {
  viewer.hidden = true;
  $('#viewer-frame-wrap').innerHTML = '';   // iframe entladen, stoppt Karten/GPS
  document.body.style.overflow = '';
}

$('#viewer-close').addEventListener('click', () => { location.hash = `#${lastView}`; });
$('#viewer-reload').addEventListener('click', () => {
  const f = $('#viewer-frame-wrap iframe');
  if (f) f.src = f.src;
});

// ─────────────────────────────────────────────────────────────
// Präsentation
// ─────────────────────────────────────────────────────────────

const deck = $('#deck');
let cur = 0;
let timer = null;
let playing = true;

function renderDeck() {
  $('#deck-slides').innerHTML = SLIDES.map((s, i) =>
    `<section class="slide ${s.cls || ''}" aria-label="Folie ${i + 1} von ${SLIDES.length}">${s.html}</section>`).join('');
  $('#deck-progress').innerHTML = SLIDES.map((_, i) =>
    `<button type="button" data-goto="${i}" aria-label="Folie ${i + 1}"><span><i></i></span></button>`).join('');
}

function show(i) {
  cur = (i + SLIDES.length) % SLIDES.length;
  document.querySelectorAll('.slide').forEach((el, k) => el.classList.toggle('is-active', k === cur));
  document.querySelectorAll('.deck-progress button').forEach((el, k) => {
    el.classList.toggle('done', k < cur);
    el.classList.remove('active');
    if (k === cur) { void el.offsetWidth; el.classList.add('active'); }  // Animation neu starten
  });
  deck.style.setProperty('--slide-ms', `${SLIDES[cur].ms}ms`);
  $('#deck-count').textContent = `${cur + 1} / ${SLIDES.length}`;
  schedule();
}

function schedule() {
  clearTimeout(timer);
  if (playing && currentView() === 'verein') timer = setTimeout(() => show(cur + 1), SLIDES[cur].ms);
}

function setPlaying(p) {
  playing = p;
  deck.classList.toggle('is-paused', !p);
  $('#deck-play').setAttribute('aria-label', p ? 'Automatisch abspielen anhalten' : 'Automatisch abspielen');
  if (p) show(cur); else { clearTimeout(timer); resetIdle(); }
}

$('#deck-prev').addEventListener('click', () => { setPlaying(false); show(cur - 1); });
$('#deck-next').addEventListener('click', () => { setPlaying(false); show(cur + 1); });
$('#deck-play').addEventListener('click', () => setPlaying(!playing));
$('#deck-progress').addEventListener('click', (e) => {
  const b = e.target.closest('[data-goto]');
  if (b) { setPlaying(false); show(+b.dataset.goto); }
});

// Wischen auf Touch-Geräten
let touchX = null;
deck.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
deck.addEventListener('touchend', (e) => {
  if (touchX == null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 60) { setPlaying(false); show(cur + (dx < 0 ? 1 : -1)); }
});

// ─────────────────────────────────────────────────────────────
// Navigation (Hash-Routing)
// ─────────────────────────────────────────────────────────────

const VIEWS = ['start', 'verein', 'mitmachen'];
const currentView = () => (location.hash.slice(1).split('/')[0] || 'start');

function route() {
  const [view, arg] = location.hash.slice(1).split('/');
  if (view === 'app') { openViewer(arg); resetIdle(); return; }
  closeViewer();

  const v = VIEWS.includes(view) ? view : 'start';
  lastView = v;
  document.querySelectorAll('.view').forEach((el) => { el.hidden = el.dataset.view !== v; });
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === v) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  document.body.classList.toggle('in-deck', v === 'verein');

  if (v === 'verein') {
    if (arg !== undefined && !Number.isNaN(+arg)) { cur = +arg; }
    setPlaying(true);
    deck.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else {
    clearTimeout(timer);
    document.querySelectorAll('.join-card').forEach((c) => c.classList.remove('is-highlight'));
    const target = v === 'mitmachen' && arg ? $(`#join-${arg}`) : null;
    if (target) {
      target.classList.add('is-highlight');
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } else {
      window.scrollTo(0, 0);
    }
  }
  resetIdle();
}

window.addEventListener('hashchange', route);

// ─────────────────────────────────────────────────────────────
// Messestand: Leerlauf → Präsentation
// ─────────────────────────────────────────────────────────────

let idleTimer = null;
let promptTimer = null;

function resetIdle() {
  clearTimeout(idleTimer);
  if (!KIOSK) return;
  const view = location.hash.startsWith('#app/') ? 'app' : currentView();
  if (view === 'app') {
    idleTimer = setTimeout(showPrompt, IDLE_VIEWER_MS);
  } else if (view === 'verein') {
    if (!playing) idleTimer = setTimeout(() => setPlaying(true), RESUME_DECK_MS);
  } else {
    idleTimer = setTimeout(() => { location.hash = '#verein/0'; }, IDLE_MS);
  }
}

function showPrompt() {
  // Klicks innerhalb des iframes sieht diese Seite nicht, deshalb erst nachfragen.
  let left = PROMPT_S;
  $('#idle-count').textContent = left;
  $('#idle-prompt').hidden = false;
  $('#idle-stay').focus();
  promptTimer = setInterval(() => {
    left -= 1;
    $('#idle-count').textContent = left;
    if (left <= 0) { hidePrompt(); location.hash = '#verein/0'; }
  }, 1000);
}

function hidePrompt() {
  clearInterval(promptTimer);
  $('#idle-prompt').hidden = true;
}

$('#idle-stay').addEventListener('click', () => { hidePrompt(); resetIdle(); });
['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((ev) =>
  document.addEventListener(ev, () => { if ($('#idle-prompt').hidden) resetIdle(); }, { passive: true }));

// ─────────────────────────────────────────────────────────────
// Tastatur, Vollbild, Netzstatus
// ─────────────────────────────────────────────────────────────

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}
$('#btn-fullscreen').addEventListener('click', toggleFullscreen);

document.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea')) return;
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  if (e.key === 'Escape' && !viewer.hidden) location.hash = `#${lastView}`;
  if (currentView() !== 'verein') return;
  if (e.key === 'ArrowRight' || e.key === 'PageDown') { setPlaying(false); show(cur + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { setPlaying(false); show(cur - 1); }
  if (e.key === ' ') { e.preventDefault(); setPlaying(!playing); }
});

function updateNet() { $('#net-status').hidden = navigator.onLine; }
window.addEventListener('online', updateNet);
window.addEventListener('offline', updateNet);

// ─────────────────────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────────────────────

renderApps();
renderDeck();
updateNet();
route();
