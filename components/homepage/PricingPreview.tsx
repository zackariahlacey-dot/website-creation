"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$399",
    turnaround: "1–3 days",
    tag: null,
    tagColor: "",
    features: [
      "1 long-scroll landing page",
      "Mobile-first design",
      "Contact form",
      "Basic on-page SEO",
      "Fast Vercel hosting setup",
    ],
    cta: "Start With $399 →",
    href: "/start?pkg=starter",
    cardClass: "card",
    btnClass: "btn-secondary",
  },
  {
    name: "Core Business",
    price: "$999",
    turnaround: "2–4 days",
    tag: "Most Popular",
    tagColor: "bg-accent text-white",
    features: [
      "Up to 5 fully custom pages",
      "Mobile-first + responsive design",
      "SEO-optimized structure",
      "Social media integration",
      "Google Analytics setup",
      "Contact & lead capture forms",
    ],
    cta: "Build My Core Site →",
    href: "/start?pkg=core",
    cardClass: "card border-accent/40 shadow-glow",
    btnClass: "btn-primary",
  },
  {
    name: "Pro + E-Commerce",
    price: "$2,999",
    turnaround: "3–7 days",
    tag: "Full Power",
    tagColor: "bg-gold/20 text-gold border border-gold/30",
    features: [
      "Up to 10 custom pages",
      "E-commerce or booking system",
      "Stripe payment gateway",
      "Advanced SEO architecture",
      "Client portal (Supabase)",
      "CRM automation setup",
    ],
    cta: "Let's Build Something Serious →",
    href: "/start?pkg=pro",
    cardClass: "card",
    btnClass: "btn-secondary",
  },
];

export default function PricingPreview() {
  return (
    <section className="section-padding bg-dark-mid overflow-hidden">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge bg-green/15 text-green border border-green/20 mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            No Surprises. No Hidden Fees.{" "}
            <span className="gradient-text">No Deposit.</span>
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            Pick your tier. We build it. You approve it. You pay. Simple.
          </p>
        </motion.div>

        {/* Pricing cards — horizontal scroll on mobile */}
        <div className="flex gap-5 overflow-x-auto pb-4 sm:overflow-visible sm:grid sm:grid-cols-3 -mx-4 sm:mx-0 px-4 sm:px-0 snap-x snap-mandatory">
          {tiers.map(({ name, price, turnaround, tag, tagColor, features, cta, href, cardClass, btnClass }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`${cardClass} flex flex-col min-w-[280px] sm:min-w-0 snap-center shrink-0 sm:shrink`}
            >
              {/* Tag */}
              {tag && (
                <span className={`badge mb-3 self-start ${tagColor}`}>
                  {i === 1 && <Star size={11} className="shrink-0" />} {tag}
                </span>
              )}
              {!tag && <div className="h-7 mb-3" />}

              {/* Price */}
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-black text-white">{price}</span>
                <span className="text-sm text-muted">one-time</span>
              </div>
              <p className="text-xs text-accent font-semibold mb-1">⚡ {turnaround} turnaround</p>

              {/* Name */}
              <h3 className="text-lg font-bold text-white mb-4">{name}</h3>

              {/* Agency anchor */}
              <p className="text-xs text-muted line-through mb-4">
                Agencies charge $3,000–$8,000 for this.
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check size={15} className="text-green shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={href} className={`${btnClass} w-full justify-center text-sm`}>
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Guarantee note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white/60">
            🔒 <span className="font-semibold text-white">Zero-Risk Guarantee:</span> You don&apos;t pay until you approve it.
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent hover:underline font-medium">
            Compare all packages + add-ons
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
