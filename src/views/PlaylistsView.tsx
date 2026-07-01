import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, ListMusic } from 'lucide-react';
import { useStore, type Playlist } from '@/store/useStore';
import { playlists, allTracks } from '@/data/mockData';
import { container, item } from '@/lib/animations';

function PlaylistsView() {
  const setCurrentSong = useStore(s => s.setCurrentSong);

  const handlePlayPlaylist = useCallback((playlist: Playlist) => {
    const song = allTracks.find(t => t.album === playlist.name) || allTracks[0];
    setCurrentSong(song);
  }, [setCurrentSong]);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
        <motion.div variants={item}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">Playlists</h1>
          <p className="text-sm text-white/30 mt-1 tracking-wide">{playlists.length} playlists</p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {playlists.map((playlist, i) => (
            <motion.div
              key={playlist.id}
              variants={item}
              onClick={() => handlePlayPlaylist(playlist)}
              className="group cursor-pointer hover-lift"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-2 ring-0 group-hover:ring-2 ring-aura-accent/30 transition-all duration-500">
                <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-aura-accent shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Play size={18} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/80 font-light truncate">{playlist.name}</p>
              <p className="text-xs text-white/30 truncate">{playlist.songCount} songs</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-2 text-xs text-white/20 mt-2 pb-20 lg:pb-4">
          <ListMusic size={12} strokeWidth={1.5} /> {playlists.reduce((a, b) => a + b.songCount, 0)} total songs
        </motion.div>
      </motion.div>
    </div>
  );
}

export default memo(PlaylistsView);
