"use client";

import { useEffect } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RequirementPanel } from "@/components/dashboard/requirement-panel";
import { ResultsPanel } from "@/components/dashboard/results-panel";
import { useArchitectureGeneration } from "@/lib/hooks/use-architecture-generation";
import { useArchitectureHistory } from "@/lib/hooks/use-architecture-history";

export default function DashboardPage() {
  const { requirement, setRequirement, status, generate } = useArchitectureGeneration();
  const { history, addEntry, clearHistory } = useArchitectureHistory();

  // Record a successful generation to history once per Generate click.
  useEffect(() => {
    if (status === "success") {
      addEntry(requirement);
    }
    // Only re-run when the generation actually completes, not on every
    // requirement/addEntry identity change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <DashboardHeader requirement={requirement} status={status} />

      <div className="mx-auto grid w-full min-w-0 max-w-[1500px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-3 lg:px-6 lg:py-3">
        <RequirementPanel
          requirement={requirement}
          onRequirementChange={setRequirement}
          status={status}
          onGenerate={generate}
          history={history}
          onClearHistory={clearHistory}
        />
        <ResultsPanel status={status} />
      </div>
    </div>
  );
}
