"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export default function Guarantee() {
  return (
    <section className="section-padding bg-hero-gradient relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green/8 blur-[100px] pointer-events-none" />

      <div className="container-max mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green/15 border-2 border-green/30 flex items-center justify-center">
              <Shield size={36} className="text-green" />
            </div>
          </div>

          {/* Badge */}
          <span className="badge bg-green/15 text-green border border-green/30 mb-5">
            Vizulux Zero-Risk Guarantee
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            You Don&apos;t Owe Us Anything Until{" "}
            <span className="text-green">You&apos;re Thrilled.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            We build your complete website and host it on a private staging link. You review every page, every pixel, every word. You request any changes — we make them. Only when you say &ldquo;this is exactly what I wanted&rdquo; do we send the invoice.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Zero deposit", detail: "Not a penny upfront" },
              { label: "Unlimited revisions", detail: "Until you're 100% happy" },
              { label: "You control launch", detail: "You flip the switch" },
            ].map(({ label, detail }) => (
              <div key={label} className="rounded-2xl bg-green/8 border border-green/20 p-4">
                <p className="font-bold text-green text-base">{label}</p>
                <p className="text-sm text-white/50 mt-1">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/start" className="btn-primary px-8 py-4 bg-green hover:bg-emerald-500 shadow-[0_0_40px_rgba(0,200,150,0.25)]">
              Claim Your Risk-Free Website →
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
