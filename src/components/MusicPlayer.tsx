import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  isUnlocked: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isUnlocked }) => {
  // ==========================================
  // EDIT YOUR ROMANTIC AUDIO TRACK URL HERE
  // ==========================================
  const MUSIC_URL = 'https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-2481.mp3';

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Initialize audio
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.5; // Moderate volume
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      // Direct user action (clicking "Open My Heart") enables play
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log('Autoplay blocked by browser. User needs to interact first:', error));
    }
  }, [isUnlocked]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Audio playback failed:', err));
    }
  };

  if (!isUnlocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center border border-rose-gold-300/30 text-rose-gold-300 hover:text-white hover:border-rose-gold-300 shadow-lg cursor-pointer transition-all duration-300 relative group overflow-hidden"
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        <div className="absolute inset-0 bg-rose-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {isPlaying ? (
          <div className="flex items-center gap-[2px] h-4">
            <Volume2 className="w-5 h-5" />
            {/* Visualizer bars */}
            <span className="w-[2px] bg-rose-gold-300 animate-[bounce_0.8s_infinite_alternate]" style={{ height: '8px', animationDelay: '0s' }} />
            <span className="w-[2px] bg-rose-gold-300 animate-[bounce_0.6s_infinite_alternate]" style={{ height: '14px', animationDelay: '0.2s' }} />
            <span className="w-[2px] bg-rose-gold-300 animate-[bounce_0.7s_infinite_alternate]" style={{ height: '10px', animationDelay: '0.4s' }} />
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </motion.div>
  );
};
