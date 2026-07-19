"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Cloud,
  ShieldCheck,
  Waypoints,
  Server,
  Database,
  Zap,
  Layers,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DIAGRAM_NODES,
  DIAGRAM_EDGES,
  type ServiceCategory,
  type DiagramIconKey,
} from "@/config/architecture-demo";

const ICON_MAP: Record<DiagramIconKey, LucideIcon> = {
  globe: Globe,
  cloud: Cloud,
  shield: ShieldCheck,
  waypoints: Waypoints,
  server: Server,
  database: Database,
  zap: Zap,
  layers: Layers,
};

const CATEGORY_TEXT: Record<ServiceCategory, string> = {
  compute: "text-category-compute border-category-compute/40 bg-category-compute/10",
  network: "text-category-network border-category-network/40 bg-category-network/10",
  storage: "text-category-storage border-category-storage/40 bg-category-storage/10",
  security: "text-category-security border-category-security/40 bg-category-security/10",
};

const CATEGORY_STROKE: Record<ServiceCategory, string> = {
  compute: "hsl(var(--category-compute))",
  network: "hsl(var(--category-network))",
  storage: "hsl(var(--category-storage))",
  security: "hsl(var(--category-security))",
};

function findNode(id: string) {
  return DIAGRAM_NODES.find((n) => n.id === id)!;
}

interface ArchitectureDiagramProps {
  className?: string;
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={cn(
        "relative h-full min-h-[140px] w-full min-w-0 select-none overflow-hidden",
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-hidden"
      >
        {DIAGRAM_EDGES.map((edge, i) => {
          const from = findNode(edge.from);
          const to = findNode(edge.to);
          return (
            <motion.line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={CATEGORY_STROKE[to.category]}
              strokeOpacity={0.55}
              strokeWidth={0.4}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={mounted ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i, ease: "easeOut" }}
            />
          );
        })}
      </svg>

      {DIAGRAM_NODES.map((node, i) => {
        const Icon = ICON_MAP[node.iconKey];
        return (
          <motion.div
            key={node.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.12 * i + 0.2, ease: "easeOut" }}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg border shadow-sm backdrop-blur-sm sm:h-10 sm:w-10",
                CATEGORY_TEXT[node.category]
              )}
            >
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
            </div>
            <span className="whitespace-nowrap font-mono text-[9px] text-muted-foreground">
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
