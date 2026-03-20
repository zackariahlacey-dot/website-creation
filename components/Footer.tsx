import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Get Started", href: "/start" },
];

const services = [
  "Starter Landing Page — $399",
  "Core Business Site — $999",
  "Pro + E-Commerce — $2,999",
  "Monthly Hosting — from $75/mo",
  "Local SEO Setup — $250",
];

const techLogos = ["Next.js", "Vercel", "Supabase", "Tailwind", "Cloudflare", "Stripe"];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5">
      {/* Main footer */}
      <div className="container-max mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div>
              <div className="flex items-center">
                <Image 
                  src="/images/vizuluxlogo.png" 
                  alt="Vizulux Logo" 
                  width={24} 
                  height={24} 
                  className="w-6 h-6 object-contain"
                />
                <span className="text-2xl font-black gradient-text ml-0.5">IZULUX</span>
              </div>
              <p className="text-xs text-muted mt-1 font-medium uppercase tracking-wider">Premium Web Design · Vermont</p>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Enterprise-grade websites for service businesses. Built in days. Zero deposit until you approve.
            </p>
            <div className="space-y-2">
              <a href="tel:+18025859179" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Phone size={14} className="text-accent shrink-0" />
                (802) 585-9179
              </a>
              <a href="mailto:hello@vizulux.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail size={14} className="text-accent shrink-0" />
                hello@vizulux.com
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                Vermont, USA · Serving Nationwide
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white hover:translate-x-0.5 transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-white/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Ready to Start?</h3>
            <p className="text-sm text-white/60 mb-4">
              Your competitors are getting new websites built right now. Don&apos;t wait.
            </p>
            <Link href="/start" className="btn-primary text-sm py-3 w-full justify-center">
              Build My Site →
            </Link>
            <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-yellow-400 text-sm">★★★★★</span>
              </div>
              <p className="text-xs text-white/60">&ldquo;Launched in 2 days. Already getting calls.&rdquo;</p>
              <p className="text-xs text-muted mt-1">— Mike T., Mobile Detailer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech bar */}
      <div className="border-t border-white/5 py-4">
        <div className="container-max mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-xs text-muted">Powered by:</span>
          {techLogos.map((logo) => (
            <span key={logo} className="text-xs font-semibold text-white/30 hover:text-white/60 transition-colors">
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4">
        <div className="container-max mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} Vizulux LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
