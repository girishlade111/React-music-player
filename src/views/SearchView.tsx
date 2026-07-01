import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, Command, X, Clock, TrendingUp } from 'lucide-react';
import { genres, moods, recentSearches, trendingSearches } from '@/data/mockData';

export default function SearchView() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      key="search"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar"
    >
      {/* Search Input */}
      <motion.div variants={itemVariants} className="mb-10">
        <div className="flex items-center gap-4 border-b border-white/20 pb-3">
          <Search size={22} strokeWidth={1.5} className="text-white/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}

            placeholder="Type anything to search..."
            className="flex-1 bg-transparent text-lg sm:text-2xl lg:text-3xl font-light text-white placeholder:text-white/20 outline-none"
            autoFocus
          />
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Mic size={18} strokeWidth={1.5} className="text-white/40" />
            </button>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/10">
              <Command size={12} strokeWidth={1.5} className="text-white/40" />
              <span className="text-xs text-white/40 font-light">K</span>
            </div>
          </div>
        </div>
      </motion.div>

      {query.length === 0 ? (
        <>
          {/* Recent & Trending */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-8 mb-4">
              <h3 className="text-xs font-normal tracking-widest uppercase text-white/40">
                Recent
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, i) => (
                <motion.button
                  key={term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => setQuery(term)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-white/60 font-light tracking-wide hover:bg-white/10 hover:text-white transition-all"
                >
                  <Clock size={14} strokeWidth={1.5} className="text-white/30" />
                  {term}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={14} strokeWidth={1.5} className="text-white/40" />
              <h3 className="text-xs font-normal tracking-widest uppercase text-white/40">
                Trending
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term, i) => (
                <motion.button
                  key={term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  onClick={() => setQuery(term)}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/60 font-light tracking-wide hover:bg-white/10 hover:text-white transition-all"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Genres */}
          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="text-xs font-normal tracking-widest uppercase text-white/40 mb-4">
              Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre, i) => (
                <motion.button
                  key={genre}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.02 }}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm text-white/60 font-light tracking-wide hover:bg-white/15 hover:text-white transition-all pill-hover"
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Moods */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-normal tracking-widest uppercase text-white/40 mb-4">
              Moods
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {moods.map((mood, i) => (
                <motion.button
                  key={mood.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] as const }}
                  className="relative aspect-square rounded-lg overflow-hidden mood-card group"
                >
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-3 left-3 text-xs font-light tracking-widest uppercase text-white/80 z-10">
                    {mood.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      ) : (
        /* Search Results */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-normal tracking-widest uppercase text-white/40">
              Results for "{query}"
            </h3>
            <button
              onClick={() => setQuery('')}
              className="text-white/30 hover:text-white/60 transition-colors"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          
          {/* Filter tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-3">
            {['All', 'Songs', 'Artists', 'Albums', 'Playlists'].map((tab, i) => (
              <button
                key={tab}
                className={`text-xs tracking-wider uppercase transition-colors ${
                  i === 0 ? 'text-white' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mock results */}
          {[1, 2, 3, 4, 5].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 rounded bg-white/10 overflow-hidden">
                <img
                  src={`/images/album-${(i % 4) + 1}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-light text-white group-hover:text-white transition-colors">
                  {['Ethereal Dreams', 'Midnight Rain', 'Neon Horizons', 'Coffee Shop Thoughts', 'Ocean Depths'][i]}
                </p>
                <p className="text-xs text-white/40 mt-0.5 tracking-wider">
                  {['Airica', 'Luna Wave', 'Synth Collective', 'Morning Breeze', 'Deep Blue'][i]}
                </p>
              </div>
              <span className="text-xs text-white/25 tracking-wider">
                {['3:12', '4:08', '4:45', '3:18', '5:42'][i]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
