// Glossary term detail page
import { initContent, getContent, escapeHTML } from '../content.js';
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
  const content = getContent();
  renderHeader();
  renderFooter();
  renderWhatsAppButton();

  const params = new URLSearchParams(window.location.search);
  const termSlug = params.get('term');
  const term = glossaryTerms.find(t => t.slug === termSlug);

  if (!term) {
    document.getElementById('app').innerHTML = `
      <div class="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Term Not Found</h2>
        <a href="glossary-listing.html" class="text-brand-600 hover:underline">Browse All Terms</a>
      </div>`;
    return;
  }

  // Dynamic SEO
  document.title = term.metaTitle || `${term.term} | IT Glossary | ReliaIT`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', term.metaDescription || term.definition.substring(0, 160));
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://reliaitinfo.in/glossary.html?term=${termSlug}`);

  // JSON-LD DefinedTerm
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "ReliaIT IT Supply Glossary",
      "url": "https://reliaitinfo.in/glossary-listing.html"
    }
  });
  document.head.appendChild(jsonLd);

  // Breadcrumb JSON-LD
  const breadcrumbLd = document.createElement('script');
  breadcrumbLd.type = 'application/ld+json';
  breadcrumbLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reliaitinfo.in/" },
      { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://reliaitinfo.in/glossary-listing.html" },
      { "@type": "ListItem", "position": 3, "name": term.term }
    ]
  });
  document.head.appendChild(breadcrumbLd);

  // Related terms
  const relatedTerms = (term.relatedTerms || []).map(slug => glossaryTerms.find(t => t.slug === slug)).filter(Boolean);
  const relatedTermsHtml = relatedTerms.length > 0 ? `
    <div class="mt-8">
      <h3 class="text-lg font-heading font-bold text-gray-900 mb-4">Related Terms</h3>
      <div class="flex flex-wrap gap-3">
        ${relatedTerms.map(t => `
          <a href="glossary.html?term=${t.slug}" class="px-4 py-2 bg-gray-100 hover:bg-brand-50 hover:text-brand-600 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            ${escapeHTML(t.term)}
          </a>
        `).join('')}
      </div>
    </div>` : '';

  // Related products
  const relatedProducts = (term.relatedProducts || []).map(id => (content.products || []).find(p => p.id === id)).filter(Boolean);
  const productsHtml = relatedProducts.length > 0 ? `
    <div class="mt-8 bg-brand-50 rounded-xl p-6 border border-brand-100">
      <h3 class="text-lg font-heading font-bold text-brand-900 mb-4">Shop Related Products</h3>
      <div class="space-y-3">
        ${relatedProducts.map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center gap-3 text-sm text-brand-700 hover:text-brand-900 font-medium transition-colors">
            ${icons.ArrowRight(14, 'text-brand-500')}
            <span>${escapeHTML(p.title)}</span>
          </a>
        `).join('')}
      </div>
    </div>` : '';

  // All terms for sidebar nav
  const allTermsHtml = glossaryTerms
    .sort((a, b) => a.term.localeCompare(b.term))
    .map(t => `
      <a href="glossary.html?term=${t.slug}" class="block py-1.5 text-sm ${t.slug === termSlug ? 'text-brand-600 font-bold' : 'text-gray-500 hover:text-brand-600'} transition-colors">
        ${escapeHTML(t.term)}
      </a>
    `).join('');

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Header -->
      <div class="bg-brand-900 text-white py-12">
        <div class="container mx-auto px-4">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="index.html" class="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="glossary-listing.html" class="hover:text-white transition-colors">Glossary</a>
            <span>/</span>
            <span class="text-gray-300">${escapeHTML(term.term)}</span>
          </nav>
          <span class="inline-block px-3 py-1 bg-white/10 text-gray-300 text-xs font-bold rounded uppercase tracking-wider mb-3">${escapeHTML(term.category)}</span>
          <h1 class="text-3xl md:text-5xl font-heading font-bold">${escapeHTML(term.term)}</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-4 py-12 md:py-16">
        <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          <!-- Main -->
          <article class="flex-1">
            <div class="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 class="text-xl font-heading font-bold text-gray-900 mb-4">Definition</h2>
              <p class="text-gray-600 leading-relaxed text-lg">${escapeHTML(term.definition)}</p>
            </div>
            ${relatedTermsHtml}
            ${productsHtml}
          </article>
          <!-- Sidebar: All Terms -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-28">
              <h4 class="font-heading font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">All Terms</h4>
              <div class="space-y-0.5 max-h-[60vh] overflow-y-auto no-scrollbar">
                ${allTermsHtml}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;
}

init();
