import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2025", title: "Cloud & DevOps Engineer (Student)", org: "Self-learning & Projects", desc: "Learning AWS, Docker, Kubernetes and CI/CD by building real cloud projects." },
  { year: "2024", title: "Built Cloud Hosted Student Mgmt System", org: "Academic Project", desc: "Full stack application deployed on AWS EC2." },
  { year: "2023", title: "Started MSc IT", org: "Cloud & Application Development", desc: "Specialization in Cloud & Application Development." },
  { year: "2022", title: "BSc IT Graduate", org: "University", desc: "Built backend and networking projects." },
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-center mb-16"
        >
          My Journey
        </motion.h2>

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
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-xs text-primary font-medium tracking-widest">{item.year}</span>
                <h3 className="text-lg font-display font-bold text-foreground mt-1">{item.title}</h3>
                <p className="text-sm text-primary/80 mt-0.5">{item.org}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
