/* Shared behaviour: accessible mobile navigation + whole-card clicking. */
(() => {
  const header = document.getElementById('header');
  const button = document.getElementById('menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!header || !button || !menu) return;

  function setMenu(open) {
    header.dataset.open = String(open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'بستن فهرست' : 'باز کردن فهرست');
    menu.inert = !open;
  }

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    setMenu(header.dataset.open !== 'true');
  });
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.dataset.open === 'true') {
      setMenu(false);
      button.focus();
    }
  });
  setMenu(false);
})();

/* Whole-card clicking for the ecosystem cards.
   The real anchor stays the semantic, keyboard and screen-reader target; this
   only forwards plain mouse clicks so the artwork never needs an overlay. */
(() => {
  document.querySelectorAll('.card').forEach((card) => {
    const link = card.querySelector('a.more');
    if (!link) return;
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      // Never hijack a text selection.
      const selection = window.getSelection();
      if (selection && String(selection).length) return;
      link.click();
    });
  });
})();
