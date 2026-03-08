import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, X, Github, ExternalLink, Camera, ZoomIn, ZoomOut } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import hackathonCert from "@/assets/hackathon-certificate.png";

import hackathonGroup from "@/assets/hackathon-group.jpg";
import hackathonTrophies from "@/assets/hackathon-trophies.jpg";
import hackathonTrophy from "@/assets/hackathon-trophy.jpg";
import hackathonCoding from "@/assets/hackathon-coding.jpg";
import hackathonTeam2025 from "@/assets/hackathon-team2025.jpg";
import hackathon2026_1 from "@/assets/hackathon2026-1.jpg";
import hackathon2026_2 from "@/assets/hackathon2026-2.jpg";
import hackathon2026_3 from "@/assets/hackathon2026-3.jpg";
import hackathon2026_4 from "@/assets/hackathon2026-4.jpg";
import hackathon2026_5 from "@/assets/hackathon2026-5.jpg";
import hackathon2026_6 from "@/assets/hackathon2026-6.jpg";

const photos2025 = [
  { src: hackathonTrophies, alt: "1st Runner-Up trophies" },
  { src: hackathonCoding, alt: "Team during hackathon" },
  { src: hackathonGroup, alt: "Team at JG University" },
  { src: hackathonTrophy, alt: "JG University trophy" },
  { src: hackathonTeam2025, alt: "Team at JG University" },
];

const photos2026 = [
  { src: hackathon2026_1, alt: "Team presenting project" },
  { src: hackathon2026_2, alt: "Project presentation" },
  { src: hackathon2026_3, alt: "Demo showcase" },
  { src: hackathon2026_4, alt: "Menu page demo" },
  { src: hackathon2026_5, alt: "Project on screen" },
  { src: hackathon2026_6, alt: "Laptop with project" },
];

const hackathons = [
  {
    Icon: Trophy,
    title: "1st Runner-Up – Hackathon 2025",
    desc: "Secured 1st Runner-Up position in Hackathon 2025, an Inter-School Innovation and Coding Competition organized by JG University, School of Computing. Built a Tribal Art Marketplace web app.",
    highlights: ["1st Runner-Up", "JG University", "Innovation & Coding"],
    certificate: hackathonCert,
    liveUrl: "https://v0-tribal-art-marketplace.vercel.app",
    repoUrl: "https://github.com/Parth-Athu/Techify-Hackathon-DesiRoots",
    projectName: "DesiRoots – Tribal Art Marketplace",
  },
  {
    Icon: Users,
    title: "Hackathon 2026 Participant",
    desc: "Participating in Hackathon 2026, continuing to build innovative solutions and strengthen problem-solving skills through competitive coding challenges.",
    highlights: ["2026 Participant", "Team Collaboration", "Problem Solving"],
    certificate: null,
    liveUrl: null,
    repoUrl: null,
    projectName: null,
  },
];

export default function HackathonsSection() {
  const [viewCert, setViewCert] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const handleClose = useCallback(() => {
    setViewCert(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.5, 4)), []);
  const handleZoomOut = useCallback(() => {
    setZoom((z) => {
      const newZoom = Math.max(z - 0.5, 1);
      if (newZoom === 1) setPan({ x: 0, y: 0 });
      return newZoom;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY < 0) {
      setZoom((z) => Math.min(z + 0.25, 4));
    } else {
      setZoom((z) => {
        const newZoom = Math.max(z - 0.25, 1);
        if (newZoom === 1) setPan({ x: 0, y: 0 });
        return newZoom;
      });
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = { ...pan };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [zoom, pan]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (!viewCert) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [viewCert, handleClose]);

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
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Community</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">
            Hackathons & <span className="text-gradient">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {hackathons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <SpotlightCard className="p-6 h-full group hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-500">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_hsl(var(--primary)/0.25)] transition-all duration-500">
                    <item.Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-display font-bold text-foreground group-hover:text-primary transition-colors text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed text-center mb-4">{item.desc}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {item.highlights.map((h) => (
                    <span key={h} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                      {h}
                    </span>
                  ))}
                </div>
                {(item.liveUrl || item.repoUrl || item.certificate) && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                        <ExternalLink className="w-3 h-3" />Live Demo
                      </a>
                    )}
                    {item.repoUrl && (
                      <a href={item.repoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                        <Github className="w-3 h-3" />GitHub
                      </a>
                    )}
                    {item.certificate && (
                      <button onClick={() => setViewCert(item.certificate)}
                        className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                        <Trophy className="w-3 h-3" />Certificate
                      </button>
                    )}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <SpotlightCard className="p-6">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Camera className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Hackathon 2025 Memories</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {photos2025.map((photo, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewCert(photo.src)}
                  className="overflow-hidden rounded-xl aspect-square cursor-pointer"
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:brightness-110 transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Hackathon 2026 Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-4xl mx-auto"
        >
          <SpotlightCard className="p-6">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Camera className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Hackathon 2026 Memories</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos2026.map((photo, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewCert(photo.src)}
                  className="overflow-hidden rounded-xl aspect-square cursor-pointer"
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:brightness-110 transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {viewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[800px] rounded-2xl border border-border bg-card overflow-hidden shadow-[0_0_80px_hsl(var(--primary)/0.1)] relative"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-card/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
              <div className="p-4">
                <img
                  src={viewCert}
                  alt="Hackathon Certificate"
                  className="w-full h-auto rounded-xl object-contain max-h-[70vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
