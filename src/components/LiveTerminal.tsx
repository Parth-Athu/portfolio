import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const commands = [
  { prompt: "parth@cloud:~$", cmd: "docker build -t portfolio .", delay: 60 },
  { prompt: "", cmd: "Sending build context to Docker daemon  4.2MB", delay: 30, isOutput: true },
  { prompt: "", cmd: "Step 1/5 : FROM node:18-alpine", delay: 30, isOutput: true },
  { prompt: "", cmd: "Step 5/5 : CMD [\"node\", \"server.js\"]", delay: 30, isOutput: true },
  { prompt: "", cmd: "✓ Successfully built 3a7f2b1c", delay: 40, isOutput: true, isSuccess: true },
  { prompt: "parth@cloud:~$", cmd: "kubectl apply -f deployment.yml", delay: 50 },
  { prompt: "", cmd: "deployment.apps/portfolio created", delay: 30, isOutput: true, isSuccess: true },
  { prompt: "", cmd: "service/portfolio-svc exposed", delay: 30, isOutput: true, isSuccess: true },
  { prompt: "parth@cloud:~$", cmd: "terraform plan", delay: 50 },
  { prompt: "", cmd: "Plan: 12 to add, 0 to change, 0 to destroy.", delay: 40, isOutput: true },
  { prompt: "", cmd: "✓ Infrastructure deployment complete", delay: 50, isOutput: true, isSuccess: true },
  { prompt: "parth@cloud:~$", cmd: "", delay: 0 },
];

export default function LiveTerminal() {
  const [lines, setLines] = useState<typeof commands>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLine >= commands.length) {
      // Restart after pause
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setIsTyping(true);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const cmd = commands[currentLine];

    if (cmd.isOutput) {
      // Output lines appear instantly
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, cmd]);
        setCurrentLine((prev) => prev + 1);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 300);
      return () => clearTimeout(timeout);
    }

    // Type command character by character
    if (currentChar < cmd.cmd.length) {
      const timeout = setTimeout(() => {
        setCurrentChar((prev) => prev + 1);
      }, cmd.delay || 50);
      return () => clearTimeout(timeout);
    }

    // Command finished typing
    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, cmd]);
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  const currentCmd = currentLine < commands.length ? commands[currentLine] : null;

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 bg-background/80 backdrop-blur-2xl shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-card/80 border-b border-border/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-[10px] text-muted-foreground font-mono ml-2">parth@cloud — bash</span>
      </div>

      {/* Terminal content */}
      <div ref={containerRef} className="p-4 font-mono text-xs leading-relaxed h-[180px] overflow-y-auto scrollbar-hide">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-1 mb-0.5">
            {line.prompt && (
              <span className="text-primary font-semibold shrink-0">{line.prompt}</span>
            )}
            <span className={
              line.isSuccess
                ? "text-green-400"
                : line.isOutput
                ? "text-muted-foreground"
                : "text-foreground"
            }>
              {line.cmd}
            </span>
          </div>
        ))}

        {/* Currently typing line */}
        {currentCmd && !currentCmd.isOutput && (
          <div className="flex gap-1">
            {currentCmd.prompt && (
              <span className="text-primary font-semibold shrink-0">{currentCmd.prompt}</span>
            )}
            <span className="text-foreground">
              {currentCmd.cmd.slice(0, currentChar)}
              <span className="inline-block w-[6px] h-[14px] bg-primary ml-px animate-pulse" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
