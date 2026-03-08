import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, User, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isHome = location.pathname === "/";
  const isHotelPage = /^\/hotel\/[^/]+$/.test(location.pathname);
  const hasHero = isHome || isHotelPage;

  const user = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/");
  };

  const profilePath = user?.role === "HOTEL_ADMIN" ? "/admin/hotel/profile" : "/profile";
  const dashboardPath = user?.role === "SUPER_ADMIN" ? "/admin/super" : user?.role === "HOTEL_ADMIN" ? "/admin/hotel" : null;

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
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="inline-flex h-10 items-center gap-2 rounded-lg pl-2 pr-3 border border-white/20 bg-white/5 text-white/95 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#C3965A]/30 text-[#C3965A] text-sm font-semibold">
                  {user.image ? (
                    <img src={user.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    (user.name || user.email || "U").charAt(0).toUpperCase()
                  )}
                </span>
                <span className="max-w-[120px] truncate text-xs font-medium sm:max-w-[140px]">
                  {user.name || "Account"}
                </span>
                <ChevronDown size={14} className={`text-white/60 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-black/95 py-2 shadow-xl backdrop-blur-xl"
                  style={{ background: "rgba(12,11,10,0.97)" }}
                >
                  <Link
                    to={profilePath}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <User size={16} className="text-[#C3965A]" />
                    Profile
                  </Link>
                  {dashboardPath && (
                    <Link
                      to={dashboardPath}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-[#C3965A]" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-white/90 hover:bg-red-500/10 hover:text-red-200 transition-colors"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
