import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Copy, Check } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const contactInfo = [
  { Icon: Mail, label: "Email", value: "parthathu5@gmail.com", href: "mailto:parthathu5@gmail.com", copyable: true },
  { Icon: Phone, label: "Phone", value: "9909023108", href: "tel:9909023108", copyable: true },
  { Icon: Linkedin, label: "LinkedIn", value: "parth-athu", href: "https://www.linkedin.com/in/parth-athu", copyable: false },
];

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
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
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === "LinkedIn" ? "_blank" : undefined}
              rel={item.label === "LinkedIn" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="block"
            >
              <SpotlightCard className="p-6 text-center group h-full min-w-[220px]">
                <div className="flex justify-center mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-500">
                    <item.Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors overflow-wrap-anywhere break-all">
                    {item.value}
                  </p>
                  {item.copyable && (
                    <button
                      onClick={(e) => handleCopy(e, item.value)}
                      className="shrink-0 p-1 rounded-md hover:bg-primary/10 transition-colors"
                      aria-label={`Copy ${item.label}`}
                    >
                      {copied === item.value ? (
                        <Check className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
