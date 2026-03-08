import { motion } from "framer-motion";
import { Server } from "lucide-react";

const projects = [
  {
    title: "Cloud Hosted Student Management System",
    desc: "Full-stack student management system deployed on AWS EC2 with secure backend APIs, Nginx reverse proxy, and MySQL database.",
    stack: ["AWS EC2", "Flask", "MySQL", "Nginx"],
  },
  {
    title: "CI/CD Pipeline Automation",
    desc: "Automated build, test, and deployment pipeline reducing manual deployment time by 80%.",
    stack: ["GitHub Actions", "Docker", "AWS"],
  },
  {
    title: "Dockerized Flask Application",
    desc: "Containerized multi-service application architecture demonstrating service isolation and networking.",
    stack: ["Docker", "Python", "Flask"],
  },
  {
    title: "Kubernetes Deployment Demo",
    desc: "Application deployed using Kubernetes with scalable pods, Helm charts, and health checks.",
    stack: ["Kubernetes", "Helm"],
  },
  {
    title: "Infrastructure as Code Setup",
    desc: "Provisioned complete cloud infrastructure using Terraform scripts with state management.",
    stack: ["Terraform", "AWS"],
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
            My <span className="text-gradient">Projects</span>
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
              whileHover={{ scale: 1.01, y: -2 }}
              className="glass p-6 group hover:glow-border transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              {/* Hover floating icon */}
              <motion.div
                className="absolute top-4 right-4 text-primary/0 group-hover:text-primary/20 transition-all duration-500"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Server className="w-6 h-6" />
              </motion.div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
