import { Network } from "lucide-react";

import { CardShell } from "@/components/dashboard/card-shell";
import { EmptyState, SkeletonBlock } from "@/components/dashboard/loading-states";
import { ArchitectureDiagram } from "@/components/shared/architecture-diagram";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";

export function ArchitectureDiagramCard({ status }: { status: GenerationStatus }) {
  return (
    <CardShell icon={Network} title="Architecture Diagram">
      {status === "idle" && (
        <EmptyState
          icon={Network}
          message="Your architecture diagram will render here once generated."
        />
      )}
      {status === "loading" && <SkeletonBlock className="h-[clamp(450px,55vh,600px)]" />}
      {status === "success" && (
        <div className="h-[clamp(450px,55vh,600px)]">
          <ArchitectureDiagram />
        </div>
      )}
    </CardShell>
  );
}
