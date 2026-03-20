"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    industry: "Mobile Detailing",
    location: "Vermont",
    name: "Arise & Shine VT",
    link: "https://ariseandshinevt.com",
    result: "Launched in 2 days · 30+ new inquiries",
    tier: "Core Business",
    accent: "from-blue-600/20 to-accent/20",
    tags: ["Service-Focus", "Lead Gen", "Mobile-First"],
  },
  {
    industry: "Healthcare",
    location: "Vermont",
    name: "Embrace Women's",
    link: "https://embracewomenshealthcare.com",
    result: "Launched in 3 days · Patient booking online",
    tier: "Pro",
    accent: "from-green/20 to-emerald-600/20",
    tags: ["Secure Forms", "HIPAA Ready", "Medical SEO"],
  },
  {
    industry: "Consulting",
    location: "Nationwide",
    name: "Practice Launch 90",
    link: "https://practicelaunch90.com",
    result: "Launched in 4 days · $45k in new contracts",
    tier: "Pro",
    accent: "from-gold/20 to-orange-600/20",
    tags: ["Conversion Funnel", "High Speed", "Authority Branding"],
  },
];

export default function PortfolioPreview() {
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
            Recent Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Work That <span className="gradient-text">Wins Clients.</span>
          </h2>
          <p className="text-white/50 mt-3 text-base max-w-xl mx-auto">
            Real results for real Vermont service businesses. These aren&apos;t mockups — these are live sites.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="flex gap-5 overflow-x-auto pb-4 sm:overflow-visible sm:grid sm:grid-cols-3 -mx-4 sm:mx-0 px-4 sm:px-0 snap-x snap-mandatory">
          {projects.map(({ industry, location, name, link, result, tier, accent, tags }, i) => (
            <motion.a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`min-w-[280px] sm:min-w-0 snap-center shrink-0 sm:shrink rounded-2xl overflow-hidden border border-white/8 group hover:border-accent/30 transition-all duration-300 bg-dark-card block`}
            >
              {/* Visual preview area */}
              <div className={`h-44 bg-gradient-to-br ${accent} relative flex items-center justify-center`}>
                <div className="text-center px-6">
                  <div className="text-2xl sm:text-3xl font-black text-white/90 tracking-tight leading-tight">{name}</div>
                  <div className="text-xs text-white/50 mt-1 uppercase tracking-wider font-semibold">{industry} · {location}</div>
                </div>
                {/* Hover indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={16} className="text-white/60" />
                </div>
                {/* Tier badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="badge bg-black/40 text-white/70 border border-white/10 text-[10px]">
                    {tier} Package
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm font-semibold text-green mb-2">📈 {result}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {tags.map((t) => (
                    <span key={t} className="badge bg-accent/10 text-accent/80 border border-accent/15 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link href="/work" className="btn-secondary px-8">
            See the Full Portfolio
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
