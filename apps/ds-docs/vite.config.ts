import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dsReactSrc = resolve(__dirname, '../../packages/ds-react/src/index.ts');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Desenvolvimento: consome o código-fonte do pacote sem precisar de `build` prévio.
      '@meu-ds/react': dsReactSrc,
    },
  },
});
