import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isHotelPage = /^\/hotel\/[^/]+$/.test(location.pathname);
  const hasHero = isHome || isHotelPage;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${hasHero ? "bg-transparent" : ""}`}
      style={
        hasHero
          ? { background: "transparent", boxShadow: "none", backdropFilter: "none" }
          : {
              background: "rgba(10,10,10,0.5)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.04)",
            }
      }
    >
      <nav className="mx-auto h-20 max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-serif tracking-tight"
          style={{ color: "#C3965A" }}
        >
          LF Collection
        </Link>

        {(isHome || isHotelPage) && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-white/80">
            {isHome ? (
              <Link to="/#collection" className="hover:text-[#C3965A] transition-colors duration-200">
                DESTINATIONS
              </Link>
            ) : (
              <Link to="/" className="hover:text-[#C3965A] transition-colors duration-200">
                HOME
              </Link>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex h-10 items-center rounded-lg px-5 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.28)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            LOG IN
          </Link>
          <Link
            to="/signup"
            className="inline-flex h-10 items-center rounded-lg px-5 bg-[#C3965A] font-semibold text-xs uppercase tracking-[0.14em] text-white hover:brightness-110 transition-all duration-200"
          >
            SIGN UP
          </Link>
        </div>
      </nav>
    </header>
  );
}
