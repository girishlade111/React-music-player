import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselTracks } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export default function ExploreView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentSong } = useStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      setMouseX(x);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselTracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === carouselTracks.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      key="explore"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full flex flex-col px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-thin tracking-[0.15em] sm:tracking-[0.2em] text-white/90 uppercase">
          Explore
        </h1>
        <p className="text-sm text-white/40 mt-3 tracking-wide font-light">
          Discover new music curated for you
        </p>
      </motion.div>

        {/* 3D Carousel */}
      <motion.div
        variants={itemVariants}
        ref={containerRef}
        className="flex-1 flex items-center justify-center relative"
        style={{ perspective: '1200px' }}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-30 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={1.5} className="text-white/60" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 z-30 w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ChevronRight size={16} strokeWidth={1.5} className="text-white/60" />
        </button>
        {/* Cards */}
        <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] flex items-center justify-center">
          {carouselTracks.map((track, index) => {
            let offset = index - activeIndex;
            
            if (offset > carouselTracks.length / 2) offset -= carouselTracks.length;
            if (offset < -carouselTracks.length / 2) offset += carouselTracks.length;
            
            const isActive = offset === 0;
            const absOffset = Math.abs(offset);

            const cardH = typeof window !== 'undefined' && window.innerWidth < 640 ? 260 : 400;
            const spacing = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 220;
            
            const translateX = offset * spacing;
            const translateZ = isActive ? 100 : -absOffset * 80;
            const rotateY = offset * -8 + (mouseX - 0.5) * 5;
            const scale = isActive ? 1.1 : Math.max(0.7, 1 - absOffset * 0.15);
            const opacity = isActive ? 1 : Math.max(0.3, 1 - absOffset * 0.25);

            return (
              <motion.div
                key={track.id}
                className="absolute w-[200px] sm:w-[320px] rounded-xl overflow-hidden cursor-pointer explore-card"
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY,
                  scale,
                  opacity,
                  height: cardH,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                onClick={() => {
                  if (isActive) {
                    setCurrentSong(track);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 20 : 10 - absOffset,
                }}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-white/40 tracking-widest uppercase font-light">
                      {String(index + 1).padStart(2, '0')} / {String(carouselTracks.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-xl lg:text-2xl font-light text-white tracking-wide leading-tight mb-1">
                      {track.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/50 tracking-wider mb-2 sm:mb-4">
                      {track.artist}
                    </p>
                    
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSong(track);
                        }}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
                      >
                        <Play size={14} strokeWidth={2} className="text-black ml-0.5 sm:ml-1 sm:w-5 sm:h-5" />
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5">
          {carouselTracks.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white w-4 sm:w-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
