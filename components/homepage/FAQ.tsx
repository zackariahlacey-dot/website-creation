"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How fast is the turnaround, really?",
    a: "Real answer: Starter landing pages go live in 1–3 business days. Core Business sites (up to 5 pages) in 2–4 days. Pro + E-Commerce in 3–7 days. These are actual completion times, not estimates. The clock starts the moment you submit your project form.",
  },
  {
    q: "What if I want changes after it's built?",
    a: "Before launch, unlimited revisions — we don't invoice until you're happy. After launch, our Hosting & Maintenance Plus plan ($149/mo) includes 1 hour of hands-on tweaks every month. Need more? We bill $99/hr for additional work, no retainer required.",
  },
  {
    q: "Do I own my website?",
    a: "Yes — 100%. The code, the design, the domain, everything. We don't lock you in. If you ever want to move or self-host, we hand over the full codebase. No hostage situations.",
  },
  {
    q: "What's included in monthly hosting?",
    a: "Enterprise Hosting ($75/mo) covers deployment on Vercel's global edge network, SSL, Cloudflare security, uptime monitoring, and daily backups. Hosting & Maintenance Plus ($149/mo) adds 1 hour of monthly changes — content updates, new sections, tweaks. No surprise charges.",
  },
  {
    q: "Do you work with businesses outside Vermont?",
    a: "Yes. Vermont is our home base but we build sites nationwide. All communication is done via text, email, or video call. Time zone differences have never been a problem — most of our work is async anyway.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Almost nothing. Fill out our 2-minute form with your business info and goals. If you have a logo, great — if not, we offer branding as an add-on. We write copy, source images, and handle all the tech. You just answer questions and approve the result.",
  },
  {
    q: "Do I really pay nothing until I approve it?",
    a: "Correct. Zero dollars upfront. We build your full website, host it on a private staging link, and let you review everything. You can request as many changes as needed. Only when you give the green light do we send an invoice via Stripe.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-dark">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Questions We Actually Get Asked
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            Straight answers. No sales spin.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="max-w-2xl mx-auto space-y-2">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="border border-white/8 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                aria-expanded={open === i}
              >
                <span className="text-base font-semibold text-white leading-snug">{q}</span>
                <span className="shrink-0 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
