import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  "UI/UX Design", "Brand Identity", "Motion Design", "3D Design",
  "Figma", "After Effects", "Blender", "Photoshop",
  "Typography", "Illustration", "Web Design", "Art Direction",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm">About</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
              Designing with <span className="text-gradient">purpose</span> & passion
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With over 7 years of experience in creative design, I specialize in transforming complex ideas into elegant,
              user-centered digital experiences. My work sits at the intersection of aesthetics and functionality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From brand identities to immersive web experiences, I approach every project with a focus on storytelling,
              attention to detail, and a deep understanding of the audience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest">Skills & Tools</p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="px-4 py-2 rounded-full glass text-sm text-foreground hover:glow-border transition-shadow duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
