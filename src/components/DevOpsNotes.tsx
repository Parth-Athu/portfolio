import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowUpRight, X, ChevronDown } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const notes = [
  {
    title: "Understanding AWS EC2 Deployment",
    desc: "A beginner guide to launching and configuring EC2 instances for hosting backend applications.",
    content: [
      "AWS EC2 (Elastic Compute Cloud) lets you run virtual servers in the cloud. It's one of the most fundamental AWS services.",
      "To deploy an app, you launch an EC2 instance, choose an AMI (Amazon Machine Image), configure security groups for firewall rules, and SSH into the server.",
      "I used EC2 to host a Flask backend with Nginx as a reverse proxy. The process involves setting up the server, installing dependencies, configuring Nginx, and running the app with Gunicorn.",
      "Key takeaway: EC2 gives you full control over your server, but you're responsible for security patches, scaling, and monitoring.",
    ],
  },
  {
    title: "How CI/CD Pipelines Work",
    desc: "Explaining automated build and deployment workflows using GitHub Actions.",
    content: [
      "CI/CD stands for Continuous Integration and Continuous Deployment. It automates the process of building, testing, and deploying code changes.",
      "GitHub Actions uses YAML workflow files that trigger on events like pushes or pull requests. Each workflow has jobs, and each job has steps.",
      "A typical pipeline: checkout code → install dependencies → run tests → build Docker image → push to registry → deploy to server.",
      "Key takeaway: CI/CD eliminates manual deployment errors and ensures every code change goes through the same quality checks.",
    ],
  },
  {
    title: "Docker Basics for Developers",
    desc: "Understanding containerization and how Docker simplifies application deployment.",
    content: [
      "Docker packages your application and all its dependencies into a container — a lightweight, portable unit that runs consistently everywhere.",
      "A Dockerfile is a recipe: start with a base image, copy your code, install dependencies, expose ports, and define the startup command.",
      "Docker Compose lets you define multi-container apps. For example, your Flask app in one container and MySQL in another, connected via a Docker network.",
      "Key takeaway: 'It works on my machine' is no longer an excuse. Docker ensures your app runs the same in development, testing, and production.",
    ],
  },
  {
    title: "My DevOps Learning Path",
    desc: "How I started learning cloud infrastructure and DevOps engineering.",
    content: [
      "I started with Linux fundamentals — understanding the terminal, file permissions, and basic shell scripting. This is the foundation of everything in DevOps.",
      "Next, I learned Git and GitHub for version control, then moved to Docker for containerization. Building and running containers gave me practical experience.",
      "AWS was my entry into cloud computing. I started with EC2, then explored IAM for security and S3 for storage. Each service builds on the previous one.",
      "Currently, I'm deepening my knowledge of CI/CD with GitHub Actions and exploring Kubernetes for container orchestration. The DevOps journey is continuous.",
    ],
  },
];

export default function DevOpsNotes() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="notes" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Knowledge Base</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            DevOps <span className="text-gradient">Notes</span> & Learning Journey
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            I document my cloud and DevOps learning journey by writing short technical notes
            and explanations about the tools and systems I work with.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {notes.map((note, i) => {
            const isOpen = expanded === note.title;
            return (
              <motion.div
                key={note.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                layout
              >
                <SpotlightCard className="h-full group hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-500">
                  <button
                    onClick={() => setExpanded(isOpen ? null : note.title)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500 mt-0.5">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight flex items-center gap-1.5">
                          {note.title}
                          <ChevronDown className={`w-3.5 h-3.5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{note.desc}</p>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 space-y-3 border-t border-border ml-12 mr-2">
                          {note.content.map((paragraph, j) => (
                            <p key={j} className="text-xs text-muted-foreground leading-relaxed pt-3 first:pt-4">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
