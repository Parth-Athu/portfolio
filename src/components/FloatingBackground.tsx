import { motion } from "framer-motion";
import { Cloud, Container, Server, Database, GitBranch, Cpu } from "lucide-react";

const floatingIcons = [
  { Icon: Cloud, x: "10%", y: "15%", duration: 18, delay: 0 },
  { Icon: Container, x: "80%", y: "25%", duration: 22, delay: 2 },
  { Icon: Server, x: "60%", y: "70%", duration: 20, delay: 4 },
  { Icon: Database, x: "25%", y: "80%", duration: 24, delay: 1 },
  { Icon: GitBranch, x: "90%", y: "60%", duration: 19, delay: 3 },
  { Icon: Cpu, x: "45%", y: "10%", duration: 21, delay: 5 },
  { Icon: Cloud, x: "70%", y: "85%", duration: 23, delay: 6 },
  { Icon: Server, x: "15%", y: "50%", duration: 17, delay: 2 },
];

const glowBlobs = [
  { color: "from-primary/8 to-cyan/5", x: "20%", y: "30%", size: 400, duration: 25 },
  { color: "from-cyan/6 to-primary/4", x: "70%", y: "60%", size: 350, duration: 30 },
  { color: "from-primary/5 to-transparent", x: "50%", y: "80%", size: 300, duration: 28 },
];

export default function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient glow blobs */}
      {glowBlobs.map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className={`absolute rounded-full bg-gradient-to-br ${blob.color} blur-[120px]`}
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating DevOps icons */}
      {floatingIcons.map(({ Icon, x, y, duration, delay }, i) => (
        <motion.div
          key={`icon-${i}`}
          className="absolute text-primary/[0.06]"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 10, -10, 5, 0],
            opacity: [0.04, 0.08, 0.04, 0.06, 0.04],
            rotate: [0, 5, -5, 3, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Small glowing dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
