import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 'Premier', label: 'Hotels' },
  { value: 'Ethiopia', label: 'Destinations' },
  { value: '24/7', label: 'Concierge' },
];

const StatsStrip = () => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="border-y border-white/10 bg-black/40 backdrop-blur-sm"
  >
    <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0">
      {stats.map((item, i) => (
        <div key={item.label} className="flex items-baseline gap-2">
          <span className="text-[var(--primary)] font-medium text-lg md:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {item.value}
          </span>
          <span className="text-white/50 text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </motion.section>
);

export default StatsStrip;
