import { motion } from "framer-motion";

const nodes = [
  { id: "user", label: "User", x: 50, y: 50 },
  { id: "lb", label: "Load Balancer", x: 200, y: 50 },
  { id: "ec2a", label: "EC2 Instance A", x: 380, y: 20 },
  { id: "ec2b", label: "EC2 Instance B", x: 380, y: 80 },
  { id: "db", label: "RDS Database", x: 550, y: 50 },
];

const connections = [
  { from: "user", to: "lb" },
  { from: "lb", to: "ec2a" },
  { from: "lb", to: "ec2b" },
  { from: "ec2a", to: "db" },
  { from: "ec2b", to: "db" },
];

export default function CloudArchitecture() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Architecture</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Cloud <span className="text-gradient">Infrastructure</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-8 max-w-3xl mx-auto overflow-hidden"
        >
          <svg viewBox="0 0 620 110" className="w-full h-auto">
            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = nodes.find((n) => n.id === conn.from)!;
              const to = nodes.find((n) => n.id === conn.to)!;
              return (
                <g key={i}>
                  <line
                    x1={from.x + 40}
                    y1={from.y}
                    x2={to.x - 40}
                    y2={to.y}
                    stroke="hsl(168, 80%, 50%)"
                    strokeWidth="1"
                    opacity={0.3}
                  />
                  {/* Animated data particle */}
                  <circle r="3" fill="#14b8a6" opacity="0.8">
                    <animateMotion
                      dur={`${2 + i * 0.5}s`}
                      repeatCount="indefinite"
                      path={`M${from.x + 40},${from.y} L${to.x - 40},${to.y}`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node, i) => (
              <g key={node.id}>
                <rect
                  x={node.x - 40}
                  y={node.y - 16}
                  width="80"
                  height="32"
                  rx="8"
                  fill="rgba(20, 184, 166, 0.1)"
                  stroke="rgba(20, 184, 166, 0.3)"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="stroke-opacity"
                    values="0.3;0.7;0.3"
                    dur="3s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </rect>
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="#2dd4bf"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-xs text-muted-foreground text-center mt-4">
            AWS Cloud Architecture — Auto-scaling EC2 instances with RDS backend
          </p>
        </motion.div>
      </div>
    </section>
  );
}
