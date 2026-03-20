import Hero from "@/components/homepage/Hero";
import CredibilityBar from "@/components/homepage/CredibilityBar";
import PainPoints from "@/components/homepage/PainPoints";
import Solution from "@/components/homepage/Solution";
import HowItWorks from "@/components/homepage/HowItWorks";
import PricingPreview from "@/components/homepage/PricingPreview";
import PortfolioPreview from "@/components/homepage/PortfolioPreview";
import Testimonials from "@/components/homepage/Testimonials";
import Guarantee from "@/components/homepage/Guarantee";
import FAQ from "@/components/homepage/FAQ";
import FinalCTA from "@/components/homepage/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <PricingPreview />
      <PortfolioPreview />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <FinalCTA />
    </>
  );
}
