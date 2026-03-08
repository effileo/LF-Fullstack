import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#080706]/95 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto h-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-serif tracking-tight"
          style={{ color: "#C3965A" }}
        >
          LF Collection
        </Link>

        {isHome && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-white/90">
            <Link to="/#collection" className="hover:text-[#C3965A] transition">
              DESTINATIONS
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-md px-5 border border-white/30 text-white/95 text-xs font-medium uppercase tracking-[0.14em] hover:bg-white/10 transition"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center rounded-md px-5 bg-[#C3965A] text-black font-semibold text-xs uppercase tracking-[0.14em] border border-[#C3965A] hover:brightness-110 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
