import Hero from "../components/Hero";
import SectorCarousel from "../components/SectorCarousel";
import StatsBand from "../components/StatsBand";
import WhyChoose from "../components/WhyChoose";
import Technologies from "../components/Technologies";
import Contrast from "../components/Contrast";
import Process from "../components/Process";
import Research from "../components/Research";
import Faq from "../components/Faq";
import Insights from "../components/Insights";
import Collaborate from "../components/Collaborate";

/* Section order follows the live terrapha.com homepage:
     film → positioning + sector cards → stats → why choose → portfolio → blogs
   Contrast, Process, Research and the FAQ are additions carrying copy from the
   client's documents that the reference homepage has no slot for; they sit
   after the portfolio so the reference spine stays intact. */
export default function Home() {
  return (
    <>
      <Hero />
      <SectorCarousel />
      <StatsBand />
      <WhyChoose />
      <Technologies variant="portfolio" />
      <Contrast />
      <Process />
      <Research />
      <Faq />
      <Insights />
      <Collaborate />
    </>
  );
}
