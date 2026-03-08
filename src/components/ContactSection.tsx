import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Copy, Check, ExternalLink } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const contactInfo = [
  { Icon: Mail, label: "Email", value: "parthathu5@gmail.com", href: "mailto:parthathu5@gmail.com", copyable: true },
  { Icon: Phone, label: "Phone", value: "+91 9909023108", href: "tel:+919909023108", copyable: true },
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

      <div className="container mx-auto px-6 max-w-3xl">
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
          <p className="text-sm text-muted-foreground max-w-md mx-auto mt-4 leading-relaxed">
            Open to opportunities in Cloud & DevOps engineering. Feel free to reach out!
          </p>
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
              whileHover={{ scale: 1.03, y: -4 }}
              className="block"
            >
              <SpotlightCard className="p-6 text-center group h-full hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.25)] transition-all duration-500">
                    <item.Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">{item.label}</p>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-words leading-relaxed">
                  {item.value}
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {item.copyable && (
                    <button
                      onClick={(e) => handleCopy(e, item.value)}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                      aria-label={`Copy ${item.label}`}
                    >
                      {copied === item.value ? (
                        <>
                          <Check className="w-3 h-3 text-primary" />
                          <span className="text-primary">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                  {item.label === "LinkedIn" && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ExternalLink className="w-3 h-3" />
                      Open Profile
                    </span>
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
