import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface TimeState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC = () => {
  // ==========================================
  // EDIT THE START DATE OF YOUR RELATIONSHIP HERE
  // Format: YYYY-MM-DD (e.g., '2023-10-14')
  // ==========================================
  const START_DATE_STRING = '2022-05-09';

  const [timeSince, setTimeSince] = useState<TimeState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const [year, month, day] = START_DATE_STRING.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);

    const calculateTime = () => {
      const now = new Date();
      const differenceMs = now.getTime() - startDate.getTime();

      if (differenceMs <= 0) {
        setTimeSince({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Convert to units
      const totalSeconds = Math.floor(differenceMs / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeSince({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeItems = [
    { label: 'Days', value: timeSince.days },
    { label: 'Hours', value: timeSince.hours },
    { label: 'Minutes', value: timeSince.minutes },
    { label: 'Seconds', value: timeSince.seconds },
  ];

  return (
    <section id="countdown" className="relative py-24 px-4 z-10 flex flex-col items-center">
      {/* Light background glow */}
      <div className="absolute inset-0 bg-radial-at-c from-rose-gold-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl w-full text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Calendar className="w-8 h-8 text-rose-gold-400 mx-auto mb-4 animate-bounce" />
          <h2 className="font-serif text-3xl md:text-5xl font-light text-white tracking-wide">
            Days since we met <span className="text-rose-gold-400">❤️</span>
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mt-2">
            Every second counts with you
          </p>
        </motion.div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {timeItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', damping: 15 }}
              className="glassmorphism rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center border border-rose-gold-300/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* Animated number counter wrapper */}
              <span className="font-sans text-4xl md:text-6xl font-light text-rose-gold-300 tracking-tight text-glow-gold">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-stone-400 mt-3 font-semibold">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Start Date Indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          className="font-sans text-[10px] tracking-wider text-stone-500 uppercase mt-8"
        >
          Started counting on {(() => {
            const [year, month, day] = START_DATE_STRING.split('-').map(Number);
            return new Date(year, month - 1, day);
          })().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </motion.p>
      </div>
    </section>
  );
};
