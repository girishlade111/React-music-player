import { useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Mic, X, Clock, TrendingUp, Music, Play, Pause } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { genres, moods, recentSearches, trendingSearches, allTracks, formatTime } from '@/data/mockData';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
} as const;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1] as const, duration: 0.4 } },
};

const tabs = ['All', 'Songs', 'Artists', 'Albums'] as const;

function SearchView() {
  const searchQuery = useStore(s => s.searchQuery);
  const setSearchQuery = useStore(s => s.setSearchQuery);
  const searchActiveTab = useStore(s => s.searchActiveTab);
  const setSearchActiveTab = useStore(s => s.setSearchActiveTab);
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const hasQuery = searchQuery.trim().length > 0;

  const filtered = useMemo(() => {
    if (!hasQuery) return [];
    return allTracks.filter(t =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handlePlay = useCallback((song: typeof allTracks[number]) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  }, [currentSong, togglePlay, setCurrentSong]);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.h1
          variants={item}
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide"
        >
          Search
        </motion.h1>

        <motion.div variants={item} className="relative w-full max-w-xl">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white text-lg sm:text-xl rounded-xl pl-12 pr-20 py-3 sm:py-4 transition-colors placeholder:text-white/20 tracking-wide"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {hasQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/20 border border-white/10 rounded px-1.5 py-0.5">
              <span>⌘</span><span>K</span>
            </div>
            <button aria-label="Search by voice" className="text-white/40 hover:text-white transition-colors">
              <Mic size={16} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {hasQuery ? (
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-4">
            <motion.div variants={item} className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSearchActiveTab(tab.toLowerCase() as typeof searchActiveTab)}
                  className={`px-4 py-1.5 rounded-full text-sm tracking-wide transition-all ${
                    searchActiveTab === tab.toLowerCase()
                      ? 'bg-white text-black font-medium'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            <motion.div variants={item} className="space-y-1">
              {filtered.map((song) => {
                const isCurrent = currentSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    onClick={() => handlePlay(song)}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0">
                      <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCurrent && isPlaying ? (
                          <Pause size={14} className="text-white" fill="white" />
                        ) : (
                          <Play size={14} className="text-white ml-0.5" fill="white" />
                        )}
                      </div>
                      {isCurrent && isPlaying && (
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-end gap-[1.5px] h-2.5">
                          <span className="w-[2px] bg-white rounded-full animate-wave1" />
                          <span className="w-[2px] bg-white rounded-full animate-wave2" />
                          <span className="w-[2px] bg-white rounded-full animate-wave1" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${isCurrent ? 'text-aura-accent' : 'text-white/80'}`}>
                        {song.title}
                      </p>
                      <p className="text-xs text-white/40 truncate">{song.artist} · {song.album}</p>
                    </div>
                    <span className="text-xs text-white/30 tabular-nums">{formatTime(song.duration)}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-8">
            <motion.div variants={item}>
              <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Clock size={14} strokeWidth={1.5} /> Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all tracking-wide"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
                <TrendingUp size={14} strokeWidth={1.5} /> Trending Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all tracking-wide"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Music size={14} strokeWidth={1.5} /> Browse by Genre
              </h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSearchQuery(genre)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-sm text-white/60 hover:bg-white/10 hover:text-white transition-all tracking-wide border border-white/5 hover:border-white/10"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3">Browse by Mood</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => setSearchQuery(mood.name)}
                    className="group relative aspect-[3/2] rounded-xl overflow-hidden"
                  >
                    <img
                      src={mood.image}
                      alt={mood.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-light text-base tracking-wide capitalize">
                      {mood.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default memo(SearchView);
