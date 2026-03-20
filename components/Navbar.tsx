"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/95 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-max mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link href="/" className="flex items-center gap-1 group" onClick={() => setOpen(false)}>
            <div className="flex items-center">
              <Image 
                src="/images/vizuluxlogo.png" 
                alt="Vizulux Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                priority
              />
              <span className="text-xl sm:text-2xl font-black tracking-tight gradient-text ml-0.5">
                IZULUX
              </span>
            </div>
            <span className="hidden sm:inline text-xs text-muted font-medium border border-white/10 rounded px-1.5 py-0.5 ml-1">
              VERMONT
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-white rounded-lg hover:bg-white/5 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+18025859179"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors"
            >
              <Phone size={14} />
              <span className="font-medium">(802) 585-9179</span>
            </a>
            <Link href="/start" className="btn-primary py-2.5 text-sm">
              Get Started →
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <a href="tel:+18025859179" className="text-muted hover:text-white p-2">
              <Phone size={18} />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="text-muted hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-dark-mid/98 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 pb-1">
                <Link
                  href="/start"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Get Started — No Payment Today →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
