import { useMemo, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Heart, Music, Play, Pause, ListMusic, Disc3, User, LogOut } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { allTracks, formatTime, listeningHistory, topArtists } from '@/data/mockData';
import { container, item } from '@/lib/animations';

function ProfileView() {
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);
  const likedSongs = useStore(s => s.likedSongs);
  const toggleShowQueue = useStore(s => s.toggleShowQueue);

  const likedTracks = useMemo(
    () => allTracks.filter((t) => likedSongs[t.id]),
    [likedSongs]
  );

  const recentTracks = useMemo(() => {
    const recentHistory = [...listeningHistory].reverse().slice(0, 8);
    return recentHistory.map((h) => h.song).filter(Boolean) as typeof allTracks;
  }, []);

  const likedCount = useMemo(() => Object.keys(likedSongs).length, [likedSongs]);

  const handlePlay = useCallback((track: typeof allTracks[number]) => {
    if (currentSong?.id === track.id) {
      togglePlay();
    } else {
      setCurrentSong(track);
    }
  }, [currentSong, togglePlay, setCurrentSong]);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 pb-4 border-b border-white/5">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-br from-aura-accent to-purple-600 flex items-center justify-center flex-shrink-0">
            <User size={40} className="text-white/60" strokeWidth={1} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">Your Profile</h1>
            <p className="text-sm text-white/40 mt-0.5">@listener</p>
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-white/40">
              <span className="flex items-center gap-1"><Heart size={12} /> {likedCount} liked</span>
              <span className="flex items-center gap-1"><ListMusic size={12} /> {allTracks.length} tracks</span>
              <span className="flex items-center gap-1"><Music size={12} /> {topArtists.length} artists</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleShowQueue}
              className="px-4 py-2 rounded-lg bg-white/10 text-sm text-white/70 hover:bg-white/20 hover:text-white transition-all tracking-wide flex items-center gap-2"
            >
              <ListMusic size={14} strokeWidth={1.5} /> Queue
            </button>
            <button aria-label="Settings" className="p-2 rounded-lg bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-all">
              <Settings size={16} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: 'Listening Time', value: '1,247 min', icon: Clock },
            { label: 'Top Genre', value: 'Electronic', icon: Music },
            { label: 'Playlists', value: '12', icon: Disc3 },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2, scale: 1.03 }}
              className="bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/10 rounded-xl p-3 sm:p-4 text-center transition-colors"
            >
              <stat.icon size={16} className="text-aura-accent mx-auto mb-1.5" strokeWidth={1.5} />
              <p className="text-base sm:text-lg font-light text-white">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-white/40 tracking-wide mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {recentTracks.length > 0 && (
          <motion.div variants={item}>
            <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
              <Clock size={14} strokeWidth={1.5} /> Recently Played
            </h3>
            <div className="space-y-1">
              {recentTracks.map((track) => {
                const isCurrent = currentSong?.id === track.id;
                return (
                  <motion.div
                    key={track.id + 'hist'}
                    onClick={() => handlePlay(track)}
                    whileHover={{ x: 2 }}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0 group-hover:shadow-glow-sm transition-shadow duration-500">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCurrent && isPlaying ? (
                          <Pause size={14} className="text-white" fill="white" />
                        ) : (
                          <Play size={14} className="text-white ml-0.5" fill="white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${isCurrent ? 'text-aura-accent' : 'text-white/80'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-white/40 truncate">{track.artist}</p>
                    </div>
                    <span className="text-xs text-white/30 tabular-nums">{formatTime(track.duration)}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {likedTracks.length > 0 && (
          <motion.div variants={item}>
            <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
              <Heart size={14} strokeWidth={1.5} /> Liked Songs ({likedTracks.length})
            </h3>
            <div className="space-y-1">
              {likedTracks.slice(0, 5).map((track) => {
                const isCurrent = currentSong?.id === track.id;
                return (
                  <motion.div
                    key={track.id}
                    onClick={() => handlePlay(track)}
                    whileHover={{ x: 2 }}
                    className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0 group-hover:shadow-glow-sm transition-shadow duration-500">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isCurrent && isPlaying ? (
                          <Pause size={14} className="text-white" fill="white" />
                        ) : (
                          <Play size={14} className="text-white ml-0.5" fill="white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${isCurrent ? 'text-aura-accent' : 'text-white/80'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-white/40 truncate">{track.artist}</p>
                    </div>
                    <Heart size={12} className="text-aura-accent" fill="#8B5CF6" strokeWidth={1.5} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default memo(ProfileView);
