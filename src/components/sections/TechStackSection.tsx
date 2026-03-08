import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Container, Shield, RefreshCw, Terminal, X } from "lucide-react";
import SpotlightCard from "../common/SpotlightCard";

const stack = [
  {
    category: "Cloud",
    tool: "AWS",
    Icon: Cloud,
    experience: [
      "Deploying applications on AWS EC2",
      "Understanding cloud infrastructure concepts",
      "Learning AWS DevOps tools & services",
    ],
    tools: ["EC2", "IAM", "S3"],
    project: "Cloud Hosted Student Management System",
  },
  {
    category: "Containers",
    tool: "Docker",
    Icon: Container,
    experience: [
      "Containerizing Python Flask applications",
      "Writing Dockerfiles & managing images",
      "Understanding container networking",
    ],
    tools: ["Dockerfile", "Docker Compose", "Docker Hub"],
    project: "Dockerized Flask Application",
  },
  {
    category: "Orchestration",
    tool: "Kubernetes",
    Icon: Shield,
    experience: [
      "Understanding Pods, Deployments & Services",
      "Learning container orchestration concepts",
      "Exploring cluster management basics",
    ],
    tools: ["kubectl", "Minikube", "YAML manifests"],
    project: null,
  },
  {
    category: "CI/CD",
    tool: "GitHub Actions",
    Icon: RefreshCw,
    experience: [
      "Building automated CI/CD pipelines",
      "Automating build, test & deploy workflows",
      "Integrating Docker with GitHub Actions",
    ],
    tools: ["GitHub Actions", "YAML Workflows", "Docker"],
    project: "CI/CD Pipeline Automation",
  },
  {
    category: "System",
    tool: "Linux",
    Icon: Terminal,
    experience: [
      "Server administration & shell scripting",
      "Package management & process control",
      "File permissions & user management",
    ],
    tools: ["Bash", "SSH", "Nginx", "systemd"],
    project: null,
  },
];

export default function TechStackSection() {
  const [selected, setSelected] = useState<(typeof stack)[0] | null>(null);

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
              <button onClick={() => setSelected(item)} className="w-full text-left">
                <SpotlightCard className="p-6 text-center group cursor-pointer hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-500">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                      <item.Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.category}</p>
                  <p className="text-sm font-display font-bold text-foreground">{item.tool}</p>
                </SpotlightCard>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-[0_0_60px_hsl(var(--primary)/0.1)] relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selected.Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground">{selected.tool}</h3>
                  <p className="text-xs text-muted-foreground">{selected.category}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Experience</h4>
                  <ul className="space-y-1.5">
                    {selected.experience.map((exp) => (
                      <li key={exp} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tools.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {selected.project && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Related Project</h4>
                    <p className="text-sm text-foreground font-medium">{selected.project}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
