interface PromptChipListProps {
  label: string;
  prompts: string[];
  onSelect: (prompt: string) => void;
  action?: React.ReactNode;
}

function shortLabel(prompt: string) {
  return prompt.split(" ").slice(0, 5).join(" ") + "…";
}

export function PromptChipList({ label, prompts, onSelect, action }: PromptChipListProps) {
  if (prompts.length === 0) return null;

  return (
    <div className="shrink-0">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {action}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {prompts.map((prompt, i) => (
          <button
            key={`${prompt}-${i}`}
            type="button"
            title={prompt}
            onClick={() => onSelect(prompt)}
            className="max-w-full truncate rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            {shortLabel(prompt)}
          </button>
        ))}
      </div>
    </div>
  );
}
