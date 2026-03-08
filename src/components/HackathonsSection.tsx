import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const hackathons = [
  {
    Icon: Users,
    title: "Hackathon Participation",
    desc: "Participated in 2 hackathons focused on technology innovation and team collaboration. Worked in teams to design and build solutions under time constraints.",
    highlights: ["2 Hackathons", "Team Collaboration", "Problem Solving"],
  },
  {
    Icon: Trophy,
    title: "Runner-Up Achievement",
    desc: "Achieved Runner-Up position in a hackathon competition for developing a creative solution with strong teamwork and technical execution.",
    highlights: ["Runner-Up", "Creative Solution", "Technical Excellence"],
  },
];

export default function HackathonsSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Community</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Hackathons & <span className="text-gradient">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {hackathons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <SpotlightCard className="p-6 h-full group hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.25)] transition-all duration-500">
                    <item.Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-display font-bold text-foreground group-hover:text-primary transition-colors text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed text-center mb-4">{item.desc}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {item.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
