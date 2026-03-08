import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Zap } from "lucide-react";
import parthPhoto from "@/assets/parth-photo.png";
import SpotlightCard from "./SpotlightCard";
import LiveTerminal from "./LiveTerminal";

const techStack = [
  "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Git",
  "Linux", "Python", "Flask", "Networking", "Monitoring", "Automation",
  "Cloud Architecture", "Infrastructure as Code",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">About Me</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Engineering Reliable Systems with{" "}
            <span className="text-gradient">Cloud & Automation</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Card 1: Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <SpotlightCard className="p-6 h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Hi there, I'm <span className="text-primary">Parth</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cloud & Application Development Specialist pursuing MSc IT. I build automated cloud infrastructure, CI/CD pipelines, and scalable backend systems.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Focused on <span className="text-primary font-medium">Infrastructure as Code</span>, container orchestration, and <span className="text-primary font-medium">cloud automation</span>.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <SpotlightCard className="p-6 h-full flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-md" />
                <img
                  src={parthPhoto}
                  alt="Parth"
                  className="relative w-full h-full rounded-full object-cover border-2 border-primary/20"
                />
              </div>
              <p className="text-sm font-semibold text-foreground">Parth</p>
              <p className="text-xs text-primary font-medium">Cloud & DevOps Engineer</p>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <SpotlightCard className="p-6 h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techStack.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 12px hsl(var(--primary) / 0.3)" }}
                      className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 4: Live Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <LiveTerminal />
          </motion.div>

          {/* Card 5: Cloud Native + Automation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <SpotlightCard className="p-6 h-full">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Cloud Native</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Building globally scalable systems with IaC, container orchestration, and serverless patterns.
                  </p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Automation</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    CI/CD pipelines, monitoring systems, and Python tooling that eliminate manual work.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
