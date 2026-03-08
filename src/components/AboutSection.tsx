import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Zap } from "lucide-react";
import parthPhoto from "@/assets/parth-photo.png";

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
            className="glass p-6 space-y-3 hover:glow-border transition-all duration-500"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Hi there, I'm <span className="text-primary">Parth</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A Cloud and DevOps enthusiast currently pursuing MSc IT with specialization in Cloud & Application Development.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I enjoy building automated cloud infrastructure, CI/CD pipelines, and scalable backend systems.
            </p>
          </motion.div>

          {/* Card 2: Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass p-6 flex flex-col items-center justify-center hover:glow-border transition-all duration-500"
          >
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-md" />
              <img
                src={parthPhoto}
                alt="Parth"
                className="relative w-full h-full rounded-full object-cover border-2 border-primary/20"
              />
            </div>
            <p className="text-sm font-semibold text-foreground">Parth</p>
            <p className="text-xs text-primary">Cloud & DevOps Engineer</p>
          </motion.div>

          {/* Card 3: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass p-6 space-y-3 hover:glow-border transition-all duration-500"
          >
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
          </motion.div>

          {/* Card 4: Cloud Native */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass p-6 space-y-3 md:col-span-1 hover:glow-border transition-all duration-500"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Cloud Native</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Focused on Infrastructure as Code, container orchestration, cloud architecture, and building systems that scale globally.
            </p>
          </motion.div>

          {/* Card 5: Passion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass p-6 space-y-3 md:col-span-2 hover:glow-border transition-all duration-500"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Passion for Automation</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automation is my obsession — building CI/CD pipelines, Infrastructure as Code, and monitoring systems that eliminate manual work. I focus on cloud automation, reliable deployments, and Python-based tooling.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
