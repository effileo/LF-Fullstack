import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import api from "../api/client";
import Navbar from "../components/Navbar";
import "../index.css";

const heroReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const scrollReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const sectionTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] };

const heroHotels = [
  {
    id: 1,
    name: "Sheraton Addis",
    location: "Taitu St, Addis Ababa",
    rating: 4,
    description: "A Sanctuary of Grandeur. The Sheraton Addis, a Luxury Collection Hotel, Addis Ababa, sits opposite the National Palace in the heart of the city.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ethiopian Skylight Hotel",
    location: "Bole International Airport",
    rating: 4.2,
    description: "The largest hotel in Ethiopia, offering world-class amenities and convenience.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Haile Resort Hawassa",
    location: "Hawassa, Lake View",
    rating: 4.2,
    description: "A perfect getaway by the beautiful Lake Hawassa.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kuriftu Resort & Spa",
    location: "Bishoftu",
    rating: 3.9,
    description: "Lakeside retreat with spa, pools and serene views.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Hilton Addis Ababa",
    location: "Menelik II Ave, Addis Ababa",
    rating: 3.7,
    description: "A landmark hotel with thermal pools and distinct hospitality in the capital.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  },
];

export default function LandingPage() {
  const [hotels, setHotels] = useState(heroHotels);
  const cardsRef = useRef(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  });

  const heroContentY = useTransform(scrollY, [0, 380], [0, -90]);
  const heroContentOpacity = useTransform(scrollY, [0, 260], [1, 0]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await api.get("/hotels");
        const list = res.data || [];
        if (list.length > 0) {
          const defaultImg = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop";
          setHotels(list.slice(0, 5).map((h) => ({
            id: h.id,
            name: h.name,
            location: h.location || "",
            rating: h.rating ?? 0,
            description: h.description || "",
            image: h.image || defaultImg,
          })));
        }
      } catch (_) {
        // keep static heroHotels on error
      }
    };
    fetchHotels();
  }, []);

  // Emerge + flow: each card moves up, fades in, and scales up as you scroll
  const card1Y = useTransform(scrollYProgress, [0, 0.2], [72, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.16], [0, 1]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.18], [0.92, 1]);
  const card2Y = useTransform(scrollYProgress, [0.14, 0.34], [72, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.14, 0.3], [0, 1]);
  const card2Scale = useTransform(scrollYProgress, [0.14, 0.32], [0.92, 1]);
  const card3Y = useTransform(scrollYProgress, [0.28, 0.48], [72, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.28, 0.44], [0, 1]);
  const card3Scale = useTransform(scrollYProgress, [0.28, 0.46], [0.92, 1]);
  const card4Y = useTransform(scrollYProgress, [0.42, 0.62], [72, 0]);
  const card4Opacity = useTransform(scrollYProgress, [0.42, 0.58], [0, 1]);
  const card4Scale = useTransform(scrollYProgress, [0.42, 0.6], [0.92, 1]);
  const card5Y = useTransform(scrollYProgress, [0.56, 0.76], [72, 0]);
  const card5Opacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);
  const card5Scale = useTransform(scrollYProgress, [0.56, 0.74], [0.92, 1]);

  const cardTransforms = [
    { y: card1Y, opacity: card1Opacity, scale: card1Scale },
    { y: card2Y, opacity: card2Opacity, scale: card2Scale },
    { y: card3Y, opacity: card3Opacity, scale: card3Scale },
    { y: card4Y, opacity: card4Opacity, scale: card4Scale },
    { y: card5Y, opacity: card5Opacity, scale: card5Scale },
  ];

  return (
    <main className="min-h-screen bg-[#080706] text-white overflow-x-hidden">
      <Navbar />

      {/* ——— 1. Hero: extends behind nav so transparent nav shows hero, not main background ——— */}
      <section className="relative flex flex-col overflow-hidden -mt-20">
        <div className="relative min-h-[100dvh] min-h-[90vh] flex flex-col items-center justify-center pt-20">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2000&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.94) 85%, #000000 100%)",
            }}
          />
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 safe-area-inset min-h-[70vh]"
          >
            <motion.p
              variants={heroReveal}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.6 }}
              className="text-xs sm:text-sm uppercase tracking-[0.32em] font-medium mb-6 sm:mb-8"
              style={{ color: "#C3965A", fontFamily: "var(--font-body)" }}
            >
              A CURATED WORLD
            </motion.p>
            <motion.h1
              variants={heroReveal}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Elegance
              <br />
              In Stillness
            </motion.h1>
          </motion.div>
        </div>

        {/* Collection: section label + five hotel cards (id for /#collection) */}
        <div id="collection" ref={cardsRef} className="relative z-10 bg-[#080706] px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-16 sm:pb-20 md:pb-24 scroll-mt-20">
          <div className="mx-auto max-w-7xl">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={scrollReveal}
              transition={sectionTransition}
              className="text-[10px] sm:text-xs uppercase tracking-[0.28em] flex items-center justify-center gap-4 mb-10 sm:mb-12 md:mb-14"
              style={{ color: "#C3965A", fontFamily: "var(--font-body)" }}
            >
              <span className="block w-12 sm:w-20 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
              THE COLLECTION
              <span className="block w-12 sm:w-20 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
            </motion.p>
            <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
              {hotels.slice(0, 5).map((hotel, i) => {
                const imageLeft = i % 2 === 0;
                const transform = cardTransforms[i] ?? cardTransforms[0];
                return (
                  <motion.div
                    key={hotel.id}
                    style={{
                      y: transform.y,
                      opacity: transform.opacity,
                      scale: transform.scale,
                      transformOrigin: "center center",
                    }}
                  >
                    <motion.article
                      className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/10"
                      style={{ boxShadow: "0 22px 48px rgba(0,0,0,0.42)" }}
                      whileHover={{ boxShadow: "0 24px 52px rgba(0,0,0,0.48), 0 0 0 1px rgba(195,150,90,0.15)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link to={`/hotel/${String(hotel.id)}`} className="block group">
                        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[340px] sm:min-h-[380px] md:min-h-[420px]">
                          <div
                            className={`relative min-h-[260px] sm:min-h-[300px] md:min-h-full overflow-hidden ${imageLeft ? "md:order-1" : "md:order-2"}`}
                          >
                            <motion.img
                              src={hotel.image}
                              alt={hotel.name}
                              className="absolute inset-0 h-full w-full object-cover"
                              whileHover={{ scale: 1.04 }}
                              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            />
                            <div
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.25) 100%)",
                              }}
                            />
                          </div>
                          <div
                            className={`flex flex-col justify-center p-6 sm:p-8 md:p-10 relative ${imageLeft ? "md:order-2" : "md:order-1"}`}
                            style={{
                              background: "linear-gradient(180deg, #0A0A0A 0%, #080706 100%)",
                            }}
                          >
                            <div
                              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ background: "#C3965A" }}
                            />
                            <div className="flex items-start justify-between gap-3 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                              <span className="text-[10px] sm:text-xs uppercase tracking-[0.24em] font-medium" style={{ color: "#C3965A" }}>
                                {hotel.location}
                              </span>
                              <span
                                className="flex items-center gap-1 shrink-0 text-xs font-medium px-2.5 py-1 rounded"
                                style={{ background: "rgba(195,150,90,0.18)", color: "#C3965A" }}
                              >
                                <Star size={12} fill="currentColor" /> {Number(hotel.rating).toFixed(1)}
                              </span>
                            </div>
                            <h2
                              className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-white leading-tight"
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {hotel.name}
                            </h2>
                            <p className="mt-3 sm:mt-4 text-white/72 text-sm sm:text-base leading-relaxed line-clamp-3" style={{ fontFamily: "var(--font-body)" }}>
                              {hotel.description}
                            </p>
                            <span
                              className="mt-5 sm:mt-6 inline-flex items-center gap-2 text-white/80 text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] group-hover:text-[#C3965A] transition-colors duration-300"
                              style={{ fontFamily: "var(--font-body)" }}
                            >
                              Explore property
                              <span aria-hidden className="group-hover:translate-x-0.5 inline-block transition-transform">—</span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ——— 2. Philosophy: same tone as hero — gold label, serif, flanking lines ——— */}
      <section id="philosophy" className="scroll-mt-20 relative overflow-hidden" style={{ background: "#080706" }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25, margin: "-40px" }}
          variants={scrollReveal}
          transition={sectionTransition}
          className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-28 lg:py-32 text-center"
        >
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.28em] flex items-center justify-center gap-4 mb-6 sm:mb-8"
            style={{ color: "#C3965A", fontFamily: "var(--font-body)" }}
          >
            <span className="block w-12 sm:w-20 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
            OUR PHILOSOPHY
            <span className="block w-12 sm:w-20 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
          </p>
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.45] text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            We believe that true luxury is found in{" "}
            <em style={{ color: "#C3965A", fontStyle: "italic" }}>
              uninterrupted peace.
            </em>{" "}
            Handcrafted spaces designed for profound connection.
          </p>
          <p className="mt-6 sm:mt-8 text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Each property in our collection—from Addis Ababa to Hawassa and Bishoftu—is chosen for this ideal.
          </p>
        </motion.div>
      </section>

      {/* ——— 3. CTA: gold accent, serif, primary button ——— */}
      <section className="scroll-mt-20 relative" style={{ background: "linear-gradient(180deg, #0A0A0A 0%, #080706 100%)" }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
          transition={sectionTransition}
          className="mx-auto max-w-3xl px-4 py-20 sm:py-24 md:py-28 text-center"
        >
          <p
            className="text-[10px] sm:text-xs uppercase tracking-[0.28em] flex items-center justify-center gap-4 mb-5 sm:mb-6"
            style={{ color: "#C3965A", fontFamily: "var(--font-body)" }}
          >
            <span className="block w-10 sm:w-14 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
            DISCOVER
            <span className="block w-10 sm:w-14 h-px shrink-0" style={{ background: "#C3965A", opacity: 0.7 }} aria-hidden />
          </p>
          <h3
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Begin Your Journey
          </h3>
        </motion.div>
      </section>

      {/* ——— Footer: serif brand, gold, subtle nav ——— */}
      <footer
        className="relative border-t border-white/10 py-8 sm:py-10"
        style={{ background: "#080706" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <Link
            to="/"
            className="text-xl text-[#C3965A] hover:opacity-90 transition-opacity"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            LF Collection
          </Link>
          <nav className="flex items-center gap-6 sm:gap-8 text-sm" style={{ fontFamily: "var(--font-body)" }}>
            <a href="#collection" className="text-white/70 hover:text-[#C3965A] transition-colors">
              Collection
            </a>
            <a href="#philosophy" className="text-white/70 hover:text-[#C3965A] transition-colors">
              Philosophy
            </a>
            <Link to="/hotels" className="text-white/70 hover:text-[#C3965A] transition-colors">
              Hotels
            </Link>
          </nav>
          <p className="text-white/50 text-sm" style={{ fontFamily: "var(--font-body)" }}>© {new Date().getFullYear()} LF Collection.</p>
        </div>
      </footer>
    </main>
  );
}
