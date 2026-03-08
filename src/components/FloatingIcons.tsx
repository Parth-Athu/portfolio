import { motion } from "framer-motion";
import { Cloud, Container, Shield, GitBranch, RefreshCw } from "lucide-react";

const icons = [
  { name: "AWS", color: "hsl(var(--primary))", Icon: Cloud },
  { name: "Docker", color: "#2496ED", Icon: Container },
  { name: "Kubernetes", color: "#326CE5", Icon: Shield },
  { name: "Git", color: "#F05032", Icon: GitBranch },
  { name: "CI/CD", color: "hsl(var(--glow-cyan))", Icon: RefreshCw },
];

export default function FloatingIcons() {
  const radius = 130;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Glow backdrop */}
      <div className="absolute w-[250px] h-[250px] rounded-full bg-primary/8 blur-[100px]" />

      {/* Center sphere */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent backdrop-blur-sm shadow-[0_0_60px_hsl(var(--primary)/0.2)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-primary/20 shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-primary/8"
        style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}
      />

      {/* Orbiting icons */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={icon.name}
              className="absolute flex flex-col items-center gap-1.5"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-12 h-12 rounded-xl border border-border/40 bg-card/70 backdrop-blur-sm flex items-center justify-center shadow-md">
                <icon.Icon className="w-5 h-5" style={{ color: icon.color }} />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                {icon.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
