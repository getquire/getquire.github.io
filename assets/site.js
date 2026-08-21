// Quire — three small behaviors: mobile nav, FAQ accordion, scroll reveal.
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.nav-toggle');
  if (toggle) {
    const nav = toggle.closest('.nav');
    const open = nav.dataset.open !== 'true';
    nav.dataset.open = open;
    toggle.setAttribute('aria-expanded', open);
    return;
  }

  const copy = e.target.closest('[data-copy]');
  if (copy) {
    navigator.clipboard.writeText(copy.dataset.copy).then(() => {
      const label = copy.textContent;
      copy.dataset.copied = 'true';
      copy.textContent = 'Copied';
      setTimeout(() => {
        copy.dataset.copied = 'false';
        copy.textContent = label;
      }, 1600);
    });
    return;
  }

  const q = e.target.closest('.faq-q');
  if (q) {
    const panel = q.nextElementSibling;
    const open = panel.dataset.open !== 'true';
    panel.dataset.open = open;
    q.setAttribute('aria-expanded', open);
  }
});

const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10%' });
  reveals.forEach((el) => io.observe(el));
}

// Stat counters. Values are written in the markup in their final form
// ("9.3h", "<900ms", "4,000", "−64%"), so parse the number out, animate to it,
// and put the prefix and suffix back. Anything that doesn't match is left alone.
const NUMERIC = /^(\D*?)([\d,]+(?:\.\d+)?)(\D*)$/;

function formatCount(value, decimals, grouped) {
  return grouped
    ? value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);
}

function animateCount(el) {
  const parts = NUMERIC.exec(el.textContent.trim());
  if (!parts) return;

  const [, prefix, raw, suffix] = parts;
  const target = parseFloat(raw.replace(/,/g, ''));
  if (!isFinite(target)) return;

  const decimals = (raw.split('.')[1] || '').length;
  const grouped = raw.includes(',');
  const start = performance.now();
  const DURATION = 1100;

  function frame(now) {
    const t = Math.min((now - start) / DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + formatCount(target * eased, decimals, grouped) + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const stillMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const stats = document.querySelectorAll('.stat b');
if (stats.length && !stillMotion) {
  const counters = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counters.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15%' });
  stats.forEach((el) => counters.observe(el));
}

// Runs in local development only — the counter formatting is the one bit here
// that can silently produce nonsense.
if (location.protocol === 'file:' || location.hostname === 'localhost') {
  console.assert(formatCount(4000, 0, true) === '4,000', 'grouped integer');
  console.assert(formatCount(9.3, 1, false) === '9.3', 'one decimal');
  console.assert(formatCount(900, 0, false) === '900', 'plain integer');
  console.assert(NUMERIC.exec('<900ms')[1] === '<', 'prefix captured');
  console.assert(NUMERIC.exec('<900ms')[3] === 'ms', 'suffix captured');
  console.assert(NUMERIC.exec('1.4M')[2] === '1.4', 'decimal captured');
  console.assert(NUMERIC.exec('unlimited') === null, 'non-numeric ignored');
}

// Forms are static — no backend. Confirm inline instead of navigating away.
document.querySelectorAll('form[data-demo]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('[data-note]');
    if (note) note.textContent = 'Thanks — this is a demo site, so nothing was sent.';
  });
});

// Terminal cast. The transcript is already in the HTML — this hides it and
// replays it line by line, typing the command lines. Under reduced motion the
// player never runs and the controls are removed, leaving a plain transcript.
const castRoot = document.querySelector('[data-cast]');

if (castRoot && stillMotion) {
  const control = castRoot.querySelector('[data-cast-toggle]');
  const rail = castRoot.querySelector('.cast-rail');
  if (control) control.remove();
  if (rail) rail.remove();
}

if (castRoot && !stillMotion) {
  const lines = Array.from(castRoot.querySelectorAll('.cast-line'));
  const bar = castRoot.querySelector('[data-cast-progress]');
  const control = castRoot.querySelector('[data-cast-toggle]');
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let run = 0;

  function arm() {
    castRoot.classList.add('cast-armed');
    lines.forEach((line) => {
      line.classList.remove('on', 'typing');
      const cmd = line.querySelector('b');
      if (cmd) {
        if (cmd.dataset.text === undefined) cmd.dataset.text = cmd.textContent;
        cmd.textContent = '';
      }
    });
    if (bar) bar.style.width = '0%';
  }

  async function play() {
    const token = ++run;
    arm();
    for (let i = 0; i < lines.length; i++) {
      if (token !== run) return;
      const line = lines[i];
      line.classList.add('on');

      const cmd = line.querySelector('b');
      if (cmd) {
        line.classList.add('typing');
        for (const ch of cmd.dataset.text) {
          if (token !== run) return;
          cmd.textContent += ch;
          await wait(26);
        }
        line.classList.remove('typing');
        await wait(460);
      } else {
        await wait(line.textContent.trim() ? 95 : 55);
      }

      if (bar) bar.style.width = Math.round(((i + 1) / lines.length) * 100) + '%';
    }
  }

  if (control) control.addEventListener('click', play);

  const start = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        start.disconnect();
        play();
      }
    });
  }, { threshold: 0.3 });
  start.observe(castRoot);
}
