import type { Song, Playlist, Artist } from '@/store/useStore';
export type { Song, Playlist, Artist };

export const genres = [
  'Afrobeat', 'Alternative', 'Arabic', 'Blues', 'Classical', 'Country',
  'Electronic', 'Folk', 'Hip-Hop', 'Jazz', 'Latin', 'Metal',
  'Pop', 'Punk', 'R&B', 'Reggae', 'Rock', 'Soul',
  'Soundtrack', 'World',
];

export const moods = [
  { name: 'Workout', image: '/images/mood-workout.jpg' },
  { name: 'Chill', image: '/images/mood-chill.jpg' },
  { name: 'Study', image: '/images/mood-study.jpg' },
  { name: 'Sad', image: '/images/mood-sad.jpg' },
  { name: 'Happy', image: '/images/mood-happy.jpg' },
  { name: 'Romantic', image: '/images/mood-chill.jpg' },
  { name: 'Gaming', image: '/images/mood-workout.jpg' },
  { name: 'Commute', image: '/images/mood-study.jpg' },
];

export const allTracks: Song[] = [
  { id: '1', title: 'The Girl Who Fell Beneath The Sea', artist: 'Airica', album: 'Ethereal Dreams', duration: 312, cover: '/images/album-1.jpg' },
  { id: '2', title: 'Midnight Rain', artist: 'Luna Wave', album: 'Nocturnal', duration: 248, cover: '/images/album-2.jpg' },
  { id: '3', title: 'Neon Horizons', artist: 'Synth Collective', album: 'Electric Dreams', duration: 285, cover: '/images/album-3.jpg' },
  { id: '4', title: 'Coffee Shop Thoughts', artist: 'Morning Breeze', album: 'Acoustic Mornings', duration: 198, cover: '/images/album-4.jpg' },
  { id: '5', title: 'Ocean Depths', artist: 'Deep Blue', album: 'Underwater', duration: 342, cover: '/images/mood-chill.jpg' },
  { id: '6', title: 'Morning Coffee Vibes', artist: 'Acoustic Collective', album: 'Sunrise Sessions', duration: 234, cover: '/images/album-1.jpg' },
  { id: '7', title: 'Rainy Day Mix', artist: 'Ambient Souls', album: 'Weather Patterns', duration: 312, cover: '/images/album-2.jpg' },
  { id: '8', title: 'Late Night Lo-Fi', artist: 'Midnight Producers', album: 'After Hours', duration: 278, cover: '/images/album-3.jpg' },
  { id: '9', title: 'Neon Drive', artist: 'Synthwave Brigade', album: 'Retro Future', duration: 245, cover: '/images/album-4.jpg' },
  { id: '10', title: 'Deep Focus Flow', artist: 'Concentration', album: 'Brain Waves', duration: 420, cover: '/images/mood-study.jpg' },
  { id: '11', title: 'Sunset Sessions', artist: 'Golden Hour', album: 'Horizons', duration: 198, cover: '/images/mood-chill.jpg' },
  { id: '12', title: 'Midnight Jazz', artist: 'The Blue Note Quartet', album: 'Smooth', duration: 356, cover: '/images/album-3.jpg' },
  { id: '13', title: 'Weekend Energy', artist: 'Party Starters', album: 'Friday Night', duration: 189, cover: '/images/mood-happy.jpg' },
  { id: '14', title: 'Acoustic Mornings', artist: 'String Theory', album: 'Unplugged', duration: 267, cover: '/images/album-1.jpg' },
  { id: '15', title: 'Pure Zen', artist: 'Mindfulness', album: 'Meditation', duration: 480, cover: '/images/mood-chill.jpg' },
  { id: '16', title: 'Electro Pulse', artist: 'Digital Nomads', album: 'Voltage', duration: 234, cover: '/images/album-4.jpg' },
  { id: '17', title: 'Urban Hype', artist: 'City Lights', album: 'Metropolis', duration: 201, cover: '/images/mood-workout.jpg' },
  { id: '18', title: 'Chill Vibes', artist: 'Relaxation Station', album: 'Serenity', duration: 312, cover: '/images/mood-chill.jpg' },
  { id: '19', title: 'Starlight Serenade', artist: 'Celestial', album: 'Cosmos', duration: 287, cover: '/images/album-4.jpg' },
  { id: '20', title: 'Electric Dreams', artist: 'Synth Collective', album: 'Electric Dreams', duration: 321, cover: '/images/album-3.jpg' },
  { id: '21', title: 'Velvet Sky', artist: 'Airica', album: 'Ethereal Dreams', duration: 265, cover: '/images/album-1.jpg' },
  { id: '22', title: 'Crimson Tide', artist: 'Deep Blue', album: 'Underwater', duration: 298, cover: '/images/mood-chill.jpg' },
  { id: '23', title: 'Digital Sunrise', artist: 'Digital Nomads', album: 'Voltage', duration: 215, cover: '/images/album-4.jpg' },
  { id: '24', title: 'Whispering Pines', artist: 'Morning Breeze', album: 'Acoustic Mornings', duration: 233, cover: '/images/album-2.jpg' },
  { id: '25', title: 'Neon Nights', artist: 'City Lights', album: 'Metropolis', duration: 276, cover: '/images/mood-happy.jpg' },
];

export const carouselTracks: Song[] = allTracks.slice(0, 13);

export const recentlyPlayed: Song[] = [
  allTracks[5], allTracks[2], allTracks[8], allTracks[11], allTracks[0],
  allTracks[14], allTracks[3], allTracks[17],
];

export const madeForYou: Song[] = [
  allTracks[0], allTracks[6], allTracks[10], allTracks[4], allTracks[15],
];

export const topArtists = [
  { name: 'Airica', image: '/images/album-1.jpg', genre: 'Electronic' },
  { name: 'Luna Wave', image: '/images/album-2.jpg', genre: 'Pop' },
  { name: 'Synth Collective', image: '/images/album-3.jpg', genre: 'Electronic' },
  { name: 'Deep Blue', image: '/images/mood-chill.jpg', genre: 'Ambient' },
  { name: 'Morning Breeze', image: '/images/album-4.jpg', genre: 'Acoustic' },
  { name: 'City Lights', image: '/images/mood-happy.jpg', genre: 'Hip-Hop' },
  { name: 'Ambient Souls', image: '/images/album-2.jpg', genre: 'Ambient' },
  { name: 'The Blue Note Quartet', image: '/images/album-3.jpg', genre: 'Jazz' },
];

export const playlists: Playlist[] = [
  { id: 'p1', name: 'Liked Songs', songCount: 24, cover: '/images/album-1.jpg' },
  { id: 'p2', name: 'Favorites', songCount: 12, cover: '/images/album-2.jpg' },
  { id: 'p3', name: 'Discover Weekly', songCount: 30, cover: '/images/album-3.jpg' },
  { id: 'p4', name: 'On Repeat', songCount: 18, cover: '/images/album-4.jpg' },
  { id: 'p5', name: 'Release Radar', songCount: 20, cover: '/images/mood-chill.jpg' },
  { id: 'p6', name: 'Workout Essentials', songCount: 45, cover: '/images/mood-workout.jpg' },
  { id: 'p7', name: 'Chill Vibes Only', songCount: 33, cover: '/images/mood-chill.jpg' },
  { id: 'p8', name: 'Study Focus', songCount: 27, cover: '/images/mood-study.jpg' },
  { id: 'p9', name: 'Road Trip', songCount: 50, cover: '/images/album-2.jpg' },
  { id: 'p10', name: 'Late Night Jams', songCount: 22, cover: '/images/album-4.jpg' },
  { id: 'p11', name: 'Feel Good Hits', songCount: 38, cover: '/images/mood-happy.jpg' },
  { id: 'p12', name: 'Deep Cuts', songCount: 15, cover: '/images/album-1.jpg' },
];

export const featuredPlaylists: Playlist[] = playlists.slice(0, 6);
export const recommendations: Playlist[] = playlists.slice(6, 12);

export const listeningHistory = [
  { song: allTracks[5], playedAt: '2 hours ago' },
  { song: allTracks[2], playedAt: '3 hours ago' },
  { song: allTracks[8], playedAt: '5 hours ago' },
  { song: allTracks[11], playedAt: 'Yesterday' },
  { song: allTracks[0], playedAt: 'Yesterday' },
  { song: allTracks[14], playedAt: 'Yesterday' },
  { song: allTracks[3], playedAt: '2 days ago' },
  { song: allTracks[17], playedAt: '2 days ago' },
];

export const recentSearches = [
  'lo-fi beats',
  'jazz piano',
  'workout motivation',
  'ambient sleep',
  'chill electronic',
  'acoustic covers',
];

export const trendingSearches = [
  'Taylor Swift',
  'The Weeknd',
  'Kendrick Lamar',
  'Billie Eilish',
  'Drake',
  'SZA',
];

export const searchResults = {
  songs: allTracks.slice(0, 8),
  artists: topArtists.slice(0, 4),
  albums: [
    { id: 'a1', title: 'Ethereal Dreams', artist: 'Airica', cover: '/images/album-1.jpg', year: 2024 },
    { id: 'a2', title: 'Nocturnal', artist: 'Luna Wave', cover: '/images/album-2.jpg', year: 2024 },
    { id: 'a3', title: 'Electric Dreams', artist: 'Synth Collective', cover: '/images/album-3.jpg', year: 2024 },
    { id: 'a4', title: 'Underwater', artist: 'Deep Blue', cover: '/images/mood-chill.jpg', year: 2024 },
  ],
};

export const newReleases = [
  allTracks[18], allTracks[19], allTracks[20], allTracks[21],
  allTracks[22], allTracks[23],
];

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
