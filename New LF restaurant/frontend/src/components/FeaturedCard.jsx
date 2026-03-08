import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedCard = ({ title, subtitle, image, href = '/hotels', className = '', index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className={`group relative rounded-2xl overflow-hidden min-h-[200px] ${className}`}
    style={{ minHeight: '200px' }}
  >
    <Link to={href} className="block absolute inset-0">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      {/* Strong gradient so white text is always readable */}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 70%, transparent 100%)',
          opacity: 0.98,
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <span
          className="text-[var(--primary)] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-1.5 block"
          style={{ fontFamily: 'var(--font-body)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          {subtitle}
        </span>
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight break-words"
          style={{
            fontFamily: 'var(--font-heading)',
            textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 24px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </h3>
        <span
          className="mt-2 inline-flex items-center gap-1.5 text-white/80 text-xs font-medium tracking-widest uppercase group-hover:text-[var(--primary)] transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Explore
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </div>
    </Link>
  </motion.div>
);

export default FeaturedCard;
