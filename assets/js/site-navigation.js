/* Accessible mobile navigation shared by the internal pages. */
(() => {
  const header = document.getElementById('header');
  const button = document.getElementById('menu-button');
  const menu = document.getElementById('mobile-menu');

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
