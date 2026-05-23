import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeroProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onUnlock, isUnlocked }) => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden z-20 px-4">
      {/* Subtle background gradient to frame the hero content */}
      <div className="absolute inset-0 bg-radial-at-c from-deep-crimson/20 via-black to-black pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: isUnlocked ? 0 : 1, 
          y: isUnlocked ? -50 : 0,
          pointerEvents: isUnlocked ? 'none' : 'auto' 
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl relative z-10"
      >
        {/* Glowing floating decorative heart */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 flex justify-center"
        >
          <Heart className="w-12 h-12 text-rose-gold-400 fill-rose-gold-500/20 filter drop-shadow-[0_0_15px_rgba(183,110,121,0.6)]" />
        </motion.div>

        {/* Hey Archana Header */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white mb-6"
        >
          Hey Archana <span className="text-rose-gold-400 filter drop-shadow-[0_0_8px_rgba(183,110,121,0.5)]">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.5 }}
          className="font-sans text-sm md:text-base lg:text-lg text-rose-gold-200/80 font-light tracking-widest uppercase mb-12 max-w-xl mx-auto leading-relaxed"
        >
          This little corner of the internet belongs to you.
        </motion.p>

        {/* Open My Heart Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="relative inline-block group"
        >
          {/* Glowing pulse ring */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-rose-gold-500 to-deep-crimson opacity-70 blur-md group-hover:opacity-100 group-hover:blur-xl transition duration-1000 group-hover:duration-200 animate-pulse" />
          
          <button
            onClick={onUnlock}
            className="relative px-8 py-4 rounded-full bg-black/90 text-white font-sans text-xs md:text-sm tracking-widest uppercase border border-rose-gold-300/40 hover:border-rose-gold-300 transition-all duration-300 ease-out flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(183,110,121,0.15)] group-hover:shadow-[0_0_35px_rgba(183,110,121,0.4)] group-hover:scale-105"
            style={{ animation: 'heartbeat 1.8s infinite ease-in-out' }}
          >
            <Heart className="w-4 h-4 text-rose-gold-300 fill-rose-gold-300 animate-pulse" />
            <span>Open My Heart</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
