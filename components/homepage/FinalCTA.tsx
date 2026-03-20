"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-dark-mid relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="container-max mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
            🚨 Currently Accepting 3 New Clients This Month
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Your Competitors&apos; New Website Is{" "}
            <span className="gradient-text">Being Built Right Now.</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
            Get yours live in 72 hours. No upfront cost. No risk. Just a high-converting website that works as hard as you do.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start" className="btn-primary w-full sm:w-auto px-8 py-4 text-base">
              Build My Website Now
              <ArrowRight size={18} />
            </Link>
            <Link href="/start?call=1" className="btn-ghost w-full sm:w-auto py-4 text-base flex items-center gap-2 text-white/60 hover:text-white border border-white/10 rounded-xl px-6 hover:bg-white/5 transition-all">
              <MessageCircle size={18} />
              Chat With Us First
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted">
            🔒 Zero deposit &nbsp;·&nbsp; You approve before you pay &nbsp;·&nbsp; Response within 2 hours
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
            {[
              { val: "50+", label: "Sites Launched" },
              { val: "1–3", label: "Days Average" },
              { val: "100%", label: "Client Approval Rate" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black gradient-text">{val}</div>
                <div className="text-xs text-muted mt-1">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
