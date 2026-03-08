import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Layers } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const projects = [
  {
    title: "Cloud Student Management System",
    desc: "Deployed a full-stack student management system on AWS EC2 with a Flask backend and MySQL database. Configured Nginx as reverse proxy.",
    stack: ["Python", "Flask", "MySQL", "AWS EC2", "Nginx"],
    repoUrl: "https://github.com/Parth-Athu/cloud-student-management-system",
    architecture: [
      "User sends request → Nginx reverse proxy",
      "Nginx routes to Flask backend (Gunicorn)",
      "Flask connects to MySQL database",
      "All hosted on a single AWS EC2 instance",
      "Security Groups control inbound/outbound traffic",
    ],
  },
  {
    title: "DesiRoots – Tribal Art Marketplace",
    desc: "Built a Tribal Art Marketplace during Hackathon 2025 at JG University. Secured 1st Runner-Up position. Deployed on Vercel.",
    stack: ["TypeScript", "React", "Supabase", "Vercel"],
    repoUrl: "https://github.com/Parth-Athu/Techify-Hackathon-DesiRoots",
    liveUrl: "https://v0-tribal-art-marketplace.vercel.app",
    architecture: [
      "User browses tribal art marketplace frontend",
      "React frontend communicates with Supabase backend",
      "Supabase handles auth, database & storage",
      "Deployed on Vercel from a GitHub repository",
      "Production updates shipped through repeatable deployment workflows",
    ],
  },
  {
    title: "Indian Tales",
    desc: "A TypeScript-based web application showcasing Indian cultural stories and folklore. Open-source with MIT license.",
    stack: ["TypeScript", "React", "MIT License"],
    repoUrl: "https://github.com/Parth-Athu/Indian-Tales",
    architecture: [
      "Static site with React-based frontend",
      "Content structured as story components",
      "Responsive design for all devices",
      "Open-source under MIT License",
      "Community contributions via forks",
    ],
  },
];

export default function ProjectsSection() {
  const [archProject, setArchProject] = useState<(typeof projects)[0] | null>(null);

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
            Cloud <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <SpotlightCard className="p-6 group hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    {(project as any).liveUrl && (
                      <a
                        href={(project as any).liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live demo for ${project.title}`}
                        className="inline-flex h-9 px-4 items-center gap-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    <button
                      onClick={() => setArchProject(project)}
                      aria-label={`View architecture for ${project.title}`}
                      className="inline-flex h-9 px-4 items-center gap-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Architecture
                    </button>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open GitHub repository for ${project.title}`}
                      className="inline-flex h-9 px-4 items-center gap-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Modal */}
      <AnimatePresence>
        {archProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setArchProject(null)}
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
                onClick={() => setArchProject(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-foreground">{archProject.title}</h3>
                  <p className="text-xs text-muted-foreground">Architecture Flow</p>
                </div>
              </div>

              <div className="space-y-3">
                {archProject.architecture.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {i + 1}
                      </div>
                      {i < archProject.architecture.length - 1 && (
                        <div className="w-px h-4 bg-border mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border">
                {archProject.stack.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
