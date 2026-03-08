import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const StickyBookingBar = () => {
  const [checkIn, setCheckIn] = useState('');
  const [destination, setDestination] = useState('');

  return (
    <>
      {/* Desktop: sticky top */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:flex fixed top-[72px] left-0 right-0 z-50 justify-center px-4 py-3"
      >
        <div
          className="flex items-center gap-4 lg:gap-6 max-w-4xl w-full rounded-2xl px-5 py-3.5 shadow-2xl border border-white/10"
          style={{
            background: 'rgba(20, 20, 20, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <MapPin className="shrink-0 w-4 h-4 text-[var(--primary)]" />
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder:text-white/50 text-sm focus:ring-0 focus:outline-none min-w-0"
            />
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Calendar className="w-4 h-4 text-[var(--primary)]" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent border-none text-white/90 text-sm focus:ring-0 focus:outline-none"
            />
          </div>
          <Link
            to="/hotels"
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              color: 'var(--secondary)',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
            }}
          >
            Explore
          </Link>
        </div>
      </motion.div>

      {/* Mobile: sticky bottom, thumb-friendly */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-3 safe-area-pb"
      >
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-4 shadow-2xl border border-white/10"
          style={{
            background: 'rgba(20, 20, 20, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex-1 flex items-center gap-2 min-w-0 min-h-[44px]">
            <MapPin className="shrink-0 w-5 h-5 text-[var(--primary)]" />
            <input
              type="text"
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder:text-white/50 text-base focus:ring-0 focus:outline-none min-w-0 py-2"
            />
          </div>
          <Link
            to="/hotels"
            className="shrink-0 flex items-center justify-center min-h-[44px] min-w-[44px] px-5 rounded-xl text-sm font-medium tracking-wide"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
              color: 'var(--secondary)',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
            }}
          >
            Go
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default StickyBookingBar;
