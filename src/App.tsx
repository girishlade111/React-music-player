import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, memo } from 'react';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import PlayerBar from '@/components/PlayerBar';
import FullScreenPlayer from '@/components/FullScreenPlayer';
import HomeView from '@/views/HomeView';
import SearchView from '@/views/SearchView';
import ExploreView from '@/views/ExploreView';
import ProfileView from '@/views/ProfileView';
import PlaylistsView from '@/views/PlaylistsView';
import LikedSongsView from '@/views/LikedSongsView';
import FavoritesView from '@/views/FavoritesView';
import DownloadsView from '@/views/DownloadsView';
import HistoryView from '@/views/HistoryView';
import CreatePlaylistModal from '@/components/CreatePlaylistModal';
import { useStore } from '@/store/useStore';
import useAudioEngine from '@/hooks/useAudioEngine';

function App() {
  const currentView = useStore(s => s.currentView);
  const nextSong = useStore(s => s.nextSong);
  const prevSong = useStore(s => s.prevSong);
  const togglePlay = useStore(s => s.togglePlay);

  useAudioEngine();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        nextSong();
      }
      if (e.code === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        prevSong();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextSong, prevSong]);

  const renderView = useCallback(() => {
    switch (currentView) {
      case 'home':
        return <HomeView key="home" />;
      case 'search':
        return <SearchView key="search" />;
      case 'explore':
        return <ExploreView key="explore" />;
      case 'profile':
        return <ProfileView key="profile" />;
      case 'playlists':
        return <PlaylistsView key="playlists" />;
      case 'liked-songs':
        return <LikedSongsView key="liked-songs" />;
      case 'favorites':
        return <FavoritesView key="favorites" />;
      case 'downloads':
        return <DownloadsView key="downloads" />;
      case 'history':
        return <HistoryView key="history" />;
      default:
        return <HomeView key="home" />;
    }
  }, [currentView]);

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden flex">
      <Sidebar />
      <MobileNav />
      <main className="flex-1 ml-0 lg:ml-[280px] mb-[112px] sm:mb-20 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[600px] animate-breathe opacity-30">
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>
        </div>
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <PlayerBar />
      <FullScreenPlayer />
      <CreatePlaylistModal />
    </div>
  );
}

export default memo(App);
