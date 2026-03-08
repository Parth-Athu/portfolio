import { motion } from "framer-motion";
import Scene from "./Scene";
import heroSetup from "@/assets/hero-setup.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Banner Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 rounded-2xl overflow-hidden glow-border"
        >
          <img
            src={heroSetup}
            alt="Parth - Cloud & DevOps Engineer workspace"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-display font-bold tracking-tighter leading-[0.9] text-foreground uppercase"
        >
          Automating
          <br />
          <span className="text-gradient">Cloud</span>
          <br />
          Infrastructure
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="space-y-6 z-10"
          >
            <div className="space-y-2">
              <p className="text-primary font-medium tracking-widest uppercase text-sm">Hi, I'm Parth</p>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                📍 Ahmedabad, India
              </p>
            </div>

            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Cloud & DevOps Engineer building{" "}
              <span className="text-primary font-medium">scalable</span> and{" "}
              <span className="text-primary font-medium">automated</span> infrastructure
              using modern DevOps practices.
            </p>

            <div className="flex items-center gap-3">
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                href="#projects"
                className="inline-flex h-11 px-6 items-center rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all duration-300 glow-teal hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
              >
                View Projects
              </motion.a>
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                href="#contact"
                className="inline-flex h-11 px-6 items-center rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>

          {/* Right: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[350px] lg:h-[450px] -mt-8 lg:-mt-24"
          >
            <Scene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
