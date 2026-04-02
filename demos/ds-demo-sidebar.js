/**
 * Navegação lateral entre demos do DS (sem ícones).
 * Injeta layout após `nav.ds-topbar` e move o conteúdo da página para `main`.
 * Não incluir em `index.html`. Opcional: `data-ds-demo-sidebar="skip"` no <body>.
 */
(function () {
  // Tema global para persistir entre páginas (home/cobrindo demos).
  // `light` é default (tokens em :root); `dark` vem do escopo [data-ds-theme="dark"].
  try {
    var savedTheme = localStorage.getItem('ds-theme');
    var theme = savedTheme || 'light';
    document.documentElement.dataset.dsTheme = theme;
  } catch (e) {
    // Se localStorage estiver bloqueado, fica no default (:root).
  }

  if (document.body.dataset.dsDemoSidebar === 'skip') return;

  var nav = document.querySelector('nav.ds-topbar');
  if (!nav || !nav.parentNode) return;

  document.body.classList.add('ds-demo-has-sidebar');

  var layout = document.createElement('div');
  layout.className = 'ds-demo-layout';

  var aside = document.createElement('aside');
  aside.className = 'ds-demo-sidebar';
  aside.setAttribute('aria-label', 'Outros componentes do design system');

  var main = document.createElement('div');
  main.className = 'ds-demo-main';

  // Em vez de mover "tudo até algum <script>" (muito sensível ao HTML real),
  // movemos apenas as estruturas que representam a página:
  // - `.ds-mobile-menu` (se existir)
  // - o primeiro "content root": `.ds-container` ou `.container`
  // Isso torna o layout determinístico e evita quebra em várias páginas.
  var mobileMenu = null;
  var contentRoot = null;

  var el = nav.nextElementSibling;
  while (el) {
    if (!mobileMenu && el.classList && el.classList.contains('ds-mobile-menu')) {
      mobileMenu = el;
    }
    if (!contentRoot && el.classList && (el.classList.contains('ds-container') || el.classList.contains('container'))) {
      contentRoot = el;
      break;
    }
    el = el.nextElementSibling;
  }

  // fallback: se não acharmos um content root, não quebra; apenas injeta.
  var firstToMove = mobileMenu || contentRoot || nav.nextElementSibling;
  if (firstToMove) nav.parentNode.insertBefore(layout, firstToMove);
  else nav.parentNode.appendChild(layout);
  layout.appendChild(aside);
  layout.appendChild(main);

  if (mobileMenu) main.appendChild(mobileMenu);
  if (contentRoot) main.appendChild(contentRoot);

  /** @type {{ file: string, label: string, featured?: boolean }[]} */
  var pages = [
    { file: 'design-tokens.html', label: 'Design Tokens', featured: true },
    { file: 'accordion-demo.html', label: 'Accordion' },
    { file: 'alert-demo.html', label: 'Alert' },
    { file: 'badge-demo.html', label: 'Badge' },
    { file: 'breadcrumb-demo.html', label: 'Breadcrumb' },
    { file: 'button-demo.html', label: 'Button' },
    { file: 'card-demo.html', label: 'Card' },
    { file: 'checkbox-demo.html', label: 'Checkbox' },
    { file: 'datepicker-demo.html', label: 'Date Picker' },
    { file: 'divider-demo.html', label: 'Divider' },
    { file: 'drawer-demo.html', label: 'Drawer' },
    { file: 'icons-demo.html', label: 'Iconografia' },
    { file: 'input-demo.html', label: 'Input' },
    { file: 'select-menu-list-demo.html', label: 'Lista do select (menu)' },
    { file: 'menu-demo.html', label: 'Menu' },
    { file: 'modal-demo.html', label: 'Modal' },
    { file: 'radio-demo.html', label: 'Radio' },
    { file: 'select-demo.html', label: 'Select' },
    { file: 'skeleton-demo.html', label: 'Skeleton' },
    { file: 'spinner-demo.html', label: 'Spinner' },
    { file: 'stepper-demo.html', label: 'Stepper' },
    { file: 'switch-demo.html', label: 'Switch' },
    { file: 'tab-demo.html', label: 'Tab' },
    { file: 'table-virtual-scroll-demo.html', label: 'Tabela — scroll virtual' },
    { file: 'textarea-demo.html', label: 'Textarea' },
    { file: 'toast-demo-updated.html', label: 'Toast' },
    { file: 'tooltip-demo.html', label: 'Tooltip' },
  ];

  var featured = pages.filter(function (p) {
    return p.featured;
  });
  var rest = pages
    .filter(function (p) {
      return !p.featured;
    })
    .sort(function (a, b) {
      return a.label.localeCompare(b.label, 'pt-BR', { sensitivity: 'base' });
    });
  var ordered = featured.concat(rest);

  var path = window.location.pathname || '';
  var currentFile = path.split('/').pop() || '';

  var navSide = document.createElement('nav');
  navSide.className = 'ds-demo-sidebar__nav';

  var ul = document.createElement('ul');
  ul.className = 'ds-demo-sidebar__list';

  ordered.forEach(function (p) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = p.file;
    a.textContent = p.label;
    a.className = 'ds-demo-sidebar__link';
    if (p.featured) a.classList.add('ds-demo-sidebar__link--featured');
    if (currentFile === p.file) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  navSide.appendChild(ul);
  aside.appendChild(navSide);
})();
