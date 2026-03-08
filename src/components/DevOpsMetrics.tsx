import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Rocket, Shield, Timer, Cpu } from "lucide-react";

const metrics = [
  { label: "Daily Deploys", value: 10, suffix: "+", display: "10+", Icon: Rocket, desc: "Deployment Frequency" },
  { label: "Availability", value: 99.9, suffix: "%", display: "99.9%", Icon: Shield, desc: "System Uptime" },
  { label: "Lead Time", value: 15, suffix: "min", display: "<15min", Icon: Timer, desc: "Infrastructure Provisioning" },
  { label: "Automation", value: 85, suffix: "%", display: "85%+", Icon: Cpu, desc: "Coverage" },
];

function AnimatedCounter({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
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
        setCount(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, isDecimal]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-display font-bold text-foreground tabular-nums">
      {suffix === "min" ? "<" : ""}{isDecimal ? count.toFixed(1) : count}{suffix === "min" ? "" : ""}<span className="text-primary text-lg ml-0.5">{suffix}</span>
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Performance</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            DevOps <span className="text-gradient">Metrics</span>
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
              className="glass p-6 text-center group hover:glow-border transition-all duration-500 relative overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                    <metric.Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  isDecimal={metric.value % 1 !== 0}
                />
                <p className="text-xs text-muted-foreground mt-2 font-medium">{metric.desc}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
