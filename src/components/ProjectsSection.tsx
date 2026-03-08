import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const projects = [
  {
    title: "Cloud Hosted Student Management System",
    desc: "Deployed a full-stack student management system on AWS EC2 with a Flask backend and MySQL database.",
    stack: ["AWS EC2", "Flask", "MySQL", "Nginx"],
    repoUrl: "https://github.com/parth-athu",
  },
  {
    title: "CI/CD Pipeline Automation",
    desc: "Created an automated CI/CD pipeline that builds, tests, and deploys applications using GitHub Actions and Docker.",
    stack: ["GitHub Actions", "Docker", "AWS"],
    repoUrl: "https://github.com/parth-athu",
  },
  {
    title: "Dockerized Flask Application",
    desc: "Containerized a Python Flask application using Docker to ensure consistent development and deployment environments.",
    stack: ["Docker", "Python", "Flask"],
    repoUrl: "https://github.com/parth-athu",
  },
];

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
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 px-4 items-center gap-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all shrink-0"
                  >
                    <Github className="w-3.5 h-3.5" />
                    GitHub Repo
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
