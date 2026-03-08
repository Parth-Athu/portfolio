import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const certifications = [
  {
    title: "Gemini Certification for Students (K12)",
    issuer: "Google",
  },
  {
    title: "Amazon DevOps Guru – Getting Started",
    issuer: "Amazon Web Services",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Credentials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            <span className="text-gradient">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <SpotlightCard className="p-6 h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
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
