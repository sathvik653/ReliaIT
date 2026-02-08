// Shared UI components - vanilla JS conversions of Header.tsx, Footer.tsx, WhatsAppButton.tsx

import { icons } from './icons.js';
import { renderLogo } from './logo.js';
import { getContent } from './content.js';
import { isAuthenticated, logout } from './auth.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Determine whether the current page is the home / index page.
 */
function isHomePage() {
  const p = window.location.pathname;
  return p.endsWith('index.html') || p === '/' || p.endsWith('/');
}

/**
 * Shared navigation-click handler used by both Header and Footer.
 *
 * - Hash links (#about, #contact, etc.): if already on index.html scroll
 *   smoothly, otherwise redirect to index.html#target.
 * - External URLs (http / https): open in a new tab.
 * - Internal routes: navigate directly.
 */
function handleNavClick(e, href) {
  if (!href) return;

  // External link
  if (href.startsWith('http://') || href.startsWith('https://')) {
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
    return;
  }

  // Hash link (e.g. "#about", "/#about", "index.html#about")
  if (href.includes('#')) {
    e.preventDefault();
    const targetId = href.replace(/^.*#/, '');

    if (isHomePage()) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = 'index.html#' + targetId;
    }
    return;
  }

  // Plain internal route – let the browser navigate normally
}

// ---------------------------------------------------------------------------
// renderHeader
// ---------------------------------------------------------------------------

export function renderHeader() {
  const content = getContent();
  const authenticated = isAuthenticated();

  // ---- Build nav items (mirrors the React useMemo) ----
  const serviceChildren = (content.footer.productLinks || []).map(link => ({
    label: link.label,
    href: link.url
  }));

  const navItems = [
    { label: 'Home', href: 'index.html' },
    { label: 'Services', children: serviceChildren },
    { label: 'About', href: 'index.html#about' },
    { label: 'Contact', href: 'index.html#contact' }
  ];

  // ---- Top Bar ----
  const topbar = document.getElementById('topbar');
  if (topbar) {
    const phoneClean = (content.general.phone || '').replace(/\s/g, '');
    topbar.innerHTML = `
      <div class="bg-brand-900 text-white py-2 text-xs md:text-sm hidden md:block border-b border-brand-800">
        <div class="container mx-auto px-4 flex justify-between items-center">
          <div class="flex items-center space-x-6">
            <a href="tel:${phoneClean}" class="flex items-center gap-2 hover:text-accent-400 transition-colors">
              ${icons.Phone(14)}
              <span>${content.general.phone || ''}</span>
            </a>
            <a href="mailto:${content.general.email || ''}" class="flex items-center gap-2 hover:text-accent-400 transition-colors">
              ${icons.Mail(14)}
              <span>${content.general.email || ''}</span>
            </a>
          </div>
          <div class="flex items-center gap-4">
            <a href="${content.general.facebook || '#'}" class="hover:text-accent-400 transition-transform hover:-translate-y-0.5">${icons.Facebook(15)}</a>
            <a href="${content.general.twitter || '#'}" class="hover:text-accent-400 transition-transform hover:-translate-y-0.5">${icons.Twitter(15)}</a>
            <a href="${content.general.linkedin || '#'}" class="hover:text-accent-400 transition-transform hover:-translate-y-0.5">${icons.Linkedin(15)}</a>
            <a href="${content.general.instagram || '#'}" class="hover:text-accent-400 transition-transform hover:-translate-y-0.5">${icons.Instagram(15)}</a>
            ${authenticated
              ? `<button id="topbar-logout-btn" class="ml-2 hover:text-accent-400 flex items-center gap-1" title="Logout">
                   ${icons.LogOut(12)} <span class="text-[10px]">Logout</span>
                 </button>`
              : `<a href="login.html" class="ml-2 hover:text-accent-400" title="Admin Login">${icons.Lock(12)}</a>`
            }
          </div>
        </div>
      </div>`;

    // Attach topbar logout listener
    if (authenticated) {
      const logoutBtn = document.getElementById('topbar-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          await logout();
          window.location.href = 'index.html';
        });
      }
    }
  }

  // ---- Main Header ----
  const header = document.getElementById('main-header');
  if (!header) return;

  // Initial classes
  header.className = 'fixed top-0 w-full z-50 transition-all duration-300 border-b border-gray-100 bg-white py-2 shadow-sm md:mt-10';

  // Build desktop nav items HTML
  const desktopNavHTML = navItems.map((item) => {
    if (item.children) {
      // Services dropdown
      const dropdownLinks = item.children.map(child =>
        `<a href="${child.href || '#'}" class="nav-link block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent-500 hover:pl-8 transition-all border-b border-gray-50 last:border-0" data-href="${child.href || ''}">${child.label}</a>`
      ).join('');

      return `
        <div class="relative nav-dropdown-parent">
          <button class="flex items-center gap-1 text-sm font-bold text-brand-900 hover:text-accent-500 transition-colors uppercase tracking-wide font-heading py-4">
            ${item.label}
            <span class="chevron-icon transition-transform duration-300">${icons.ChevronDown(14)}</span>
          </button>
          <div class="nav-dropdown absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg border-t-2 border-accent-500 opacity-0 invisible transition-all duration-300 transform translate-y-2" style="pointer-events:none;">
            <div class="py-2">
              ${dropdownLinks}
            </div>
          </div>
        </div>`;
    }
    // Regular link
    return `
      <div class="relative group">
        <a href="${item.href || '#'}" class="nav-link text-sm font-bold text-brand-900 hover:text-accent-500 transition-colors uppercase tracking-wide font-heading relative py-4 block flex items-center gap-2" data-href="${item.href || ''}">
          ${item.label}
          <span class="absolute bottom-2 left-0 h-0.5 bg-accent-500 transition-all duration-300 w-0 group-hover:w-full"></span>
        </a>
      </div>`;
  }).join('');

  // Build mobile nav items HTML
  const mobileNavHTML = navItems.map((item) => {
    if (item.children) {
      const subLinks = item.children.map(child =>
        `<a href="${child.href || '#'}" class="nav-link block py-2 text-gray-600 hover:text-accent-500 text-base pl-2 border-l-2 border-gray-200 hover:border-accent-500" data-href="${child.href || ''}">${child.label}</a>`
      ).join('');

      return `
        <div>
          <button class="mobile-submenu-toggle flex items-center justify-between w-full text-left text-brand-900 font-bold text-lg py-3 border-b border-gray-50" data-label="${item.label}">
            ${item.label}
            <span class="mobile-chevron transition-transform">${icons.ChevronDown(20)}</span>
          </button>
          <div class="mobile-submenu hidden bg-gray-50 px-4 py-2 space-y-2" data-label="${item.label}">
            ${subLinks}
          </div>
        </div>`;
    }
    return `
      <div>
        <a href="${item.href || '#'}" class="nav-link block text-brand-900 font-bold text-lg py-3 border-b border-gray-50 hover:text-accent-500 transition-colors" data-href="${item.href || ''}">
          <span class="flex items-center gap-2">${item.label}</span>
        </a>
      </div>`;
  }).join('');

  // Auth section in mobile menu
  const mobileAuthHTML = authenticated
    ? `<button id="mobile-logout-btn" class="flex items-center gap-2 text-red-500 text-sm font-semibold w-full text-left">
         ${icons.LogOut(14)} Logout
       </button>`
    : `<a href="login.html" class="flex items-center gap-2 text-brand-500 text-sm font-semibold">
         ${icons.Lock(14)} Admin Login
       </a>`;

  header.innerHTML = `
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <a href="index.html" class="flex items-center py-2 group">
          ${renderLogo('default', 32)}
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <nav class="flex space-x-8">
            ${desktopNavHTML}
          </nav>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden p-2 text-brand-900 hover:text-accent-500 transition-colors" aria-label="Toggle menu">
          ${icons.Menu(28)}
        </button>
      </div>
    </div>

    <!-- Mobile Nav Overlay -->
    <div id="mobile-menu" class="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 max-h-[90vh] overflow-y-auto hidden" style="transition: all 0.3s ease;">
      <div class="flex flex-col p-6 space-y-2">
        ${mobileNavHTML}
        <div class="pt-4 border-t border-gray-100">
          ${mobileAuthHTML}
        </div>
      </div>
    </div>`;

  // ---- Attach Event Listeners ----

  // 1. Scroll detection: shadow + padding changes
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    if (scrolled) {
      header.classList.remove('py-2', 'shadow-sm', 'md:mt-10');
      header.classList.add('py-1', 'shadow-lg', 'mt-0');
    } else {
      header.classList.remove('py-1', 'shadow-lg', 'mt-0');
      header.classList.add('py-2', 'shadow-sm', 'md:mt-10');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll(); // run once on init

  // 2. Desktop dropdown hover (mouseenter / mouseleave)
  const dropdownParents = header.querySelectorAll('.nav-dropdown-parent');
  dropdownParents.forEach(parent => {
    const dropdown = parent.querySelector('.nav-dropdown');
    const chevron = parent.querySelector('.chevron-icon');
    if (!dropdown) return;

    parent.addEventListener('mouseenter', () => {
      dropdown.classList.remove('opacity-0', 'invisible', 'translate-y-2');
      dropdown.classList.add('opacity-100', 'visible', 'translate-y-0');
      dropdown.style.pointerEvents = 'auto';
      if (chevron) chevron.classList.add('rotate-180');
    });
    parent.addEventListener('mouseleave', () => {
      dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
      dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
      dropdown.style.pointerEvents = 'none';
      if (chevron) chevron.classList.remove('rotate-180');
    });
  });

  // 3. Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let mobileOpen = false;

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileOpen = !mobileOpen;
      if (mobileOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = icons.X(28);
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = icons.Menu(28);
      }
    });
  }

  // 4. Mobile submenu accordion
  const submenuToggles = header.querySelectorAll('.mobile-submenu-toggle');
  submenuToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.getAttribute('data-label');
      const submenu = header.querySelector(`.mobile-submenu[data-label="${label}"]`);
      const chevron = btn.querySelector('.mobile-chevron');

      if (!submenu) return;

      const isOpen = !submenu.classList.contains('hidden');

      // Close all submenus first
      header.querySelectorAll('.mobile-submenu').forEach(sm => sm.classList.add('hidden'));
      header.querySelectorAll('.mobile-submenu-toggle .mobile-chevron').forEach(ch => ch.classList.remove('rotate-180'));

      if (!isOpen) {
        submenu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      }
    });
  });

  // 5. Nav link clicks (both desktop and mobile)
  const allNavLinks = header.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('data-href') || link.getAttribute('href');
      handleNavClick(e, href);

      // Close mobile menu on any link click
      if (mobileMenu && mobileOpen) {
        mobileOpen = false;
        mobileMenu.classList.add('hidden');
        if (mobileMenuBtn) mobileMenuBtn.innerHTML = icons.Menu(28);
      }
    });
  });

  // 6. Mobile logout button
  if (authenticated) {
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        window.location.href = 'index.html';
      });
    }
  }
}

// ---------------------------------------------------------------------------
// renderFooter
// ---------------------------------------------------------------------------

export function renderFooter() {
  const content = getContent();
  const footer = document.getElementById('main-footer');
  if (!footer) return;

  // Quick links HTML
  const quickLinksHTML = (content.footer.quickLinks || []).map(item =>
    `<li>
       <a href="${item.url}" class="footer-nav-link hover:text-accent-500 transition-colors flex items-center gap-2 cursor-pointer" data-href="${item.url}">
         ${icons.ChevronRight(14, 'text-gray-600')} ${item.label}
       </a>
     </li>`
  ).join('');

  // Product / service links HTML
  const productLinksHTML = (content.footer.productLinks || []).map(item =>
    `<li>
       <a href="${item.url}" class="footer-nav-link hover:text-accent-500 transition-colors flex items-center gap-2 cursor-pointer" data-href="${item.url}">
         ${icons.ChevronRight(14, 'text-gray-600')} ${item.label}
       </a>
     </li>`
  ).join('');

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <footer class="bg-brand-900 text-gray-400 font-sans border-t border-brand-800">
      <div class="container mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <!-- About Widget -->
          <div>
            <div class="mb-6">
              ${renderLogo('light', 32)}
            </div>
            <p class="text-sm leading-relaxed mb-6 text-gray-400">
              ${content.footer.aboutText || ''}
            </p>
            <div class="flex gap-4">
              <a href="${content.general.facebook || '#'}" class="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300">${icons.Facebook(16)}</a>
              <a href="${content.general.twitter || '#'}" class="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300">${icons.Twitter(16)}</a>
              <a href="${content.general.linkedin || '#'}" class="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300">${icons.Linkedin(16)}</a>
              <a href="${content.general.instagram || '#'}" class="w-9 h-9 rounded bg-brand-800 flex items-center justify-center hover:bg-accent-500 hover:text-white transition-all duration-300">${icons.Instagram(16)}</a>
            </div>
          </div>

          <!-- Quick Links Widget -->
          <div>
            <h4 class="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul class="space-y-3 text-sm">
              ${quickLinksHTML}
            </ul>
          </div>

          <!-- Services Widget -->
          <div>
            <h4 class="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Our Services
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul class="space-y-3 text-sm">
              ${productLinksHTML}
            </ul>
          </div>

          <!-- Contact Widget -->
          <div>
            <h4 class="text-white font-heading font-bold text-lg mb-6 relative inline-block">
              Contact Info
              <span class="absolute -bottom-2 left-0 w-12 h-1 bg-accent-500 rounded-full"></span>
            </h4>
            <ul class="space-y-4 text-sm">
              <li class="flex items-start gap-3">
                ${icons.MapPin(18, 'text-accent-500 mt-1 flex-shrink-0')}
                <span>${content.general.address || ''}</span>
              </li>
              <li class="flex items-center gap-3">
                ${icons.Phone(18, 'text-accent-500 flex-shrink-0')}
                <span>${content.general.phone || ''}</span>
              </li>
              <li class="flex items-center gap-3">
                ${icons.Mail(18, 'text-accent-500 flex-shrink-0')}
                <span>${content.general.email || ''}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="border-t border-brand-800 bg-brand-950">
        <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            &copy; ${currentYear} ReliaIT. All rights reserved.
          </div>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>`;

  // ---- Attach event listeners for footer nav links ----
  const footerLinks = footer.querySelectorAll('.footer-nav-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('data-href') || link.getAttribute('href');
      handleNavClick(e, href);
    });
  });
}

// ---------------------------------------------------------------------------
// renderWhatsAppButton
// ---------------------------------------------------------------------------

export function renderWhatsAppButton() {
  const content = getContent();
  const container = document.getElementById('whatsapp-btn');
  if (!container) return;

  const phoneNumber = content.general.whatsapp || '919876543210';
  const message = 'Hello ReliaIT, I would like to inquire about your IT and stationery services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  container.innerHTML = `
    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer"
       class="fixed bottom-6 right-6 md:right-24 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)] group"
       aria-label="Contact us on WhatsApp">
      <div class="absolute -top-12 right-0 bg-white text-gray-800 text-xs font-bold py-2 px-4 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-gray-100">
        Chat with us!
        <div class="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45 border-b border-r border-gray-100"></div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
           class="bi bi-whatsapp md:w-8 md:h-8" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
    </a>`;
}
