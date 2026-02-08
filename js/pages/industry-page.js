// Industry detail page - ported from pages/IndustryDetail.tsx
import { initContent, getContent } from '../content.js';
import { icons } from '../icons.js';
import { optimizedImage, attachAllImages } from '../optimized-image.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';
import { renderContactSection } from './home.js';

const iconMap = {
  Building2: icons.Building2,
  School: icons.School,
  Landmark: icons.Landmark,
  Store: icons.Store
};

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
  const industry = content.industries.find(i => i.id === id);

  if (!industry) {
    document.getElementById('app').innerHTML = `
      <div class="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Industry Not Found</h2>
        <a href="index.html" class="text-brand-600 hover:underline">Return Home</a>
      </div>`;
    return;
  }

  const iconFn = iconMap[industry.iconName] || icons.Building2;

  const heroImg = optimizedImage(industry.image, industry.title, 'w-full h-full object-cover', 'w-full h-full');

  const featuresHtml = (industry.features || []).map(feature => `
    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
      <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600">
        ${icons.CheckCircle2(20)}
      </div>
      <span class="font-medium text-gray-800">${feature}</span>
    </div>
  `).join('');

  document.getElementById('app').innerHTML = `
    <div>
      <!-- Hero -->
      <div class="relative h-[400px] flex items-center">
        <div class="absolute inset-0 z-0">
          ${heroImg.html}
          <div class="absolute inset-0 bg-brand-900/80 mix-blend-multiply z-10"></div>
        </div>
        <div class="container mx-auto px-4 relative z-20 text-white">
          <a href="index.html" class="inline-flex items-center text-brand-200 hover:text-white mb-6 text-sm font-medium transition-colors">
            ${icons.ArrowLeft(16, 'mr-2')} Back to Home
          </a>
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-white/20 backdrop-blur-md rounded-lg">
              ${iconFn(32, 'text-yellow-400')}
            </div>
            <span class="text-yellow-400 font-bold uppercase tracking-widest text-sm">Industry Focus</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-heading font-bold">${industry.title} Solutions</h1>
        </div>
      </div>

      <!-- Content Card -->
      <div class="container mx-auto px-4 py-20">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white -mt-32 relative z-20 p-8 md:p-12 rounded-xl shadow-premium border-t-4 border-yellow-500">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">${industry.longDescription || industry.description}</p>

            <h3 class="text-xl font-bold text-gray-900 mb-6">Our Specialized Services</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${featuresHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-gray-50 py-16">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Ready to upgrade your ${industry.title} infrastructure?</h2>
          <p class="text-gray-600 mb-8 max-w-2xl mx-auto">Contact our dedicated ${industry.title} procurement specialists for a consultation and customized quote.</p>
          <a href="#contact" class="inline-block px-8 py-3 bg-brand-600 text-white font-bold rounded shadow-lg hover:bg-brand-700 transition-colors">
            Contact Specialist
          </a>
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
