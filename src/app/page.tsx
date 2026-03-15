import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BentoServices from "@/components/landing/BentoServices";
import Showcase from "@/components/landing/Showcase";
import Blueprint from "@/components/landing/Blueprint";
import MarketAuthority from "@/components/landing/MarketAuthority";
import PortalShowcase from "@/components/landing/PortalShowcase";
import LeadForm from "@/components/landing/LeadForm";
import Footer from "@/components/landing/Footer";
import CyberWebBackground from "@/components/landing/CyberWebBackground";
import ContactFloatingButton from "@/components/landing/ContactFloatingButton";
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
        <Showcase />
        <Blueprint />
        <MarketAuthority />
        <PortalShowcase isLoggedIn={!!user} />
        <LeadForm />
      </main>
      <Footer />
      <ContactFloatingButton />
    </div>
  );
}
