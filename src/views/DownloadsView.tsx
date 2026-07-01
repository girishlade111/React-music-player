import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Play, Pause, CheckCircle, Archive } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { allTracks, formatTime } from '@/data/mockData';
import { container, item } from '@/lib/animations';

const mockDownloads = allTracks.slice(0, 8).map((track) => ({
  ...track,
  downloaded: true,
  quality: '320 kbps' as const,
}));

function DownloadsView() {
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);

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
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <Download size={36} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">Downloads</h1>
            <p className="text-sm text-white/40 mt-1">{mockDownloads.length} songs &bull; Available offline</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <CheckCircle size={12} strokeWidth={1.5} /> Downloaded
          </div>
        </motion.div>

        <motion.div variants={item}>
          <h3 className="text-sm text-white/50 tracking-wider uppercase mb-3 flex items-center gap-2">
            <Archive size={14} strokeWidth={1.5} /> Offline Songs
          </h3>
          <div className="space-y-1">
            {mockDownloads.map((track) => {
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-400/50">{track.quality}</span>
                    <CheckCircle size={12} className="text-emerald-400/60" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-white/30 tabular-nums">{formatTime(track.duration)}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={item} className="pb-20 lg:pb-4" />
      </motion.div>
    </div>
  );
}

export default memo(DownloadsView);
