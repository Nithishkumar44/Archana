import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinalSection: React.FC = () => {
  const [answered, setAnswered] = useState(false);

  const handleResponse = () => {
    setAnswered(true);

    // Firing a series of premium romantic confetti bursts
    const duration = 4 * 1000;
    const end = Date.now() + duration;
    
    // Custom colors matching the romantic luxury theme
    const colors = ['#5e0b15', '#b76e79', '#ffb6c1', '#ffffff', '#e63946'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Big central fireworks burst
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { x: 0.5, y: 0.6 },
      colors: colors,
    });
  };

  return (
    <section id="final" className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10 px-4 py-24">
      {/* Deep dark sky gradient backing */}
      <div className="absolute inset-0 bg-radial-at-b from-deep-crimson/15 via-black to-black pointer-events-none" />

      <div className="max-w-xl w-full text-center relative z-10">
        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Question Text */}
              <motion.h2
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="font-serif text-5xl md:text-8xl font-light text-white tracking-wide mb-12 text-glow-crimson"
              >
                Forever?
              </motion.h2>

              {/* Dual Decision Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full px-4">
                <button
                  onClick={handleResponse}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-gold-600 to-rose-gold-500 text-white font-sans text-xs md:text-sm tracking-widest uppercase border border-rose-gold-300/30 hover:border-rose-gold-200 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(183,110,121,0.2)] hover:shadow-[0_0_35px_rgba(183,110,121,0.5)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  style={{ animation: 'heartbeat 1.8s infinite ease-in-out' }}
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span>Yes ❤️</span>
                </button>

                <button
                  onClick={handleResponse}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/80 text-rose-gold-300 font-sans text-xs md:text-sm tracking-widest uppercase border border-rose-gold-500/50 hover:border-rose-gold-400 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_35px_rgba(183,110,121,0.3)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  style={{ animation: 'heartbeat 1.8s infinite ease-in-out', animationDelay: '0.4s' }}
                >
                  <Heart className="w-4 h-4 text-rose-gold-300 fill-rose-gold-300" />
                  <span>Always ❤️</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="glassmorphism p-10 md:p-14 rounded-2xl border border-rose-gold-300/30 shadow-[0_0_40px_rgba(183,110,121,0.3)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', damping: 10 }}
                className="w-16 h-16 bg-rose-gold-500/20 border border-rose-gold-500/40 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Heart className="w-8 h-8 text-rose-gold-300 fill-rose-gold-400" />
              </motion.div>
              
              <h3 className="font-serif text-3xl md:text-4xl font-light text-white tracking-wide mb-4">
                Thank you, my love.
              </h3>
              
              <p className="font-sans text-sm md:text-base text-rose-gold-200/90 leading-relaxed font-light mb-8">
                You just made me the happiest person alive.
              </p>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[10px] uppercase tracking-widest text-stone-500 hover:text-rose-gold-400 transition duration-200 cursor-pointer"
              >
                Scroll to Top
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
