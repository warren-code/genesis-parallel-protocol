'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxDividerProps {
  imageSrc: string;
  quote: string;
  author: string;
}

const ParallaxDivider: React.FC<ParallaxDividerProps> = ({ imageSrc, quote, author }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <div ref={ref} className="relative h-[60vh] overflow-hidden my-20">
      {/* Parallax Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-20 -bottom-20"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageSrc})`,
            backgroundAttachment: 'fixed',
          }}
        />
      </motion.div>

      {/* Quote Overlay */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-4xl font-light text-white mb-6 italic"
          >
            "{quote}"
          </motion.blockquote>
          <motion.cite
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#00ff00] not-italic"
          >
            — {author}
          </motion.cite>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#00ff00]/30" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-[#00ff00]/30" />
      </div>
    </div>
  );
};

export default ParallaxDivider;
