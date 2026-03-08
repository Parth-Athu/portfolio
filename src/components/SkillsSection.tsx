import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Container, Shield, RefreshCw, Terminal, Brain, Sparkles, GitBranch, X } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const skills = [
  {
    name: "AWS", Icon: Cloud,
    experience: ["Deploying applications on AWS EC2", "Understanding cloud infrastructure concepts", "Learning AWS DevOps tools & services"],
    tools: ["EC2", "IAM", "S3"],
    project: "Cloud Hosted Student Management System",
  },
  {
    name: "Docker", Icon: Container,
    experience: ["Containerizing Python Flask applications", "Writing Dockerfiles & managing images", "Understanding container networking"],
    tools: ["Dockerfile", "Docker Compose", "Docker Hub"],
    project: "Dockerized Flask Application",
  },
  {
    name: "Kubernetes", Icon: Shield,
    experience: ["Understanding Pods, Deployments & Services", "Learning container orchestration concepts", "Exploring cluster management basics"],
    tools: ["kubectl", "Minikube", "YAML manifests"],
    project: null,
  },
  {
    name: "CI/CD", Icon: RefreshCw,
    experience: ["Building automated CI/CD pipelines", "Automating build, test & deploy workflows", "Integrating Docker with GitHub Actions"],
    tools: ["GitHub Actions", "YAML Workflows", "Docker"],
    project: "CI/CD Pipeline Automation",
  },
  {
    name: "Linux", Icon: Terminal,
    experience: ["Server administration & shell scripting", "Package management & process control", "File permissions & user management"],
    tools: ["Bash", "SSH", "Nginx", "systemd"],
    project: null,
  },
  {
    name: "GitHub", Icon: GitBranch,
    experience: ["Version control with Git", "Collaborative development workflows", "Repository management & branching strategies"],
    tools: ["Git", "GitHub", "Pull Requests"],
    project: null,
  },
  {
    name: "AI", Icon: Brain,
    experience: ["Understanding AI/ML fundamentals", "Exploring practical AI applications", "Learning model concepts"],
    tools: ["Python", "AI concepts"],
    project: null,
  },
  {
    name: "Generative AI", Icon: Sparkles,
    experience: ["Understanding generative AI concepts", "Exploring prompt engineering", "Learning LLM applications"],
    tools: ["LLMs", "Prompt Engineering"],
    project: null,
  },
];

export default function SkillsSection() {
  const [selected, setSelected] = useState<(typeof skills)[0] | null>(null);

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Tools & Technologies</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex flex-col items-center gap-3"
            >
              <motion.button
                onClick={() => setSelected(skill)}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="relative cursor-pointer"
              >
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:glow-teal transition-all duration-500">
                  <skill.Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                  style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--glow-cyan)))` }}
                />
              </motion.button>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium text-center">
                {skill.name}
              </span>
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
                <h3 className="text-lg font-display font-bold text-foreground">{selected.name}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Experience</h4>
                  <ul className="space-y-1.5">
                    {selected.experience.map((exp) => (
                      <li key={exp} className="text-sm text-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>{exp}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tools</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tools.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">{t}</span>
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
