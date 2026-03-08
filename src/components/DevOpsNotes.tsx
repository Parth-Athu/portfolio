import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const notes = [
  {
    title: "Understanding AWS EC2 Deployment",
    desc: "A beginner guide to launching and configuring EC2 instances for hosting backend applications.",
  },
  {
    title: "How CI/CD Pipelines Work",
    desc: "Explaining automated build and deployment workflows using GitHub Actions.",
  },
  {
    title: "Docker Basics for Developers",
    desc: "Understanding containerization and how Docker simplifies application deployment.",
  },
  {
    title: "My DevOps Learning Path",
    desc: "How I started learning cloud infrastructure and DevOps engineering.",
  },
];

export default function DevOpsNotes() {
  return (
    <section id="notes" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Knowledge Base</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            DevOps <span className="text-gradient">Notes</span> & Learning Journey
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-4 leading-relaxed">
            I document my cloud and DevOps learning journey by writing short technical notes
            and explanations about the tools and systems I work with.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {notes.map((note, i) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <SpotlightCard className="p-6 h-full group cursor-default">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500 mt-0.5">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight flex items-center gap-1.5">
                      {note.title}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{note.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
