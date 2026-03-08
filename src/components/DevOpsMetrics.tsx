import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Cloud, GitBranch, Wrench, Server } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const metrics = [
  { label: "Cloud Projects", value: 3, suffix: "+", Icon: Cloud, desc: "Built & Deployed" },
  { label: "CI/CD Pipeline", value: 1, suffix: "", Icon: GitBranch, desc: "Pipeline Built" },
  { label: "DevOps Tools", value: 5, suffix: "+", Icon: Wrench, desc: "Learned & Used" },
  { label: "AWS Deployment", value: 1, suffix: "", Icon: Server, desc: "Cloud Deployed" },
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Progress</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            <span className="text-gradient">DevOps</span> Metrics
          </h2>
        </motion.div>

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
      </div>
    </section>
  );
}
