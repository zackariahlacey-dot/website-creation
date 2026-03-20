"use client";
import { motion } from "framer-motion";
import { X, ArrowDown } from "lucide-react";
import Link from "next/link";

const pains = [
  {
    pain: "Paid a deposit. The site never launched.",
    detail: "You handed over thousands of dollars and got ghosted. Meanwhile, your phone isn't ringing.",
  },
  {
    pain: "My website looks broken on phones.",
    detail: "67% of your customers found you on mobile — and immediately left because your site was unusable.",
  },
  {
    pain: "Waiting 3 weeks for a phone number change.",
    detail: "You can't even update your own hours without filing a support ticket with someone who ignores you.",
  },
  {
    pain: "I'm invisible on Google. I'm on page 4.",
    detail: "Pretty website, zero traffic. Your dev built a brochure with no SEO, and now you're paying for ads.",
  },
  {
    pain: "Another cookie-cutter template. Zero personality.",
    detail: "Your site looks exactly like your competitor's. You deserve custom — not a $20 theme with your name slapped on it.",
  },
];

export default function PainPoints() {
  return (
    <section className="section-padding bg-dark">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="badge bg-red/15 text-red border border-red/20 mb-4">
            Sound Familiar?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            We Hear This Every Single Week.
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            Local service businesses deserve better than slow agencies and broken websites.
          </p>
        </motion.div>

        {/* Pain cards */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {pains.map(({ pain, detail }, i) => (
            <motion.div
              key={pain}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="flex items-start gap-4 bg-red/5 border border-red/15 rounded-2xl p-4 sm:p-5 group hover:bg-red/8 transition-colors"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-red/15 flex items-center justify-center mt-0.5">
                <X size={16} className="text-red" />
              </div>
              <div>
                <p className="font-bold text-white text-base leading-snug">{pain}</p>
                <p className="text-sm text-white/50 mt-1 leading-relaxed">{detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="#solution"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
          >
            There&apos;s a better way
            <ArrowDown size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
