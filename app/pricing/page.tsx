"use client";
import Link from "next/link";
import { Check, ArrowRight, Shield, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Starter",
    subtitle: "The Landing Page",
    price: 399,
    turnaround: "1–3 days",
    popular: false,
    features: [
      "1 long-scroll landing page",
      "Mobile-first responsive design",
      "Contact & lead capture form",
      "Basic on-page SEO (title, meta, H-tags)",
      "Deployed on Vercel edge network",
      "SSL + HTTPS security",
      "Google Maps integration",
      "Social media links",
    ],
    href: "/start?pkg=starter",
    cta: "Start With $399 — I'm Ready",
    agencyNote: "Agencies charge $2,000–$4,000 for this.",
  },
  {
    name: "Core Business",
    subtitle: "The Full Site",
    price: 999,
    turnaround: "2–4 days",
    popular: true,
    features: [
      "Up to 5 fully custom pages",
      "Mobile-first responsive design",
      "SEO-optimized page architecture",
      "Social media integration",
      "Contact, quote & inquiry forms",
      "Google Analytics + conversion tracking",
      "Image optimization (WebP, lazy load)",
      "Deployed on Vercel edge network",
      "SSL + Cloudflare security",
    ],
    href: "/start?pkg=core",
    cta: "Build My Core Site →",
    agencyNote: "Agencies charge $4,000–$8,000 for this.",
  },
  {
    name: "Pro + E-Commerce",
    subtitle: "The Full Machine",
    price: 2999,
    turnaround: "3–7 days",
    popular: false,
    features: [
      "Up to 10 fully custom pages",
      "E-commerce store OR booking system",
      "Stripe payment gateway",
      "Advanced SEO architecture",
      "Blog / content system",
      "Client portal (Supabase auth)",
      "CRM lead capture automation",
      "Custom animations (Framer Motion)",
      "Priority support + launch day call",
    ],
    href: "/start?pkg=pro",
    cta: "Let's Build Something Serious →",
    agencyNote: "Agencies charge $8,000–$20,000 for this.",
  },
];

const addOns = [
  { name: "AI Copywriting", price: "$150/page", desc: "Conversion-optimized, SEO-ready copy written for every page." },
  { name: "Branding & Logo Design", price: "$250", desc: "Custom logo, color palette, and brand style guide." },
  { name: "Local SEO & GBP Setup", price: "$250", desc: "Google Business Profile optimization + local keyword targeting." },
  { name: "Analytics Tracking Setup", price: "$150", desc: "GA4 + conversion event tracking + dashboard." },
  { name: "Lead Capture & CRM", price: "$150", desc: "Form-to-CRM automation with email notification sequences." },
  { name: "Advanced CRM Setup", price: "$750+", desc: "Full HubSpot or custom pipeline setup with automation workflows." },
];

const hosting = [
  {
    name: "Enterprise Hosting & Security",
    price: "$75/mo",
    features: [
      "Vercel global edge deployment",
      "Cloudflare CDN + DDoS protection",
      "SSL certificate management",
      "Daily automated backups",
      "Uptime monitoring",
    ],
  },
  {
    name: "Hosting & Maintenance Plus",
    price: "$149/mo",
    popular: true,
    features: [
      "Everything in Enterprise Hosting",
      "1 hour of monthly hands-on tweaks",
      "Content updates & text changes",
      "New section additions",
      "Priority email support",
    ],
  },
];

const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.1, duration: 0.5 },
});

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding bg-hero-gradient text-center pb-12 sm:pb-16">
        <div className="container-max mx-auto">
          <motion.div {...fadeUp()}>
            <span className="badge bg-green/15 text-green border border-green/30 mb-5">
              Transparent Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              No Deposits. No Surprises.<br />
              <span className="gradient-text">Just Results.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
              You review your fully built website on a private staging link before you pay a single dollar. Pick your tier and let&apos;s build.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-green" /> Zero deposit until approval</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-accent" /> 1–7 day delivery</span>
              <span className="flex items-center gap-1.5"><Star size={14} className="text-yellow-400" /> 5-star rated service</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="section-padding bg-dark">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tiers.map(({ name, subtitle, price, turnaround, popular, features, href, cta, agencyNote }, i) => (
              <motion.div
                key={name}
                {...fadeUp(i)}
                className={`rounded-3xl flex flex-col p-7 border transition-all ${
                  popular
                    ? "bg-accent/5 border-accent/40 shadow-glow relative"
                    : "bg-dark-card border-white/8"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge bg-accent text-white px-4 text-xs shadow-glow-sm">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-2xl font-black text-white">{name}</h2>
                  <p className="text-sm text-muted mt-0.5">{subtitle}</p>
                  <p className="text-xs text-muted line-through mt-3">{agencyNote}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-5xl font-black text-white">${price.toLocaleString()}</span>
                    <span className="text-muted text-sm">one-time</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-accent">⚡ {turnaround} turnaround</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check size={16} className="text-green shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`w-full justify-center ${popular ? "btn-primary" : "btn-secondary"}`}
                >
                  {cta} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Guarantee note */}
          <motion.div {...fadeUp(3)} className="mt-8 text-center p-5 rounded-2xl bg-green/8 border border-green/20 max-w-2xl mx-auto">
            <Shield size={20} className="text-green mx-auto mb-2" />
            <p className="text-sm font-semibold text-green">Vizulux Zero-Risk Guarantee</p>
            <p className="text-sm text-white/60 mt-1">
              We build your full website, host it on a staging link, and you review everything before you pay a single dollar. No deposits. No contracts. 100% satisfaction before invoicing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="section-padding bg-dark-mid">
        <div className="container-max mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Upgrade Your <span className="gradient-text">Add-Ons</span>
            </h2>
            <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
              One-time add-ons you can bolt onto any package. Stack them up and increase your ROI from day one.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map(({ name, price, desc }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.5)} className="card">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-white text-base">{name}</h3>
                  <span className="badge bg-accent/15 text-accent border border-accent/20 text-xs shrink-0">{price}</span>
                </div>
                <p className="text-sm text-white/55 mt-2 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting */}
      <section className="section-padding bg-dark">
        <div className="container-max mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Monthly Hosting &{" "}
              <span className="gradient-text">Support</span>
            </h2>
            <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
              Keep your site fast, secure, and maintained. Recurring revenue you can set and forget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {hosting.map(({ name, price, features, popular }, i) => (
              <motion.div
                key={name}
                {...fadeUp(i)}
                className={`rounded-3xl p-7 border flex flex-col gap-5 ${
                  popular ? "bg-accent/5 border-accent/40 shadow-glow" : "bg-dark-card border-white/8"
                }`}
              >
                {popular && (
                  <span className="badge bg-accent text-white self-start">Best Value</span>
                )}
                <div>
                  <h3 className="text-xl font-bold text-white">{name}</h3>
                  <p className="text-3xl font-black text-white mt-2">{price}</p>
                </div>
                <ul className="space-y-2.5 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                      <Check size={15} className="text-green shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/start" className={`w-full justify-center ${popular ? "btn-primary" : "btn-secondary"}`}>
                  Add to My Package →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-dark-mid text-center">
        <div className="container-max mx-auto max-w-2xl">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Pick Your Package?
            </h2>
            <p className="text-white/60 mt-4 text-base">
              Fill out our 2-minute form. Tell us your goal, your industry, and your timeline. We&apos;ll take it from there.
            </p>
            <div className="mt-8">
              <Link href="/start" className="btn-primary px-8 py-4">
                Get Started — No Payment Today
                <ArrowRight size={18} />
              </Link>
              <p className="text-xs text-muted mt-3">🔒 Zero deposit · Response within 2 hours</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
