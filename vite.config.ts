/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,  // Ajoute cette ligne
    exclude: [...configDefaults.exclude, 'tests/*'],
  }
})
