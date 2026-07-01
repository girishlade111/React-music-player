import { motion } from 'framer-motion';
import { Crown, ListMusic, Heart } from 'lucide-react';
import { playlists } from '@/data/mockData';

export default function ProfileView() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      key="profile"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar"
    >
      {/* Profile Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div className="relative">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-2 ring-white/10">
            <img
              src="/images/avatar.jpg"
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-aura-surface border border-white/10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-light text-white tracking-wide">
            Alex
          </h1>
          <p className="text-sm text-white/40 mt-1 tracking-wider">
            @alexnkem
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs tracking-wider uppercase font-light hover:bg-emerald-500/30 transition-colors"
          >
            <Crown size={14} strokeWidth={1.5} />
            Go Premium
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="flex justify-center sm:justify-start gap-6 sm:gap-8 mb-8 sm:mb-10">
        <div className="text-center">
          <p className="text-2xl font-light text-white">142</p>
          <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Songs</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-light text-white">18</p>
          <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Playlists</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-light text-white">2.4k</p>
          <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Minutes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-light text-white">47</p>
          <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Following</p>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div variants={itemVariants} className="border-t border-white/10 mb-8" />

      {/* My Playlists */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-normal tracking-widest uppercase text-white/40">
            My Playlists
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {playlists.map((playlist, i) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-light text-white truncate group-hover:text-white transition-colors">
                  {playlist.name}
                </p>
                <p className="text-xs text-white/40 mt-1 tracking-wider">
                  {playlist.songCount} songs
                </p>
              </div>
              <div className="flex-shrink-0 text-white/20 group-hover:text-white/40 transition-colors">
                {playlist.name === 'Liked Songs' ? (
                  <Heart size={16} strokeWidth={1.5} />
                ) : (
                  <ListMusic size={16} strokeWidth={1.5} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recently Played */}
      <motion.div variants={itemVariants} className="mt-10">
        <h2 className="text-xs font-normal tracking-widest uppercase text-white/40 mb-6">
          Recently Played
        </h2>
        <div className="space-y-2">
          {[
            { title: 'The Girl Who Fell Beneath The Sea', artist: 'Airica', time: '2 min ago' },
            { title: 'Midnight Rain', artist: 'Luna Wave', time: '15 min ago' },
            { title: 'Neon Horizons', artist: 'Synth Collective', time: '1 hr ago' },
            { title: 'Coffee Shop Thoughts', artist: 'Morning Breeze', time: '3 hrs ago' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded bg-white/10 overflow-hidden flex-shrink-0">
                <img
                  src={`/images/album-${(i % 4) + 1}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-light text-white truncate">{item.title}</p>
                <p className="text-xs text-white/40 tracking-wider">{item.artist}</p>
              </div>
              <span className="text-[10px] text-white/25 tracking-wider flex-shrink-0">
                {item.time}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
