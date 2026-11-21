import heroPhoto from "@/assets/hero-dusk.jpg";
import { CAL_URL } from "@/components/site-chrome";
import { BookForm, Footer, Nav, PhotoBand } from "./Chrome";
import { FitQuestions } from "./FitQuestions";
import { HeroThread } from "./HeroThread";
import { LoadStory } from "./LoadStory";
import { Pricing } from "./Pricing";
import { ProblemJourney } from "./ProblemJourney";
import { SolutionColumns } from "./SolutionColumns";

/*
 * TODO(before launch): "in minutes, not a day" in the hero rests on the
 * walkthrough's illustrative two-minute figure. Confirm it.
 */

export function HomePage() {
  return (
    <div className="mf-root">
      <Nav current="home" overPhoto />
      <main>
        <PhotoBand src={heroPhoto} shade={0.38} position="50% 70%" className="mf-hero">
          <div className="mf-hero-in">
            <div className="mf-hero-copy">
              <h1 className="mf-h1">Quote, cover and get paid with a one-word text.</h1>
              <p className="mf-lede">
                Manifest is a text agent for freight brokers. It answers quote requests in minutes,
                not a day, and nothing goes out until you text back yes.
              </p>
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn mf-btn--lg">
                Book a call
              </a>
            </div>
            <HeroThread />
          </div>
        </PhotoBand>

        <ProblemJourney />

        <SolutionColumns />

        <LoadStory />

        <FitQuestions />

        <Pricing />
      </main>

      <div className="mf-dark">
        <section className="mf-wrap">
          <div className="mf-close">
            <h2 className="mf-h2 mf-h2--xl">Your next quote could be a one‑word text.</h2>
            <BookForm />
          </div>
        </section>
        <Footer note="Times and figures are illustrative." />
      </div>
    </div>
  );
}
