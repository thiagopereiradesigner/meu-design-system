/**
 * Select custom do DS (mesmo comportamento em select-demo, drawer, etc.)
 * Requer IDs: {selectId}-dropdown, {selectId}-text, {selectId}-chevron (opcional)
 */
(function (global) {
  'use strict';

  function closeAllSelectDropdowns() {
    document.querySelectorAll('.select-dropdown').forEach(function (d) {
      d.classList.remove('open');
    });
    document.querySelectorAll('.chevron').forEach(function (c) {
      c.classList.remove('open');
    });
  }

  function toggleDropdown(selectId) {
    var dropdown = document.getElementById(selectId + '-dropdown');
    if (!dropdown) return;
    var chevron = document.getElementById(selectId + '-chevron');
    var isOpen = dropdown.classList.contains('open');

    closeAllSelectDropdowns();

    if (!isOpen && dropdown) {
      dropdown.classList.add('open');
      if (chevron) chevron.classList.add('open');
    }
  }

  function selectOption(selectId, value, element) {
    if (element.classList.contains('disabled')) return;

    var text = document.getElementById(selectId + '-text');
    if (text) {
      text.textContent = value;
      text.classList.add('has-value');
    }

    var container = element.parentElement;
    if (container) {
      container.querySelectorAll('.select-option').forEach(function (opt) {
        opt.classList.remove('selected');
      });
    }
    element.classList.add('selected');

    toggleDropdown(selectId);
  }

  function filterOptions(selectId, searchTerm) {
    var optionsContainer = document.getElementById(selectId + '-options');
    if (!optionsContainer) return;
    var options = optionsContainer.querySelectorAll('.select-option');
    var q = (searchTerm || '').toLowerCase();
    options.forEach(function (option) {
      var label = (option.getAttribute('data-label') || '').toLowerCase();
      option.style.display = label.includes(q) ? 'flex' : 'none';
    });
  }

  function enhanceSelectTriggers() {
    document.querySelectorAll('.select-container > .field-input-container').forEach(function (el) {
      if (el.classList.contains('disabled')) return;
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
      if (!el.getAttribute('role')) el.setAttribute('role', 'button');
    });
  }

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.select-container')) {
      closeAllSelectDropdowns();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var trigger = e.target.closest('.select-container > .field-input-container');
    if (!trigger || trigger.classList.contains('disabled')) return;
    var sc = trigger.closest('.select-container');
    if (!sc) return;
    var drop = sc.querySelector('.select-dropdown[id$="-dropdown"]');
    if (!drop || !drop.id) return;
    var prefix = drop.id.replace(/-dropdown$/, '');
    if (!prefix) return;
    e.preventDefault();
    toggleDropdown(prefix);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceSelectTriggers);
  } else {
    enhanceSelectTriggers();
  }

  global.toggleDropdown = toggleDropdown;
  global.selectOption = selectOption;
  global.filterOptions = filterOptions;
})(window);
