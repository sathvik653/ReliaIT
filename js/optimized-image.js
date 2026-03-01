// Optimized image helper - ported from OptimizedImage.tsx
// Returns HTML string + an attach function to wire up onload

let _imgCounter = 0;

function revealImage(img) {
  img.classList.remove('opacity-0', 'blur-xl', 'scale-110');
  img.classList.add('opacity-100', 'blur-0', 'scale-100');
  const shimmer = document.getElementById(img.id + '-shimmer');
  if (shimmer) shimmer.remove();
}

export function optimizedImage(src, alt, imgClass = '', containerClass = '', { eager = false } = {}) {
  const id = 'oimg-' + (++_imgCounter);
  const loadAttr = eager ? 'eager' : 'lazy';
  const fetchPri = eager ? ' fetchpriority="high"' : '';
  // Eager images (hero) skip blur animation for faster LCP
  const initialClasses = eager
    ? `opacity-100 ${imgClass}`
    : `transition-all duration-700 ease-in-out opacity-0 blur-xl scale-110 ${imgClass}`;
  const shimmer = eager
    ? ''
    : `<div id="${id}-shimmer" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style="background-size: 200% 100%;"></div>`;
  return {
    html: `<div class="relative overflow-hidden bg-gray-200 ${containerClass}">
      <img id="${id}" src="${src}" alt="${alt}" loading="${loadAttr}" decoding="${eager ? 'sync' : 'async'}"${fetchPri}
        class="${initialClasses}" />
      ${shimmer}
    </div>`,
    attach() {
      if (eager) return; // Eager images already visible, no handler needed
      const img = document.getElementById(id);
      if (!img) return;
      if (img.complete) {
        revealImage(img);
      } else {
        img.onload = () => revealImage(img);
        img.onerror = () => {
          img.alt = img.alt || 'Image unavailable';
          revealImage(img);
        };
      }
    }
  };
}

// Batch attach all pending optimized images on the page
export function attachAllImages() {
  document.querySelectorAll('img[id^="oimg-"]').forEach(img => {
    if (img.complete) {
      revealImage(img);
    } else {
      img.onload = () => revealImage(img);
      img.onerror = () => {
        img.alt = img.alt || 'Image unavailable';
        revealImage(img);
      };
    }
  });

  // Safety fallback: force-reveal any images still hidden after 3 seconds
  setTimeout(() => {
    document.querySelectorAll('img[id^="oimg-"].opacity-0').forEach(img => {
      revealImage(img);
    });
  }, 3000);
}
