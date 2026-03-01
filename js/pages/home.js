// Home page renderer - all sections: Hero, Features, Products, Industries, Stats, About, Contact
import { initContent, getContent, escapeHTML } from '../content.js';
import { icons } from '../icons.js';
import { optimizedImage, attachAllImages } from '../optimized-image.js';
import { renderHeader, renderFooter, renderWhatsAppButton } from '../shared-ui.js';

// ─── Hero Section ────────────────────────────────────────────────────────────
function renderHeroSection() {
  const content = getContent();
  const hero = content.hero;
  const heroBg = optimizedImage(
    hero.backgroundImage,
    'Hero background',
    'w-full h-full object-cover',
    'w-full h-full',
    { eager: true }
  );

  return `
  <section id="home" class="relative min-h-[90vh] md:h-[85vh] md:min-h-[600px] flex items-center overflow-hidden py-20 md:py-0">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      ${heroBg.html}
      <div class="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-brand-950 via-brand-950/90 md:via-brand-900/80 to-brand-900/40"></div>
      <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
    </div>
    <!-- Content -->
    <div class="container mx-auto px-4 z-20 relative h-full flex items-center">
      <div class="w-full lg:w-2/3 pt-12 md:pt-16 lg:pt-0 text-white text-center md:text-left">
        <div class="inline-block px-4 py-1.5 bg-accent-500 text-white text-[10px] md:text-xs font-bold tracking-wider uppercase mb-6 rounded shadow-lg transform -skew-x-12">
          <span class="block transform skew-x-12">${escapeHTML(hero.badge || 'Authorized IT Partner Since 2018')}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-[1.2] md:leading-[1.1] mb-6 drop-shadow-md">
          ${escapeHTML(hero.titleLine1)} <br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">${escapeHTML(hero.titleLine2)}</span>
        </h1>
        <p class="text-base md:text-xl text-gray-100 mb-8 leading-relaxed max-w-xl font-light border-l-0 md:border-l-4 border-accent-500 pl-0 md:pl-6 mx-auto md:mx-0 drop-shadow-sm">
          ${escapeHTML(hero.subtitle)}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button id="hero-explore-btn" class="px-8 py-4 bg-accent-500 text-white font-bold rounded shadow-lg hover:bg-accent-600 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 w-full sm:w-auto">
            ${escapeHTML(hero.buttonText)} ${icons.ArrowRight(18)}
          </button>
          <button id="hero-quote-btn" class="px-8 py-4 bg-white/10 text-white backdrop-blur-md font-semibold rounded shadow-md border border-white/30 hover:bg-white hover:text-brand-900 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
            Request Quote
          </button>
        </div>
        <!-- Feature badges -->
        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-sm font-medium text-gray-200">
          ${(hero.featureBadges || ['100% Genuine Hardware', 'Banking Sector Partner', 'Fast Local Logistics']).map(badge => `
          <div class="flex items-center gap-2 justify-center md:justify-start">
            ${icons.CheckCircle2(16, 'text-accent-400 flex-shrink-0')}
            <span>${escapeHTML(badge)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Features Section ────────────────────────────────────────────────────────
function renderFeaturesSection() {
  const content = getContent();
  const featureIcons = [icons.ShieldCheck, icons.Building2, icons.PackageCheck, icons.Truck];

  const cards = ((content.features && content.features.items) || []).map((item, i) => {
    const iconFn = featureIcons[i] || featureIcons[0];
    return `
      <div class="bg-white p-6 md:p-8 rounded shadow-premium border-b-4 border-transparent hover:border-accent-500 transition-all duration-300 group">
        <div class="w-14 h-14 md:w-16 md:h-16 bg-brand-50 rounded-full flex items-center justify-center mb-5 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
          ${iconFn(28)}
        </div>
        <h3 class="text-lg font-heading font-bold text-gray-900 mb-2">${escapeHTML(item.title)}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">${escapeHTML(item.desc)}</p>
      </div>`;
  }).join('');

  return `
  <section class="py-12 md:py-20 bg-white relative z-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mt-20 md:-mt-32">
        ${cards}
      </div>
    </div>
  </section>`;
}

// ─── Products Section ────────────────────────────────────────────────────────
function renderProductsSection() {
  const content = getContent();
  const warehouseBg = optimizedImage(
    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=70',
    'Warehouse background',
    'w-full h-full object-cover',
    'w-full h-full absolute inset-0'
  );

  const productCards = (content.products || []).map((product) => {
    const prodImg = optimizedImage(
      product.image,
      product.title,
      'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500',
      'w-full h-56 md:h-64'
    );

    return `
      <div class="group bg-white rounded-lg shadow-premium overflow-hidden hover:shadow-xl transition-all duration-300">
        <div class="relative overflow-hidden">
          ${prodImg.html}
          <div class="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/40 transition-all duration-300 flex items-center justify-center">
            <a href="product.html?id=${product.id}" class="px-6 py-2 bg-white text-brand-900 font-semibold rounded opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
              View Details
            </a>
          </div>
          <span class="absolute top-3 left-3 px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded uppercase tracking-wide">
            ${escapeHTML(product.category)}
          </span>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-heading font-bold text-gray-900 mb-2">${escapeHTML(product.title)}</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">${escapeHTML(product.description)}</p>
          <a href="product.html?id=${product.id}" class="inline-flex items-center gap-1 text-brand-600 font-semibold text-sm hover:text-brand-800 transition-colors">
            Learn More ${icons.ArrowRight(16)}
          </a>
        </div>
      </div>`;
  }).join('');

  return `
  <section id="products" class="py-24 relative">
    <!-- Background image with overlay -->
    <div class="absolute inset-0 z-0">
      ${warehouseBg.html}
      <div class="absolute inset-0 bg-gray-50/95 backdrop-blur-sm z-10"></div>
    </div>
    <div class="container mx-auto px-4 relative z-10">
      <!-- Header row -->
      <div class="flex flex-col md:flex-row justify-between items-end mb-12">
        <div class="max-w-2xl">
          <span class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">Our Product Range</span>
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900">Quality Supplies for Every Business Need</h2>
        </div>
        <a href="index.html#contact" class="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-800 transition-colors bg-white px-6 py-3 rounded shadow-sm">
          Download Full Catalog ${icons.ArrowRight(18)}
        </a>
      </div>
      <!-- Product grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${productCards}
      </div>
    </div>
  </section>`;
}

// ─── Industries Section ──────────────────────────────────────────────────────
function renderIndustriesSection() {
  const content = getContent();

  const industryCards = (content.industries || []).map((item) => {
    const indImg = optimizedImage(
      item.image,
      item.title,
      'w-full h-full object-cover group-hover:scale-110 transition-transform duration-700',
      'w-full h-full absolute inset-0'
    );

    return `
      <a href="industry.html?id=${item.id}" class="group relative block rounded-xl overflow-hidden min-h-[280px] md:min-h-[320px] shadow-premium">
        ${indImg.html}
        <div class="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent z-10"></div>
        <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          <div class="w-12 h-1 bg-accent-500 mb-4 group-hover:w-20 transition-all duration-300"></div>
          <h3 class="text-xl md:text-2xl font-heading font-bold text-white mb-2">${escapeHTML(item.title)}</h3>
          <p class="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-2">${escapeHTML(item.description)}</p>
          <span class="inline-flex items-center gap-1 text-accent-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
            Explore More ${icons.ArrowRight(16)}
          </span>
        </div>
      </a>`;
  }).join('');

  return `
  <section id="industries" class="py-20 md:py-28 bg-brand-900 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <span class="text-accent-400 font-bold uppercase tracking-widest text-sm mb-2 block">Who We Serve</span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white">Industries We Power</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        ${industryCards}
      </div>
    </div>
  </section>`;
}

// ─── Stats Section ───────────────────────────────────────────────────────────
function renderStatsSection() {
  const content = getContent();

  const statItems = ((content.stats && content.stats.items) || []).map((item) => `
    <div class="px-4 py-2">
      <div class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-2">${escapeHTML(item.value)}</div>
      <div class="text-xs md:text-sm uppercase tracking-widest text-gray-200 font-medium">${escapeHTML(item.label)}</div>
    </div>
  `).join('');

  return `
  <section class="py-16 md:py-20 bg-brand-900 text-white relative md:bg-fixed bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=70')">
    <div class="absolute inset-0 bg-brand-900/90"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-8 text-center md:divide-x md:divide-white/10">
        ${statItems}
      </div>
    </div>
  </section>`;
}

// ─── About Section ───────────────────────────────────────────────────────────
function renderAboutSection() {
  const content = getContent();
  const about = content.about;

  const img1 = optimizedImage(
    about.image1,
    'Corporate office',
    'w-full h-full object-cover rounded-lg',
    'w-full h-64 rounded-lg'
  );
  const img2 = optimizedImage(
    about.image2,
    'Team meeting',
    'w-full h-full object-cover rounded-lg',
    'w-full h-64 rounded-lg'
  );

  const checkItems = about.checkItems || [
    'Authorized OEM Partner',
    'Trusted Banking Supplier',
    'East Godavari Specialist',
    'GST Compliant Billing',
    '24/7 Enterprise Support',
    'Genuine Hardware Warranty'
  ];

  const checkList = checkItems.map((item) => `
    <div class="flex items-center gap-3">
      <div class="w-6 h-6 bg-accent-500/10 rounded-full flex items-center justify-center flex-shrink-0">
        ${icons.Check(14, 'text-accent-600')}
      </div>
      <span class="text-gray-700 text-sm font-medium">${escapeHTML(item)}</span>
    </div>
  `).join('');

  return `
  <section id="about" class="py-20 md:py-28 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left: Images -->
        <div class="relative">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-4">
              ${img1.html}
            </div>
            <div class="space-y-4 pt-8">
              ${img2.html}
            </div>
          </div>
          <!-- Floating experience card -->
          <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-brand-900 text-white px-8 py-4 rounded-lg shadow-xl text-center z-10">
            <div class="text-3xl md:text-4xl font-heading font-bold text-accent-400">${escapeHTML(about.yearsExperience)}</div>
            <div class="text-xs uppercase tracking-widest text-gray-200 font-medium">Years of Experience</div>
          </div>
        </div>
        <!-- Right: Content -->
        <div>
          <span class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">About ReliaIT</span>
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">${escapeHTML(about.title)}</h2>
          <p class="text-gray-600 leading-relaxed mb-4">${escapeHTML(about.description1)}</p>
          <p class="text-gray-600 leading-relaxed mb-8">${escapeHTML(about.description2)}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${checkList}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Contact Section (exported for reuse by product/industry pages) ──────────
export function renderContactSection(container) {
  container.innerHTML = renderContactSectionHTML();
  attachAllImages();
  wireContactForm();
}

// ─── Contact Form Logic ──────────────────────────────────────────────────────
function wireContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Live validation: clear error styling on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('invalid', 'border-red-500');
      field.classList.add('border-gray-300');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('contact-submit-btn');
    const statusEl = document.getElementById('contact-status');

    // Prevent double-submit
    if (submitBtn.disabled) return;
    submitBtn.disabled = true;

    // Validate fields
    const emailField = document.getElementById('contact-email');
    const phoneField = document.getElementById('contact-phone');
    const messageField = document.getElementById('contact-message');
    const nameField = document.getElementById('contact-name');

    let valid = true;
    [nameField, emailField, phoneField, messageField].forEach(f => {
      if (f) { f.classList.remove('invalid', 'border-red-500'); f.classList.add('border-gray-300'); }
    });

    if (!nameField.value.trim()) {
      nameField.classList.add('invalid', 'border-red-500');
      nameField.classList.remove('border-gray-300');
      valid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailField.value.trim())) {
      emailField.classList.add('invalid', 'border-red-500');
      emailField.classList.remove('border-gray-300');
      valid = false;
    }

    if (phoneField.value.trim()) {
      const phoneDigits = phoneField.value.replace(/[\s+()\-]/g, '');
      if (!/^\d{10,15}$/.test(phoneDigits)) {
        phoneField.classList.add('invalid', 'border-red-500');
        phoneField.classList.remove('border-gray-300');
        valid = false;
      }
    }

    if (!messageField.value.trim() || messageField.value.trim().length < 10) {
      messageField.classList.add('invalid', 'border-red-500');
      messageField.classList.remove('border-gray-300');
      valid = false;
    }

    if (!valid) {
      submitBtn.disabled = false;
      statusEl.textContent = 'Please fix the highlighted fields.';
      statusEl.classList.remove('hidden', 'text-green-600');
      statusEl.classList.add('text-red-600');
      return;
    }

    // Gather data
    const formData = new FormData(form);
    const templateParams = {
      name: formData.get('name'),
      organization: formData.get('organization') || '',
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      message: formData.get('message'),
    };

    // State: sending
    submitBtn.disabled = true;
    submitBtn.innerHTML = `${icons.Loader2(18, 'animate-spin')} Sending...`;
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
    statusEl.classList.add('hidden');

    try {
      await Promise.race([
        window.emailjs.send('service_e76uye3', 'template_co7ok5i', templateParams),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000))
      ]);

      // State: sent
      submitBtn.innerHTML = `${icons.CheckCircle2(18)} Message Sent!`;
      submitBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
      submitBtn.classList.add('bg-green-600');
      statusEl.textContent = 'Thank you! We will get back to you shortly.';
      statusEl.classList.remove('hidden', 'text-red-600');
      statusEl.classList.add('text-green-600');
      form.reset();

      // Reset button after 5 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message ${icons.ArrowRight(16)}`;
        submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600');
        submitBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
        statusEl.classList.add('hidden');
      }, 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      // State: error
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message ${icons.ArrowRight(16)}`;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
      statusEl.textContent = 'Something went wrong. Please try again or call us directly.';
      statusEl.classList.remove('hidden', 'text-green-600');
      statusEl.classList.add('text-red-600');
    }
  });
}

// ─── Testimonials Section ────────────────────────────────────────────────────
function renderTestimonialsSection() {
  const testimonials = [
    {
      name: "Ramesh Babu Kothapalli",
      role: "Branch Manager",
      org: "State Bank of India, Rajahmundry",
      text: "We have been procuring all our IT consumables from ReliaIT for the past 3 years. Toner delivery is always on time, even on urgent basis. Very reliable and the billing is always GST compliant. Best vendor we have worked with in East Godavari.",
      rating: 5,
      initials: "RK"
    },
    {
      name: "P. Lakshmi Narasimha Rao",
      role: "Principal",
      org: "Sri Venkateswara EM High School, Kakinada",
      text: "They set up our entire computer lab with 30 desktops, networking, and projectors. The quality of hardware is genuine and they even helped us with AMC. Our students are very happy with the new lab. Thank you ReliaIT team!",
      rating: 5,
      initials: "PLR"
    },
    {
      name: "K. Suresh Kumar",
      role: "District Procurement Officer",
      org: "Revenue Department, East Godavari",
      text: "ReliaIT is our go-to GeM registered supplier for all office stationery and computer peripherals. Their tender documentation is always perfect and delivery happens well before the deadline. Very professional team.",
      rating: 5,
      initials: "KS"
    },
    {
      name: "Srinivasa Rao Mandava",
      role: "Owner",
      org: "Mandava Enterprises, Rajahmundry",
      text: "I was struggling to find a reliable supplier for POS machines and billing rolls for my 3 retail shops. ReliaIT not only supplied everything but also helped with installation. Their rates are very competitive compared to Hyderabad dealers.",
      rating: 5,
      initials: "SM"
    },
    {
      name: "Dr. Vijaya Kumari B.",
      role: "Administrative Officer",
      org: "Andhra Bank (Now Union Bank), Amalapuram",
      text: "From printer cartridges to complete desktop setups, ReliaIT handles all our IT needs. What I appreciate most is their same-day delivery within East Godavari. No other vendor gives this kind of service in our area.",
      rating: 4,
      initials: "VK"
    },
    {
      name: "Mohammed Irfan",
      role: "IT Coordinator",
      org: "Govt. Degree College, Rajamahendravaram",
      text: "We ordered bulk computer stationery for our semester exams — answer booklets, continuous paper, and printer ribbons. Everything was delivered in 2 days flat. Quality was excellent and rates were within our budget. Highly recommended!",
      rating: 5,
      initials: "MI"
    }
  ];

  const stars = (count) => Array.from({ length: 5 }, (_, i) =>
    i < count
      ? icons.Star(14, 'text-yellow-400')
      : icons.Star(14, 'text-gray-300')
  ).join('');

  // Show 3 cards on desktop, scrollable on mobile
  const cards = testimonials.map(t => `
    <div class="bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-100 flex flex-col min-w-[300px] md:min-w-0">
      <div class="flex items-center gap-1 mb-4">${stars(t.rating)}</div>
      <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-1 italic">"${escapeHTML(t.text)}"</p>
      <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div class="w-11 h-11 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">${t.initials}</div>
        <div>
          <div class="font-bold text-gray-900 text-sm">${escapeHTML(t.name)}</div>
          <div class="text-xs text-gray-500">${escapeHTML(t.role)}</div>
          <div class="text-xs text-brand-600 font-medium">${escapeHTML(t.org)}</div>
        </div>
      </div>
    </div>
  `).join('');

  return `
  <section class="py-20 md:py-28 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-14">
        <span class="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">What Our Clients Say</span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-gray-900">Trusted Across East Godavari</h2>
        <p class="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">From bank branches to schools, government offices to retail shops — here's what our valued partners say about working with ReliaIT.</p>
      </div>
      <!-- Mobile: horizontal scroll / Desktop: grid -->
      <div class="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar">
        ${cards}
      </div>
      <!-- Trust badges -->
      <div class="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-400">
        <div class="flex items-center gap-2">
          ${icons.ShieldCheck(18, 'text-brand-600')}
          <span>GeM Registered</span>
        </div>
        <div class="flex items-center gap-2">
          ${icons.CheckCircle2(18, 'text-brand-600')}
          <span>ISO Compliant Billing</span>
        </div>
        <div class="flex items-center gap-2">
          ${icons.Truck(18, 'text-brand-600')}
          <span>Same-Day Delivery</span>
        </div>
        <div class="flex items-center gap-2">
          ${icons.Building2(18, 'text-brand-600')}
          <span>200+ Corporate Clients</span>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Main Page Renderer ──────────────────────────────────────────────────────
export function renderHome(container) {
  // Build full page HTML from all sections
  const html = [
    renderHeroSection(),
    renderFeaturesSection(),
    renderProductsSection(),
    renderIndustriesSection(),
    renderStatsSection(),
    renderAboutSection(),
    renderTestimonialsSection(),
    // Contact section HTML is inlined here (not using renderContactSection to avoid double-setting innerHTML)
    renderContactSectionHTML(),
  ].join('');

  container.innerHTML = html;

  // Attach optimized image handlers
  attachAllImages();

  // Wire up event listeners
  wireHeroButtons();
  wireContactForm();
}

// ─── Contact Section (HTML only, for embedding in full page) ─────────────────
function renderContactSectionHTML() {
  const content = getContent();
  const general = content.general;

  return `
  <section id="contact" class="py-20 md:py-28 bg-brand-950 relative overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, #ffffff 1px, transparent 1px); background-size: 30px 30px;"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <span class="text-accent-400 font-bold uppercase tracking-widest text-sm mb-2 block">Get In Touch</span>
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-white">Contact Our Team</h2>
      </div>
      <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-5">
          <!-- Left: Contact Info -->
          <div class="lg:col-span-2 bg-brand-900 p-8 md:p-10 text-white">
            <h3 class="text-xl font-heading font-bold mb-6">Contact Information</h3>
            <p class="text-gray-200 text-sm mb-8 leading-relaxed">Reach out for product inquiries, bulk order quotes, or partnership discussions.</p>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  ${icons.Phone(18)}
                </div>
                <div>
                  <div class="text-xs uppercase tracking-wider text-gray-400 mb-1">Phone</div>
                  <a href="tel:${escapeHTML(general.phone.replace(/\s/g, ''))}" class="text-white hover:text-accent-400 transition-colors font-medium">${escapeHTML(general.phone)}</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  ${icons.Mail(18)}
                </div>
                <div>
                  <div class="text-xs uppercase tracking-wider text-gray-400 mb-1">Email</div>
                  <a href="mailto:${escapeHTML(general.email)}" class="text-white hover:text-accent-400 transition-colors font-medium">${escapeHTML(general.email)}</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  ${icons.MapPin(18)}
                </div>
                <div>
                  <div class="text-xs uppercase tracking-wider text-gray-400 mb-1">Address</div>
                  <p class="text-white font-medium leading-relaxed">${escapeHTML(general.address)}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Right: Form -->
          <div class="lg:col-span-3 p-8 md:p-10">
            <form id="contact-form" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" id="contact-name" name="name" required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
                    placeholder="Your name" />
                </div>
                <div>
                  <label for="contact-org" class="block text-sm font-medium text-gray-700 mb-1.5">Organization</label>
                  <input type="text" id="contact-org" name="organization"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm"
                    placeholder="Company name" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input type="email" id="contact-email" name="email" required
                    pattern="[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}"
                    aria-describedby="contact-email-error"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm peer"
                    placeholder="you@company.com" />
                  <p id="contact-email-error" class="hidden peer-[.invalid]:block text-red-500 text-xs mt-1" role="alert">Please enter a valid email address</p>
                </div>
                <div>
                  <label for="contact-phone" class="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" id="contact-phone" name="phone"
                    pattern="[+]?[0-9\\s(){}-]{10,15}"
                    maxlength="15"
                    aria-describedby="contact-phone-error"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm peer"
                    placeholder="+91 XXXXX XXXXX" />
                  <p id="contact-phone-error" class="hidden peer-[.invalid]:block text-red-500 text-xs mt-1" role="alert">Please enter a valid phone number (10-15 digits)</p>
                </div>
              </div>
              <div>
                <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea id="contact-message" name="message" required rows="4" minlength="10"
                  aria-describedby="contact-message-error"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all text-sm resize-none peer"
                  placeholder="Tell us about your requirements..."></textarea>
                <p id="contact-message-error" class="hidden peer-[.invalid]:block text-red-500 text-xs mt-1" role="alert">Message must be at least 10 characters</p>
              </div>
              <div id="contact-status" class="hidden text-sm font-medium"></div>
              <button type="submit" id="contact-submit-btn"
                class="w-full sm:w-auto px-8 py-3.5 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                Send Message ${icons.ArrowRight(16)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

// ─── Hero Button Wiring ──────────────────────────────────────────────────────
function wireHeroButtons() {
  const exploreBtn = document.getElementById('hero-explore-btn');
  const quoteBtn = document.getElementById('hero-quote-btn');

  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const target = document.getElementById('industries');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (quoteBtn) {
    quoteBtn.addEventListener('click', () => {
      const target = document.getElementById('contact');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ─── Page Initialization ────────────────────────────────────────────────────
async function init() {
  // Show loading spinner
  document.getElementById('app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-white">
      <div class="flex flex-col items-center gap-2 text-brand-900">
        ${icons.Loader2(40, 'animate-spin text-accent-500')}
        <span class="text-sm font-bold animate-pulse">Loading...</span>
      </div>
    </div>`;

  // Initialize content (Firebase + localStorage)
  await initContent();

  // Render shared UI
  renderHeader();
  renderFooter();
  renderWhatsAppButton();

  // Render all home sections
  renderHome(document.getElementById('app'));

  // Handle hash scrolling (e.g. index.html#about) - retry until element exists
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    let attempts = 0;
    let rafId;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 20) {
        attempts++;
        rafId = requestAnimationFrame(tryScroll);
      }
    };
    rafId = requestAnimationFrame(tryScroll);
    // Cancel scroll polling if page unloads
    window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId), { once: true });
  }
}

init();
