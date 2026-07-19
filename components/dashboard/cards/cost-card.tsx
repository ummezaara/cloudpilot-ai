import { DollarSign } from "lucide-react";

import { CardShell } from "@/components/dashboard/card-shell";
import { EmptyState, SkeletonLines } from "@/components/dashboard/loading-states";
import {
  DEMO_COST_ESTIMATE,
  DEMO_COST_LEVEL,
  DEMO_COST_BREAKDOWN,
  type CostLevel,
} from "@/config/architecture-demo";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";
import { cn } from "@/lib/utils";

const LEVELS: CostLevel[] = ["Low", "Medium", "High"];

const LEVEL_STYLE: Record<CostLevel, string> = {
  Low: "bg-category-storage/15 text-category-storage border-category-storage/30",
  Medium: "bg-category-compute/15 text-category-compute border-category-compute/30",
  High: "bg-category-security/15 text-category-security border-category-security/30",
};

export function CostCard({ status }: { status: GenerationStatus }) {
  return (
    <CardShell icon={DollarSign} title="Cost Estimate">
      {status === "idle" && (
        <EmptyState
          icon={DollarSign}
          message="An estimated monthly cost range will appear here."
        />
      )}
      {status === "loading" && <SkeletonLines count={3} />}
      {status === "success" && (
        <div className="flex h-full flex-col justify-center">
          <p className="font-display text-xl font-semibold text-foreground">
            {DEMO_COST_ESTIMATE}
          </p>
          <div className="mt-3 flex gap-1.5">
            {LEVELS.map((level) => (
              <span
                key={level}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
                  level === DEMO_COST_LEVEL
                    ? LEVEL_STYLE[level]
                    : "border-border text-muted-foreground/50"
                )}
              >
                {level}
              </span>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {DEMO_COST_BREAKDOWN.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono text-foreground/80">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CardShell>
  );
}
