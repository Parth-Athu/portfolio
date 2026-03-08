import { motion } from "framer-motion";
import FloatingIcons from "./FloatingIcons";
import HeroWaves from "./HeroWaves";
import MagneticButton from "./MagneticButton";
import { Github } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 pb-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.01)_2px,rgba(255,255,255,0.01)_4px)] pointer-events-none" />

      <HeroWaves />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
        {/* Left side - Text */}
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 space-y-2"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm">Hi, I'm Parth Athu</p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              📍 Ahmedabad, Gujarat, India
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/70 ml-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Open to opportunities
              </span>
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tighter leading-[0.9] text-foreground uppercase mb-6"
          >
            Automating
            <br />
            <span className="text-gradient">Cloud</span>
            <br />
            Infrastructure
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-base text-muted-foreground max-w-md leading-relaxed mb-8"
          >
            <span className="text-foreground font-medium">Aspiring Cloud & DevOps Engineer</span> building{" "}
            <span className="text-primary font-medium">scalable, automated cloud infrastructure</span> using{" "}
            AWS, Docker and CI/CD pipelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <MagneticButton
              href="#timeline"
              className="inline-flex h-12 px-7 items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-300 glow-teal hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
            >
              View Experience
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex h-12 px-7 items-center rounded-full border border-border text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/30 transition-all duration-300"
            >
              Contact Me
            </MagneticButton>
            <MagneticButton
              href="https://github.com/parth-athu"
              className="inline-flex h-12 px-7 items-center gap-2 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-secondary hover:border-primary/30 transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              View GitHub
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side - 3D PC Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full lg:w-[50%] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] relative"
        >
          <FloatingIcons />
        </motion.div>
      </div>
    </section>
  );
}
