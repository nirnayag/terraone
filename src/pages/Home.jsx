import Hero from "../components/Hero";
import SectorCarousel from "../components/SectorCarousel";
import StatsBand from "../components/StatsBand";
import WhyChoose from "../components/WhyChoose";
import Technologies from "../components/Technologies";
import Insights from "../components/Insights";

export default function Home() {
  return (
    <>
      <Hero />
      <SectorCarousel />
      <StatsBand />
      <WhyChoose />
      <Technologies />
      <Insights />
    </>
  );
}
