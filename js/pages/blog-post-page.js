// Blog post detail page
import { initContent, getContent, escapeHTML } from '../content.js';
import { icons } from '../icons.js';
import { optimizedImage, attachAllImages } from '../optimized-image.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';
import { blogPosts } from '../blog-data.js';

function renderContentBlock(block) {
  switch (block.type) {
    case 'paragraph':
      return `<p class="text-gray-600 leading-relaxed mb-6">${escapeHTML(block.text)}</p>`;
    case 'heading':
      const tag = block.level === 3 ? 'h3' : 'h2';
      const size = block.level === 3 ? 'text-xl' : 'text-2xl';
      return `<${tag} class="${size} font-heading font-bold text-gray-900 mt-10 mb-4">${escapeHTML(block.text)}</${tag}>`;
    case 'list':
      const items = block.items.map(item => `<li class="text-gray-600 leading-relaxed">${escapeHTML(item)}</li>`).join('');
      return `<ul class="list-disc pl-6 space-y-2 mb-6">${items}</ul>`;
    case 'image':
      const img = optimizedImage(block.src, block.alt || '', 'w-full h-full object-cover rounded-lg', 'w-full h-64 md:h-80 rounded-lg mb-6');
      return img.html;
    case 'cta':
      return `
        <div class="bg-brand-50 border border-brand-100 rounded-xl p-6 md:p-8 my-8 text-center">
          <p class="text-lg font-heading font-bold text-brand-900 mb-4">${escapeHTML(block.text)}</p>
          <a href="${block.href}" class="inline-block px-8 py-3 bg-brand-600 text-white font-bold rounded shadow-lg hover:bg-brand-700 transition-colors">
            ${escapeHTML(block.buttonText)} ${icons.ArrowRight(16)}
          </a>
        </div>`;
    default:
      return '';
  }
}

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

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    document.getElementById('app').innerHTML = `
      <div class="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
        <a href="blog-listing.html" class="text-brand-600 hover:underline">Browse All Articles</a>
      </div>`;
    return;
  }

  // Dynamic SEO meta tags
  document.title = post.metaTitle || `${post.title} | ReliaIT Blog`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', post.metaDescription || post.excerpt);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://reliaitinfo.in/blog.html?slug=${slug}`);

  // OG tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property', 'og:title'); document.head.appendChild(ogTitle); }
  ogTitle.setAttribute('content', post.metaTitle || post.title);
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) { ogDesc = document.createElement('meta'); ogDesc.setAttribute('property', 'og:description'); document.head.appendChild(ogDesc); }
  ogDesc.setAttribute('content', post.metaDescription || post.excerpt);
  let ogImage = document.querySelector('meta[property="og:image"]');
  if (!ogImage) { ogImage = document.createElement('meta'); ogImage.setAttribute('property', 'og:image'); document.head.appendChild(ogImage); }
  ogImage.setAttribute('content', post.image);
  let ogType = document.querySelector('meta[property="og:type"]');
  if (!ogType) { ogType = document.createElement('meta'); ogType.setAttribute('property', 'og:type'); document.head.appendChild(ogType); }
  ogType.setAttribute('content', 'article');

  // JSON-LD Article schema
  const jsonLd = document.createElement('script');
  jsonLd.type = 'application/ld+json';
  jsonLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.image,
    "author": { "@type": "Organization", "name": "ReliaIT", "url": "https://reliaitinfo.in" },
    "publisher": { "@type": "Organization", "name": "ReliaIT", "url": "https://reliaitinfo.in" },
    "datePublished": post.publishDate,
    "mainEntityOfPage": `https://reliaitinfo.in/blog.html?slug=${post.slug}`
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
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://reliaitinfo.in/blog-listing.html" },
      { "@type": "ListItem", "position": 3, "name": post.title }
    ]
  });
  document.head.appendChild(breadcrumbLd);

  const heroImg = optimizedImage(post.image, post.title, 'w-full h-full object-cover', 'w-full h-full', { eager: true });

  // Related posts
  const related = blogPosts.filter(p => p.slug !== post.slug && (post.relatedPosts || []).includes(p.slug)).slice(0, 2);
  const relatedHtml = related.length > 0 ? `
    <div class="mt-16 pt-10 border-t border-gray-200">
      <h3 class="text-xl font-heading font-bold text-gray-900 mb-6">Related Articles</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${related.map(r => `
          <a href="blog.html?slug=${r.slug}" class="group block bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div class="p-5">
              <span class="text-xs font-bold text-brand-600 uppercase tracking-wider">${escapeHTML(r.category)}</span>
              <h4 class="font-heading font-bold text-gray-900 mt-1 group-hover:text-brand-600 transition-colors">${escapeHTML(r.title)}</h4>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2">${escapeHTML(r.excerpt)}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div>` : '';

  // Related products
  const content = getContent();
  const relatedProducts = (post.relatedProducts || []).map(id => (content.products || []).find(p => p.id === id)).filter(Boolean);
  const productsHtml = relatedProducts.length > 0 ? `
    <div class="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <h4 class="font-heading font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Related Products</h4>
      <div class="space-y-3">
        ${relatedProducts.map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center gap-3 text-sm text-gray-700 hover:text-brand-600 transition-colors">
            ${icons.ArrowRight(14, 'text-brand-500')}
            <span>${escapeHTML(p.title)}</span>
          </a>
        `).join('')}
      </div>
    </div>` : '';

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Hero -->
      <div class="relative h-[300px] md:h-[400px] flex items-end">
        <div class="absolute inset-0 z-0">
          ${heroImg.html}
          <div class="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/70 to-transparent z-10"></div>
        </div>
        <div class="container mx-auto px-4 relative z-20 pb-10">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <a href="index.html" class="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="blog-listing.html" class="hover:text-white transition-colors">Blog</a>
            <span>/</span>
            <span class="text-gray-400 truncate max-w-[200px]">${escapeHTML(post.title)}</span>
          </nav>
          <span class="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded uppercase tracking-wider mb-3">${escapeHTML(post.category)}</span>
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight max-w-4xl">${escapeHTML(post.title)}</h1>
          <div class="flex items-center gap-4 mt-4 text-sm text-gray-300">
            <span>${escapeHTML(post.author)}</span>
            <span>•</span>
            <span>${new Date(post.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>${escapeHTML(post.readTime)} read</span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="container mx-auto px-4 py-12 md:py-16">
        <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          <!-- Main content -->
          <article class="flex-1 max-w-3xl">
            <div class="prose max-w-none">
              ${post.content.map(renderContentBlock).join('')}
            </div>
            <!-- Tags -->
            <div class="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-2">
              ${(post.tags || []).map(tag => `<span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${escapeHTML(tag)}</span>`).join('')}
            </div>
            ${relatedHtml}
          </article>
          <!-- Sidebar -->
          <aside class="lg:w-72 flex-shrink-0 space-y-6">
            ${productsHtml}
            <div class="bg-brand-900 rounded-xl p-6 text-white text-center">
              <h4 class="font-heading font-bold mb-2">Need IT Supplies?</h4>
              <p class="text-gray-300 text-sm mb-4">Same-day delivery across East Godavari</p>
              <a href="index.html#contact" class="inline-block w-full px-4 py-2 bg-accent-500 text-white font-bold rounded hover:bg-accent-600 transition-colors text-sm">
                Get a Quote
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;

  attachAllImages();
}

init();
