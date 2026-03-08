import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DevOpsMetrics from "@/components/DevOpsMetrics";
import ProjectsSection from "@/components/ProjectsSection";
import CloudArchitecture from "@/components/CloudArchitecture";
import DevOpsToolkit from "@/components/DevOpsToolkit";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingBackground from "@/components/FloatingBackground";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DevOpsMetrics />
      <ProjectsSection />
      <CloudArchitecture />
      <DevOpsToolkit />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
