"use client";

import { Loader2, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/dashboard/copy-button";
import { PromptChipList } from "@/components/dashboard/prompt-chip-list";
import { EXAMPLE_PROMPTS } from "@/config/architecture-demo";
import type { GenerationStatus } from "@/lib/hooks/use-architecture-generation";
import type { HistoryEntry } from "@/lib/hooks/use-architecture-history";

interface RequirementPanelProps {
  requirement: string;
  onRequirementChange: (value: string) => void;
  status: GenerationStatus;
  onGenerate: () => void;
  history: HistoryEntry[];
  onClearHistory: () => void;
}

export function RequirementPanel({
  requirement,
  onRequirementChange,
  status,
  onGenerate,
  history,
  onClearHistory,
}: RequirementPanelProps) {
  return (
    <div className="flex min-w-0 flex-col rounded-xl border border-border bg-card p-4 lg:sticky lg:top-20 lg:self-start">
      <h2 className="text-sm font-medium text-foreground">Describe your application</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Include expected traffic, data needs, and any constraints.
      </p>

      <textarea
        value={requirement}
        onChange={(e) => onRequirementChange(e.target.value)}
        placeholder="e.g. A SaaS app with user auth, a Postgres database, file uploads, and a public REST API that needs to handle traffic spikes."
        className="mt-3 h-24 w-full resize-none rounded-lg border border-border bg-background/60 p-3 font-mono text-[13px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
      />

      <div className="mt-2 flex justify-end">
        <CopyButton value={requirement} label="Copy Prompt" />
      </div>

      <Button
        size="lg"
        onClick={onGenerate}
        disabled={!requirement.trim() || status === "loading"}
        className="mt-3 h-12 w-full text-[15px]"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Architecture
          </>
        )}
      </Button>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4">
        <PromptChipList label="Examples" prompts={EXAMPLE_PROMPTS} onSelect={onRequirementChange} />

        <PromptChipList
          label="Recent"
          prompts={history.map((entry) => entry.requirement)}
          onSelect={onRequirementChange}
          action={
            history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )
          }
        />
      </div>
    </div>
  );
}
