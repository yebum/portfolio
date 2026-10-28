// Set the entry state before the header is parsed, including on slow connections.
(() => {
  const route = location.hash.replace(/^#\/?/, '');
  const project = !location.hash && /^\/work\/[^/]+\/?$/.test(location.pathname);
  if (!project && (!route || route === 'top')) {
    document.documentElement.classList.add('arrival-pending');
  }
  // Keep navigation available if the main module fails to load.
  addEventListener('load', () => document.documentElement.classList.remove('arrival-pending'), { once: true });
})();
