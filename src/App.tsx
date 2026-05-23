import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { StarsBackground } from './components/StarsBackground';
import { HeartParticles } from './components/HeartParticles';
import { Hero } from './components/Hero';
import { TypewriterMessages } from './components/TypewriterMessages';
import { Gallery } from './components/Gallery';
import { Countdown } from './components/Countdown';
import { LoveLetter } from './components/LoveLetter';
import { MusicPlayer } from './components/MusicPlayer';
import { FinalSection } from './components/FinalSection';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-4"
        >
          <Heart className="w-12 h-12 text-rose-gold-500 fill-rose-gold-500/20 filter drop-shadow-[0_0_15px_rgba(183,110,121,0.5)] mx-auto" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif italic text-rose-gold-300 text-sm tracking-widest uppercase mt-4"
        >
          Creating a special corner for you...
        </motion.p>
      </div>
    </motion.div>
  );
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initial cinematic loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Control body scroll based on unlocked status
  useEffect(() => {
    if (isUnlocked) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isUnlocked]);

  return (
    <div className="relative min-h-screen text-white select-none overflow-hidden bg-black font-sans">
      {/* 1. Twinkling Stars Sky Background */}
      <StarsBackground />

      {/* 2. Floating Hearts/Sparkles (Fires when opened) */}
      {isUnlocked && <HeartParticles />}

      {/* 3. Floating Music Control */}
      <MusicPlayer isUnlocked={isUnlocked} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : !isUnlocked ? (
          <Hero
            key="hero"
            onUnlock={() => setIsUnlocked(true)}
            isUnlocked={isUnlocked}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full relative z-10"
          >
            {/* Scrollable Layout Flow */}
            <div className="flex flex-col w-full relative">
              {/* Typewriter Quotes Block */}
              <TypewriterMessages />

              {/* Photo Memory Grid */}
              <Gallery />

              {/* Live Ticking Counter */}
              <Countdown />

              {/* Cursive Love Letter Card */}
              <LoveLetter />

              {/* Forever Proposal Block */}
              <FinalSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
