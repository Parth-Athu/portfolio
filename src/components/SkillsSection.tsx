import { motion } from "framer-motion";
import { Cloud, Container, Shield, GitBranch, Terminal, Brain, Sparkles, RefreshCw } from "lucide-react";

const skills = [
  { name: "AWS", Icon: Cloud, color: "from-primary to-cyan" },
  { name: "Docker", Icon: Container, color: "from-cyan to-primary" },
  { name: "Kubernetes", Icon: Shield, color: "from-primary to-cyan" },
  { name: "CI/CD", Icon: RefreshCw, color: "from-cyan to-primary" },
  { name: "Linux", Icon: Terminal, color: "from-primary to-cyan" },
  { name: "GitHub", Icon: GitBranch, color: "from-cyan to-primary" },
  { name: "AI", Icon: Brain, color: "from-primary to-cyan" },
  { name: "Generative AI", Icon: Sparkles, color: "from-cyan to-primary" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Tools & Technologies</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Skills & <span className="text-gradient">Toolkit</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                className="relative"
              >
                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:glow-teal transition-all duration-500">
                  <skill.Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm"
                  style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--glow-cyan)))` }}
                />
              </motion.div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
