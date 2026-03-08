import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timeline = [
  { year: "2024", title: "Senior Creative Director", org: "Studio Nebula", desc: "Leading brand strategy and creative direction for global clients." },
  { year: "2022", title: "Lead Designer", org: "Flux Agency", desc: "Oversaw design systems and UI/UX for SaaS products." },
  { year: "2020", title: "Visual Designer", org: "Prism Studio", desc: "Created brand identities and marketing campaigns for tech startups." },
  { year: "2018", title: "Junior Designer", org: "PixelCraft", desc: "Started career designing print & digital media for local businesses." },
  { year: "2017", title: "BFA in Graphic Design", org: "Rhode Island School of Design", desc: "Graduated with honors, specializing in interactive design." },
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-32 relative" ref={containerRef}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Experience</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border">
            <motion.div
              className="w-full bg-primary origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex items-start gap-8 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-1 w-3 h-3 rounded-full bg-primary glow-purple z-10" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-xs text-primary font-medium tracking-widest">{item.year}</span>
                <h3 className="text-xl font-display font-bold text-foreground mt-1">{item.title}</h3>
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
