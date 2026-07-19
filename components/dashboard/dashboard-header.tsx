"use client";

import Link from "next/link";
import { Blocks, FileDown } from "lucide-react";

import { ActionButton } from "@/components/dashboard/action-button";
import { generateArchitecturePdf } from "@/lib/pdf/generate-report";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";

interface DashboardHeaderProps {
  requirement: string;
  status: GenerationStatus;
}

export function DashboardHeader({ requirement, status }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <Blocks className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="truncate font-display text-[15px] font-semibold tracking-tight">
            CloudPilot <span className="text-primary">AI</span>
          </span>
        </Link>

        <ActionButton
          icon={FileDown}
          label="Download PDF"
          onClick={() => generateArchitecturePdf(requirement)}
          disabled={status !== "success"}
        />
      </div>
    </header>
  );
}
