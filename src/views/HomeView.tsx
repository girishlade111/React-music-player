import { motion } from 'framer-motion';
import { Search, SkipBack, Play, Pause, SkipForward } from 'lucide-react';
import { useStore } from '@/store/useStore';
import AudioVisualizer from '@/components/AudioVisualizer';
import { formatTime } from '@/data/mockData';

export default function HomeView() {
  const { isPlaying, togglePlay, currentSong, currentTime, duration, setCurrentView } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      key="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8"
    >
      {/* Top Status Bar */}
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">
          AURA Music
        </span>
      </motion.div>

      {/* Hero Title */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase">
          Home
        </h1>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="mb-8">
        <button
          onClick={() => setCurrentView('search')}
          className="flex items-center gap-3 text-white/30 hover:text-white/60 transition-colors group"
        >
          <Search size={20} strokeWidth={1.5} className="group-hover:text-white/60" />
          <span className="text-lg font-light tracking-wide">
            Type anything to search...
          </span>
        </button>
      </motion.div>

      {/* Audio Visualizer */}
      <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-center min-h-0">
        <AudioVisualizer />
      </motion.div>

      {/* Player Controls */}
      <motion.div variants={itemVariants} className="mt-8">
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4 max-w-lg mx-auto">
          <span className="text-[10px] text-white/40 tracking-widest w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="flex-1 h-[2px] progress-track rounded-full relative group cursor-pointer">
            <div
              className="absolute inset-y-0 left-0 progress-fill rounded-full transition-all"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="text-[10px] text-white/40 tracking-widest w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <SkipBack size={22} strokeWidth={1.5} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all"
          >
            {isPlaying ? (
              <Pause size={18} strokeWidth={1.5} />
            ) : (
              <Play size={18} strokeWidth={1.5} className="ml-0.5" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <SkipForward size={22} strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Current Song Info */}
        {currentSong && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-5"
          >
            <p className="text-sm font-light text-white/80 tracking-wide">
              {currentSong.title}
            </p>
            <p className="text-xs text-white/40 mt-1 tracking-wider">
              {currentSong.artist}
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
