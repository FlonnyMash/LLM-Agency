import { HomeIntro } from "@/components/home/HomeIntro";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SocialProof } from "@/components/home/SocialProof";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Process } from "@/components/home/Process";
import { ServicesSection } from "@/components/home/ServicesSection";
import { About } from "@/components/home/About";
import { Metrics } from "@/components/home/Metrics";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <div className="relative isolate">
        <Hero />
        <Intro />
      </div>
      <SocialProof />
      <SelectedWork />
      <Process />
      <ServicesSection />
      <About />
      <Metrics />
      <CtaSection />
    </>
  );
}
