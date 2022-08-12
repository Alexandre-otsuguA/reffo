const { i18n } = require('./next-i18next.config');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  pwa: {
    register: true,
    runtimeCaching,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.zst.com.br', 'images.unsplash.com', 'img.icons8.com'],
  },
});
