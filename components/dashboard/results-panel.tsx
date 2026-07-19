import { AwsServicesCard } from "@/components/dashboard/cards/aws-services-card";
import { ArchitectureDiagramCard } from "@/components/dashboard/cards/architecture-diagram-card";
import { ExplanationCard } from "@/components/dashboard/cards/explanation-card";
import { CostCard } from "@/components/dashboard/cards/cost-card";
import { TerraformCard } from "@/components/dashboard/cards/terraform-card";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";

/**
 * Widget-style result grid — one markup structure, two layouts:
 * mobile/tablet stack naturally, desktop (1024px+) becomes a 3-row grid —
 * metrics row, full-width diagram row, detail row. Rows size to their
 * content, so the page grows and scrolls naturally after generation. See
 * `.dashboard-grid` in globals.css for the breakpoint definition. The
 * min-h values below are gentle floors so idle/loading placeholders still
 * look like properly sized cards — they don't cap growth.
 */
export function ResultsPanel({ status }: { status: GenerationStatus }) {
  return (
    <div className="dashboard-grid">
      <div className="area-services min-h-[130px]">
        <AwsServicesCard status={status} />
      </div>
      <div className="area-cost min-h-[130px]">
        <CostCard status={status} />
      </div>
      <div className="area-diagram min-h-[180px]">
        <ArchitectureDiagramCard status={status} />
      </div>
      <div className="area-explanation min-h-[170px]">
        <ExplanationCard status={status} />
      </div>
      <div className="area-terraform min-h-[170px]">
        <TerraformCard status={status} />
      </div>
    </div>
  );
}
