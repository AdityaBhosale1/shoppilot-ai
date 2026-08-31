import { ShopPilotBackground } from "@/components/ui/shop-pilot-background";
import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { HowItWorks } from "@/components/ui/how-it-works";
import { AIShoppingSection } from "@/components/ui/ai-shopping-section";
import { MerchantSection } from "@/components/ui/merchant-section";
import { SafetySection } from "@/components/ui/safety-section";
import { AuditTrailSection } from "@/components/ui/audit-trail-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <ShopPilotBackground>
      {/* SHOPPILOT AI NAVBAR */}
      <Navbar />

      {/* MAIN SECTIONS */}
      <main className="w-full">
        {/* HERO SECTION */}
        <HeroSection />

        {/* HOW SHOPPILOT WORKS SECTION (#how-it-works) */}
        <HowItWorks />

        {/* INTERACTIVE AI SHOPPING DEMO SECTION (#ai-shopping) */}
        <AIShoppingSection />

        {/* MERCHANT DASHBOARD SECTION (#merchant) */}
        <MerchantSection />

        {/* SAFETY & GUARDRAIL ENGINE SECTION (#safety) */}
        <SafetySection />

        {/* COMMERCE AUDIT TRAIL SECTION (#audit-trail) */}
        <AuditTrailSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </ShopPilotBackground>
  );
}
