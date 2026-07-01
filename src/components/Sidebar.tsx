import { memo } from 'react';
import { motion } from 'framer-motion';
import { sidebarItem } from '@/lib/animations';
import {
  Home,
  Search,
  Compass,
  User,
  ListMusic,
  Heart,
  Star,
  Download,
  History,
  Settings,
  Plus,
} from 'lucide-react';
import { useStore, type View } from '@/store/useStore';
import { formatTime } from '@/data/mockData';

const mainNavItems: { view: View; label: string; icon: typeof Home }[] = [
  { view: 'home', label: 'Home', icon: Home },
  { view: 'search', label: 'Search', icon: Search },
  { view: 'explore', label: 'Explore', icon: Compass },
  { view: 'profile', label: 'Profile', icon: User },
];

const libraryItems: { label: string; icon: typeof Home; view: View; filter?: string }[] = [
  { label: 'Playlists', icon: ListMusic, view: 'home', filter: 'playlists' },
  { label: 'Liked Songs', icon: Heart, view: 'home', filter: 'liked' },
  { label: 'Favorites', icon: Star, view: 'explore', filter: 'favorites' },
  { label: 'Downloads', icon: Download, view: 'profile' },
  { label: 'History', icon: History, view: 'profile' },
];

function SidebarTimeDisplay() {
  const currentTime = useStore(s => s.currentTime);
  const duration = useStore(s => s.duration);
  return (
    <p className="text-[10px] text-white/25 mt-1 font-light tracking-widest">
      {formatTime(currentTime)} / {formatTime(duration)}
    </p>
  );
}

function SidebarNowPlaying() {
  const currentSong = useStore(s => s.currentSong);
  const isPlaying = useStore(s => s.isPlaying);

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex gap-3 items-start"
    >
      <div className="relative w-14 h-14 rounded overflow-hidden flex-shrink-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-full h-full object-cover"
        />
        {isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex gap-0.5 items-end h-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-white rounded-full"
                  animate={{ height: [4, 12, 6, 14, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-xs text-white font-light truncate leading-relaxed">
          {currentSong.title}
        </p>
        <p className="text-[10px] text-white/40 truncate mt-0.5 tracking-wider">
          {currentSong.artist}
        </p>
        <SidebarTimeDisplay />
      </div>
    </motion.div>
  );
}

function Sidebar() {
  const currentView = useStore(s => s.currentView);
  const setCurrentView = useStore(s => s.setCurrentView);

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-screen w-[280px] bg-black border-r border-white/10 flex-col z-40 hidden lg:flex"
    >
      <div className="px-6 pt-6 pb-4">
        <SidebarNowPlaying />
      </div>

      <nav className="flex-1 px-4 overflow-y-auto hide-scrollbar">
        <div className="space-y-0.5">
          {mainNavItems.map((item, index) => {
            const isActive = currentView === item.view;
            return (
              <motion.button
                key={item.view}
                variants={sidebarItem(index)}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 2 }}
                onClick={() => setCurrentView(item.view)}
                className={`nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded text-left transition-colors ${
                  isActive
                    ? 'text-white bg-white/[0.08]'
                    : 'text-white/40 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                <span className="text-sm font-light tracking-wide">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="my-5 border-t border-white/10" />

        <div className="space-y-0.5">
          {libraryItems.map((item, index) => (
            <motion.button
              key={item.label}
              variants={sidebarItem(index + 5)}
              initial="hidden"
              animate="visible"
              whileHover={{ x: 2 }}
              onClick={() => setCurrentView(item.view)}
              className="nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded text-left text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span className="text-sm font-light tracking-wide">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <motion.button
          variants={sidebarItem(11)}
          initial="hidden"
          animate="visible"
          whileHover={{ x: 2 }}
          className="mt-4 w-full flex items-center gap-3 px-4 py-2.5 rounded text-white/25 hover:text-white/60 transition-colors"
        >
          <Plus size={16} strokeWidth={1.5} />
          <span className="text-xs font-light tracking-wider uppercase">Create Playlist</span>
        </motion.button>
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/[0.04] transition-colors"
        >
          <img
            src="/images/avatar.jpg"
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 text-left">
            <p className="text-xs text-white/60 font-light">Alex</p>
          </div>
          <Settings size={16} strokeWidth={1.5} className="text-white/25" aria-label="Settings" />
        </motion.button>
      </div>
    </motion.aside>
  );
}

export default memo(Sidebar);
