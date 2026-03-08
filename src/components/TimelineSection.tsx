import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  {
    year: "2025",
    title: "Cloud & DevOps Engineer",
    org: "Self-learning & Real Projects",
    desc: "Implementing GitOps workflows, building CI/CD pipelines with GitHub Actions, and deploying containerized apps on Kubernetes clusters.",
  },
  {
    year: "2024",
    title: "Deployed Full-Stack App on AWS",
    org: "Academic Capstone Project",
    desc: "Architected and deployed a Student Management System on EC2 with Nginx reverse proxy, Flask API, MySQL backend, and automated deployments.",
  },
  {
    year: "2023",
    title: "Started MSc IT — Cloud Specialization",
    org: "Cloud & Application Development",
    desc: "Deep dive into cloud architecture, IaC with Terraform, Docker containerization, and Kubernetes orchestration.",
  },
  {
    year: "2022",
    title: "BSc IT Graduate",
    org: "University",
    desc: "Built foundational skills in networking, Linux administration, backend development with Python/Flask, and database management.",
  },
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Experience</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border">
            <motion.div className="w-full bg-primary origin-top" style={{ height: lineHeight }} />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-primary glow-teal z-10" />
              <div className={`ml-12 md:ml-0 md:w-1/2 glass p-5 hover:glow-border transition-all duration-500 group ${i % 2 === 0 ? "md:mr-auto md:pr-8 md:text-right" : "md:ml-auto md:pl-8"}`}>
                <span className="text-xs text-primary font-semibold tracking-widest">{item.year}</span>
                <h3 className="text-lg font-display font-bold text-foreground mt-1 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-primary/70 mt-0.5">{item.org}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
