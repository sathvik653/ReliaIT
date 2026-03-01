// Blog listing page
import { initContent, escapeHTML } from '../content.js';
import { icons } from '../icons.js';
import { optimizedImage, attachAllImages } from '../optimized-image.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';
import { blogPosts, blogCategories } from '../blog-data.js';

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
    "name": "ReliaIT Blog",
    "description": "IT supplies, office stationery guides and procurement tips for businesses in Andhra Pradesh.",
    "url": "https://reliaitinfo.in/blog-listing.html",
    "publisher": { "@type": "Organization", "name": "ReliaIT" }
  });
  document.head.appendChild(jsonLd);

  const sorted = [...blogPosts].sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  const categoryFilter = blogCategories.map(cat => {
    const count = blogPosts.filter(p => p.category === cat).length;
    return count > 0 ? `<button class="blog-cat-btn px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-brand-500 hover:text-brand-600 transition-colors" data-category="${cat}">${escapeHTML(cat)} (${count})</button>` : '';
  }).join('');

  const postCards = sorted.map(post => {
    const img = optimizedImage(post.image, post.title, 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500', 'w-full h-48');
    return `
      <a href="blog.html?slug=${post.slug}" class="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col" data-category="${post.category}">
        <div class="relative overflow-hidden">
          ${img.html}
          <span class="absolute top-3 left-3 px-3 py-1 bg-brand-900/80 backdrop-blur-sm text-white text-xs font-bold rounded uppercase tracking-wider">${escapeHTML(post.category)}</span>
        </div>
        <div class="p-6 flex-1 flex flex-col">
          <h2 class="text-lg font-heading font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">${escapeHTML(post.title)}</h2>
          <p class="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">${escapeHTML(post.excerpt)}</p>
          <div class="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-50">
            <span>${new Date(post.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            <span>${escapeHTML(post.readTime)} read</span>
          </div>
        </div>
      </a>`;
  }).join('');

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Header -->
      <div class="bg-brand-900 text-white py-16 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
        <div class="container mx-auto px-4 relative z-10">
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="index.html" class="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span class="text-gray-300">Blog</span>
          </nav>
          <h1 class="text-3xl md:text-5xl font-heading font-bold">Blog & Guides</h1>
          <p class="text-gray-300 mt-3 max-w-2xl">IT procurement tips, buying guides, and industry insights for businesses in Andhra Pradesh and Telangana.</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap items-center gap-3">
          <button class="blog-cat-btn px-4 py-2 rounded-full text-sm font-medium border border-brand-500 bg-brand-50 text-brand-600" data-category="all">All Posts (${blogPosts.length})</button>
          ${categoryFilter}
        </div>
      </div>

      <!-- Post Grid -->
      <div class="container mx-auto px-4 pb-20">
        <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${postCards}
        </div>
      </div>
    </div>
  `;

  attachAllImages();

  // Category filter logic
  document.querySelectorAll('.blog-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.blog-cat-btn').forEach(b => {
        b.classList.remove('border-brand-500', 'bg-brand-50', 'text-brand-600');
        b.classList.add('border-gray-200');
      });
      btn.classList.add('border-brand-500', 'bg-brand-50', 'text-brand-600');
      btn.classList.remove('border-gray-200');

      const category = btn.dataset.category;
      document.querySelectorAll('#blog-grid > a').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

init();
