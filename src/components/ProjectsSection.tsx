import { motion } from "framer-motion";
import { Server } from "lucide-react";

const projects = [
  {
    title: "Cloud Hosted Student Management System",
    desc: "Full-stack application deployed on AWS EC2 with Flask REST API, Nginx reverse proxy, MySQL database, and automated backup scripts.",
    stack: ["AWS EC2", "Flask", "MySQL", "Nginx"],
  },
  {
    title: "CI/CD Pipeline Automation",
    desc: "End-to-end pipeline with GitHub Actions — automated testing, Docker image builds, ECR push, and ECS deployment reducing release time by 80%.",
    stack: ["GitHub Actions", "Docker", "AWS"],
  },
  {
    title: "Dockerized Microservices Architecture",
    desc: "Multi-container application with Docker Compose demonstrating service isolation, inter-service networking, and health monitoring.",
    stack: ["Docker", "Python", "Flask"],
  },
  {
    title: "Kubernetes Cluster Deployment",
    desc: "Production-grade K8s deployment with Helm charts, horizontal pod autoscaling, readiness probes, and rolling update strategies.",
    stack: ["Kubernetes", "Helm"],
  },
  {
    title: "Infrastructure as Code with Terraform",
    desc: "Complete AWS infrastructure provisioned via Terraform — VPC, subnets, security groups, EC2, RDS with remote state management in S3.",
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
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-border/30 hover:border-primary/30 bg-card/40 backdrop-blur-xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                className="absolute top-4 right-4 text-primary/0 group-hover:text-primary/20 transition-all duration-500"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Server className="w-6 h-6" />
              </motion.div>

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
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
                      className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium"
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
