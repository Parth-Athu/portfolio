import { motion } from "framer-motion";

const icons = [
  { name: "AWS", color: "#FF9900", symbol: "☁️" },
  { name: "Docker", color: "#2496ED", symbol: "🐳" },
  { name: "Kubernetes", color: "#326CE5", symbol: "⎈" },
  { name: "Linux", color: "#FCC624", symbol: "🐧" },
  { name: "Git", color: "#F05032", symbol: "" },
  { name: "Terraform", color: "#7B42BC", symbol: "⬡" },
  { name: "CI/CD", color: "#06B6D4", symbol: "⟳" },
];

export default function FloatingIcons() {
  const radius = 140;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Glow backdrop */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
      <div className="absolute w-[200px] h-[200px] rounded-full bg-cyan/5 blur-[60px]" />

      {/* Center sphere */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border border-primary/30 bg-gradient-to-br from-primary/20 to-transparent backdrop-blur-sm shadow-[0_0_40px_hsl(var(--primary)/0.3)]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-primary/10"
        style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
      />

      {/* Orbiting icons */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={icon.name}
              className="absolute flex flex-col items-center gap-1"
              style={{
                left: `calc(50% + ${x}px - 28px)`,
                top: `calc(50% + ${y}px - 28px)`,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-14 h-14 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform duration-300"
                style={{
                  boxShadow: `0 0 20px ${icon.color}20, 0 4px 12px rgba(0,0,0,0.3)`,
                }}
              >
                <span style={{ color: icon.color }}>{icon.symbol}</span>
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
