import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const backend = { target: 'http://localhost:8081', changeOrigin: true }
export default defineConfig({ plugins: [react()], server: { proxy: { '/api': backend, '/dashboard': backend, '/purchase-requests': backend, '/suppliers': backend, '/supplier-compliance': backend, '/purchase-orders': backend, '/departments': backend, '/categories': backend, '/approval-hierarchy': backend, '/reports': backend } } })
