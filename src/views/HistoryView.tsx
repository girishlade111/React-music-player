import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { listeningHistory, formatTime } from '@/data/mockData';
import { container, item } from '@/lib/animations';

function HistoryView() {
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);

  const handlePlay = useCallback((track: typeof listeningHistory[number]['song']) => {
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
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Clock size={36} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">Listening History</h1>
            <p className="text-sm text-white/40 mt-1">{listeningHistory.length} entries</p>
          </div>
          <button className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors tracking-wide">
            <RotateCcw size={12} strokeWidth={1.5} /> Clear history
          </button>
        </motion.div>

        <motion.div variants={item} className="space-y-3">
          {listeningHistory.map((entry, i) => {
            const isCurrent = currentSong?.id === entry.song.id;
            const isNewDay = i === 0 || listeningHistory[i - 1].playedAt !== entry.playedAt;
            return (
              <div key={entry.song.id + i}>
                {isNewDay && (
                  <p className="text-xs text-white/30 tracking-wide mb-2 mt-4 first:mt-0">
                    {entry.playedAt}
                  </p>
                )}
                <motion.div
                  onClick={() => handlePlay(entry.song)}
                  whileHover={{ x: 2 }}
                  className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="relative w-11 h-11 rounded overflow-hidden flex-shrink-0 group-hover:shadow-glow-sm transition-shadow duration-500">
                    <img src={entry.song.cover} alt={entry.song.title} className="w-full h-full object-cover" />
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
                      {entry.song.title}
                    </p>
                    <p className="text-xs text-white/40 truncate">{entry.song.artist}</p>
                  </div>
                  <span className="text-xs text-white/30 tabular-nums">{formatTime(entry.song.duration)}</span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={item} className="pb-20 lg:pb-4" />
      </motion.div>
    </div>
  );
}

export default memo(HistoryView);
