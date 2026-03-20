"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mike T.",
    business: "Mobile Detailer · Burlington, VT",
    initials: "MT",
    quote: "I had zero website. Zack built me a full landing page in 2 days. The next week I got 4 new detailing jobs directly from Google. I paid nothing until I approved it — zero risk and it more than paid for itself in the first month.",
    stars: 5,
    tier: "Starter Package",
  },
  {
    name: "Sarah K.",
    business: "Cleaning Company · Montpelier, VT",
    initials: "SK",
    quote: "My old site was embarrassing on phones. Vizulux built me a completely new site and I had my first online booking 4 hours after it went live. The mobile experience is night and day. Zack actually cares about your results.",
    stars: 5,
    tier: "Core Business",
  },
  {
    name: "Dave R.",
    business: "General Contractor · Stowe, VT",
    initials: "DR",
    quote: "I was skeptical about paying for a website. But the zero-deposit model meant I had nothing to lose. The site came back in 5 days, looked incredibly professional, and I closed a $22,000 job from a Google search within 3 weeks of launching.",
    stars: 5,
    tier: "Pro Package",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-dark-mid">
      <div className="container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 mb-4">
            ★★★★★ 5.0 Google Rating
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Don&apos;t Take Our Word for It.
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            Real clients. Real businesses. Real results.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map(({ name, business, initials, quote, stars, tier }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card flex flex-col gap-4 relative"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-accent/30 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-white/70 leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{name}</p>
                  <p className="text-xs text-muted">{business}</p>
                </div>
                <span className="ml-auto badge bg-accent/10 text-accent/70 border border-accent/15 text-[10px] shrink-0">
                  {tier}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
