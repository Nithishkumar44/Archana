import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "You are my safest place in this noisy world.",
  "Even ordinary days feel magical with you.",
  "If love had a face, it would look like your smile.",
  "You turned my life from black & white into cinema.",
  "No matter where life goes, I want you beside me.",
  "You are not my habit. You are my peace."
];

export const TypewriterMessages: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer: number;
    const currentMessage = messages[index];

    if (isTyping) {
      if (displayText.length < currentMessage.length) {
        timer = window.setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, 50); // Speed of typing
      } else {
        // Pause at the end of the message
        timer = window.setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    } else {
      // Fade out and move to next message
      timer = window.setTimeout(() => {
        setDisplayText('');
        setIsTyping(true);
        setIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 800); // Wait for fade out animation before resetting text
    }

    return () => clearTimeout(timer);
  }, [displayText, index, isTyping]);

  return (
    <div className="relative py-24 flex justify-center items-center w-full min-h-[250px] z-10 px-4">
      {/* Subtle radial light backlighting the text */}
      <div className="absolute inset-0 bg-radial-at-c from-rose-gold-900/10 to-transparent pointer-events-none" />

      <div className="glassmorphism max-w-3xl w-full py-10 px-6 md:px-12 rounded-2xl text-center border-l-4 border-l-rose-gold-500 shadow-[0_10px_40px_-15px_rgba(183,110,121,0.2)]">
        <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-rose-gold-400 font-semibold mb-3 block">
          Whispers of my Heart
        </span>
        
        {/* AnimatePresence for smooth transitions between messages */}
        <div className="min-h-[80px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index + (isTyping ? "-typing" : "-fade")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="font-serif italic text-xl md:text-3xl text-rose-gold-100 font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-6 ml-1 bg-rose-gold-400 align-middle"
              />
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
