import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SpotlightCard from "../common/SpotlightCard";

export default function LookingForSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SpotlightCard className="p-8 md:p-10 text-center group">
            <div className="flex justify-center mb-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-500">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4">
              What I'm <span className="text-gradient">Looking For</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
              I am currently seeking internship or entry-level opportunities in{" "}
              <span className="text-primary font-medium">Cloud Engineering</span>,{" "}
              <span className="text-primary font-medium">DevOps</span>, or{" "}
              <span className="text-primary font-medium">Site Reliability Engineering</span>{" "}
              where I can contribute, learn, and grow while building scalable cloud systems.
            </p>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
