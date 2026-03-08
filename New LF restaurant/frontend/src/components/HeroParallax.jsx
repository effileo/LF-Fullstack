import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const defaultBg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80';

const HeroParallax = ({ title = 'Our Destinations', subtitle, backgroundImage = defaultBg }) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width);
      y.set(mouseY / height);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
    setIsHovering(false);
  }, [x, y]);

  return (
    <motion.section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-end justify-center"
      style={{ perspective: '1200px' }}
    >
      {/* Background layer with 3D tilt */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.75) 50%, var(--bg-body) 100%), url(${backgroundImage})`,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          scale: isHovering ? 1.05 : 1,
          transition: 'scale 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {/* Depth overlay for text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--bg-body) 0%, transparent 40%)',
        }}
      />
      {/* Foreground content - no tilt */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-16 md:pb-24 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--primary)] tracking-[0.3em] uppercase text-xs md:text-sm font-medium mb-3"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          The Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            textShadow: '0 4px 30px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};

export default HeroParallax;
