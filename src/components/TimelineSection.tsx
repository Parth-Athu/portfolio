import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SpotlightCard from "./SpotlightCard";

const semesters = [
  { label: "Sem 1", score: 7.6 },
  { label: "Sem 2", score: 8.2 },
  { label: "Sem 3", score: 7.9 },
];

const timeline = [
  {
    year: "2024 – 2027",
    title: "IMSc IT – Information Technology",
    org: "JG University",
    desc: "Pursuing Cloud & Application Development specialization. Learning AWS, Docker, Kubernetes, CI/CD pipelines, Git/GitHub, Linux, and Generative AI concepts.",
    cgpa: "7.9 / 10",
    status: "Currently Pursuing",
    isCurrent: true,
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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Education</p>
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
              className="relative flex items-start gap-8 mb-12 md:flex-row"
            >
              <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-primary glow-teal z-10" />
              <div className="ml-12 md:ml-0 md:w-1/2 md:mr-auto md:pr-8">
                <SpotlightCard className="p-5 group">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-primary font-semibold tracking-widest">{item.year}</span>
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                        </span>
                        {item.status}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-sm text-primary/70 mt-0.5">{item.org}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
