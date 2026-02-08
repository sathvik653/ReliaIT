// Optimized image helper - ported from OptimizedImage.tsx
// Returns HTML string + an attach function to wire up onload

let _imgCounter = 0;

export function optimizedImage(src, alt, imgClass = '', containerClass = '') {
  const id = 'oimg-' + (++_imgCounter);
  return {
    html: `<div class="relative overflow-hidden bg-gray-200 ${containerClass}">
      <img id="${id}" src="${src}" alt="${alt}" loading="lazy" decoding="async"
        class="transition-all duration-700 ease-in-out opacity-0 blur-xl scale-110 ${imgClass}" />
      <div id="${id}-shimmer" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style="background-size: 200% 100%;"></div>
    </div>`,
    attach() {
      const img = document.getElementById(id);
      if (img) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.remove('opacity-0', 'blur-xl', 'scale-110');
          img.classList.add('opacity-100', 'blur-0', 'scale-100');
          const shimmer = document.getElementById(id + '-shimmer');
          if (shimmer) shimmer.remove();
        } else {
          img.onload = () => {
            img.classList.remove('opacity-0', 'blur-xl', 'scale-110');
            img.classList.add('opacity-100', 'blur-0', 'scale-100');
            const shimmer = document.getElementById(id + '-shimmer');
            if (shimmer) shimmer.remove();
          };
        }
      }
    }
  };
}

// Batch attach all pending optimized images on the page
export function attachAllImages() {
  document.querySelectorAll('img[id^="oimg-"]').forEach(img => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.remove('opacity-0', 'blur-xl', 'scale-110');
      img.classList.add('opacity-100', 'blur-0', 'scale-100');
      const shimmer = document.getElementById(img.id + '-shimmer');
      if (shimmer) shimmer.remove();
    } else {
      img.onload = () => {
        img.classList.remove('opacity-0', 'blur-xl', 'scale-110');
        img.classList.add('opacity-100', 'blur-0', 'scale-100');
        const shimmer = document.getElementById(img.id + '-shimmer');
        if (shimmer) shimmer.remove();
      };
    }
  });
}
