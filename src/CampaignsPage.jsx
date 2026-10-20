import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const campaigns = [
  {
    id: 'video-btfw',
    title: 'Bhubaneswar Times Fashion Week 2026 — Official Runway Highlights',
    platform: 'Runway Video',
    url: '/campaign_btfw_video.mp4',
    video: '/campaign_btfw_video.mp4',
    thumbnail: '/campaign_btfw_stage.jpg',
    tag: 'Official Video',
  },
  {
    id: 'ig-btfw',
    title: 'Bhubaneswar Times Fashion Week 2026 — Official Reel',
    platform: 'Instagram',
    url: 'https://www.instagram.com/reel/DemhmoXvUC7/?vrfl=MThjb3dneHd2eHY1bg==',
    videoId: null,
    thumbnail: '/campaign_btfw_model_runway.jpg',
    tag: 'Fashion Week',
  },
  {
    id: 'press-btfw',
    title: 'Times of India Press Feature — FANTÔME Energises BTFW 2026',
    platform: 'Times of India',
    url: 'https://www.instagram.com/reel/DemhmoXvUC7/?vrfl=MThjb3dneHd2eHY1bg==',
    videoId: null,
    thumbnail: '/campaign_btfw_newspaper.jpg',
    tag: 'Press Feature',
  },
  {
    id: 'stage-btfw',
    title: 'Times Power 2026 — Shriya Saran & Ethos Founders Showcase',
    platform: 'Event Showcase',
    url: 'https://www.instagram.com/reel/DemhmoXvUC7/?vrfl=MThjb3dneHd2eHY1bg==',
    videoId: null,
    thumbnail: '/campaign_btfw_stage.jpg',
    tag: 'Star Activation',
  },
  {
    id: 'runway-btfw',
    title: 'BTFW 2026 Runway Showcase — Bold Ramp Walk with Fantôme',
    platform: 'Runway Live',
    url: 'https://www.instagram.com/reel/DemhmoXvUC7/?vrfl=MThjb3dneHd2eHY1bg==',
    videoId: null,
    thumbnail: '/campaign_btfw_models.jpg',
    tag: 'Runway Highlights',
  },
  {
    id: 'yt-1',
    title: 'Fantôme Energy — Official Ad Campaign',
    platform: 'YouTube',
    url: 'https://youtu.be/nY17PjJHLWA?si=hsNBHW1bZuCYsf_p',
    videoId: 'nY17PjJHLWA',
    thumbnail: 'https://img.youtube.com/vi/nY17PjJHLWA/maxresdefault.jpg',
    tag: 'Official Ad',
  },
  {
    id: 'yt-2',
    title: 'Fantôme Energy — Brand Film',
    platform: 'YouTube',
    url: 'https://youtu.be/YDOju5uljKI?si=vhsCg7DlQy5Sum9e',
    videoId: 'YDOju5uljKI',
    thumbnail: 'https://img.youtube.com/vi/YDOju5uljKI/maxresdefault.jpg',
    tag: 'Brand Film',
  },
  {
    id: 'fb-1',
    title: 'Fantôme Energy — Social Campaign at Birla Global University',
    platform: 'Facebook',
    url: 'https://www.facebook.com/share/r/1Adsam4pTG/',
    videoId: null,
    thumbnail: '/campaign_birla.jpg',
    tag: 'Social Media',
  },
  {
    id: 'yt-3',
    title: 'Fantôme Energy — Launch Event Highlights',
    platform: 'YouTube',
    url: 'https://youtu.be/reWlwI_8WJo?si=CvG4GxmZJ5txHl-H',
    videoId: 'reWlwI_8WJo',
    thumbnail: 'https://img.youtube.com/vi/reWlwI_8WJo/maxresdefault.jpg',
    tag: 'Event Highlights',
  },
];

function CampaignsPage() {
  const [activeVideoModal, setActiveVideoModal] = React.useState(null);
  const [activeFlavor] = React.useState(() => {
    const saved = localStorage.getItem('fantome-flavor');
    return saved !== null ? saved : 'Sugar Free';
  });

  const flavorColors = {
    'Original': '#0284C7',
    'Mojito': '#059669',
    'Sugar Free': '#475569'
  };

  const activeColor = flavorColors[activeFlavor] || '#059669';

  const [isDarkMode] = React.useState(() => {
    const saved = sessionStorage.getItem('fantome-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  React.useEffect(() => {
    document.documentElement.style.setProperty('--active-color', activeColor);
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode, activeColor]);

  return (
    <div className={`${isDarkMode ? 'fantome-dark' : 'fantome-light'} min-h-screen relative text-slate-200 overflow-hidden bg-transparent`}>
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        <nav className="w-full p-4 md:p-6 pt-2 md:pt-4">
          <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center rounded-full shadow-lg">
            <Link
              to="/"
              className="font-sans font-bold text-2xl tracking-[0.2em] select-none cursor-pointer transition-all duration-500 no-underline"
              style={{ color: activeColor }}
            >
              FANTÔME
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer hover:scale-105 no-underline"
              style={{
                backgroundColor: `${activeColor}15`,
                borderColor: `${activeColor}50`,
              }}
            >
              <ArrowLeft className="w-4 h-4" style={{ color: activeColor }} />
              <span className="text-slate-200">Back to Home</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Page Content */}
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="text-sm font-semibold tracking-[0.3em] uppercase"
            style={{ color: activeColor }}
          >
            Media Gallery
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-sans uppercase mt-2">
            All Campaigns
          </h1>
          <p className="text-[var(--text-sub)] text-sm md:text-base font-light tracking-wide mt-4 max-w-xl mx-auto">
            Explore all our brand activations, ad campaigns, and event highlights across platforms.
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {campaigns.map((camp, idx) => {
            const isVideo = Boolean(camp.video);
            return (
              <motion.a
                key={camp.id}
                href={camp.url}
                target={isVideo ? undefined : "_blank"}
                rel={isVideo ? undefined : "noopener noreferrer"}
                onClick={(e) => {
                  if (isVideo) {
                    e.preventDefault();
                    setActiveVideoModal(camp);
                  }
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -8 }}
                className="rounded-3xl overflow-hidden glass-panel shadow-2xl relative group flex flex-col h-full transform-gpu cursor-pointer no-underline text-slate-200 border"
                style={{
                  contain: 'content',
                  background: isDarkMode 
                    ? '' 
                    : `linear-gradient(135deg, color-mix(in srgb, ${activeColor} 12%, #ffffff) 0%, color-mix(in srgb, ${activeColor} 4%, #ffffff) 100%)`,
                  borderColor: isDarkMode ? '' : `color-mix(in srgb, ${activeColor} 30%, var(--border-glass))`
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, color-mix(in srgb, ${activeColor} 20%, transparent) 0%, color-mix(in srgb, ${activeColor} 5%, transparent) 60%, transparent 100%)`
                  }}
                />

                {/* Hover glow line */}
                <div
                  className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: activeColor }}
                />

                {/* Thumbnail */}
                <div className="relative aspect-[16/9] overflow-hidden transform-gpu"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(125,211,252,0.1)' : `color-mix(in srgb, ${activeColor} 8%, #ffffff)`
                  }}
                >
                  <img
                    src={camp.thumbnail}
                    alt={camp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                    style={{
                      transform: 'translate3d(0, 0, 0)',
                      backfaceVisibility: 'hidden',
                    }}
                    onError={(e) => {
                      // Fallback for maxresdefault not existing
                      if (camp.videoId && e.target.src.includes('maxresdefault')) {
                        e.target.src = `https://img.youtube.com/vi/${camp.videoId}/hqdefault.jpg`;
                      }
                    }}
                  />

                  {/* Play button overlay for videos and reels */}
                  {(camp.videoId || camp.platform === 'Instagram' || isVideo) && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `color-mix(in srgb, ${activeColor} 85%, transparent)` }}
                      >
                        <Play className="w-7 h-7 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide border text-slate-800"
                      style={{
                        backgroundColor: isDarkMode ? 'rgba(125,211,252,0.7)' : `color-mix(in srgb, ${activeColor} 18%, #ffffff)`,
                        borderColor: isDarkMode ? 'rgba(56,189,248,0.3)' : `color-mix(in srgb, ${activeColor} 35%, transparent)`,
                        color: isDarkMode ? '#0f172a' : `color-mix(in srgb, ${activeColor} 90%, #000000)`
                      }}
                    >
                      {camp.tag}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide text-white"
                      style={{ backgroundColor: activeColor }}
                    >
                      {camp.platform}
                    </span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 relative z-20 space-y-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg md:text-xl font-bold font-sans uppercase tracking-wide text-[var(--text-main)] group-hover:text-[var(--text-accent)] transition-all duration-300">
                    {camp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wide mt-auto pt-2"
                    style={{ color: activeColor }}
                  >
                    {camp.video ? (
                      <Play className="w-3.5 h-3.5" fill="currentColor" />
                    ) : camp.platform === 'Instagram' ? (
                      <InstagramIcon className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {camp.video
                        ? 'Watch Runway Video'
                        : camp.platform === 'Instagram'
                        ? 'Watch Reel on Instagram'
                        : camp.platform === 'Times of India' || camp.platform === 'Press Feature'
                        ? 'View Coverage & Reel'
                        : `Watch on ${camp.platform}`}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Video Modal Player */}
        <AnimatePresence>
          {activeVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoModal(null)}
              className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col bg-slate-950"
              >
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Campaign Broadcast</span>
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase">{activeVideoModal.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close video player"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative aspect-[16/9] w-full bg-black">
                  <video
                    src={activeVideoModal.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t py-12 px-6 relative z-20"
        style={{ borderColor: isDarkMode ? 'rgba(56,189,248,0.2)' : `color-mix(in srgb, ${activeColor} 20%, rgba(15, 23, 42, 0.1))` }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans font-bold text-xl tracking-[0.2em]"
            style={{ color: activeColor }}
          >
            FANTÔME
          </div>
          <p className="text-xs text-[var(--text-muted)] tracking-wide">
            © {new Date().getFullYear()} Fantôme Energy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CampaignsPage;
