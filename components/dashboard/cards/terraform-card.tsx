import { FileCode2 } from "lucide-react";

import { CardShell } from "@/components/dashboard/card-shell";
import { EmptyState, SkeletonBlock } from "@/components/dashboard/loading-states";
import { CopyButton } from "@/components/dashboard/copy-button";
import { DownloadButton } from "@/components/dashboard/download-button";
import { DEMO_TERRAFORM } from "@/config/architecture-demo";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";

export function TerraformCard({ status }: { status: GenerationStatus }) {
  const isSuccess = status === "success";

  return (
    <CardShell
      icon={FileCode2}
      title="Terraform Preview"
      action={
        isSuccess && (
          <div className="flex items-center gap-2">
            <CopyButton value={DEMO_TERRAFORM} label="Copy" />
            <DownloadButton
              getContent={() => DEMO_TERRAFORM}
              filename="main.tf"
              label="Download"
            />
          </div>
        )
      }
    >
      {status === "idle" && (
        <EmptyState
          icon={FileCode2}
          message="A ready-to-use Terraform starter template will appear here."
        />
      )}
      {status === "loading" && <SkeletonBlock />}
      {isSuccess && (
        <pre className="overflow-x-auto rounded-lg border border-border bg-background/60 p-3.5 font-mono text-[11.5px] leading-relaxed text-foreground/80">
          {DEMO_TERRAFORM}
        </pre>
      )}
    </CardShell>
  );
}
