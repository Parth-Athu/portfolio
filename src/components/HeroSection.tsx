import { motion } from "framer-motion";
import Scene from "./Scene";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16">
      <div className="container mx-auto px-6">
        {/* Massive headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-bold tracking-tighter leading-[0.85] text-foreground uppercase"
        >
          Cloud
          <br />
          <span className="text-gradient">Engineer</span>
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="space-y-6 z-10"
          >
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              <span className="text-foreground font-semibold">Based</span>
              <br />
              in
              <br />
              <span className="text-foreground font-semibold">India</span>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              With <span className="text-primary font-medium">strong expertise</span> in cloud infrastructure,
              this portfolio showcases{" "}
              <span className="text-primary font-medium">scalable, automated</span> and{" "}
              <span className="text-primary font-medium">reliable systems</span>.
            </p>

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              href="#contact"
              className="inline-flex h-10 px-6 items-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              ▶ Contact Me
            </motion.a>
          </motion.div>

          {/* Right: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[350px] lg:h-[450px] -mt-8 lg:-mt-24"
          >
            <Scene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
