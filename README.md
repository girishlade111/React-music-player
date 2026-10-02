# AURA — Premium Music Streaming App

A modern, dark-themed music streaming interface built with React 19, TypeScript, and shadcn/ui. Features a custom audio visualizer, full-screen player, and responsive design.

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Language** | TypeScript | ~5.9 |
| **UI Framework** | React | ^19.2 |
| **Bundler** | Vite | ^7.2 |
| **Routing** | React Router | ^7.x |
| **CSS Framework** | Tailwind CSS | ^3.4 |
| **Component System** | shadcn/ui (New York) | — |
| **Headless UI** | Radix UI | ^1.x |
| **Icons** | Lucide React | ^0.562 |
| **Animation** | Framer Motion | ^12.42 |
| **State Management** | Zustand | ^5.0 |
| **Audio Engine** | Howler.js | ^2.2 |
| **Form Validation** | React Hook Form + Zod | ^7.70 / ^4.3 |
| **Charts** | Recharts | ^2.15 |
| **Theme** | next-themes | ^0.4 |
| **Package Manager** | pnpm | — |
| **Linting** | ESLint + typescript-eslint | ^9.39 |

## Features

- **Audio player** with play/pause, skip, shuffle, repeat, volume control, and seek
- **Full-screen player** with animated waveform visualizer built with Canvas API
- **4 views**: Home, Search, Explore (3D carousel), Profile
- **Search** by songs, artists, albums, genres, and moods
- **Queue management** with add/remove/play-from-queue
- **Like/favorite songs**
- **Keyboard shortcuts** (Space = play/pause, Alt+Arrow = skip)
- **Responsive design** — desktop sidebar, mobile bottom nav + mini player
- **Dark theme** with custom "aura" palette (purple accent #8B5CF6)
- **Stagger animations**, ambient glow effects, and micro-interactions
- **44+ shadcn/ui components** pre-installed

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Runs on [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

Outputs to `dist/`.

### Preview

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
app/
├── index.html                  # HTML entry point
├── package.json                # Dependencies & scripts
├── pnpm-lock.yaml              # pnpm lock file
├── pnpm-workspace.yaml         # pnpm workspace config
├── components.json             # shadcn/ui configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS (custom aura theme)
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # ESLint flat config
├── tsconfig.json               # Root TypeScript config
├── tsconfig.app.json           # App TS config (ES2022, DOM, React JSX)
├── tsconfig.node.json          # Node TS config (ES2023)
├── .gitignore
├── public/
│   └── images/                 # Album art, avatars, mood images
└── src/
    ├── main.tsx                # Entry point (BrowserRouter > App)
    ├── App.tsx                 # Root component with routing & view switching
    ├── App.css
    ├── index.css               # Global styles + Tailwind directives
    ├── lib/
    │   └── utils.ts            # cn() utility (clsx + tailwind-merge)
    ├── hooks/
    │   ├── use-mobile.ts       # Mobile detection hook
    │   └── useAudioEngine.ts   # Audio engine hook (Howler.js)
    ├── store/
    │   └── useStore.ts         # Zustand store (player + UI state)
    ├── data/
    │   └── mockData.ts         # Mock songs, genres, moods, playlists
    ├── components/
    │   ├── ui/                 # 44+ shadcn/ui components
    │   ├── Sidebar.tsx         # Left sidebar navigation
    │   ├── PlayerBar.tsx       # Bottom player bar
    │   ├── MobileNav.tsx       # Mobile bottom navigation
    │   ├── FullScreenPlayer.tsx# Full-screen expanded player
    │   └── AudioVisualizer.tsx # Waveform audio visualizer
    └── views/
        ├── HomeView.tsx        # Home (greeting, made for you, recent, new releases, top artists, featured playlists)
        ├── SearchView.tsx      # Search (genres, moods, trending, search results)
        ├── ExploreView.tsx     # Explore (3D carousel of tracks)
        └── ProfileView.tsx     # Profile (stats, playlists, recently played)
```

## Architecture

This is a **fully client-side SPA**. All data is served from local mock data (`src/data/mockData.ts`). There is no backend, database, or external API.

### State Management (Zustand)

The `useStore` manages all app state in a single store:

- **Player state**: `isPlaying`, `currentSong`, `currentTime`, `duration`, `volume`, `shuffle`, `repeat`, `queue`, `queueIndex`, `likedSongs`
- **UI state**: `currentView`, `searchQuery`, `selectedGenre`, `selectedMood`, `sidebarCollapsed`, `playerExpanded`

### Audio Engine (Howler.js)

Audio playback is handled by `useAudioEngine` hook, which synchronizes Howler.js with the Zustand store for play/pause/seek/volume control and automatic track progression.

### Audio Visualizer

A real-time waveform visualizer using `requestAnimationFrame` with multiple synthesized sine waves to create dynamic bar animations. Bars change color (white played / purple playhead / dim unplayed) based on track progress.

### Keyboard Shortcuts

- **Space** — Toggle play/pause (disabled in input fields)
- **Alt+ArrowRight** — Next track
- **Alt+ArrowLeft** — Previous track

## UI Components

This project ships with the full **shadcn/ui component library** (New York style) including:

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Empty State, Field, Form, Hover Card, Input, Input Group, Input OTP, Item, KBD, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip.

## Mock Data

The app includes pre-populated mock data with:

- **25 tracks** across 8 albums and 6 artists
- **8 mood categories**: Workout, Chill, Study, Sad, Happy, Romantic, Gaming, Commute
- **20 genres**: Afrobeat, Alternative, Arabic, Blues, Classical, Country, Electronic, Folk, Hip-Hop, Jazz, Latin, Metal, Pop, Punk, R&B, Reggae, Rock, Soul, Soundtrack, World
- **Featured playlists** and **top artists**

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3000 |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint on all files |

## License

MIT

## Built by Girish Lade

Crafted by **Girish Lade** — check out more free tools and projects at [https://ladestack.in](https://ladestack.in).
