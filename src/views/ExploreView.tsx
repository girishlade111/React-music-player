import { useState, useMemo, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Sparkles, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { genres, moods, allTracks } from '@/data/mockData';
import { container, item, cardHover } from '@/lib/animations';

function ExploreView() {
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);

  const [tab, setTab] = useState<'genres' | 'moods'>('genres');

  const genreMap = useMemo(() => {
    const map: Record<string, typeof allTracks> = {};
    genres.forEach((g) => {
      map[g] = allTracks.filter((t) => t.genre === g);
    });
    return map;
  }, []);

  const playTrack = useCallback((track: typeof allTracks[number]) => {
    if (currentSong?.id === track.id) {
      togglePlay();
    } else {
      setCurrentSong(track);
    }
  }, [currentSong, togglePlay, setCurrentSong]);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">Explore</h1>
            <p className="text-white/40 text-sm mt-1 tracking-wide">Discover new music</p>
          </div>
          <div className="flex gap-2">
            {(['genres', 'moods'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-1.5 rounded-full text-sm tracking-wide capitalize transition-all ${
                  tab === t ? 'bg-white text-black font-medium' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {moods.slice(0, 4).map((mood) => (
            <motion.div
              key={mood.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative aspect-[16/7] sm:aspect-[21/7] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => {
                const track = allTracks.find((t) => t.genre === mood.name.toLowerCase());
                if (track) setCurrentSong(track);
              }}
            >
              <img
                src={mood.image}
                alt={mood.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-white text-xl sm:text-2xl font-light capitalize tracking-wide">{mood.name}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-aura-accent/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg shadow-aura-accent/25"
              >
                <Play size={16} className="ml-0.5" fill="white" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {tab === 'genres' && (
          <motion.div variants={item} className="flex flex-col gap-6">
            {genres.slice(0, 6).map((genre) => {
              const tracks = genreMap[genre] || [];
              return (
                <div key={genre}>
                  <h3 className="text-base sm:text-lg font-light text-white tracking-wide mb-3 capitalize flex items-center gap-2">
                    <Music size={16} className="text-aura-accent" strokeWidth={1.5} />
                    {genre}
                    <span className="text-xs text-white/30 font-normal">{tracks.length} tracks</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {tracks.map((track) => {
                      const isCurrent = currentSong?.id === track.id;
                      return (
                        <motion.div
                          key={track.id}
                          onClick={() => playTrack(track)}
                          whileHover={{ y: -2 }}
                          className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-xl p-3 transition-colors cursor-pointer border border-white/[0.04] hover:border-white/10"
                          <div className="relative aspect-square rounded-lg overflow-hidden mb-2.5">
                            <img
                              src={track.cover}
                              alt={track.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              {isCurrent && isPlaying ? (
                                <Pause size={20} className="text-white" fill="white" />
                              ) : (
                                <Play size={20} className="text-white ml-1" fill="white" />
                              )}
                            </div>
                            {isCurrent && isPlaying && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end gap-[2px] h-3">
                                <span className="w-[2.5px] bg-aura-accent rounded-full animate-wave1" />
                                <span className="w-[2.5px] bg-aura-accent rounded-full animate-wave2" />
                                <span className="w-[2.5px] bg-aura-accent rounded-full animate-wave1" />
                              </div>
                            )}
                          </div>
                          <p className={`text-xs truncate ${isCurrent ? 'text-aura-accent' : 'text-white/80'}`}>
                            {track.title}
                          </p>
                          <p className="text-[11px] text-white/40 truncate">{track.artist}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {tab === 'moods' && (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {moods.map((mood, i) => (
              <motion.button
                key={mood.name}
                variants={item}
                onClick={() => {
                  const track = allTracks.find((t) => t.genre === mood.name.toLowerCase());
                  if (track) setCurrentSong(track);
                }}
                className="group relative aspect-square rounded-xl overflow-hidden"
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
                <span className="absolute top-3 right-3 text-white/40">
                  {i % 2 === 0 ? <Sparkles size={14} strokeWidth={1.5} /> : <Heart size={14} strokeWidth={1.5} />}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default memo(ExploreView);
