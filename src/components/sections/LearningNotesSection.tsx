import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Target, ArrowRight, FileText, ChevronDown } from "lucide-react";
import SpotlightCard from "../common/SpotlightCard";

const currentlyLearning = [
  "Kubernetes", "Terraform", "AWS DevOps Tools", "Monitoring & Logging", "Infrastructure as Code",
];

const nextGoals = [
  "Build Kubernetes cluster deployment",
  "Implement Terraform infrastructure automation",
  "Create complete CI/CD pipeline for cloud apps",
  "Learn monitoring tools like Prometheus and Grafana",
];

const stages = ["Learning", "Practicing", "Building", "Mastering"];

const notes = [
  {
    title: "Understanding AWS EC2 Deployment",
    desc: "A beginner guide to launching and configuring EC2 instances.",
    content: [
      "AWS EC2 lets you run virtual servers in the cloud. It's one of the most fundamental AWS services.",
      "To deploy an app, you launch an EC2 instance, choose an AMI, configure security groups, and SSH into the server.",
      "I used EC2 to host a Flask backend with Nginx as a reverse proxy.",
      "Key takeaway: EC2 gives you full control over your server, but you're responsible for security patches, scaling, and monitoring.",
    ],
  },
  {
    title: "How CI/CD Pipelines Work",
    desc: "Automated build and deployment workflows using GitHub Actions.",
    content: [
      "CI/CD stands for Continuous Integration and Continuous Deployment. It automates building, testing, and deploying code changes.",
      "GitHub Actions uses YAML workflow files that trigger on events like pushes or pull requests.",
      "A typical pipeline: checkout code → install dependencies → run tests → build Docker image → push to registry → deploy.",
      "Key takeaway: CI/CD eliminates manual deployment errors and ensures every change goes through quality checks.",
    ],
  },
  {
    title: "Docker Basics for Developers",
    desc: "How Docker simplifies application deployment.",
    content: [
      "Docker packages your application and all its dependencies into a container — a lightweight, portable unit.",
      "A Dockerfile is a recipe: start with a base image, copy your code, install dependencies, expose ports, and define the startup command.",
      "Docker Compose lets you define multi-container apps connected via a Docker network.",
      "Key takeaway: 'It works on my machine' is no longer an excuse. Docker ensures consistency everywhere.",
    ],
  },
  {
    title: "My DevOps Learning Path",
    desc: "How I started learning cloud infrastructure and DevOps.",
    content: [
      "I started with Linux fundamentals — the terminal, file permissions, and shell scripting.",
      "Next, Git and GitHub for version control, then Docker for containerization.",
      "AWS was my entry into cloud computing — starting with EC2, then IAM and S3.",
      "Currently deepening CI/CD with GitHub Actions and exploring Kubernetes for orchestration.",
    ],
  },
];

export default function LearningNotesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="learning" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Growth</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Learning & <span className="text-gradient">DevOps Notes</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            Continuously improving my cloud and DevOps skills while documenting the journey.
          </p>
        </motion.div>

        {/* Stage Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 md:gap-4 mb-12 flex-wrap"
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

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left: Learning Roadmap */}
          <div className="space-y-4">
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

          {/* Right: DevOps Notes */}
          <div className="space-y-4">
            {notes.map((note, i) => {
              const isOpen = expanded === note.title;
              return (
                <motion.div
                  key={note.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  layout
                >
                  <SpotlightCard className="group hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-500">
                    <button
                      onClick={() => setExpanded(isOpen ? null : note.title)}
                      className="w-full text-left p-5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-500 mt-0.5">
                          <FileText className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight flex items-center gap-1.5">
                            {note.title}
                            <ChevronDown className={`w-3.5 h-3.5 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">{note.desc}</p>
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
                          <div className="px-5 pb-5 pt-0 space-y-2 border-t border-border ml-11">
                            {note.content.map((paragraph, j) => (
                              <p key={j} className="text-xs text-muted-foreground leading-relaxed pt-2 first:pt-3">
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
      </div>
    </section>
  );
}
