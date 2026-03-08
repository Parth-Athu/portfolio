import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.15, y: (e.clientY - cy) * 0.15 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Let's Build Something in the <span className="text-gradient">Cloud</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 glass rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Input placeholder="Name" required className="bg-background/50 border-border/50 focus:border-primary" />
            <Input type="email" placeholder="Email" required className="bg-background/50 border-border/50 focus:border-primary" />
          </div>
          <Textarea placeholder="Your message..." required rows={5} className="bg-background/50 border-border/50 focus:border-primary resize-none" />

          <div className="flex justify-center" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <motion.button
              ref={buttonRef}
              type="submit"
              disabled={sending}
              animate={{ x: offset.x, y: offset.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex h-12 px-8 items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 glow-teal hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
