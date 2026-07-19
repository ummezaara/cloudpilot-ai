import { Boxes, Server, Zap, Database, HardDrive, Cloud, Waypoints, Network, ShieldCheck, type LucideIcon } from "lucide-react";

import { CardShell } from "@/components/dashboard/card-shell";
import { EmptyState, SkeletonLines } from "@/components/dashboard/loading-states";
import { DASHBOARD_SERVICES } from "@/config/architecture-demo";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";
import { cn } from "@/lib/utils";

const SERVICE_ICON: Record<string, LucideIcon> = {
  EC2: Server,
  Lambda: Zap,
  S3: HardDrive,
  RDS: Database,
  CloudFront: Cloud,
  "API Gateway": Waypoints,
  VPC: Network,
  IAM: ShieldCheck,
};

const CATEGORY_TEXT: Record<string, string> = {
  compute: "text-category-compute border-category-compute/30 bg-category-compute/10",
  network: "text-category-network border-category-network/30 bg-category-network/10",
  storage: "text-category-storage border-category-storage/30 bg-category-storage/10",
  security: "text-category-security border-category-security/30 bg-category-security/10",
};

export function AwsServicesCard({ status }: { status: GenerationStatus }) {
  return (
    <CardShell icon={Boxes} title="AWS Services">
      {status === "idle" && (
        <EmptyState icon={Boxes} message="Recommended AWS services will appear here after generation." />
      )}
      {status === "loading" && <SkeletonLines count={4} />}
      {status === "success" && (
        <div className="grid grid-cols-2 gap-2">
          {DASHBOARD_SERVICES.map((service) => {
            const Icon = SERVICE_ICON[service.name] ?? Boxes;
            return (
              <div
                key={service.name}
                title={service.description}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs",
                  CATEGORY_TEXT[service.category]
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate text-foreground/90">{service.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </CardShell>
  );
}
