// Auto-serve WebP images to browsers that support it
// Detect WebP support and replace image sources accordingly
(function() {
  const webpSupport = (function() {
    const elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
      return elem.toDataURL('image/webp').indexOf('image/webp') === 5;
    }
    return false;
  })();

  if (webpSupport) {
    // Replace image src with WebP versions
    document.querySelectorAll('img[src$=".png"], img[src$=".jpg"]').forEach(img => {
      const webpSrc = img.src.replace(/\.(png|jpg)$/, '.webp');
      const picture = img.closest('picture');

      if (picture) {
        // If inside picture tag, add source for WebP
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = webpSrc;
        picture.insertBefore(webpSource, img);
      }
    });

    // Preload critical WebP images
    const criticalImages = [
      '/assets/hero-ribeira.webp',
      '/assets/hero-porto-douro.webp'
    ];
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });
  }
})();

// Optimize lazy loading with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
