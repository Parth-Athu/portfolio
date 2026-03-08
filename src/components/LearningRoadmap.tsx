import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Target } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const currentlyLearning = [
  "Kubernetes",
  "Terraform",
  "AWS DevOps Tools",
  "Monitoring & Logging",
  "Infrastructure as Code",
];

const nextGoals = [
  "Build Kubernetes cluster deployment",
  "Implement Terraform infrastructure automation",
  "Create complete CI/CD pipeline for cloud apps",
  "Learn monitoring tools like Prometheus and Grafana",
];

const stages = ["Learning", "Practicing", "Building", "Mastering"];

export default function LearningRoadmap() {
  return (
    <section id="roadmap" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Growth</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            DevOps <span className="text-gradient">Learning Roadmap</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            I am continuously improving my cloud and DevOps skills by learning modern tools
            used in scalable infrastructure and automated deployments.
          </p>
        </motion.div>

        {/* Stage Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-16 flex-wrap"
        >
          {stages.map((stage, i) => (
            <div key={stage} className="flex items-center gap-2 md:gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                  i === 0
                    ? "bg-primary/20 border-primary/40 text-primary glow-teal"
                    : i === 1
                    ? "bg-primary/10 border-primary/20 text-primary/80"
                    : "bg-secondary border-border text-muted-foreground"
                }`}
              >
                {stage}
              </motion.div>
              {i < stages.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard className="p-6 h-full group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Currently Learning</h3>
              </div>
              <ul className="space-y-2.5">
                {currentlyLearning.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Next Goals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SpotlightCard className="p-6 h-full group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Next Goals</h3>
              </div>
              <ul className="space-y-2.5">
                {nextGoals.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
