import { defineConfig } from 'vite'

const base = process.env.VITE_BASE ?? "/"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  base
})