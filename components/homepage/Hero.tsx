"use client";
import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: <Zap size={16} />, label: "1–3 Day Delivery", color: "text-accent" },
  { icon: <Shield size={16} />, label: "Zero Deposit Risk", color: "text-green" },
  { icon: <TrendingUp size={16} />, label: "Built to Rank on Google", color: "text-gold" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center bg-hero-gradient overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(#6C63FF 1px, transparent 1px), linear-gradient(90deg, #6C63FF 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="relative container-max mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Pre-badge */}
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="flex justify-center sm:justify-start mb-6"
        >
          <span className="badge bg-accent/15 text-accent border border-accent/30 text-xs">
            🚀 Vermont&apos;s Fastest Web Agency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white text-center sm:text-left max-w-4xl"
        >
          Your Business Deserves a Website That{" "}
          <span className="gradient-text">Actually Works.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed text-center sm:text-left"
        >
          Custom, enterprise-grade websites for Vermont service businesses —{" "}
          <span className="text-white/90 font-medium">built in days, not months.</span>{" "}
          Zero deposit. You don&apos;t pay until you love it.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4"
        >
          <Link href="/pricing" className="btn-primary w-full sm:w-auto text-base px-8 py-4">
            See Pricing & Get Started
            <ArrowRight size={18} />
          </Link>
          <Link href="/work" className="btn-ghost w-full sm:w-auto text-base py-4 text-white/70 hover:text-white">
            View Our Work ↓
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12 flex flex-wrap items-center gap-4 sm:gap-8 justify-center sm:justify-start"
        >
          {stats.map(({ icon, label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`${color}`}>{icon}</span>
              <span className="text-sm font-semibold text-white/80">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust line */}
        <motion.p
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-6 text-xs text-muted flex items-center gap-2 justify-center sm:justify-start"
        >
          <span className="text-yellow-400">★★★★★</span>
          <span>5-star rated · 50+ local businesses served · Vermont-based & US-only</span>
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hidden sm:flex flex-col items-center gap-1"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
