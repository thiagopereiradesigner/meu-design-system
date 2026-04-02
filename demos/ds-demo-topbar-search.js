(function () {
  /**
   * Busca dos demos: input injetado em `ds-demo-sidebar.js` (menu lateral), não no header.
   * `ds-demo-sidebar.js` deve carregar antes deste ficheiro (defer, ordem no HTML).
   */

  var nc = [
    { name: 'Design Tokens', file: 'design-tokens.html', cat: 'Fundação' },
    { name: 'Accordion', file: 'accordion-demo.html', cat: 'Navegação' },
    { name: 'Alert', file: 'alert-demo.html', cat: 'Feedback' },
    { name: 'Badge', file: 'badge-demo.html', cat: 'Fundação' },
    { name: 'Breadcrumb', file: 'breadcrumb-demo.html', cat: 'Navegação' },
    { name: 'Button', file: 'button-demo.html', cat: 'Formulário' },
    { name: 'Card', file: 'card-demo.html', cat: 'Fundação' },
    { name: 'Checkbox', file: 'checkbox-demo.html', cat: 'Formulário' },
    { name: 'Date Picker', file: 'datepicker-demo.html', cat: 'Formulário' },
    { name: 'Divider', file: 'divider-demo.html', cat: 'Fundação' },
    { name: 'Drawer', file: 'drawer-demo.html', cat: 'Navegação' },
    { name: 'Iconografia', file: 'icons-demo.html', cat: 'Fundação' },
    { name: 'Input', file: 'input-demo.html', cat: 'Formulário' },
    { name: 'Lista do select (menu)', file: 'select-menu-list-demo.html', cat: 'Formulário' },
    { name: 'Menu', file: 'menu-demo.html', cat: 'Navegação' },
    { name: 'Modal', file: 'modal-demo.html', cat: 'Feedback' },
    { name: 'Radio', file: 'radio-demo.html', cat: 'Formulário' },
    { name: 'Select', file: 'select-demo.html', cat: 'Formulário' },
    { name: 'Skeleton', file: 'skeleton-demo.html', cat: 'Feedback' },
    { name: 'Spinner', file: 'spinner-demo.html', cat: 'Feedback' },
    { name: 'Stepper', file: 'stepper-demo.html', cat: 'Navegação' },
    { name: 'Switch', file: 'switch-demo.html', cat: 'Formulário' },
    { name: 'Tab', file: 'tab-demo.html', cat: 'Navegação' },
    { name: 'Tabela — scroll virtual', file: 'table-virtual-scroll-demo.html', cat: 'Dados' },
    { name: 'Textarea', file: 'textarea-demo.html', cat: 'Formulário' },
    { name: 'Toast', file: 'toast-demo-updated.html', cat: 'Feedback' },
    { name: 'Tooltip', file: 'tooltip-demo.html', cat: 'Feedback' },
  ];

  function setupSearch(inputId, dropdownId) {
    var si = document.getElementById(inputId);
    var dd = document.getElementById(dropdownId);
    if (!si || !dd) return;

    function render(term) {
      var q = String(term || '').trim().toLowerCase();
      var r = nc.filter(function (c) {
        return c.name.toLowerCase().includes(q);
      });

      if (!q || !r.length) {
        dd.classList.remove('open');
        return;
      }

      dd.innerHTML = r
        .map(function (c) {
          return (
            '<a href="' +
            c.file +
            '" class="ds-search-item">' +
            '<span>' +
            c.name +
            '</span>' +
            '<span class="ds-search-item-tag">' +
            c.cat +
            '</span>' +
            '</a>'
          );
        })
        .join('');

      dd.classList.add('open');
    }

    si.addEventListener('input', function (e) {
      render(e.target.value);
    });

    si.addEventListener('focus', function (e) {
      if (e.target.value) render(e.target.value);
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-search-wrapper')) dd.classList.remove('open');
    });
  }

  function isMobileNav() {
    return typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 743px)').matches;
  }

  function setSidebarOpen(open) {
    if (open) document.body.classList.add('ds-demo-sidebar--open');
    else document.body.classList.remove('ds-demo-sidebar--open');

    var hb = document.getElementById('ds-hamburger');
    if (hb) {
      hb.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  }

  function initMobileSidebarNav() {
    var hb = document.getElementById('ds-hamburger');
    var backdrop = document.querySelector('.ds-demo-sidebar-backdrop');
    var closeBtn = document.querySelector('.ds-demo-sidebar__close');

    if (!hb) return;

    hb.setAttribute('aria-expanded', 'false');
    hb.setAttribute('aria-controls', 'ds-demo-sidebar-panel');

    if (hb._dsBound) return;
    hb._dsBound = true;

    hb.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!document.body.classList.contains('ds-demo-has-sidebar')) return;
      if (!isMobileNav()) return;
      var next = !document.body.classList.contains('ds-demo-sidebar--open');
      setSidebarOpen(next);
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setSidebarOpen(false);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setSidebarOpen(false);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('ds-demo-sidebar--open')) {
        setSidebarOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (!isMobileNav()) setSidebarOpen(false);
    });

    var aside = document.querySelector('.ds-demo-sidebar');
    if (aside) {
      aside.addEventListener('click', function (e) {
        if (e.target.closest('.ds-demo-sidebar__link') && isMobileNav()) setSidebarOpen(false);
      });
    }
  }

  function boot() {
    setupSearch('ds-nav-search', 'ds-nav-dropdown');
    initMobileSidebarNav();

    var appTitle = 'TP.IA - Design System';

    function syncDemoTitles() {
      var topTitle = document.querySelector('nav.ds-topbar .ds-topbar-title') || document.querySelector('.ds-topbar .ds-topbar-title');
      if (topTitle) {
        topTitle.textContent = appTitle;
        if (topTitle.tagName === 'A') {
          topTitle.setAttribute('href', 'index.html');
          topTitle.setAttribute('aria-label', 'Ir ao portal do design system');
        }
      }

      var currentFile = (window.location.pathname || '').split('/').pop() || '';
      var cur = nc.find(function (c) {
        return c.file === currentFile;
      });
      if (!cur) return;

      var titleEl =
        document.querySelector('.ds-container > h1') ||
        document.querySelector('.ds-container > h2') ||
        document.querySelector('.container .header h1') ||
        document.querySelector('.ds-demo-main h1') ||
        document.querySelector('.ds-demo-main h2') ||
        document.querySelector('h1') ||
        document.querySelector('h2');
      if (titleEl) titleEl.textContent = cur.name;
    }

    syncDemoTitles();
    try {
      window.addEventListener('load', syncDemoTitles);
    } catch (e) {}
  }

  if (document.getElementById('ds-nav-search')) {
    boot();
  } else {
    window.addEventListener('ds-demo-sidebar-ready', boot, { once: true });
  }
})();
