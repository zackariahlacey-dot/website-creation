"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Code2, HeartHandshake, MapPin } from "lucide-react";

const values = [
  {
    icon: <Zap size={24} />,
    color: "text-accent bg-accent/10",
    title: "Speed is Respect",
    body: "When you hire Vizulux, your project starts immediately. No onboarding calls that last 3 weeks. No waiting on a proposal that takes 5 days. Speed is how we respect your time and your urgency.",
  },
  {
    icon: <Code2 size={24} />,
    color: "text-green bg-green/10",
    title: "Enterprise Tech, Honest Price",
    body: "We use the same technology stack as funded startups and Fortune 500 companies — Next.js, Vercel, Supabase, Cloudflare. You get enterprise performance at a local-business price.",
  },
  {
    icon: <HeartHandshake size={24} />,
    color: "text-gold bg-gold/10",
    title: "Zero Risk is Non-Negotiable",
    body: "You don't pay until you approve. This isn't a marketing tactic — it's how we've operated since day one. We put our work on the line before you put your money on the line. Always.",
  },
];

const stack = [
  { name: "Next.js", reason: "Server-side rendering for instant load times and superior SEO indexing." },
  { name: "Vercel", reason: "Global edge network — your site loads fast from Burlington to Los Angeles." },
  { name: "Tailwind CSS", reason: "Pixel-perfect custom styling with no bloat. Every site is completely unique." },
  { name: "Framer Motion", reason: "Buttery-smooth animations that make your brand feel premium, not generic." },
  { name: "Supabase", reason: "Real backend databases for client portals, lead storage, and auth." },
  { name: "Stripe", reason: "Secure, seamless payment collection and subscription billing." },
  { name: "Cloudflare", reason: "Enterprise DDoS protection and security for every site we ship." },
  { name: "GitHub", reason: "Version control so your codebase is always recoverable and transferable." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding bg-hero-gradient">
        <div className="container-max mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="badge bg-accent/15 text-accent border border-accent/30 mb-5">
              About Vizulux
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Built for Business Owners Who{" "}
              <span className="gradient-text">Can&apos;t Afford to Wait.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-dark">
        <div className="container-max mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-start">
              {/* Photo placeholder */}
              <div className="rounded-3xl bg-gradient-to-br from-accent/20 to-dark-card h-80 flex items-center justify-center border border-white/8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-black text-accent">Z</span>
                  </div>
                  <p className="text-white font-bold text-lg">Zack</p>
                  <p className="text-muted text-sm">Founder, Vizulux</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted">
                    <MapPin size={12} />
                    Vermont, USA
                  </div>
                </div>
              </div>

              {/* Story text */}
              <div className="space-y-4 text-white/65 text-base leading-relaxed">
                <h2 className="text-2xl font-black text-white">The Story Behind Vizulux</h2>
                <p>
                  I started Vizulux because I watched too many great local businesses get burned by agencies — big deposits, months of waiting, and websites that looked pretty but didn&apos;t generate a single phone call.
                </p>
                <p>
                  Vermont businesses deserve better than that. You&apos;re running detailing routes at 6am, cleaning houses back-to-back, swinging hammers on job sites — the last thing you need is to chase down a developer who ghosts you after taking your money.
                </p>
                <p>
                  So I built a different model: I build first, you pay after. I use the same enterprise tech stack as VC-backed startups. And I communicate directly — no project managers, no account reps, just me and your website.
                </p>
                <p className="text-white/80 font-medium">
                  That&apos;s Vizulux. Personal hustle. Enterprise quality. Zero risk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark-mid">
        <div className="container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white">How We Operate</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {values.map(({ icon, color, title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4`}>{icon}</div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-white/55 mt-2 leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section-padding bg-dark">
        <div className="container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
              Enterprise-grade tools that most $15K agencies don&apos;t bother learning. We use them on every build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {stack.map(({ name, reason }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-dark-card border border-white/5"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-white text-sm">{name}</span>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-mid text-center">
        <div className="container-max mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-black text-white">Ready to Work Together?</h2>
            <p className="text-white/60 mt-3">
              Tell me about your project. I&apos;ll follow up within 2 hours.
            </p>
            <Link href="/start" className="btn-primary mt-6 inline-flex px-8 py-4">
              Get Started →
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
