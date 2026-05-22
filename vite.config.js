import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: true },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three-core'
          if (id.includes('node_modules/@react-three/fiber')) return 'three-fiber'
          if (id.includes('node_modules/@react-three/drei')) return 'three-drei'
          if (id.includes('node_modules/framer-motion')) return 'framer'
        }
      }
    }
  }
})
