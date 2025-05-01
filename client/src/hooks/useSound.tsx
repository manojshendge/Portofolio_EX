import { useEffect, useRef } from "react";
import { useAudio } from "@/lib/stores/useAudio";

interface UseSoundOptions {
  autoplay?: boolean;
}

export function useSound(soundPath: string, { autoplay = false }: UseSoundOptions = {}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isMuted } = useAudio();
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio(soundPath);
    audio.preload = "auto";
    audio.volume = 0.5;
    audioRef.current = audio;
    
    // Autoplay if enabled and not muted
    if (autoplay && !isMuted) {
      audio.play().catch(error => {
        console.log("Sound autoplay prevented:", error);
      });
    }
    
    return () => {
      // Clean up
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath, autoplay]);
  
  // Update mute state when global mute changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);
  
  const play = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log("Sound play prevented:", error);
      });
    }
  };
  
  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  
  return { play, stop, pause };
}
