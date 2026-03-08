import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import Scene from "./Scene";
import parthPhoto from "@/assets/parth-photo.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid + scanline overlay */}
      <div className="absolute inset-0 bg-grid bg-scanline pointer-events-none" />

      {/* Subtle green glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ filter: 'blur(130px)', opacity: 0.08, background: 'hsl(142 72% 50%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ filter: 'blur(100px)', opacity: 0.06, background: 'hsl(160 84% 39%)' }} />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center pt-24">
        {/* Left: Text + Photo */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 z-10"
        >
          {/* Terminal-style tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded glass-terminal font-mono text-xs text-primary"
          >
            <Terminal className="w-3 h-3" />
            <span>~/parth</span>
            <span className="text-muted-foreground">$</span>
            <span>whoami</span>
            <span className="terminal-cursor text-primary">▋</span>
          </motion.div>

          {/* Photo with 3D effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-28 h-28 md:w-32 md:h-32"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-sm" />
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary/30 to-transparent" />
            <img
              src={parthPhoto}
              alt="Parth - Cloud & DevOps Engineer"
              className="relative w-full h-full rounded-full object-cover border-2 border-primary/20 grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Floating status dot */}
            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary glow-green border-2 border-background" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9]">
            <span className="block text-foreground">Building</span>
            <span className="block text-gradient">Scalable</span>
            <span className="block text-foreground">Cloud Infra</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            I design, automate, and deploy reliable cloud systems using modern DevOps practices.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex h-12 px-8 items-center rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-green font-mono text-sm"
            >
              ./view_projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 px-8 items-center rounded-md border border-border text-foreground font-medium hover:border-primary/40 hover:text-primary transition-colors font-mono text-sm"
            >
              ./contact
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[400px] lg:h-[600px]"
        >
          <Scene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
