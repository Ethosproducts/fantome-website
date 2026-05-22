import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const campaigns = [
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
    title: 'Fantôme Energy — Social Campaign',
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

const activeColor = '#0284c7';

function CampaignsPage() {
  return (
    <div className="min-h-screen relative text-slate-800 overflow-hidden bg-transparent">
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-50 flex flex-col">
        <nav className="w-full p-4 md:p-6 pt-2 md:pt-4">
          <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center rounded-full shadow-lg">
            <Link
              to="/"
              className="font-sans font-bold text-2xl tracking-[0.2em] text-sky-950 select-none cursor-pointer transition-all duration-500 no-underline"
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
              <span className="text-slate-800">Back to Home</span>
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
          <p className="text-sky-900 text-sm md:text-base font-light tracking-wide mt-4 max-w-xl mx-auto">
            Explore all our brand activations, ad campaigns, and event highlights across platforms.
          </p>
        </motion.div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {campaigns.map((camp, idx) => (
            <motion.a
              key={camp.id}
              href={camp.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl overflow-hidden glass-panel border border-sky-400/40 shadow-2xl relative group flex flex-col h-full transform-gpu cursor-pointer no-underline text-slate-800"
              style={{ contain: 'content' }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-300/40 via-sky-300/10 to-transparent z-10 pointer-events-none" />

              {/* Hover glow line */}
              <div
                className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: activeColor }}
              />

              {/* Thumbnail */}
              <div className="relative aspect-[16/9] overflow-hidden bg-sky-300/30 transform-gpu">
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

                {/* Play button overlay for videos */}
                {camp.videoId && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: 'rgba(2, 132, 199, 0.85)' }}
                    >
                      <Play className="w-7 h-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide bg-sky-300/80 border border-sky-400/30 text-slate-800">
                    {camp.tag}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wide bg-sky-600 text-white"
                  >
                    {camp.platform}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 relative z-20 space-y-3 flex-1 flex flex-col justify-between">
                <h3 className="text-lg md:text-xl font-bold font-sans uppercase tracking-wide text-slate-800 group-hover:text-sky-700 transition-all duration-300">
                  {camp.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-sky-700 mt-auto pt-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch on {camp.platform}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-sky-400/30 py-12 px-6 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-sans font-bold text-xl tracking-[0.2em] text-sky-950">
            FANTÔME
          </div>
          <p className="text-xs text-slate-500 tracking-wide">
            © {new Date().getFullYear()} Fantôme Energy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CampaignsPage;
