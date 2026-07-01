import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
  Heart,
  MoreHorizontal,
  Disc3,
  X,
  Trash2,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatTime } from '@/data/mockData';

export default function FullScreenPlayer() {
  const {
    isPlaying,
    togglePlay,
    currentSong,
    currentTime,
    duration,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    shuffle,
    toggleShuffle,
    repeat,
    cycleRepeat,
    nextSong,
    prevSong,
    queue,
    playerExpanded,
    setPlayerExpanded,
    showQueue,
    toggleShowQueue,
    setCurrentSong,
    removeFromQueue,
    likedSongs,
    toggleLike,
  } = useStore();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const [dragProgress, setDragProgress] = useState(0);

  if (!currentSong || !playerExpanded) return null;

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    if (info.offset.y > 100 || info.velocity.y > 500) {
      setPlayerExpanded(false);
    }
    setDragProgress(0);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: dragProgress }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[60] flex flex-col"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onDrag={(_: any, info: { offset: { y: number } }) => {
          if (info.offset.y > 0) setDragProgress(info.offset.y * 0.5);
        }}
      >
        {/* Background with blurred album art */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={currentSong.cover}
            alt=""
            className="w-full h-full object-cover scale-110 blur-3xl opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col h-full px-6 sm:px-12">
          {/* Top bar */}
          <div className="flex items-center justify-between pt-4 sm:pt-8 pb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPlayerExpanded(false)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronDown size={24} strokeWidth={1.5} />
              <span className="text-xs tracking-wider uppercase hidden sm:block">Now Playing</span>
            </motion.button>

            <div className="flex items-center gap-1 text-white/40">
              <span className="text-xs tracking-wider">{queue.length} songs</span>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleLike(currentSong.id)}
                className={`transition-colors ${
                  likedSongs.has(currentSong.id) ? 'text-aura-accent' : 'text-white/40 hover:text-white'
                }`}
              >
                <Heart size={20} strokeWidth={1.5} fill={likedSongs.has(currentSong.id) ? '#8B5CF6' : 'none'} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/40 hover:text-white transition-colors"
              >
                <MoreHorizontal size={20} strokeWidth={1.5} />
              </motion.button>
            </div>
          </div>

          {/* Drag handle for mobile */}
          <div className="flex sm:hidden justify-center pb-2">
            <div className="w-10 h-[3px] rounded-full bg-white/20" />
          </div>

          {/* Album Art */}
          <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-4">
            <motion.div
              layoutId="album-art"
              className="w-full max-w-[320px] sm:max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Track Info & Controls */}
          <div className="pb-8 sm:pb-12 space-y-6">
            {/* Track Info */}
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-light text-white truncate">
                  {currentSong.title}
                </h2>
                <p className="text-sm text-white/50 mt-1 truncate tracking-wide">
                  {currentSong.artist}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleShowQueue}
                className={`w-10 h-10 rounded-full border transition-colors flex-shrink-0 ml-4 flex items-center justify-center ${
                  showQueue
                    ? 'border-aura-accent text-aura-accent'
                    : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
                }`}
              >
                <ListMusic size={18} strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="relative h-1.5 progress-track rounded-full group cursor-pointer">
                <div
                  className="absolute inset-y-0 left-0 progress-fill rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/40 tracking-wider">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-6 sm:gap-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleShuffle}
                className={`transition-colors ${shuffle ? 'text-aura-accent' : 'text-white/40 hover:text-white'}`}
              >
                <Shuffle size={20} strokeWidth={1.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSong}
                className="text-white/60 hover:text-white transition-colors"
              >
                <SkipBack size={28} strokeWidth={1.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow-xl"
              >
                {isPlaying ? (
                  <Pause size={28} strokeWidth={2} className="text-black ml-0" />
                ) : (
                  <Play size={28} strokeWidth={2} className="text-black ml-1" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSong}
                className="text-white/60 hover:text-white transition-colors"
              >
                <SkipForward size={28} strokeWidth={1.5} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={cycleRepeat}
                className={`transition-colors relative ${
                  repeat !== 'none' ? 'text-aura-accent' : 'text-white/40 hover:text-white'
                }`}
              >
                <Repeat size={20} strokeWidth={1.5} />
                {repeat === 'one' && (
                  <span className="absolute -top-1.5 -right-1.5 text-[9px] font-medium">1</span>
                )}
              </motion.button>
            </div>

            {/* Volume */}
            <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="text-white/40 hover:text-white transition-colors flex-shrink-0"
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

            {/* Mini player button at bottom */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlayerExpanded(false)}
                className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
              >
                <Disc3 size={14} strokeWidth={1.5} />
                <span className="text-[10px] tracking-widest uppercase">Minimize</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Queue Panel */}
        <AnimatePresence>
          {showQueue && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleShowQueue}
                className="absolute inset-0 bg-black/40 z-10"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-black/90 backdrop-blur-2xl z-20 flex flex-col"
              >
                <div className="flex items-center justify-between px-6 pt-6 pb-3">
                  <h3 className="text-sm tracking-wider uppercase text-white font-light">Queue</h3>
                  <button onClick={toggleShowQueue} className="text-white/40 hover:text-white transition-colors">
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1 hide-scrollbar">
                  {queue.map((track, i) => {
                    const isCurrent = currentSong?.id === track.id;
                    return (
                      <div
                        key={track.id + i}
                        onClick={() => {
                          setCurrentSong?.(track);
                          toggleShowQueue?.();
                        }}
                        className={`group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer ${
                          isCurrent ? 'bg-white/5' : ''
                        }`}
                      >
                        <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                          <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                          {isCurrent && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              {isPlaying ? (
                                <Pause size={12} className="text-white" fill="white" />
                              ) : (
                                <Play size={12} className="text-white ml-0.5" fill="white" />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs truncate ${isCurrent ? 'text-aura-accent' : 'text-white/70'}`}>
                            {track.title}
                          </p>
                          <p className="text-[10px] text-white/40 truncate">{track.artist}</p>
                        </div>
                        <span className="text-[10px] text-white/30 tabular-nums">{formatTime(track.duration)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromQueue(i);
                          }}
                          className="text-white/20 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                    );
                  })}
                  {queue.length === 0 && (
                    <p className="text-sm text-white/30 text-center pt-8">Queue is empty</p>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
