(function () {
  /**
   * Busca do header (topbar) das demos internas.
   * Mantém IDs fixos para facilitar “montagem” uniforme em todas as páginas.
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

    // Fecha dropdown ao clicar fora.
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-search-wrapper')) dd.classList.remove('open');
    });
  }

  setupSearch('ds-nav-search', 'ds-nav-dropdown');
  setupSearch('ds-nav-search-mobile', 'ds-nav-dropdown-mobile');

  // Títulos consistentes entre demos:
  // - Topbar sempre: "TP.IA - Design System"
  // - H1 sempre: nome do componente da página (derivado do arquivo atual)
  function syncDemoTitles() {
    var currentFile = (window.location.pathname || '').split('/').pop() || '';
    var cur = nc.find(function (c) {
      return c.file === currentFile;
    });
    if (!cur) return;

    var appTitle = 'TP.IA - Design System';

    // Topbar: força o título fixo de aplicativo.
    var topTitle = document.querySelector('nav.ds-topbar .ds-topbar-title') || document.querySelector('.ds-topbar .ds-topbar-title');
    if (topTitle) topTitle.textContent = appTitle;

    // Conteúdo: força o título principal (h1 ou h2) para o nome do componente.
    // Alguns demos usam apenas h2 (ex.: stepper).
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

  // Executa imediatamente e tenta também de novo após a injeção do sidebar (defer).
  syncDemoTitles();
  try {
    window.addEventListener('load', syncDemoTitles);
  } catch (e) {}

  // Toggle do mobile menu.
  var hb = document.getElementById('ds-hamburger');
  var mm = document.getElementById('ds-mobile-menu');
  if (hb && mm) {
    hb.addEventListener('click', function () {
      mm.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.ds-mobile-menu') && !e.target.closest('.ds-hamburger')) {
        mm.classList.remove('open');
      }
    });
  }
})();

