import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "@/components/Navbar";
import HackathonsSection from "@/components/HackathonsSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Hackathons = () => {
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
      <div className="pt-24">
        <HackathonsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Hackathons;
