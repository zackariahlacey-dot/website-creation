"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "1–3", unit: "Days", label: "Average Launch Time" },
  { value: "$0", unit: "Upfront", label: "Zero Deposit Risk" },
  { value: "95+", unit: "Score", label: "Google PageSpeed" },
  { value: "50+", unit: "Sites", label: "Businesses Launched" },
];

const techLogos = [
  "Next.js", "Vercel", "Cloudflare", "Supabase", "Tailwind CSS", "Stripe", "GitHub",
  "Next.js", "Vercel", "Cloudflare", "Supabase", "Tailwind CSS", "Stripe", "GitHub",
];

export default function CredibilityBar() {
  return (
    <section className="bg-dark-mid border-y border-white/5 py-12 sm:py-16 overflow-hidden">
      <div className="container-max mx-auto px-4 sm:px-6">
        {/* Headline */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted mb-8">
          Trusted by Vermont Businesses · Powered by Enterprise Technology
        </p>

        {/* Stat pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {stats.map(({ value, unit, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center bg-dark-card rounded-2xl p-4 border border-white/5"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-black gradient-text">{value}</span>
                <span className="text-sm font-bold text-accent">{unit}</span>
              </div>
              <p className="text-xs text-muted mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scrolling tech marquee */}
      <div className="marquee-container py-3 border-t border-white/5">
        <div className="marquee-track">
          {techLogos.map((logo, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-8 text-sm font-bold text-white/25 uppercase tracking-widest"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
