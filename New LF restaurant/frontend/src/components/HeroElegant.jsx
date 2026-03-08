import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const defaultBg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80';

const HeroElegant = ({
  label = 'The Collection',
  title = 'Our Destinations',
  subtitle,
  backgroundImage = defaultBg,
  ctaText,
  ctaHref = '/hotels',
  /** 'center' | 'left' | 'right' */
  align = 'left',
}) => {
  const ref = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springConfig = { damping: 28, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
    setIsHovering(false);
  }, [x, y]);

  const alignClasses = {
    left: 'text-left items-end',
    center: 'text-center items-end justify-center',
    right: 'text-right items-end justify-end',
  };

  const overlayGradient = [
    'radial-gradient(ellipse 80% 50% at 50% 100%, transparent 0%, rgba(5,5,5,0.4) 70%)',
    'linear-gradient(to top, var(--bg-body) 0%, transparent 35%, transparent 60%, rgba(5,5,5,0.3) 100%)',
  ].join(', ');

  const grainUrl = 'data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E';

  const subtitleBlock = subtitle ? (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="mt-5 md:mt-6 text-white/70 text-base md:text-lg lg:text-xl max-w-xl font-light leading-relaxed"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {subtitle}
    </motion.p>
  ) : null;

  const ctaBlock = ctaText ? (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8 md:mt-10"
    >
      <Link
        to={ctaHref}
        className="inline-flex items-center gap-2 text-[var(--primary)] font-medium tracking-[0.2em] uppercase text-xs md:text-sm hover:text-white/90 transition-colors duration-300 group"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <span>{ctaText}</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </Link>
    </motion.div>
  ) : null;

  return (
    <motion.section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end"
      style={{ perspective: '1400px' }}
    >
      {/* Background with subtle 3D tilt */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          scale: isHovering ? 1.04 : 1,
          transition: 'scale 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      {/* Elegant overlay: soft vignette + fade to solid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: overlayGradient }}
      />
      {/* Subtle grain for texture (optional) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("${grainUrl}")` }}
      />

      {/* Content */}
      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20 md:pb-28 pt-32 md:pt-40 flex flex-col ${alignClasses[align]}`}
      >
        {/* Label: small, spaced, gold */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[var(--primary)] tracking-[0.35em] uppercase text-[11px] md:text-xs font-medium mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {label}
        </motion.p>

        {/* Accent line that draws in */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`h-px w-12 md:w-16 mb-6 ${align === 'right' ? 'origin-right ml-auto' : align === 'center' ? 'origin-center mx-auto' : 'origin-left'}`}
          style={{
            background: align === 'right'
              ? 'linear-gradient(270deg, var(--primary), transparent)'
              : 'linear-gradient(90deg, var(--primary), transparent)',
          }}
        />

        {/* Headline: large, serif, refined */
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-[1.05] tracking-tight max-w-4xl"
          style={{
            fontFamily: 'var(--font-heading)',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
          }}
        >
          {title}
        </motion.h1>

        {subtitleBlock}
        {ctaBlock}

        {/* Scroll indicator (subtle) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 rounded-full bg-white/30"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroElegant;
