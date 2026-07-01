import { useEffect, useRef, useCallback, useState } from 'react';
import { useStore } from '@/store/useStore';

const BASE_HEIGHT = 0.15;

export default function AudioVisualizer() {
  const { isPlaying, currentTime, duration } = useStore();
  const barsRef = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number>(0);
  const progress = duration > 0 ? currentTime / duration : 0;
  const [barCount, setBarCount] = useState(120);

  useEffect(() => {
    const updateBarCount = () => {
      const width = window.innerWidth;
      if (width < 640) setBarCount(40);
      else if (width < 1024) setBarCount(60);
      else setBarCount(120);
    };
    updateBarCount();
    window.addEventListener('resize', updateBarCount);
    return () => window.removeEventListener('resize', updateBarCount);
  }, []);

  const setBarRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) barsRef.current[index] = el;
  }, []);

  useEffect(() => {
    const bars = barsRef.current;
    if (!bars.length) return;

    let time = 0;

    const animate = () => {
      time += 0.03;

      bars.forEach((bar, i) => {
        if (!bar) return;

        // Create wave pattern using multiple sine waves
        const wave1 = Math.sin(time + i * 0.15) * 0.5 + 0.5;
        const wave2 = Math.sin(time * 1.3 + i * 0.08) * 0.3 + 0.3;
        const wave3 = Math.cos(time * 0.7 + i * 0.2) * 0.2 + 0.2;
        
        // Combine waves
        const combined = (wave1 + wave2 + wave3) / 3;
        
        // Add some randomness when playing
        const randomness = isPlaying ? Math.random() * 0.15 : 0;
        
        // Calculate height (minimum base height + wave amplitude)
        const height = BASE_HEIGHT + combined * 0.7 + randomness;
        
        // Determine if this bar is "played" based on progress
        const barProgress = i / barCount;
        const isPlayed = barProgress <= progress;
        
        // Smooth transition at the playhead
        const playheadWidth = 3;
        const isPlayhead = Math.abs(i - progress * barCount) < playheadWidth;
        
        bar.style.height = `${height * 100}%`;
        
        if (isPlayed) {
          bar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        } else if (isPlayhead) {
          bar.style.backgroundColor = 'rgba(139, 92, 246, 0.8)';
        } else {
          bar.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, progress]);

  return (
    <div className="relative w-full h-32 sm:h-40 lg:h-48 flex items-center justify-center">
      {/* Ambient glow behind */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] animate-breathe"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Waveform bars */}
      <div className="relative flex items-end justify-center gap-[1px] sm:gap-[2px] w-full max-w-3xl px-2 sm:px-8 h-full">
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => setBarRef(el, i)}
            className="waveform-bar flex-1 rounded-full min-w-[1px] max-w-[4px]"
            style={{
              height: `${BASE_HEIGHT * 100}%`,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
