import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal } from "lucide-react";

const skills = [
  "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Git",
  "Linux", "Python", "Flask", "Cloud Architecture", "Monitoring",
  "Automation", "Networking", "Infrastructure as Code",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ filter: 'blur(100px)', opacity: 0.05, background: 'hsl(142 72% 50%)' }} />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-primary font-mono text-xs">
              <Terminal className="w-3 h-3" />
              <span>cat about.md</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
              Engineering Reliable Systems with <span className="text-gradient">Cloud & Automation</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am a Cloud & DevOps enthusiast currently pursuing MSc in IT with specialization in Cloud & Application Development. I enjoy building automated cloud infrastructure, CI/CD pipelines, and scalable backend systems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I focus on Infrastructure as Code, container orchestration, and cloud-native development. My goal is to engineer systems that are reliable, scalable, and easy to maintain.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-widest">stack.json</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-3 py-1.5 rounded glass-terminal text-sm font-mono text-foreground hover:text-primary hover:glow-border transition-all duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
