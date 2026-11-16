import { HomeNav } from "./HomeNav";
import { Hero } from "./Hero";
import { WorksWith } from "./WorksWith";
import { OneLoad } from "./OneLoad";
import { HowItWorks } from "./HowItWorks";
import { Board } from "./Board";
import { Connections } from "./Connections";
import { PricingBand } from "./PricingBand";
import { Faq } from "./Faq";
import { ClosingCta } from "./ClosingCta";
import { HomeFooter } from "./HomeFooter";
import { useHomeVals } from "./home-logic";

/* The homepage from docs/homepage-handoff, section by section in page order. */
export function HomePage() {
  const v = useHomeVals();
  return (
    <div className="mf-root">
      <HomeNav />
      <main>
        <Hero />
        <WorksWith />
        <OneLoad v={v} />
        <HowItWorks v={v} />
        <Board />
        <Connections v={v} />
        <PricingBand />
        <Faq v={v} />
        <ClosingCta />
      </main>
      <HomeFooter />
    </div>
  );
}
