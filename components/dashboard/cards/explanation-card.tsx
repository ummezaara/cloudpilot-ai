import { FileText, CheckCircle2 } from "lucide-react";

import { CardShell } from "@/components/dashboard/card-shell";
import { EmptyState, SkeletonLines } from "@/components/dashboard/loading-states";
import { REASONING_POINTS } from "@/config/architecture-demo";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";

export function ExplanationCard({ status }: { status: GenerationStatus }) {
  return (
    <CardShell icon={FileText} title="Explanation">
      {status === "idle" && (
        <EmptyState
          icon={FileText}
          message="The reasoning behind each service choice will appear here."
        />
      )}
      {status === "loading" && <SkeletonLines count={4} />}
      {status === "success" && (
        <ul className="space-y-2.5 pr-1">
          {REASONING_POINTS.map((point) => (
            <li key={point} className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-category-storage" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </CardShell>
  );
}
