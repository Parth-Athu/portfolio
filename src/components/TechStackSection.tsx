import { motion } from "framer-motion";
import { Cloud, Container, Shield, RefreshCw, Terminal } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const stack = [
  { category: "Cloud", tool: "AWS", Icon: Cloud },
  { category: "Containers", tool: "Docker", Icon: Container },
  { category: "Orchestration", tool: "Kubernetes", Icon: Shield },
  { category: "CI/CD", tool: "GitHub Actions", Icon: RefreshCw },
  { category: "System", tool: "Linux", Icon: Terminal },
];

export default function TechStackSection() {
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Infrastructure</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Tech Stack <span className="text-gradient">I Work With</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {stack.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <SpotlightCard className="p-6 text-center group">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                    <item.Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.category}</p>
                <p className="text-sm font-display font-bold text-foreground">{item.tool}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
