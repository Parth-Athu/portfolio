import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  { id: "user", label: "Users", x: 60, y: 55, tech: "Web & Mobile Clients", color: "#f59e0b" },
  { id: "cdn", label: "CDN", x: 170, y: 55, tech: "CloudFront / Edge Cache", color: "#06b6d4" },
  { id: "lb", label: "Load Balancer", x: 290, y: 55, tech: "Nginx / ALB — Round Robin", color: "#14b8a6" },
  { id: "ec2a", label: "EC2 (A)", x: 410, y: 25, tech: "Flask API — Auto-scaling Group", color: "#8b5cf6" },
  { id: "ec2b", label: "EC2 (B)", x: 410, y: 85, tech: "Flask API — Replica Instance", color: "#8b5cf6" },
  { id: "db", label: "Database", x: 540, y: 55, tech: "MySQL / RDS — Multi-AZ", color: "#f43f5e" },
];

const connections = [
  { from: "user", to: "cdn" },
  { from: "cdn", to: "lb" },
  { from: "lb", to: "ec2a" },
  { from: "lb", to: "ec2b" },
  { from: "ec2a", to: "db" },
  { from: "ec2b", to: "db" },
];

export default function CloudArchitecture() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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
          className="glass p-8 md:p-10 max-w-3xl mx-auto overflow-x-auto"
        >
          <svg viewBox="0 0 620 120" className="w-full h-auto min-w-[500px]">
            <defs>
              {nodes.map((node) => (
                <filter key={`glow-${node.id}`} id={`glow-${node.id}`}>
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = nodes.find((n) => n.id === conn.from)!;
              const to = nodes.find((n) => n.id === conn.to)!;
              const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;
              return (
                <g key={i}>
                  <line
                    x1={from.x + 45}
                    y1={from.y}
                    x2={to.x - 45}
                    y2={to.y}
                    stroke={isHighlighted ? "#14b8a6" : "#14b8a640"}
                    strokeWidth={isHighlighted ? 1.5 : 1}
                    strokeDasharray={isHighlighted ? "none" : "4,4"}
                    style={{ transition: "all 0.3s" }}
                  />
                  <circle r={isHighlighted ? 4 : 3} fill="#14b8a6" opacity={isHighlighted ? 1 : 0.6}>
                    <animateMotion
                      dur={`${1.5 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={`M${from.x + 45},${from.y} L${to.x - 45},${to.y}`}
                    />
                  </circle>
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: "pointer" }}
                  filter={isHovered ? `url(#glow-${node.id})` : undefined}
                >
                  <rect
                    x={node.x - 42}
                    y={node.y - 17}
                    width="84"
                    height="34"
                    rx="8"
                    fill={isHovered ? `${node.color}20` : `${node.color}10`}
                    stroke={isHovered ? node.color : `${node.color}40`}
                    strokeWidth={isHovered ? 1.5 : 1}
                    style={{ transition: "all 0.3s" }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={isHovered ? node.color : "#94a3b8"}
                    fontSize="8"
                    fontFamily="'Space Grotesk', monospace"
                    fontWeight="700"
                    style={{ transition: "fill 0.3s" }}
                  >
                    {node.label}
                  </text>

                  {/* Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={node.x - 55}
                        y={node.y - 40}
                        width="110"
                        height="20"
                        rx="4"
                        fill="#0a0a0a"
                        stroke={`${node.color}60`}
                        strokeWidth="0.5"
                      />
                      <text
                        x={node.x}
                        y={node.y - 26}
                        textAnchor="middle"
                        fill={node.color}
                        fontSize="6.5"
                        fontFamily="'Inter', sans-serif"
                        fontWeight="500"
                      >
                        {node.tech}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          <p className="text-xs text-muted-foreground text-center mt-6">
            <span className="text-primary font-medium">AWS Cloud Architecture</span> — Auto-scaling EC2 with CDN, Load Balancing & Multi-AZ RDS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
