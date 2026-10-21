import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://katakating.pages.dev',
  trailingSlash: 'ignore',
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://katakating.pages.dev',
          changeOrigin: true,
          secure: true,
        }
      }
    }
  }
});
