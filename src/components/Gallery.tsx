import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface PhotoCard {
  id: number;
  src: string;
  title: string;
  date: string;
  description: string;
  rotation: string;
}

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCard | null>(null);

  // ==========================================
  // EDIT OR ADD YOUR PHOTOS HERE
  // You can replace the src with path to your own photos (e.g. "/my_photo.jpg")
  // and edit the titles, dates and descriptions.
  // ==========================================
  const photos: PhotoCard[] = [
    {
      id: 1,
      src: '/date1.jpg',
      title: 'Little Archana 🌸',
      date: 'May 9, 2022',
      description: 'A beautiful glimpse of your childhood. You grew up to be the most wonderful person in my life.',
      rotation: '-rotate-2',
    },
    {
      id: 2,
      src: '/date2.png',
      title: 'Us, Side by Side 🖤',
      date: 'May 9, 2022',
      description: 'Matching in black, standing together. You are my peace in this loud world.',
      rotation: 'rotate-1',
    },
    {
      id: 3,
      src: '/date3.png',
      title: 'Our Endless Sunset 🌅',
      date: 'May 9, 2022',
      description: 'Looking forward to writing a lifetime of beautiful chapters together.',
      rotation: 'rotate-3',
    },
  ];

  return (
    <section id="gallery" className="relative py-24 px-4 max-w-6xl mx-auto z-10">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs tracking-widest uppercase text-rose-gold-400 font-semibold mb-2 block"
        >
          Beautiful Memories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl md:text-5xl font-light text-white tracking-wide"
        >
          Our Love Story Gallery
        </motion.h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-gold-500 to-transparent mx-auto mt-4" />
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 justify-items-center">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`cursor-pointer bg-[#0e0a0a] p-4 rounded-lg border border-rose-gold-900/40 shadow-xl max-w-sm w-full transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(183,110,121,0.25)] ${photo.rotation}`}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden rounded bg-black/40 group">
              <img
                src={photo.src}
                alt={photo.title}
                className="object-cover w-full h-full grayscale-[15%] group-hover:grayscale-0 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center backdrop-blur-[2px]">
                <ZoomIn className="w-8 h-8 text-rose-gold-300" />
              </div>
            </div>

            {/* Polaroid Description Block */}
            <div className="pt-5 pb-2 text-left">
              <h3 className="font-serif text-xl text-rose-gold-200 tracking-wide mb-1 font-light">
                {photo.title}
              </h3>
              <p className="font-sans text-[10px] uppercase tracking-widest text-rose-gold-400/80 mb-2">
                {photo.date}
              </p>
              <p className="font-sans text-xs text-stone-400 font-light line-clamp-2 leading-relaxed">
                {photo.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0c0808] rounded-xl border border-rose-gold-300/20 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white transition duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="md:w-3/5 bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-auto object-contain max-h-[70vh] md:max-h-[80vh]"
                />
              </div>

              {/* Lightbox Content Info */}
              <div className="md:w-2/5 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-rose-gold-900/30">
                <span className="font-sans text-[10px] tracking-widest uppercase text-rose-gold-400 font-semibold mb-2 block">
                  Memory Details
                </span>
                <h3 className="font-serif text-3xl text-white tracking-wide font-light mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-xs tracking-wider text-rose-gold-300/80 mb-6 uppercase">
                  {selectedPhoto.date}
                </p>
                <p className="font-sans text-sm text-stone-300 font-light leading-relaxed mb-6">
                  {selectedPhoto.description}
                </p>
                <div className="w-12 h-[1px] bg-rose-gold-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
