// Admin Dashboard Page - Vanilla JS CMS
// Ported from AdminDashboard.tsx

import { initContent, getContent, updateContent, resetContent } from '../content.js';
import { isAuthenticated, logout, onAuthChange } from '../auth.js';
import { icons } from '../icons.js';

// ── Module-level state ──────────────────────────────────────────────
let formData = null;   // Deep clone of content for editing
let activeTab = 'general';
let saveStatus = 'idle'; // idle | saving | saved | error

// ── Helpers ─────────────────────────────────────────────────────────
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Tab title mapping
function getTabTitle(tab) {
  const map = {
    general: 'General Info',
    hero: 'Hero Section',
    footer: 'Footer',
    features: 'Features',
    industries: 'Industries',
    about: 'About Section',
    stats: 'Stats',
  };
  if (map[tab]) return map[tab];
  if (tab.startsWith('product-')) {
    const id = tab.replace('product-', '');
    const prod = (formData.products || []).find(p => p.id === id);
    return prod ? prod.title : 'Product';
  }
  return tab;
}

// ── Preset link options for footer link editor ──────────────────────
function getPresetOptions() {
  const opts = [
    { label: 'SECTION: Home Page (Top)', value: 'index.html' },
    { label: 'SECTION: About Section', value: 'index.html#about' },
    { label: 'SECTION: Contact Section', value: 'index.html#contact' },
    { label: 'SECTION: Industries Section', value: 'index.html#industries' },
  ];
  (formData.products || []).forEach(p => {
    opts.push({ label: `PAGE: ${p.title}`, value: `product.html?id=${p.id}` });
  });
  opts.push({ label: 'PAGE: Admin Login', value: 'login.html' });
  opts.push({ label: 'PAGE: Privacy Policy', value: '#' });
  opts.push({ label: 'Enter Custom URL', value: '__custom__' });
  return opts;
}

// ── Save / Reset ────────────────────────────────────────────────────
async function handleSave() {
  saveStatus = 'saving';
  updateSaveButton();
  try {
    await updateContent(formData);
    saveStatus = 'saved';
    updateSaveButton();
    setTimeout(() => { saveStatus = 'idle'; updateSaveButton(); }, 2000);
  } catch (error) {
    console.error('Save failed:', error);
    saveStatus = 'error';
    updateSaveButton();
    setTimeout(() => { saveStatus = 'idle'; updateSaveButton(); }, 3000);
  }
}

async function handleReset() {
  if (confirm('Are you sure? This will reset cloud content to default.')) {
    await resetContent();
    window.location.reload();
  }
}

function updateSaveButton() {
  const btn = document.getElementById('save-btn');
  if (!btn) return;
  const size = 18;
  if (saveStatus === 'saving') {
    btn.disabled = true;
    btn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-600 text-white opacity-70 cursor-wait';
    btn.innerHTML = `${icons.Loader2(size, 'animate-spin')} Saving...`;
  } else if (saveStatus === 'saved') {
    btn.disabled = true;
    btn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-600 text-white opacity-90';
    btn.innerHTML = `${icons.Check(size)} Saved!`;
  } else if (saveStatus === 'error') {
    btn.disabled = true;
    btn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-red-600 text-white';
    btn.innerHTML = `${icons.AlertCircle(size)} Error!`;
  } else {
    btn.disabled = false;
    btn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors';
    btn.innerHTML = `${icons.Save(size)} Save Changes`;
  }
}

// ── Sidebar rendering ───────────────────────────────────────────────
function sidebarButton(label, tabId, iconFn) {
  const isActive = activeTab === tabId;
  const cls = isActive
    ? 'bg-accent-500 text-white'
    : 'text-brand-200 hover:bg-brand-800';
  return `<button data-tab="${escapeHTML(tabId)}" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${cls}">
    ${iconFn(18)} ${escapeHTML(label)}
  </button>`;
}

function renderSidebar() {
  const products = formData.products || [];
  return `
  <aside class="w-full md:w-64 bg-brand-900 text-white flex flex-col fixed md:relative z-20 h-full md:h-auto overflow-y-auto no-scrollbar" style="min-height:100vh;">
    <div class="p-6 border-b border-brand-800">
      <h2 class="text-xl font-heading font-bold">CMS Admin</h2>
      <p class="text-xs text-brand-300">ReliaIT (Cloud Sync)</p>
    </div>
    <nav class="flex-1 p-4 space-y-6">
      <!-- Global Settings -->
      <div>
        <h3 class="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Global Settings</h3>
        <div class="space-y-1">
          ${sidebarButton('General Info', 'general', sz => icons.Settings(sz))}
          ${sidebarButton('Footer', 'footer', sz => icons.PanelBottom(sz))}
        </div>
      </div>
      <!-- Home Page -->
      <div>
        <h3 class="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Home Page</h3>
        <div class="space-y-1">
          ${sidebarButton('Hero Section', 'hero', sz => icons.Home(sz))}
          ${sidebarButton('Features', 'features', sz => icons.List(sz))}
          ${sidebarButton('Industries', 'industries', sz => icons.Briefcase(sz))}
          ${sidebarButton('About', 'about', sz => icons.Type(sz))}
          ${sidebarButton('Stats', 'stats', sz => icons.Layers(sz))}
        </div>
      </div>
      <!-- Product Pages -->
      <div>
        <h3 class="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2 px-2">Product Pages</h3>
        <div class="space-y-1">
          ${products.map(p => sidebarButton(p.title, `product-${p.id}`, sz => icons.ShoppingBag(sz))).join('')}
        </div>
      </div>
    </nav>
    <div class="p-4 border-t border-brand-800">
      <button id="logout-btn" class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-brand-200 hover:bg-brand-800 transition-colors">
        ${icons.LogOut(18)} Logout
      </button>
    </div>
  </aside>`;
}

// ── Input field helpers ─────────────────────────────────────────────
function textField(label, value, attrs) {
  return `
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1.5">${escapeHTML(label)}</label>
    <input type="text" value="${escapeHTML(value)}" ${attrs}
      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow" />
  </div>`;
}

function textareaField(label, value, attrs, rows = 3) {
  return `
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1.5">${escapeHTML(label)}</label>
    <textarea ${attrs} rows="${rows}"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow resize-y">${escapeHTML(value)}</textarea>
  </div>`;
}

// ── Tab content renderers ───────────────────────────────────────────

function renderGeneralTab() {
  const g = formData.general || {};
  return `
  <div class="space-y-5">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">General Contact Information</h2>
    ${textField('Phone Number', g.phone || '', 'data-section="general" data-field="phone"')}
    ${textField('WhatsApp Number', g.whatsapp || '', 'data-section="general" data-field="whatsapp"')}
    ${textField('Email Address', g.email || '', 'data-section="general" data-field="email"')}
    ${textareaField('Office Address', g.address || '', 'data-section="general" data-field="address"', 2)}
  </div>`;
}

function renderHeroTab() {
  const h = formData.hero || {};
  return `
  <div class="space-y-5">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Hero Section</h2>
    ${textField('Title Line 1', h.titleLine1 || '', 'data-section="hero" data-field="titleLine1"')}
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1.5">Title Line 2 <span class="text-accent-500 font-bold">(Accent Color)</span></label>
      <input type="text" value="${escapeHTML(h.titleLine2 || '')}" data-section="hero" data-field="titleLine2"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-shadow" />
    </div>
    ${textareaField('Subtitle', h.subtitle || '', 'data-section="hero" data-field="subtitle"', 3)}
    ${textField('Background Image URL', h.backgroundImage || '', 'data-section="hero" data-field="backgroundImage"')}
  </div>`;
}

function renderFooterTab() {
  const f = formData.footer || {};
  return `
  <div class="space-y-8">
    <div>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Footer Settings</h2>
      ${textareaField('Footer Description', f.aboutText || '', 'data-section="footer" data-field="aboutText"', 3)}
    </div>
    <hr class="border-gray-200" />
    ${renderLinkEditor('Quick Links', f.quickLinks || [], 'quickLinks')}
    <hr class="border-gray-200" />
    ${renderLinkEditor('Services Menu', f.productLinks || [], 'productLinks')}
  </div>`;
}

function renderLinkEditor(title, links, key) {
  const presets = getPresetOptions();
  let html = `
  <div>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-md font-semibold text-gray-700">${escapeHTML(title)}</h3>
      <button data-action="add-link" data-link-key="${escapeHTML(key)}"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-900 text-white rounded-lg hover:bg-brand-800 transition-colors">
        ${icons.Plus(14)} Add Item
      </button>
    </div>
    <div class="space-y-3">`;

  links.forEach((link, i) => {
    const isPreset = presets.some(p => p.value === link.url && p.value !== '__custom__');
    html += `
    <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div class="flex-1 w-full sm:w-auto">
        <input type="text" value="${escapeHTML(link.label)}" placeholder="Link label"
          data-section="footer" data-link-key="${escapeHTML(key)}" data-link-index="${i}" data-link-field="label"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none" />
      </div>
      <div class="flex-1 w-full sm:w-auto">
        <select data-action="link-preset-select" data-link-key="${escapeHTML(key)}" data-link-index="${i}"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none bg-white">
          ${presets.map(p => {
            const selected = (isPreset && p.value === link.url) ? 'selected' : (!isPreset && p.value === '__custom__') ? 'selected' : '';
            return `<option value="${escapeHTML(p.value)}" ${selected}>${escapeHTML(p.label)}</option>`;
          }).join('')}
        </select>
      </div>
      ${!isPreset ? `
      <div class="flex-1 w-full sm:w-auto">
        <input type="text" value="${escapeHTML(link.url)}" placeholder="Custom URL"
          data-section="footer" data-link-key="${escapeHTML(key)}" data-link-index="${i}" data-link-field="url"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none" />
      </div>` : ''}
      <button data-action="remove-link" data-link-key="${escapeHTML(key)}" data-link-index="${i}"
        class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0" title="Remove link">
        ${icons.Trash2(16)}
      </button>
    </div>`;
  });

  html += `</div></div>`;
  return html;
}

function renderFeaturesTab() {
  const items = (formData.features && formData.features.items) || [];
  let html = `<div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Feature Cards</h2>`;
  items.forEach((item, i) => {
    html += `
    <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
      <h3 class="text-sm font-semibold text-gray-600">Feature ${i + 1}</h3>
      ${textField('Title', item.title || '', `data-section="features" data-array="items" data-index="${i}" data-field="title"`)}
      ${textareaField('Description', item.desc || '', `data-section="features" data-array="items" data-index="${i}" data-field="desc"`, 2)}
    </div>`;
  });
  html += '</div>';
  return html;
}

function renderIndustriesTab() {
  const items = formData.industries || [];
  let html = `<div class="space-y-8">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Industries Served</h2>`;
  items.forEach((ind, i) => {
    const featuresText = (ind.features || []).join('\n');
    html += `
    <div class="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
      <h3 class="text-md font-semibold text-gray-700">${escapeHTML(ind.title || `Industry ${i + 1}`)}</h3>
      ${textField('Title', ind.title || '', `data-section="industries" data-index="${i}" data-field="title"`)}
      ${textareaField('Short Description', ind.description || '', `data-section="industries" data-index="${i}" data-field="description"`, 2)}
      ${textareaField('Long Description', ind.longDescription || '', `data-section="industries" data-index="${i}" data-field="longDescription"`, 4)}
      ${textField('Image URL', ind.image || '', `data-section="industries" data-index="${i}" data-field="image"`)}
      ${textField('Icon Name', ind.iconName || '', `data-section="industries" data-index="${i}" data-field="iconName"`)}
      ${textareaField('Features (one per line)', featuresText, `data-section="industries" data-index="${i}" data-field="features" data-type="lines"`, 4)}
    </div>`;
  });
  html += '</div>';
  return html;
}

function renderAboutTab() {
  const a = formData.about || {};
  return `
  <div class="space-y-5">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">About Section</h2>
    ${textField('Title', a.title || '', 'data-section="about" data-field="title"')}
    ${textareaField('Description 1', a.description1 || '', 'data-section="about" data-field="description1"', 4)}
    ${textareaField('Description 2', a.description2 || '', 'data-section="about" data-field="description2"', 4)}
    ${textField('Years of Experience', a.yearsExperience || '', 'data-section="about" data-field="yearsExperience"')}
    ${textField('Image 1 URL', a.image1 || '', 'data-section="about" data-field="image1"')}
    ${textField('Image 2 URL', a.image2 || '', 'data-section="about" data-field="image2"')}
  </div>`;
}

function renderStatsTab() {
  const items = (formData.stats && formData.stats.items) || [];
  let html = `<div class="space-y-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Statistics</h2>`;
  items.forEach((item, i) => {
    html += `
    <div class="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
      <h3 class="text-sm font-semibold text-gray-600">Stat ${i + 1}</h3>
      ${textField('Value', item.value || '', `data-section="stats" data-array="items" data-index="${i}" data-field="value"`)}
      ${textField('Label', item.label || '', `data-section="stats" data-array="items" data-index="${i}" data-field="label"`)}
    </div>`;
  });
  html += '</div>';
  return html;
}

function renderProductTab(productId) {
  const products = formData.products || [];
  const pIdx = products.findIndex(p => p.id === productId);
  if (pIdx === -1) return '<p class="text-gray-500">Product not found.</p>';
  const prod = products[pIdx];

  let html = `<div class="space-y-8">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Edit Product: ${escapeHTML(prod.title)}</h2>
    ${textField('Page Title', prod.title || '', `data-section="products" data-index="${pIdx}" data-field="title"`)}
    ${textareaField('Short Description', prod.description || '', `data-section="products" data-index="${pIdx}" data-field="description"`, 2)}
    ${textareaField('Long Description', prod.longDescription || '', `data-section="products" data-index="${pIdx}" data-field="longDescription"`, 5)}

    <hr class="border-gray-200" />
    <div class="flex items-center justify-between">
      <h3 class="text-md font-semibold text-gray-700">Content Cards / Sections</h3>
      <button data-action="add-section" data-product-index="${pIdx}"
        class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-900 text-white rounded-lg hover:bg-brand-800 transition-colors">
        ${icons.Plus(14)} Add New Card
      </button>
    </div>`;

  (prod.sections || []).forEach((sec, si) => {
    const itemsText = (sec.items || []).join('\n');
    html += `
    <div class="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-semibold text-gray-600">Card ${si + 1}</h4>
        <button data-action="remove-section" data-product-index="${pIdx}" data-section-index="${si}"
          class="flex items-center gap-1 px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          ${icons.Trash2(14)} Remove
        </button>
      </div>
      ${textField('Card Title', sec.title || '', `data-section="products" data-index="${pIdx}" data-sub-array="sections" data-sub-index="${si}" data-field="title"`)}
      ${textField('Image URL', sec.image || '', `data-section="products" data-index="${pIdx}" data-sub-array="sections" data-sub-index="${si}" data-field="image"`)}
      ${sec.image ? `<img src="${escapeHTML(sec.image)}" alt="Preview" class="w-32 h-20 object-cover rounded-lg border border-gray-200" onerror="this.style.display='none'" />` : ''}
      ${textareaField('List Items (one per line)', itemsText, `data-section="products" data-index="${pIdx}" data-sub-array="sections" data-sub-index="${si}" data-field="items" data-type="lines"`, 4)}
    </div>`;
  });

  html += '</div>';
  return html;
}

// ── Tab content dispatcher ──────────────────────────────────────────
function renderTabContent() {
  switch (activeTab) {
    case 'general':   return renderGeneralTab();
    case 'hero':      return renderHeroTab();
    case 'footer':    return renderFooterTab();
    case 'features':  return renderFeaturesTab();
    case 'industries':return renderIndustriesTab();
    case 'about':     return renderAboutTab();
    case 'stats':     return renderStatsTab();
    default:
      if (activeTab.startsWith('product-')) {
        return renderProductTab(activeTab.replace('product-', ''));
      }
      return '<p class="text-gray-500">Select a tab from the sidebar.</p>';
  }
}

// ── Full page render ────────────────────────────────────────────────
function renderDashboard() {
  const app = document.getElementById('app') || document.body;
  app.innerHTML = `
  <div class="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
    ${renderSidebar()}
    <main class="flex-1 p-6 md:p-10 overflow-y-auto md:ml-0">
      <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 id="tab-title" class="text-2xl font-bold text-gray-800 capitalize">${escapeHTML(getTabTitle(activeTab))}</h1>
          <p class="text-sm text-gray-500">Edit your cloud-synced CMS data.</p>
        </div>
        <div class="flex gap-4">
          <button id="reset-btn"
            class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
            ${icons.RotateCcw(18)} Reset
          </button>
          <button id="save-btn"
            class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors">
            ${icons.Save(18)} Save Changes
          </button>
        </div>
      </header>
      <div id="tab-content" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 max-w-5xl">
        ${renderTabContent()}
      </div>
    </main>
  </div>`;

  attachGlobalListeners();
  attachTabContentListeners();
}

// ── Partial re-render helpers ───────────────────────────────────────
function refreshTabContent() {
  const container = document.getElementById('tab-content');
  if (container) {
    container.innerHTML = renderTabContent();
    attachTabContentListeners();
  }
  // Update title
  const titleEl = document.getElementById('tab-title');
  if (titleEl) titleEl.textContent = getTabTitle(activeTab);
  // Update sidebar active states
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const tabId = btn.getAttribute('data-tab');
    if (tabId === activeTab) {
      btn.className = btn.className.replace(/text-brand-200 hover:bg-brand-800/g, '').replace(/bg-accent-500 text-white/g, '');
      btn.classList.add('bg-accent-500', 'text-white');
      btn.classList.remove('text-brand-200', 'hover:bg-brand-800');
    } else {
      btn.className = btn.className.replace(/bg-accent-500 text-white/g, '').replace(/text-brand-200 hover:bg-brand-800/g, '');
      btn.classList.remove('bg-accent-500', 'text-white');
      btn.classList.add('text-brand-200', 'hover:bg-brand-800');
    }
  });
}

// ── Event: input delegation on #tab-content ─────────────────────────
function handleInput(e) {
  const el = e.target;
  const section = el.getAttribute('data-section');
  const field = el.getAttribute('data-field');
  if (!section || !field) return;

  const value = el.tagName === 'TEXTAREA' ? el.value : el.value;
  const isLines = el.getAttribute('data-type') === 'lines';
  const parsedValue = isLines ? value.split('\n') : value;

  // Handle link editor fields (footer links)
  const linkKey = el.getAttribute('data-link-key');
  if (linkKey) {
    const linkIndex = parseInt(el.getAttribute('data-link-index'), 10);
    const linkField = el.getAttribute('data-link-field');
    if (formData.footer && formData.footer[linkKey] && formData.footer[linkKey][linkIndex]) {
      formData.footer[linkKey][linkIndex][linkField] = value;
    }
    return;
  }

  // Handle sub-array fields (product sections)
  const subArray = el.getAttribute('data-sub-array');
  if (subArray) {
    const index = parseInt(el.getAttribute('data-index'), 10);
    const subIndex = parseInt(el.getAttribute('data-sub-index'), 10);
    if (formData[section] && formData[section][index] && formData[section][index][subArray] && formData[section][index][subArray][subIndex]) {
      formData[section][index][subArray][subIndex][field] = parsedValue;
    }
    return;
  }

  // Handle array with named sub-property (features.items, stats.items)
  const arrayName = el.getAttribute('data-array');
  if (arrayName) {
    const index = parseInt(el.getAttribute('data-index'), 10);
    if (formData[section] && formData[section][arrayName] && formData[section][arrayName][index]) {
      formData[section][arrayName][index][field] = parsedValue;
    }
    return;
  }

  // Handle direct array (industries)
  const index = el.getAttribute('data-index');
  if (index !== null && index !== undefined && index !== '') {
    const idx = parseInt(index, 10);
    if (Array.isArray(formData[section]) && formData[section][idx]) {
      formData[section][idx][field] = parsedValue;
    }
    return;
  }

  // Handle simple nested (general.phone, hero.titleLine1, etc.)
  if (formData[section]) {
    formData[section][field] = parsedValue;
  }
}

// ── Event: click delegation on #tab-content ─────────────────────────
function handleTabContentClick(e) {
  const actionEl = e.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.getAttribute('data-action');

  // ── Link editor actions ──
  if (action === 'add-link') {
    const key = actionEl.getAttribute('data-link-key');
    if (formData.footer && formData.footer[key]) {
      formData.footer[key].push({ label: 'New Link', url: '#' });
      refreshTabContent();
    }
    return;
  }

  if (action === 'remove-link') {
    const key = actionEl.getAttribute('data-link-key');
    const idx = parseInt(actionEl.getAttribute('data-link-index'), 10);
    if (formData.footer && formData.footer[key]) {
      formData.footer[key].splice(idx, 1);
      refreshTabContent();
    }
    return;
  }

  if (action === 'link-preset-select') {
    // This is handled by change event, not click
    return;
  }

  // ── Product section actions ──
  if (action === 'add-section') {
    const pIdx = parseInt(actionEl.getAttribute('data-product-index'), 10);
    if (formData.products && formData.products[pIdx]) {
      if (!formData.products[pIdx].sections) formData.products[pIdx].sections = [];
      formData.products[pIdx].sections.push({ title: 'New Card', image: '', items: [] });
      refreshTabContent();
    }
    return;
  }

  if (action === 'remove-section') {
    const pIdx = parseInt(actionEl.getAttribute('data-product-index'), 10);
    const sIdx = parseInt(actionEl.getAttribute('data-section-index'), 10);
    if (formData.products && formData.products[pIdx] && formData.products[pIdx].sections) {
      formData.products[pIdx].sections.splice(sIdx, 1);
      refreshTabContent();
    }
    return;
  }
}

// ── Event: change delegation for selects in tab content ─────────────
function handleTabContentChange(e) {
  const el = e.target;
  if (el.tagName !== 'SELECT') return;

  const action = el.getAttribute('data-action');
  if (action === 'link-preset-select') {
    const key = el.getAttribute('data-link-key');
    const idx = parseInt(el.getAttribute('data-link-index'), 10);
    const selectedValue = el.value;
    if (formData.footer && formData.footer[key] && formData.footer[key][idx]) {
      if (selectedValue === '__custom__') {
        // Keep existing URL if switching to custom, or set empty
        // Re-render to show the custom URL input
        refreshTabContent();
      } else {
        formData.footer[key][idx].url = selectedValue;
        refreshTabContent();
      }
    }
    return;
  }
}

// ── Attach listeners ────────────────────────────────────────────────
function attachTabContentListeners() {
  const container = document.getElementById('tab-content');
  if (!container) return;

  // Remove old listeners by replacing node (simple approach)
  // Actually, since we replace innerHTML, old listeners on children are gone.
  // We use delegation on #tab-content, but we need to avoid stacking.
  // We'll use a flag approach with named functions.

  // Remove previous delegated listeners by cloning
  const oldContainer = container;
  // Instead, we set up listeners once on a persistent wrapper. See attachGlobalListeners.
}

function attachGlobalListeners() {
  // Sidebar tab switching
  document.addEventListener('click', async (e) => {
    const tabBtn = e.target.closest('[data-tab]');
    if (tabBtn) {
      const newTab = tabBtn.getAttribute('data-tab');
      if (newTab !== activeTab) {
        activeTab = newTab;
        refreshTabContent();
      }
      return;
    }

    // Logout
    if (e.target.closest('#logout-btn')) {
      await logout();
      window.location.href = 'login.html';
      return;
    }

    // Save
    if (e.target.closest('#save-btn')) {
      handleSave();
      return;
    }

    // Reset
    if (e.target.closest('#reset-btn')) {
      handleReset();
      return;
    }
  });

  // Delegated input on #tab-content
  document.addEventListener('input', (e) => {
    if (e.target.closest('#tab-content')) {
      handleInput(e);
    }
  });

  // Delegated click on #tab-content for actions
  document.addEventListener('click', (e) => {
    if (e.target.closest('#tab-content')) {
      handleTabContentClick(e);
    }
  });

  // Delegated change on #tab-content for selects
  document.addEventListener('change', (e) => {
    if (e.target.closest('#tab-content')) {
      handleTabContentChange(e);
    }
  });
}

// ── Init ────────────────────────────────────────────────────────────
export async function initAdminPage() {
  const app = document.getElementById('app') || document.body;
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-slate-100">
      <div class="flex flex-col items-center gap-2 text-brand-900">
        ${icons.Loader2(40, 'animate-spin text-accent-500')}
        <span class="text-sm font-bold animate-pulse">Loading...</span>
      </div>
    </div>`;

  // Wait for Firebase auth state to resolve
  onAuthChange(async (user) => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    // Load content
    const content = await initContent();
    formData = deepClone(content);

    // Render
    renderDashboard();
  });
}

// Auto-init when module loads
initAdminPage();
