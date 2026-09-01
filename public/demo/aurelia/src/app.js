const sections = [
  {
    id: 'navigation', label: 'Navigazione', still: 'assets/posters/01-navigation.webp',
    stillMobile: 'assets/stills/01-navigation-mobile.webp', clip: false, clipMobile: false,
    accent: '#d77628', scroll: 2.1,
    eyebrow: '01 — Navigazione', title: 'Disegnata per il mare aperto.',
    body: 'Scorri lungo ogni linea. Scegli materiali, atmosfera e carattere.',
  },
  {
    id: 'hull', label: 'Carena', still: 'assets/posters/02-hull.webp',
    stillMobile: 'assets/stills/02-hull-mobile.webp', clip: false, clipMobile: false,
    accent: '#e18a45', scroll: 1.85,
    eyebrow: '02 — Carena', title: 'Una linea che non rallenta.',
    body: 'Prua inversa, baricentro basso e una superficie continua scolpita dall’acqua.',
  },
  {
    id: 'stern', label: 'Poppa', still: 'assets/posters/03-stern.webp',
    stillMobile: 'assets/stills/03-stern-mobile.webp', clip: false, clipMobile: false,
    accent: '#cb7634', scroll: 1.35,
    eyebrow: '03 — Poppa', title: 'Il mare, a livello zero.',
    body: 'La piattaforma si apre sull’acqua e trasforma la sosta in uno spazio da vivere.',
  },
  {
    id: 'helm', label: 'Plancia', still: 'assets/posters/04-helm-v7.webp',
    stillMobile: 'assets/stills/04-helm-v7-mobile.webp', clip: false, clipMobile: false,
    accent: '#b88b62', scroll: 1.7,
    eyebrow: '04 — Plancia', title: 'Tutto sotto controllo.',
    body: 'La plancia rimane ferma mentre la camera si allinea con l’accesso centrale.',
  },
  {
    id: 'lowerdeck', label: 'Sottocoperta', still: 'assets/posters/05-lowerdeck-v7.webp',
    stillMobile: 'assets/stills/05-lowerdeck-v7-mobile.webp', clip: false, clipMobile: false,
    accent: '#8f9799', scroll: 1.65,
    eyebrow: '05 — Sottocoperta', title: 'Ogni centimetro conta.',
    body: 'L’accesso centrale apre subito la cabina sull’asse, senza corridoi inventati.',
  },
  {
    id: 'suite', label: 'Armatoriale', still: 'assets/posters/06-suite-v7.webp',
    stillMobile: 'assets/stills/06-suite-v7-mobile.webp', clip: false, clipMobile: false,
    accent: '#c79a70', scroll: 2.6,
    eyebrow: '06 — Cabina armatoriale', title: 'Al centro, davvero.',
    body: 'La cuccetta resta sull’asse; contenitori a babordo e bagno a dritta seguono il layout reale.',
    cta: {
      primary: { label: 'Configura Aurelia', href: '#configurator' },
      secondary: { label: 'Parlane con Linfa', href: 'mailto:giorgio@linfa.tech?subject=Concept%20AURELIA%2044' },
    },
  },
];

window.mountScrollWorld(document.getElementById('world'), {
  brand: { name: 'AURELIA', href: '#top' },
  cta: { label: 'CONFIGURA', href: '#configurator' },
  hint: 'SCORRI PER ESPLORARE',
  nav: false,
  atmosphere: false,
  crossfade: 0.14,
  diveScroll: 1.35,
  masterClip: 'assets/video/aurelia-master-v7.mp4',
  // Il volante resta nella posizione del filmato esterno; la camera lo lascia
  // fuori campo e attraversa l'accesso centrale verso la cabina armatoriale.
  masterSegments: [5, 4.958334, 1.458334, 2.875, 2.333333, 6.916341],
  sections,
  connectors: [],
});

const topbar = document.querySelector('.sw-topbar');
if (topbar) {
  const credit = document.createElement('a');
  credit.className = 'linfa-credit';
  credit.href = 'mailto:giorgio@linfa.tech?subject=Concept%20AURELIA%2044';
  credit.setAttribute('aria-label', 'Concept realizzato da Linfa Tech');
  credit.innerHTML = '<span>Concept by</span><strong>Linfa Tech</strong>';
  topbar.appendChild(credit);
}

const categories = [
  {
    id: 'hull', label: 'Scafo', section: 0,
    options: [
      { label: 'Pearl White', value: '#f1f0eb' },
      { label: 'Stone Grey', value: '#777773' },
      { label: 'Deep Carbon', value: '#17191a' },
    ],
  },
  {
    id: 'teak', label: 'Teak', section: 2,
    options: [
      { label: 'Natural', value: '#b8895c' },
      { label: 'Silver', value: '#8b8173' },
      { label: 'Smoked', value: '#624737' },
    ],
  },
  {
    id: 'fabric', label: 'Tessuti', section: 3,
    options: [
      { label: 'Sea Pearl', value: '#d8d4cb' },
      { label: 'Cognac', value: '#a66945' },
      { label: 'Graphite', value: '#45484a' },
    ],
  },
  {
    id: 'lights', label: 'Luci', section: 4,
    options: [
      { label: 'Daylight', value: '#f3ead8' },
      { label: 'Sunset', value: '#d9955b' },
      { label: 'Evening', value: '#6b7786' },
    ],
  },
];

const defaults = Object.fromEntries(categories.map((category) => [category.id, category.options[0].label]));
const saved = JSON.parse(localStorage.getItem('aurelia-44') || 'null');
const selections = { ...defaults, ...(saved || {}) };
let activeCategory = categories[0].id;

const drawer = document.querySelector('.configurator');
const handle = document.querySelector('.configurator__handle');
const close = document.querySelector('.configurator__close');
const current = document.querySelector('.configurator__current');
const tabs = document.querySelector('.material-tabs');
const options = document.querySelector('.material-options');
const summary = document.querySelector('.configuration-summary');
const summaryList = document.querySelector('.summary-list');
const summaryAction = document.querySelector('.summary-action');
const summaryStatus = document.querySelector('.summary-status');

function setDrawer(open) {
  drawer.setAttribute('aria-expanded', String(open));
  handle.setAttribute('aria-expanded', String(open));
}

function renderTabs() {
  tabs.innerHTML = categories.map((category) => `
    <button type="button" data-category="${category.id}" class="${category.id === activeCategory ? 'is-active' : ''}">
      ${category.label}
    </button>`).join('') + '<button type="button" data-category="summary" class="summary-tab">Riepilogo</button>';
}

function renderCategory() {
  const category = categories.find((item) => item.id === activeCategory);
  summary.hidden = true;
  options.hidden = false;
  options.innerHTML = `
    <div class="material-options__title"><span>${category.label}</span><strong>${selections[category.id]}</strong></div>
    <div class="swatches">
      ${category.options.map((option) => `
        <button type="button" class="swatch ${option.label === selections[category.id] ? 'is-selected' : ''}"
          data-value="${option.label}" aria-label="${category.label}: ${option.label}" aria-pressed="${option.label === selections[category.id]}">
          <i style="--swatch:${option.value}"></i><span>${option.label}</span>
        </button>`).join('')}
    </div>`;
  current.textContent = `${category.label} · ${selections[category.id]}`;
}

function renderSummary() {
  options.hidden = true;
  summary.hidden = false;
  summaryList.innerHTML = categories.map((category) => `
    <div><span>${category.label}</span><strong>${selections[category.id]}</strong></div>`).join('');
  tabs.querySelectorAll('button').forEach((button) => button.classList.toggle('is-active', button.dataset.category === 'summary'));
  current.textContent = 'Configurazione completa';
}

function selectCategory(id) {
  if (id === 'summary') {
    renderTabs();
    renderSummary();
    return;
  }
  activeCategory = id;
  renderTabs();
  renderCategory();
}

tabs.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (button) selectCategory(button.dataset.category);
});

options.addEventListener('click', (event) => {
  const button = event.target.closest('.swatch');
  if (!button) return;
  selections[activeCategory] = button.dataset.value;
  localStorage.setItem('aurelia-44', JSON.stringify(selections));
  renderCategory();
});

handle.addEventListener('click', () => setDrawer(drawer.getAttribute('aria-expanded') !== 'true'));
close.addEventListener('click', () => setDrawer(false));

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('a[href="#configurator"]');
  if (trigger) {
    event.preventDefault();
    setDrawer(true);
  }
  const restart = event.target.closest('a[href="#top"]');
  if (restart) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

summaryAction.addEventListener('click', () => {
  localStorage.setItem('aurelia-44', JSON.stringify(selections));
  const configuration = categories
    .map((category) => `${category.label}: ${selections[category.id]}`)
    .join('\n');
  const subject = encodeURIComponent('Concept AURELIA 44 — richiesta demo');
  const body = encodeURIComponent(`Buongiorno Giorgio,\n\nvorrei approfondire il concept AURELIA 44.\n\nConfigurazione esplorata:\n${configuration}`);
  summaryStatus.textContent = 'Apro la tua email con la configurazione.';
  window.location.href = `mailto:giorgio@linfa.tech?subject=${subject}&body=${body}`;
});

window.addEventListener('scrollworld:sectionchange', (event) => {
  const sectionIndex = event.detail.index;
  const nearest = [...categories].reverse().find((category) => sectionIndex >= category.section);
  if (sectionIndex === sections.length - 1) {
    renderTabs();
    renderSummary();
  } else if (nearest && (nearest.id !== activeCategory || !summary.hidden)) {
    // Returning from the finale must also close the summary when the nearest
    // category is already active (for example after restoring a deep scroll).
    selectCategory(nearest.id);
  }
});

renderTabs();
renderCategory();
