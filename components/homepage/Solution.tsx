"use client";
import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Zap size={28} />,
    color: "text-accent bg-accent/10",
    title: "Built in Days",
    body:
      "Not months. Your site goes live on our global Vercel edge network while your competitor is still waiting on a proposal. 1–3 days for a landing page. Up to a week for full e-commerce.",
  },
  {
    icon: <Shield size={28} />,
    color: "text-green bg-green/10",
    title: "Zero-Risk Guarantee",
    body:
      "You approve every pixel on a live staging link before a single dollar changes hands. Period. If it's not exactly what you wanted — we fix it. No debates. No invoices until you say go.",
  },
  {
    icon: <TrendingUp size={28} />,
    color: "text-gold bg-gold/10",
    title: "Built to Rank & Convert",
    body:
      "Next.js server-side rendering + structured metadata means Google loves your site from day one. Plus mobile-first design that turns visitors into booked calls — not just pretty traffic.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="section-padding bg-dark-mid">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge bg-accent/15 text-accent border border-accent/30 mb-4">
            The Vizulux Way
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Finally. A Web Agency That{" "}
            <span className="gradient-text">Moves Like You Do.</span>
          </h2>
          <p className="text-white/50 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            We combine the personal speed of a solo operator with enterprise-grade technology. The result: a premium website that looks like $10K and gets delivered before your competitor even responds to his first email.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {benefits.map(({ icon, color, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card flex flex-col gap-4"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                {icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm text-white/55 mt-2 leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech credibility line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted">
            Built on{" "}
            {["Next.js", "Vercel", "Tailwind CSS", "Framer Motion", "Cloudflare", "Supabase"].map((t, i, arr) => (
              <span key={t}>
                <span className="font-semibold text-white/50">{t}</span>
                {i < arr.length - 1 && <span className="mx-1 text-white/20">·</span>}
              </span>
            ))}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
