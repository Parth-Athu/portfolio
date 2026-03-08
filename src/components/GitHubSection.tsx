import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import MagneticButton from "./MagneticButton";

const repos = [
  {
    title: "cloud-student-management-system",
    stack: ["Python", "Flask", "AWS EC2", "MySQL"],
    repoUrl: "https://github.com/Parth-Athu/cloud-student-management-system",
  },
  {
    title: "Techify-Hackathon-DesiRoots",
    stack: ["TypeScript", "React", "Supabase", "Vercel"],
    repoUrl: "https://github.com/Parth-Athu/Techify-Hackathon-DesiRoots",
  },
  {
    title: "Indian-Tales",
    stack: ["TypeScript", "React", "MIT License"],
    repoUrl: "https://github.com/Parth-Athu/Indian-Tales",
  },
];

export default function GitHubSection() {
  return (
    <section id="github" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Open Source & GitHub</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            GitHub Projects & <span className="text-gradient">Activity</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            I regularly build and experiment with cloud infrastructure, DevOps tools, and backend systems.
            Below are some of my repositories where I practice AWS deployment, Docker containerization,
            CI/CD automation, and infrastructure concepts.
          </p>
        </motion.div>

        <div className="grid gap-4 max-w-4xl mx-auto mb-10">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <SpotlightCard className="p-6 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                      {repo.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {repo.stack.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={repo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 px-4 items-center gap-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View Repository
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <MagneticButton
            href="https://github.com/parth-athu"
            className="inline-flex h-12 px-7 items-center gap-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-300 glow-teal hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
          >
            <Github className="w-4 h-4" />
            View GitHub Profile
            <ExternalLink className="w-3.5 h-3.5" />
          </MagneticButton>
        </motion.div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <SpotlightCard className="p-6 md:p-8">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 text-center">
              GitHub Contributions
            </h3>
            <div className="overflow-x-auto">
              <img
                src="https://ghchart.rshah.org/2dd4bf/parth-athu"
                alt="Parth Athu's GitHub Contribution Graph"
                className="w-full min-w-[600px] h-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
