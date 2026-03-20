"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MessageSquare, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-hero-gradient flex items-center">
      <div className="container-max mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Check icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-green/15 border-2 border-green/30 flex items-center justify-center">
              <CheckCircle size={44} className="text-green" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Nice. You&apos;re In. 🎉
          </h1>
          <p className="mt-4 text-lg text-white/60">
            Your project details just landed in my inbox.
          </p>

          {/* What happens next */}
          <div className="mt-10 space-y-4 text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted text-center mb-6">
              What Happens Next
            </p>
            {[
              {
                icon: <Clock size={20} className="text-accent" />,
                bg: "bg-accent/10",
                title: "In the next 2 hours",
                body: "You'll get a personal message from Zack reviewing your project and confirming the package, timeline, and next steps.",
              },
              {
                icon: <MessageSquare size={20} className="text-green" />,
                bg: "bg-green/10",
                title: "Within 1–7 days",
                body: "Your full website will be built and sent to you on a private staging link. Click around, test it on your phone, request any changes.",
              },
              {
                icon: <CheckCircle size={20} className="text-gold" />,
                bg: "bg-gold/10",
                title: "You approve, we launch",
                body: "When you say 'this is exactly what I wanted' — we flip it live and send your invoice via Stripe. Not before.",
              },
            ].map(({ icon, bg, title, body }) => (
              <div key={title} className="flex items-start gap-4 bg-dark-card rounded-2xl p-4 border border-white/8">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-sm text-white/55 mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Follow CTA */}
          <div className="mt-10 p-5 rounded-2xl bg-accent/8 border border-accent/20">
            <p className="text-sm font-semibold text-white mb-1">While you wait...</p>
            <p className="text-sm text-white/60 mb-4">
              Check out our recent work to see what your site could look like. Or review our pricing to think through add-ons.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/work" className="btn-secondary flex-1 justify-center text-sm py-3">
                View Our Work
              </Link>
              <Link href="/pricing" className="btn-ghost flex-1 justify-center text-sm py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all">
                Review Pricing <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted">
            Questions? Text or email directly:{" "}
            <a href="tel:+18025859179" className="text-accent hover:underline">(802) 585-9179</a>
            {" "}·{" "}
            <a href="mailto:hello@vizulux.com" className="text-accent hover:underline">hello@vizulux.com</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
