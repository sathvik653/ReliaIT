// Glossary listing page
import { initContent, escapeHTML } from '../content.js';
import { icons } from '../icons.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';
import { glossaryTerms } from '../glossary-data.js';

async function init() {
  document.getElementById('app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-white">
      <div class="flex flex-col items-center gap-2 text-brand-900">
        ${icons.Loader2(40, 'animate-spin text-accent-500')}
        <span class="text-sm font-bold animate-pulse">Loading...</span>
      </div>
    </div>`;

  await initContent();
  renderHeader();
  renderFooter();
  renderWhatsAppButton();

  // JSON-LD
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "IT Glossary — ReliaIT",
    "description": "A-Z glossary of IT and office supply terms.",
    "url": "https://reliaitinfo.in/glossary-listing.html"
  });
  document.head.appendChild(jsonLd);

  // Group by category
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
  const categories = [...new Set(glossaryTerms.map(t => t.category))].sort();

  const categoryGroups = categories.map(cat => {
    const terms = sorted.filter(t => t.category === cat);
    const termCards = terms.map(t => `
      <a href="glossary.html?term=${t.slug}" class="group block bg-white rounded-lg p-5 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all">
        <h3 class="font-heading font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">${escapeHTML(t.term)}</h3>
        <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">${escapeHTML(t.definition.substring(0, 150))}...</p>
      </a>
    `).join('');

    return `
      <div class="mb-12">
        <h2 class="text-xl font-heading font-bold text-brand-900 mb-4 flex items-center gap-3">
          <span class="w-8 h-8 bg-brand-100 text-brand-600 rounded flex items-center justify-center text-sm font-bold">${cat.charAt(0)}</span>
          ${escapeHTML(cat)}
          <span class="text-sm font-normal text-gray-400">(${terms.length})</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${termCards}
        </div>
      </div>`;
  }).join('');

  // A-Z quick links
  const letters = [...new Set(sorted.map(t => t.term.charAt(0).toUpperCase()))].sort();
  const quickLinks = letters.map(l => `<span class="text-brand-600 font-bold">${l}</span>`).join(' ');

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Header -->
      <div class="bg-brand-900 text-white py-16 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
        <div class="container mx-auto px-4 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="index.html" class="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span class="text-gray-300">Glossary</span>
          </nav>
          <h1 class="text-3xl md:text-5xl font-heading font-bold">IT Glossary</h1>
          <p class="text-gray-300 mt-3 max-w-2xl">Common IT and office supply terms explained in simple language. Helpful for procurement officers, office managers, and school administrators.</p>
          <div class="mt-6 flex flex-wrap gap-3 text-sm">
            ${quickLinks}
          </div>
        </div>
      </div>

      <!-- Terms -->
      <div class="container mx-auto px-4 py-12 md:py-16">
        <div class="max-w-6xl mx-auto">
          <p class="text-gray-500 mb-10">${glossaryTerms.length} terms across ${categories.length} categories</p>
          ${categoryGroups}
        </div>
      </div>
    </div>
  `;
}

init();
