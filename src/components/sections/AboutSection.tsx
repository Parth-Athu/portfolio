import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Globe, Zap, Cloud, GitBranch, Wrench, Server } from "lucide-react";
import parthPhoto from "@/assets/parth-photo.png";
import SpotlightCard from "../common/SpotlightCard";
import LiveTerminal from "../effects/LiveTerminal";

const skills = [
  "AWS", "Docker", "Kubernetes", "CI/CD", "Linux",
  "GitHub", "Artificial Intelligence", "Generative AI",
];

const metrics = [
  { label: "Cloud Projects", value: 3, suffix: "+", Icon: Cloud, desc: "Built & Deployed" },
  { label: "CI/CD Pipelines", value: 1, suffix: "", Icon: GitBranch, desc: "Pipeline Built" },
  { label: "DevOps Tools", value: 5, suffix: "+", Icon: Wrench, desc: "Hands-On Experience" },
  { label: "AWS Deployments", value: 1, suffix: "", Icon: Server, desc: "Production Deployed" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-display font-bold text-foreground tabular-nums">
      {count}<span className="text-primary text-lg ml-0.5">{suffix}</span>
    </span>
  );
}

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
            Aspiring <span className="text-gradient">Cloud & DevOps</span> Engineer
          </h2>
        </motion.div>

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
                  Hi, I'm <span className="text-primary">Parth Athu</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  IMSc IT (Cloud & Application Development) student at JG University with a strong interest in Cloud computing and DevOps.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Currently learning and working with <span className="text-primary font-medium">AWS, Docker, Kubernetes</span>, CI/CD pipelines, Git/GitHub, Linux, and <span className="text-primary font-medium">Generative AI</span> concepts.
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
                  alt="Parth Athu"
                  className="relative w-full h-full rounded-full object-cover border-2 border-primary/20"
                />
              </div>
              <p className="text-sm font-semibold text-foreground">Parth Athu</p>
              <p className="text-xs text-primary font-medium">Aspiring Cloud & DevOps Engineer</p>
            </SpotlightCard>
          </motion.div>

          {/* Card 3: Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <SpotlightCard className="p-6 h-full">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Skills</h3>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skills.map((t) => (
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

          {/* Card 5: Goals */}
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
                    Understanding how scalable, reliable systems are built and deployed using cloud technologies.
                  </p>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Seeking Opportunities</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Actively seeking internship and entry-level opportunities to learn, contribute, and grow as a Cloud & DevOps engineer.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* DevOps Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <p className="text-center text-primary font-medium tracking-widest uppercase text-sm mb-8">Progress</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <SpotlightCard className="p-6 text-center group">
                  <div className="flex justify-center mb-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                      <metric.Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{metric.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
