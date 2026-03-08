import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubSection from "@/components/GitHubSection";
import HackathonsSection from "@/components/HackathonsSection";
import LearningNotesSection from "@/components/LearningNotesSection";
import TimelineSection from "@/components/TimelineSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SectionReveal from "@/components/SectionReveal";

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
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <SectionReveal><AboutSection /></SectionReveal>
      <SectionReveal><SkillsSection /></SectionReveal>
      <SectionReveal><ProjectsSection /></SectionReveal>
      <SectionReveal><GitHubSection /></SectionReveal>
      <SectionReveal><HackathonsSection /></SectionReveal>
      <SectionReveal><LearningNotesSection /></SectionReveal>
      <SectionReveal><TimelineSection /></SectionReveal>
      <SectionReveal><CertificationsSection /></SectionReveal>
      <SectionReveal><ContactSection /></SectionReveal>
      <Footer />
    </div>
  );
};

export default Index;
