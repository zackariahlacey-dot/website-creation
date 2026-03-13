import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BentoServices from "@/components/landing/BentoServices";
import Blueprint from "@/components/landing/Blueprint";
import MarketAuthority from "@/components/landing/MarketAuthority";
import PortalShowcase from "@/components/landing/PortalShowcase";
import LeadForm from "@/components/landing/LeadForm";
import CyberWebBackground from "@/components/landing/CyberWebBackground";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const headerList = await headers();
  const city = headerList.get("x-vizulux-city") || "Burlington";

  return (
    <div className="bg-black min-h-screen relative">
      <CyberWebBackground />
      <Navbar />
      <main>
        <Hero city={city} />
        <BentoServices />
        <Blueprint />
        <MarketAuthority />
        <PortalShowcase isLoggedIn={!!user} />
        <LeadForm />
      </main>
      <footer className="py-12 px-8 border-t border-zinc-900 bg-black text-center text-zinc-600 text-sm">
        <p>© 2026 VIZULUX. Built for the Future.</p>
      </footer>
    </div>
  );
}
