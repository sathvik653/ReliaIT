// Product detail page - ported from pages/ProductDetail.tsx
import { initContent, getContent } from '../content.js';
import { icons } from '../icons.js';
import { optimizedImage, attachAllImages } from '../optimized-image.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';
import { renderContactSection } from './home.js';

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
  const id = params.get('id');
  const product = content.products.find(p => p.id === id);

  // Set dynamic meta tags for SEO
  if (product) {
    document.title = `${product.title} | ReliaIT`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', product.description);
    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property', 'og:title'); document.head.appendChild(ogTitle); }
    ogTitle.setAttribute('content', `${product.title} | ReliaIT`);
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property', 'og:description'); document.head.appendChild(ogDesc); }
    ogDesc.setAttribute('content', product.description);
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) { ogImage = document.createElement('meta'); ogImage.setAttribute('property', 'og:image'); document.head.appendChild(ogImage); }
    ogImage.setAttribute('content', product.image);
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.appendChild(ogUrl); }
    ogUrl.setAttribute('content', window.location.href);
  }

  if (!product) {
    document.getElementById('app').innerHTML = `
      <div class="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <a href="index.html" class="text-accent-500 hover:underline">Return Home</a>
      </div>`;
    return;
  }

  let contentHtml = '';

  if (product.sections && product.sections.length > 0) {
    const sectionsHtml = product.sections.map(section => {
      const sectionImg = optimizedImage(section.image, section.title, 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500', 'w-full h-full');
      const itemsHtml = section.items.map(item => `
        <li class="flex items-start gap-3 text-gray-600 text-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
          <span class="leading-relaxed">${item}</span>
        </li>
      `).join('');

      return `
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
          <div class="h-56 relative overflow-hidden">
            ${sectionImg.html}
            <div class="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent opacity-80 z-10"></div>
            <h3 class="absolute bottom-4 left-4 text-white font-heading font-bold text-lg drop-shadow-md pr-4 leading-tight z-20">${section.title}</h3>
          </div>
          <div class="p-6 flex-1 bg-white">
            <ul class="space-y-3">${itemsHtml}</ul>
          </div>
        </div>
      `;
    }).join('');

    contentHtml = `<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">${sectionsHtml}</div>`;
  } else if (product.features && product.features.length > 0) {
    const featuresHtml = product.features.map(feature => `
      <div class="flex items-start gap-3 bg-white p-4 rounded shadow-sm border border-gray-100">
        ${icons.CheckCircle2(18, 'text-accent-500 mt-0.5 flex-shrink-0')}
        <span class="text-gray-700 font-medium text-sm">${feature}</span>
      </div>
    `).join('');

    contentHtml = `
      <div class="bg-gray-50 rounded-xl p-8 border border-gray-100 mb-10">
        <h3 class="text-xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-2">
          ${icons.ShoppingBag(20, 'text-accent-500')} Key Deliverables
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${featuresHtml}</div>
      </div>
    `;
  }

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Page Header -->
      <div class="bg-brand-900 text-white py-12 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div class="container mx-auto px-4 relative z-10">
          <a href="index.html" class="inline-flex items-center text-gray-400 hover:text-white mb-6 text-sm font-medium transition-colors">
            ${icons.ArrowLeft(16, 'mr-2')} Back to Solutions
          </a>
          <div class="flex items-center gap-3 mb-2">
            <span class="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">${product.category}</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-heading font-bold">${product.title}</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-6xl mx-auto">
          <div class="prose max-w-none text-gray-600 leading-relaxed mb-10">
            <p class="text-lg font-medium text-gray-800 mb-6 border-l-4 border-accent-500 pl-4">${product.description}</p>
            <p class="mb-6">${product.longDescription || ''}</p>
          </div>
          ${contentHtml}
        </div>
      </div>

      <!-- Contact Section -->
      <div id="contact-section"></div>
    </div>
  `;

  attachAllImages();
  renderContactSection(document.getElementById('contact-section'));
}

init();
