import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Server, GitBranch, Cloud, Activity } from "lucide-react";

const metrics = [
  { label: "Deployment Automation", value: 90, suffix: "%", Icon: Server },
  { label: "CI/CD Pipelines Built", value: 5, suffix: "+", Icon: GitBranch },
  { label: "Cloud Projects", value: 10, suffix: "+", Icon: Cloud },
  { label: "Infra Automation", value: 80, suffix: "%", Icon: Activity },
];

function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
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
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-foreground">
      {count}{suffix}
    </span>
  );
}

export default function DevOpsMetrics() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">By the Numbers</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            DevOps <span className="text-gradient">Metrics</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass p-6 text-center group hover:glow-border transition-all duration-500"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <metric.Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <AnimatedCounter target={metric.value} suffix={metric.suffix} />
              <p className="text-xs text-muted-foreground mt-2 font-medium">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
