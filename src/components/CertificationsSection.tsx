import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const certifications = [
  {
    title: "Gemini Certification for Students (K12)",
    issuer: "Google",
    date: "January 26, 2026",
    validThrough: "January 26, 2029",
    image: "/certificates/gemini-certified-student-k12.png",
  },
  {
    title: "Amazon DevOps Guru – Getting Started",
    issuer: "Amazon Web Services",
    date: "February 08, 2026",
    image: "/certificates/amazon-devops-guru-getting-started.png",
  },
];

export default function CertificationsSection() {
  const [selected, setSelected] = useState<(typeof certifications)[0] | null>(null);

  const handleClose = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [selected, handleClose]);

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
              <button onClick={() => setSelected(cert)} className="w-full text-left">
                <SpotlightCard className="p-6 h-full group cursor-pointer hover:border-primary/30 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                      <p className="text-[11px] text-muted-foreground/80 mt-1">Completed: {cert.date}</p>
                      {cert.validThrough && (
                        <p className="text-[11px] text-muted-foreground/70 mt-0.5">Valid Through: {cert.validThrough}</p>
                      )}
                      <p className="text-[10px] text-primary/60 mt-2 font-medium">Click to view certificate</p>
                    </div>
                  </div>
                </SpotlightCard>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[800px] rounded-2xl border border-border bg-card overflow-hidden shadow-[0_0_80px_hsl(var(--primary)/0.1)] relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="p-4">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-auto rounded-xl object-contain max-h-[60vh]"
                />
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-foreground">{selected.title}</h3>
                    <p className="text-xs text-muted-foreground">{selected.issuer}</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-1">Completed: {selected.date}</p>
                    {selected.validThrough && (
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5">Valid Through: {selected.validThrough}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
