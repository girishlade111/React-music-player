import { memo, useCallback, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, TrendingUp, Music } from 'lucide-react';
import { useStore, type Song, type Playlist, type Artist } from '@/store/useStore';
import {
  recentlyPlayed, madeForYou, featuredPlaylists,
  newReleases, topArtists, formatTime,
} from '@/data/mockData';
import { item, homeItem } from '@/lib/animations';

function SectionHeader({ icon: Icon, title, subtitle }: { icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-aura-accent" strokeWidth={1.5} />
        <div>
          <h2 className="text-lg sm:text-xl font-light text-white">{title}</h2>
          {subtitle && <p className="text-xs text-white/30 tracking-wide">{subtitle}</p>}
        </div>
      </div>
      <button className="text-xs text-white/30 hover:text-white transition-colors tracking-wider uppercase">
        See All
      </button>
    </div>
  );
}

const SongCard = memo(function SongCard({ song, index, isPlaying, onPlay }: {
  song: Song; index: number; isPlaying: boolean; onPlay: () => void;
}) {
  return (
    <motion.div
      variants={homeItem(index)}
      initial="hidden"
      animate="visible"
      onClick={onPlay}
      className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 hover:translate-x-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 shadow-glow-sm group-hover:shadow-glow transition-shadow duration-500">
        <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isPlaying ? (
            <Pause size={16} className="text-white" fill="white" />
          ) : (
            <Play size={16} className="text-white ml-0.5" fill="white" />
          )}
        </div>
        {isPlaying && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-end gap-[1.5px] h-3">
            <span className="w-[2px] bg-white rounded-full animate-wave1" />
            <span className="w-[2px] bg-white rounded-full animate-wave2" />
            <span className="w-[2px] bg-white rounded-full animate-wave1" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-light truncate">{song.title}</p>
        <p className="text-xs text-white/40 truncate mt-0.5">{song.artist}</p>
      </div>
      <span className="text-xs text-white/20 tabular-nums">{formatTime(song.duration)}</span>
    </motion.div>
  );
});

function PlaylistGrid({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
      {playlists.map((playlist, i) => (
        <motion.div
          key={playlist.id}
          variants={homeItem(i)}
          initial="hidden"
          animate="visible"
          className="group cursor-pointer hover-lift"
        >
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2 ring-0 group-hover:ring-2 ring-aura-accent/30 transition-all duration-500">
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
    </div>
  );
}

function ArtistRow({ artists }: { artists: Artist[] }) {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 hide-scrollbar">
      {artists.map((artist, i) => (
        <motion.div
          key={artist.name}
          variants={homeItem(i)}
          initial="hidden"
          animate="visible"
          className="flex-shrink-0 w-[100px] sm:w-[120px] text-center cursor-pointer group"
        >
          <div className="w-[100px] sm:w-[120px] aspect-square rounded-full overflow-hidden mb-2 ring-0 group-hover:ring-2 ring-aura-accent/40 transition-all duration-500 shadow-glow-sm group-hover:shadow-glow">
            <img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <p className="text-sm text-white/80 font-light truncate">{artist.name}</p>
          <p className="text-xs text-white/30 truncate">{artist.genre}</p>
        </motion.div>
      ))}
    </div>
  );
}

function HomeView() {
  const isPlaying = useStore(s => s.isPlaying);
  const togglePlay = useStore(s => s.togglePlay);
  const setCurrentSong = useStore(s => s.setCurrentSong);
  const currentSong = useStore(s => s.currentSong);

  const playSong = useCallback((song: Song) => {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  }, [currentSong, togglePlay, setCurrentSong]);

  return (
    <div className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 overflow-y-auto hide-scrollbar gap-8">
      <motion.div variants={item} initial="hidden" animate="show">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-wide">
          Good evening
        </h1>
        <p className="text-sm text-white/30 mt-1 tracking-wide">Welcome back</p>
      </motion.div>

      <section>
        <SectionHeader icon={Music} title="Made for you" subtitle="Personalized picks" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {madeForYou.slice(0, 4).map((song, i) => (
            <motion.div
              key={song.id}
              variants={homeItem(i + 10)}
              initial="hidden"
              animate="visible"
              onClick={() => playSong(song)}
              className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 hover:translate-x-1 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-[60px] h-[60px] flex-shrink-0">
                <img src={song.cover} alt={song.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                </div>
              </div>
              <p className="text-sm text-white/80 font-light truncate">{song.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader icon={Clock} title="Recently played" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {recentlyPlayed.slice(0, 6).map((song, i) => (
            <SongCard
              key={song.id}
              song={song}
              index={i + 20}
              isPlaying={currentSong?.id === song.id && isPlaying}
              onPlay={() => playSong(song)}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader icon={TrendingUp} title="New releases" subtitle="Latest drops" />
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {newReleases.map((song, i) => (
            <motion.div
              key={song.id}
              variants={homeItem(i + 30)}
              initial="hidden"
              animate="visible"
              onClick={() => playSong(song)}
              className="group flex-shrink-0 w-[150px] sm:w-[180px] cursor-pointer hover-lift"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden mb-2 ring-0 group-hover:ring-2 ring-aura-accent/30 transition-all duration-500">
                <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-aura-accent shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Play size={18} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/80 font-light truncate">{song.title}</p>
              <p className="text-xs text-white/30 truncate">{song.artist}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader icon={TrendingUp} title="Your top artists" />
        <ArtistRow artists={topArtists} />
      </section>

      <section>
        <SectionHeader icon={Music} title="Featured playlists" subtitle="Curated for you" />
        <PlaylistGrid playlists={featuredPlaylists} />
      </section>
    </div>
  );
}

export default memo(HomeView);
