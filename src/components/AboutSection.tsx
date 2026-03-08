import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Globe, Server, Zap } from "lucide-react";
import parthPhoto from "@/assets/parth-photo.png";

const techStack = [
  "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Git",
  "Linux", "Python", "Flask", "Nginx", "Monitoring", "Automation",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-center mb-16"
        >
          About Me
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Card 1: Intro - spans 1 col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="glass p-6 space-y-3"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Hi there, I'm <span className="text-primary">Parth</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I specialize in cloud infrastructure, building scalable and automated systems. With a strong foundation in AWS, Docker, and Kubernetes, I focus on creating reliable deployments optimized for performance and scalability.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              My experience extends to CI/CD pipelines, Infrastructure as Code, and monitoring solutions that ensure smooth operations.
            </p>
          </motion.div>

          {/* Card 2: Photo - center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass p-6 flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 mb-4">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-md" />
              <img
                src={parthPhoto}
                alt="Parth"
                className="relative w-full h-full rounded-full object-cover border-2 border-primary/20"
              />
            </div>
            <p className="text-sm font-semibold text-foreground">Parth</p>
            <p className="text-xs text-primary">Cloud & DevOps Engineer</p>
          </motion.div>

          {/* Card 3: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="glass p-6 space-y-3"
          >
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tech Stack</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I specialize in a diverse range of cloud and DevOps tools. With strong command of AWS, Docker, and Kubernetes, I build maintainable infrastructure that enhances engineering productivity.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStack.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Flexible */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass p-6 space-y-3 md:col-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Cloud Native
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fluent in designing cloud-native architectures using microservices, containers, and serverless patterns. I build systems that scale globally.
            </p>
          </motion.div>

          {/* Card 5: Passion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass p-6 space-y-3 md:col-span-2"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Passion for Automation
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Solving problems and scaling infrastructure through code. Automation is my obsession — it's what drives me to build CI/CD pipelines, Infrastructure as Code, and monitoring systems that eliminate manual work and enhance reliability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
