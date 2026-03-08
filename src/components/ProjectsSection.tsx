import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Terminal } from "lucide-react";

const projects = [
  { title: "Cloud Hosted Student Mgmt System", category: "AWS EC2 · Flask · MySQL · Nginx", span: "lg:col-span-2 lg:row-span-2", color: "from-primary/15 to-primary/3" },
  { title: "CI/CD Pipeline Automation", category: "GitHub Actions · Docker · AWS", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/10 to-primary/3" },
  { title: "Dockerized Microservices", category: "Docker · Python · Flask", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/12 to-primary/4" },
  { title: "Kubernetes Deployment", category: "Kubernetes · Helm", span: "lg:col-span-1 lg:row-span-2", color: "from-primary/15 to-primary/5" },
  { title: "Infrastructure as Code", category: "Terraform · AWS", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/10 to-primary/3" },
  { title: "Monitoring Dashboard", category: "Prometheus · Grafana", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/12 to-primary/4" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${project.span} group relative rounded-md glass-terminal overflow-hidden cursor-pointer transition-all duration-500 hover:glow-border`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
      <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[200px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-primary uppercase tracking-widest mb-2 font-mono">{project.category}</p>
            <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ filter: 'blur(120px)', opacity: 0.04, background: 'hsl(142 72% 50%)' }} />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary font-mono text-xs mb-4">
            <Terminal className="w-3 h-3" />
            <span>ls ~/projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 auto-rows-[200px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
