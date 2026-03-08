import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

function MagneticIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border">
      {/* System Status Bar */}
      <div className="border-b border-border/50 bg-card/30">
        <div className="container mx-auto px-6 py-3 flex items-center justify-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-xs text-muted-foreground font-medium">All Systems Operational</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}, Built by{" "}
          <span className="text-primary font-medium">Parth Athu</span>
        </p>
        <div className="flex items-center gap-2">
          <MagneticIcon href="https://www.linkedin.com/in/parth-athu" label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </MagneticIcon>
        </div>
      </div>
    </footer>
  );
}
