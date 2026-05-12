import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api/v1/users/me': {
        target: 'http://localhost:4000',
        rewrite: () => '/me',
      },
      '/api/v1/main/active-rentals': {
        target: 'http://localhost:4000',
        rewrite: () => '/active-rentals',
      },
      '/api/v1/main': {
        target: 'http://localhost:4000',
        rewrite: () => '/main',
      },
      '/api/v1/stations/bookmarks': {
        target: 'http://localhost:4000',
        rewrite: () => '/stations',
      },
      '/api/v1/stations': {
        target: 'http://localhost:4000',
        rewrite: (path) => {
          if (/\/api\/v1\/stations\/\d+\/products\/.+/.test(path))
            return path.replace(
              /^\/api\/v1\/stations\/\d+\/products\//,
              '/products_detail/',
            );
          if (/\/api\/v1\/stations\/\d+\/products/.test(path))
            return '/station-products';
          if (/\/api\/v1\/stations\/\d+/.test(path))
            return path.replace(/^\/api\/v1\/stations\//, '/station-');
          return '/stations';
        },
      },
      '/api/v1/events': {
        target: 'http://localhost:4000',
        rewrite: (path) => {
          if (/\/api\/v1\/events\/\d+/.test(path))
            return path.replace(/^\/api\/v1\/events\//, '/events_detail/');
          return '/events';
        },
      },
      '/api/v1/products': {
        target: 'http://localhost:4000',
        rewrite: (path) => {
          if (/\/api\/v1\/products\/.+/.test(path))
            return path.replace(/^\/api\/v1\/products\//, '/products_detail/');
          return '/products';
        },
      },
      '/api/v1/users/withdrawal-reasons': {
        target: 'http://localhost:4000',
        rewrite: () => '/withdrawal-reasons',
      },
      '/api/v1/users/me/rentals': {
        target: 'http://localhost:4000',
        rewrite: () => '/rentals',
      },
      '/api/v1/auth/token/refresh': {
        target: 'http://localhost:4000',
        rewrite: () => '/token-refresh',
      },
    },
  },
});
