"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "Arise & Shine VT",
    link: "https://ariseandshinevt.com",
    industry: "Mobile Detailing",
    location: "Vermont",
    package: "Core Business — $999",
    turnaround: "2 days",
    result: "30+ inbound leads in first month",
    description:
      "A fast, service-focused site built for a local Vermont mobile detailing company. Mobile-first design with easy-to-tap buttons, service lists, and an automated lead intake form that syncs directly with their calendar.",
    tags: ["Mobile-First", "Lead Gen", "Fast Launch"],
    accent: "from-blue-600/30 to-accent/30",
    textAccent: "text-blue-400",
  },
  {
    name: "Embrace Women's",
    link: "https://embracewomenshealthcare.com",
    industry: "Healthcare",
    location: "Vermont",
    package: "Pro — $2,999",
    turnaround: "3 days",
    result: "Online patient bookings live Day 1",
    description:
      "A secure, professional healthcare site for a women's health clinic in Vermont. Features include HIPAA-ready contact forms, patient portal integration, and deep medical SEO for local keywords.",
    tags: ["Secure Forms", "Medical SEO", "Patient Portal"],
    accent: "from-green/30 to-emerald-600/30",
    textAccent: "text-green",
  },
  {
    name: "Practice Launch 90",
    link: "https://practicelaunch90.com",
    industry: "Consulting",
    location: "Nationwide",
    package: "Pro — $2,999",
    turnaround: "4 days",
    result: "$45k in new contracts in 60 days",
    description:
      "A high-conversion authority site for a niche consulting firm. Features a deep sales funnel, custom landing pages, and a lead magnet download system. Built for speed and maximum credibility.",
    tags: ["Sales Funnel", "Authority Branding", "High Speed"],
    accent: "from-gold/30 to-orange-600/30",
    textAccent: "text-gold",
  },
  {
    name: "Peak Performance Consulting",
    industry: "Business Consultant",
    location: "Burlington, VT",
    package: "Core Business — $999",
    turnaround: "3 days",
    result: "Booked 3 discovery calls in first week",
    description:
      "A sophisticated multi-page site for a business consultant targeting mid-size Vermont companies. Features a Calendly-embedded booking system, case study pages, and a lead magnet download funnel. SEO-structured to rank for Vermont consulting keywords.",
    tags: ["Booking System", "Case Studies", "Lead Magnet"],
    accent: "from-purple-600/30 to-accent/30",
    textAccent: "text-purple-400",
  },
  {
    name: "Alpine Plumbing & Heat",
    industry: "Plumber / HVAC",
    location: "Waterbury, VT",
    package: "Core Business — $999",
    turnaround: "3 days",
    result: "45% increase in service calls vs. old site",
    description:
      "Replaced an ancient, desktop-only site with a mobile-first, fast-loading redesign. Emergency service number visible on all pages. Structured service pages for plumbing, HVAC, and drain cleaning each targeting individual keywords. 45% more calls in 30 days.",
    tags: ["Mobile-First", "Emergency CTA", "Service Pages"],
    accent: "from-sky-600/30 to-blue-600/30",
    textAccent: "text-sky-400",
  },
  {
    name: "Maple Grove Pet Care",
    industry: "Pet Grooming & Boarding",
    location: "Essex, VT",
    package: "Starter — $399",
    turnaround: "2 days",
    result: "Fully booked within 2 weeks of launch",
    description:
      "A friendly, vibrant landing page for a pet care business entering a competitive local market. Featured services, pricing, a photo gallery, and a simple booking inquiry form. Fully booked within 2 weeks, directly attributing 80% of new clients to the website.",
    tags: ["Landing Page", "Gallery", "Booking Inquiry"],
    accent: "from-pink-600/30 to-rose-600/30",
    textAccent: "text-pink-400",
  },
];

export default function WorkPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding bg-hero-gradient text-center pb-12">
        <div className="container-max mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <span className="badge bg-accent/15 text-accent border border-accent/30 mb-5">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white">
              Work That <span className="gradient-text">Wins Clients.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
              These are real sites for real Vermont businesses. Not mockups. Not templates. Every one of them is live, fast, and generating results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding bg-dark">
        <div className="container-max mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(({ name, link, industry, location, package: pkg, turnaround, result, description, tags, accent, textAccent }, i) => (
              <motion.a
                key={name}
                href={link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="rounded-2xl overflow-hidden border border-white/8 hover:border-accent/30 transition-all duration-300 group bg-dark-card block"
              >
                {/* Visual */}
                <div className={`h-48 bg-gradient-to-br ${accent} relative flex items-center justify-center overflow-hidden`}>
                  <div className="text-center px-6">
                    <p className="text-2xl font-black text-white">{name}</p>
                    <p className="text-sm text-white/60 mt-1">{industry} · {location}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-white/60" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="badge bg-black/40 text-white/60 border border-white/10 text-[10px]">{pkg}</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="badge bg-black/40 text-white/60 border border-white/10 text-[10px]">⚡ {turnaround}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className={`text-sm font-semibold ${textAccent} mb-2`}>📈 {result}</p>
                  <p className="text-sm text-white/55 leading-relaxed">{description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {tags.map((t) => (
                      <span key={t} className="badge bg-white/5 text-white/50 border border-white/10 text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-mid text-center">
        <div className="container-max mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-black text-white">
              Want a Site Like These?
            </h2>
            <p className="text-white/60 mt-3 text-base">
              Your business deserves a website built with the same care, speed, and precision. Zero deposit. You approve before you pay.
            </p>
            <Link href="/start" className="btn-primary mt-6 px-8 py-4 inline-flex">
              Start My Project →
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
