"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function StickyBar() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="bg-dark-mid/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-bottom">
        <Link
          href="/start"
          className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white font-bold rounded-xl py-3.5 text-base transition-all duration-200 shadow-glow active:scale-[0.98]"
        >
          <span>Get Started — No Payment Today</span>
          <ArrowRight size={18} className="shrink-0" />
        </Link>
        <p className="text-center text-xs text-muted mt-1.5">
          🔒 Zero deposit · You approve before you pay
        </p>
      </div>
    </motion.div>
  );
}
