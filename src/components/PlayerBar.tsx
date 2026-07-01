import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatTime } from '@/data/mockData';

function PlayerBar() {
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);
  const currentSong = useStore(s => s.currentSong);
  const currentTime = useStore(s => s.currentTime);
  const duration = useStore(s => s.duration);
  const volume = useStore(s => s.volume);
  const setVolume = useStore(s => s.setVolume);
  const isMuted = useStore(s => s.isMuted);
  const toggleMute = useStore(s => s.toggleMute);
  const shuffle = useStore(s => s.shuffle);
  const toggleShuffle = useStore(s => s.toggleShuffle);
  const repeat = useStore(s => s.repeat);
  const cycleRepeat = useStore(s => s.cycleRepeat);
  const nextSong = useStore(s => s.nextSong);
  const prevSong = useStore(s => s.prevSong);
  const queueIndex = useStore(s => s.queueIndex);
  const queue = useStore(s => s.queue);
  const setPlayerExpanded = useStore(s => s.setPlayerExpanded);

  if (!currentSong) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 lg:left-[280px] right-0 h-20 glass-player border-t border-white/10 z-50 items-center px-4 lg:px-6 hidden sm:flex cursor-pointer"
        onClick={() => setPlayerExpanded(true)}
      >
        <div className="flex items-center gap-4 w-[200px] lg:w-[280px]" onClick={() => setPlayerExpanded(true)}>
          <div className="w-10 lg:w-12 h-10 lg:h-12 rounded overflow-hidden flex-shrink-0">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-white font-light truncate">
              {currentSong.title}
            </p>
            <p className="text-[10px] text-white/40 truncate mt-0.5 tracking-wider">
              {currentSong.artist}
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleShuffle}
              className={`transition-colors hidden md:block ${shuffle ? 'text-aura-accent' : 'text-white/40 hover:text-white'}`}
            >
              <Shuffle size={16} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSong}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipBack size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={16} strokeWidth={2} className="text-black" />
              ) : (
                <Play size={16} strokeWidth={2} className="text-black ml-0.5" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSong}
              className="text-white/60 hover:text-white transition-colors"
            >
              <SkipForward size={20} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={cycleRepeat}
              className={`transition-colors relative hidden md:block ${
                repeat !== 'none' ? 'text-aura-accent' : 'text-white/40 hover:text-white'
              }`}
            >
              <Repeat size={16} strokeWidth={1.5} />
              {repeat === 'one' && (
                <span className="absolute -top-1 -right-1 text-[8px] font-medium">1</span>
              )}
            </motion.button>
          </div>

          <div className="flex items-center gap-2 lg:gap-3 w-full max-w-md">
            <span className="text-[10px] text-white/40 tracking-wider w-8 text-right hidden xs:block">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 h-1 progress-track rounded-full relative group cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 progress-fill rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
              />
            </div>
            <span className="text-[10px] text-white/40 tracking-wider w-8 hidden xs:block">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="items-center gap-4 w-[200px] lg:w-[280px] justify-end hidden lg:flex" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5 text-white/40">
            <ListMusic size={16} strokeWidth={1.5} />
            <span className="text-[10px] tracking-wider">
              {String(queueIndex + 1).padStart(2, '0')} / {String(queue.length).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 w-28">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="text-white/40 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={16} strokeWidth={1.5} />
              ) : (
                <Volume2 size={16} strokeWidth={1.5} />
              )}
            </motion.button>
            <div className="flex-1 h-1 progress-track rounded-full relative group cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 progress-fill rounded-full"
                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-14 left-0 right-0 h-14 glass-player border-t border-white/10 z-40 flex items-center px-4 gap-3 sm:hidden"
      >
        <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0" onClick={() => setPlayerExpanded(true)}>
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0" onClick={() => setPlayerExpanded(true)}>
          <p className="text-xs text-white font-light truncate leading-relaxed">
            {currentSong.title}
          </p>
          <div className="flex-1 h-[2px] progress-track rounded-full mt-1.5">
            <div
              className="h-full progress-fill rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0"
        >
          {isPlaying ? (
            <Pause size={14} strokeWidth={2} className="text-black" />
          ) : (
            <Play size={14} strokeWidth={2} className="text-black ml-0.5" />
          )}
        </motion.button>
      </motion.div>
    </>
  );
}

export default memo(PlayerBar);
