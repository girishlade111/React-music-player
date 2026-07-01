import { create } from 'zustand';
import { allTracks } from '@/data/mockData';

export type View = 'home' | 'search' | 'explore' | 'profile';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songCount: number;
  cover: string;
}

export interface SearchFilter {
  query: string;
  activeTab: 'all' | 'songs' | 'artists' | 'albums';
}

interface PlayerState {
  isPlaying: boolean;
  currentSong: Song | null;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  shuffle: boolean;
  repeat: 'none' | 'all' | 'one';
  queue: Song[];
  queueIndex: number;
  likedSongs: Record<string, boolean>;
  showQueue: boolean;
}

interface UIState {
  currentView: View;
  searchQuery: string;
  searchActiveTab: 'all' | 'songs' | 'artists' | 'albums';
  selectedGenre: string | null;
  selectedMood: string | null;
  sidebarCollapsed: boolean;
  playerExpanded: boolean;
}

interface AppStore extends PlayerState, UIState {
  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  setCurrentSong: (song: Song) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  nextSong: () => void;
  prevSong: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  toggleLike: (songId: string) => void;
  isLiked: (songId: string) => boolean;
  toggleShowQueue: () => void;
  playFromQueue: (index: number) => void;

  setCurrentView: (view: View) => void;
  setSearchQuery: (query: string) => void;
  setSearchActiveTab: (tab: 'all' | 'songs' | 'artists' | 'albums') => void;
  setSelectedGenre: (genre: string | null) => void;
  setSelectedMood: (mood: string | null) => void;
  toggleSidebar: () => void;
  setPlayerExpanded: (expanded: boolean) => void;
  togglePlayerExpanded: () => void;
}

const defaultQueue = allTracks.slice(0, 5);

export const useStore = create<AppStore>((set, get) => ({
  isPlaying: false,
  currentSong: defaultQueue[0],
  currentTime: 0,
  duration: defaultQueue[0].duration,
  volume: 0.7,
  isMuted: false,
  shuffle: false,
  repeat: 'none',
  queue: defaultQueue,
  queueIndex: 0,
  likedSongs: { '1': true, '3': true, '5': true },
  showQueue: false,

  currentView: 'home',
  searchQuery: '',
  searchActiveTab: 'all',
  selectedGenre: null,
  selectedMood: null,
  sidebarCollapsed: false,
  playerExpanded: false,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentSong: (song) => set({ currentSong: song, duration: song.duration, currentTime: 0, isPlaying: true }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  cycleRepeat: () => set((state) => ({
    repeat: state.repeat === 'none' ? 'all' : state.repeat === 'all' ? 'one' : 'none',
  })),
  nextSong: () => {
    const { queue, queueIndex, shuffle, repeat } = get();
    if (queue.length === 0) return;
    let nextIndex: number;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
      if (nextIndex === 0 && repeat === 'none') {
        set({ isPlaying: false, currentTime: 0 });
        return;
      }
    }
    const song = queue[nextIndex];
    set({
      queueIndex: nextIndex,
      currentSong: song,
      duration: song.duration,
      currentTime: 0,
      isPlaying: true,
    });
  },
  prevSong: () => {
    const { queue, queueIndex } = get();
    if (queue.length === 0) return;
    const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
    const song = queue[prevIndex];
    set({
      queueIndex: prevIndex,
      currentSong: song,
      duration: song.duration,
      currentTime: 0,
      isPlaying: true,
    });
  },
  addToQueue: (song) => set((state) => ({ queue: [...state.queue, song] })),
  removeFromQueue: (index) => set((state) => ({
    queue: state.queue.filter((_, i) => i !== index),
  })),
  toggleLike: (songId) => set((state) => ({
    likedSongs: { ...state.likedSongs, [songId]: !state.likedSongs[songId] },
  })),
  isLiked: (songId) => !!get().likedSongs[songId],
  toggleShowQueue: () => set((state) => ({ showQueue: !state.showQueue })),
  playFromQueue: (index) => {
    const { queue } = get();
    const song = queue[index];
    set({
      queueIndex: index,
      currentSong: song,
      duration: song.duration,
      currentTime: 0,
      isPlaying: true,
    });
  },

  setCurrentView: (view) => set({ currentView: view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchActiveTab: (tab) => set({ searchActiveTab: tab }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setPlayerExpanded: (expanded) => set({ playerExpanded: expanded }),
  togglePlayerExpanded: () => set((state) => ({ playerExpanded: !state.playerExpanded })),
}));
