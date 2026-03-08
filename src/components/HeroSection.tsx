import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Scene from "./Scene";
import parthPhoto from "@/assets/parth-photo.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center pt-24">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative w-20 h-20"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-sm" />
            <img
              src={parthPhoto}
              alt="Parth"
              className="relative w-full h-full rounded-full object-cover border-2 border-primary/30"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary font-medium tracking-widest uppercase text-sm"
          >
            Cloud & DevOps Engineer
          </motion.p>
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
            I design, automate and deploy reliable cloud systems using modern DevOps practices.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 pt-4"
          >
            <a
              href="#projects"
              className="inline-flex h-12 px-8 items-center rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-purple"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 px-8 items-center rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[400px] lg:h-[600px]"
        >
          <Scene />
        </motion.div>
      </div>

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
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
