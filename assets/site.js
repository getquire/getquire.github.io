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

// Forms are static — no backend. Confirm inline instead of navigating away.
document.querySelectorAll('form[data-demo]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = form.querySelector('[data-note]');
    if (note) note.textContent = 'Thanks — this is a demo site, so nothing was sent.';
  });
});
