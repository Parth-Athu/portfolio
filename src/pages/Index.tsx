import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import SectionReveal from "@/components/layout/SectionReveal";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GitHubSection from "@/components/sections/GitHubSection";
import LearningNotesSection from "@/components/sections/LearningNotesSection";
import TimelineSection from "@/components/sections/TimelineSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><SkillsSection /></SectionReveal>
      <SectionReveal><ProjectsSection /></SectionReveal>
      <SectionReveal><GitHubSection /></SectionReveal>
      
      <SectionReveal><LearningNotesSection /></SectionReveal>
      <SectionReveal><TimelineSection /></SectionReveal>
      <SectionReveal><CertificationsSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
      <Footer />
    </div>
  );
};

export default Index;
