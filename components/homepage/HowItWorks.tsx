"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Fill out our 2-minute form.",
    body: "No sales call required (unless you want one). Tell us your industry, your goal, and which package fits — that's it. We take it from there.",
    tag: "Takes 2 Minutes",
    tagColor: "bg-accent/15 text-accent border-accent/20",
  },
  {
    num: "02",
    title: "We build your site & send you a staging link.",
    body: "We get to work immediately. You'll receive a private staging URL where you can click through your fully built, fully functional website — on any device — before it's ever live.",
    tag: "1–7 Days",
    tagColor: "bg-green/15 text-green border-green/20",
  },
  {
    num: "03",
    title: "You approve it. We launch it. You pay.",
    body: "Request changes. We make them. When you say 'this is exactly what I wanted' — we flip the switch. Your site goes live on the edge network. Then we send the invoice. Not before.",
    tag: "Zero Risk",
    tagColor: "bg-gold/15 text-gold border-gold/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-dark">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge bg-white/8 text-white/60 border border-white/10 mb-4">
            The Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            From &ldquo;I Need a Website&rdquo; to{" "}
            <span className="gradient-text">Live in 3 Steps</span>
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            No confusing process. No long meetings. No waiting around for updates.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
          {steps.map(({ num, title, body, tag, tagColor }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.5 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[calc(100%-12px)] w-6 h-px bg-accent/30 z-10" />
              )}

              <div className="card h-full">
                {/* Step number */}
                <div className="text-5xl font-black step-number leading-none mb-3">{num}</div>
                {/* Tag */}
                <span className={`badge border text-xs mb-3 ${tagColor}`}>{tag}</span>
                {/* Content */}
                <h3 className="text-lg font-bold text-white leading-snug mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link href="/start" className="btn-primary px-8 py-4">
            Start My Project Now
            <ArrowRight size={18} />
          </Link>
          <p className="text-xs text-muted mt-3">
            🔒 No payment today · You pay only after you approve
          </p>
        </motion.div>
      </div>
    </section>
  );
}
