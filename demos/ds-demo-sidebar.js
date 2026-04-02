/**
 * Navegação lateral entre demos do DS + busca fixa no topo do menu.
 * Injeta layout após `nav.ds-topbar` e move o conteúdo da página para `main`.
 * Não incluir em `index.html`. Opcional: `data-ds-demo-sidebar="skip"` no <body>.
 */
(function () {
  try {
    var savedTheme = localStorage.getItem('ds-theme');
    var theme = savedTheme || 'light';
    document.documentElement.dataset.dsTheme = theme;
  } catch (e) {}

  if (document.body.dataset.dsDemoSidebar === 'skip') return;

  var nav = document.querySelector('nav.ds-topbar');
  if (!nav || !nav.parentNode) return;

  document.body.classList.add('ds-demo-has-sidebar');

  var layout = document.createElement('div');
  layout.className = 'ds-demo-layout';

  var backdrop = document.createElement('div');
  backdrop.className = 'ds-demo-sidebar-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');

  var aside = document.createElement('aside');
  aside.className = 'ds-demo-sidebar';
  aside.id = 'ds-demo-sidebar-panel';
  aside.setAttribute('aria-label', 'Navegação do design system');

  var inner = document.createElement('div');
  inner.className = 'ds-demo-sidebar__inner';

  var mobileHeader = document.createElement('div');
  mobileHeader.className = 'ds-demo-sidebar__mobile-header';

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'ds-demo-sidebar__close';
  closeBtn.setAttribute('aria-label', 'Fechar menu');
  closeBtn.innerHTML =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  mobileHeader.appendChild(closeBtn);

  var searchRegion = document.createElement('div');
  searchRegion.className = 'ds-demo-sidebar__search';
  searchRegion.setAttribute('role', 'search');

  var searchWrap = document.createElement('div');
  searchWrap.className = 'ds-search-wrapper';

  var searchIconHolder = document.createElement('div');
  searchIconHolder.innerHTML =
    '<svg class="ds-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var searchIcon = searchIconHolder.firstElementChild;

  var searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'ds-search-input';
  searchInput.id = 'ds-nav-search';
  searchInput.setAttribute('placeholder', 'Buscar componentes...');
  searchInput.setAttribute('autocomplete', 'off');
  searchInput.setAttribute('aria-label', 'Buscar componentes');

  var searchDd = document.createElement('div');
  searchDd.className = 'ds-search-dropdown';
  searchDd.id = 'ds-nav-dropdown';

  searchWrap.appendChild(searchIcon);
  searchWrap.appendChild(searchInput);
  searchWrap.appendChild(searchDd);
  searchRegion.appendChild(searchWrap);

  var scroll = document.createElement('div');
  scroll.className = 'ds-demo-sidebar__scroll';

  var main = document.createElement('div');
  main.className = 'ds-demo-main';

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

  if (mobileMenu && mobileMenu.parentNode) {
    mobileMenu.parentNode.removeChild(mobileMenu);
  }

  var firstToMove = contentRoot || nav.nextElementSibling;
  if (firstToMove) nav.parentNode.insertBefore(layout, firstToMove);
  else nav.parentNode.appendChild(layout);

  layout.appendChild(backdrop);
  layout.appendChild(aside);
  layout.appendChild(main);

  inner.appendChild(mobileHeader);
  inner.appendChild(searchRegion);
  inner.appendChild(scroll);
  aside.appendChild(inner);

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
  scroll.appendChild(navSide);

  window.dispatchEvent(new CustomEvent('ds-demo-sidebar-ready', { bubbles: true }));
})();
