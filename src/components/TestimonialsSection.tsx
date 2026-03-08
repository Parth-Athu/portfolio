import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Their design work completely transformed our brand. The attention to detail and creative vision is unmatched.",
    name: "Sarah Chen",
    role: "CEO, Nebula Labs",
  },
  {
    quote: "Working with them was a game-changer. They brought ideas to life that we didn't even know we needed.",
    name: "Marcus Rivera",
    role: "Product Lead, Aether",
  },
  {
    quote: "Exceptional talent. Every pixel was placed with intention, and the final result exceeded all expectations.",
    name: "Emily Nakamura",
    role: "Founder, Prism Studio",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            What clients <span className="text-gradient">say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-8 relative group hover:glow-border transition-shadow duration-500"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
