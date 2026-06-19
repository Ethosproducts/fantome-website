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
          <Route path="/" element={<App page="home" />} />
          <Route path="/flavors" element={<App page="flavors" />} />
          <Route path="/story" element={<App page="story" />} />
          <Route path="/campaigns" element={<App page="campaigns" />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
