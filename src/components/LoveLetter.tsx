import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const LoveLetter: React.FC = () => {
  return (
    <section id="love-letter" className="relative py-24 px-4 z-10 flex justify-center items-center">
      {/* Background soft lighting */}
      <div className="absolute inset-0 bg-radial-at-c from-rose-gold-900/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="glassmorphism max-w-2xl w-full p-8 md:p-14 rounded-2xl border border-rose-gold-300/20 relative shadow-[0_20px_50px_-20px_rgba(183,110,121,0.3)]"
      >
        {/* Rose Gold Corners for Luxury Accent */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-rose-gold-400/50 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-rose-gold-400/50 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-rose-gold-400/50 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-rose-gold-400/50 rounded-br-2xl" />

        {/* Floating Heart Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-3 rounded-full bg-rose-gold-500/10 border border-rose-gold-500/30"
          >
            <Heart className="w-6 h-6 text-rose-gold-300 fill-rose-gold-400" />
          </motion.div>
        </div>

        {/* ==========================================
            EDIT YOUR LOVE LETTER TEXT HERE
            ========================================== */}
        <div className="text-left font-serif text-rose-gold-100 font-light leading-relaxed select-text space-y-6">
          <p className="text-xl md:text-2xl not-italic font-semibold tracking-wide text-white border-b border-rose-gold-500/20 pb-3">
            Archana,
          </p>
          <p className="text-lg md:text-xl italic font-light pl-2 border-l-2 border-rose-gold-500/30">
            Before you, life was just moving.
          </p>
          <p className="text-lg md:text-xl italic font-light pl-2 border-l-2 border-rose-gold-500/30">
            After you, life started meaning something.
          </p>
          <p className="text-lg md:text-xl italic font-light leading-loose">
            Thank you for bringing softness into my chaos, laughter into my stress, and love into places I thought were empty.
          </p>
          <p className="text-lg md:text-xl italic font-light leading-loose">
            You are my favorite notification, favorite smile, and favorite human.
          </p>
          <p className="text-xl md:text-2xl not-italic font-medium text-white pt-6 text-right">
            I love you endlessly. <span className="text-rose-gold-400">❤️</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
};
