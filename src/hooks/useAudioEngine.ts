import { useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

let sharedCtx: AudioContext | null = null;
function getAudioContext(): AudioContext {
  if (!sharedCtx) {
    sharedCtx = new AudioContext();
  }
  if (sharedCtx.state === 'suspended') {
    sharedCtx.resume();
  }
  return sharedCtx;
}

export default function useAudioEngine() {
  const {
    isPlaying, currentSong, volume, isMuted,
    currentTime, setCurrentTime, setDuration, nextSong,
  } = useStore();

  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef(0);
  const pausedAtRef = useRef(0);
  const rafRef = useRef<number>(0);

  const frequencies = [220, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88];

  useEffect(() => {
    if (!currentSong) return;
    setDuration(currentSong.duration);
    if (!isPlaying) {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (err) {
          console.error('Failed to stop oscillator:', err);
        }
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const ctx = getAudioContext();
    ctxRef.current = ctx;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    const idx = parseInt(currentSong.id, 10) % frequencies.length;
    osc.type = 'sine';
    osc.frequency.value = frequencies[idx];
    osc.frequency.linearRampToValueAtTime(frequencies[idx] * 1.5, ctx.currentTime + 0.5);

    filter.type = 'lowpass';
    filter.frequency.value = 800 + idx * 200;

    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscRef.current = osc;
    gainRef.current = gain;

    if (pausedAtRef.current > 0) {
      startTimeRef.current = ctx.currentTime - pausedAtRef.current;
      pausedAtRef.current = 0;
    } else if (currentTime === 0) {
      startTimeRef.current = ctx.currentTime;
    } else {
      startTimeRef.current = ctx.currentTime - currentTime;
    }

    const tick = () => {
      if (!ctxRef.current) return;
      const elapsed = ctxRef.current.currentTime - startTimeRef.current;
      const dur = currentSong.duration;
      if (elapsed >= dur) {
        setCurrentTime(dur);
        nextSong();
        return;
      }
      setCurrentTime(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch (err) {
          console.error('Failed to stop oscillator on cleanup:', err);
        }
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
    };
  }, [isPlaying, currentSong?.id]);

  useEffect(() => {
    if (gainRef.current) {
      const vol = isMuted ? 0 : volume * 0.08;
      gainRef.current.gain.linearRampToValueAtTime(vol, (ctxRef.current?.currentTime ?? 0) + 0.05);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isPlaying && !pausedAtRef.current && currentTime > 0) {
      pausedAtRef.current = currentTime;
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (ctxRef.current) ctxRef.current.close();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
