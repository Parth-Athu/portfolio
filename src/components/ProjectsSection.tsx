import { motion } from "framer-motion";
import { Cloud, Rocket } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Cloud <span className="text-gradient">Learning Projects</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <SpotlightCard className="p-8 md:p-10 text-center group">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center mb-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-500">
                <Cloud className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <h3 className="text-xl font-display font-bold text-foreground mb-3">
              Building Hands-On Cloud Projects
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-6">
              I am currently building hands-on cloud projects to deepen my understanding of AWS, Docker, Kubernetes, and CI/CD pipelines. Learning how scalable, reliable systems are built and deployed.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium">
              <Rocket className="w-4 h-4" />
              <span>Projects coming soon</span>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
