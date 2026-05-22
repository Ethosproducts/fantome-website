import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Lazy load the campaigns page - it won't be included in the main bundle
const CampaignsPage = lazy(() => import('./CampaignsPage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-sky-600 font-bold text-xl tracking-[0.2em] animate-pulse">FANTÔME</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
