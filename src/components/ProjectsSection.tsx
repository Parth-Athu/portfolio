import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "Nebula Brand", category: "Brand Identity", span: "lg:col-span-2 lg:row-span-2", color: "from-primary/20 to-primary/5" },
  { title: "Aether App", category: "UI/UX Design", span: "lg:col-span-1 lg:row-span-1", color: "from-[hsl(235,80%,60%)]/20 to-[hsl(235,80%,60%)]/5" },
  { title: "Flux Motion", category: "Motion Design", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/15 to-[hsl(235,80%,60%)]/10" },
  { title: "Zenith Web", category: "Web Design", span: "lg:col-span-1 lg:row-span-2", color: "from-[hsl(235,80%,60%)]/20 to-primary/5" },
  { title: "Prism 3D", category: "3D Design", span: "lg:col-span-1 lg:row-span-1", color: "from-primary/20 to-primary/10" },
  { title: "Vortex Identity", category: "Art Direction", span: "lg:col-span-1 lg:row-span-1", color: "from-[hsl(235,80%,60%)]/15 to-primary/5" },
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
      className={`${project.span} group relative rounded-2xl glass overflow-hidden cursor-pointer transition-all duration-500 hover:glow-border`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
      <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[200px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-primary uppercase tracking-widest mb-2">{project.category}</p>
            <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
          </div>
          <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
        </div>
      </div>
      <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-700" />
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
