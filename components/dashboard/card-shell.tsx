import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardShellProps {
  icon: LucideIcon;
  title: string;
  action?: React.ReactNode;
  className?: string;
  /** Applied to the inner content wrapper — use to give a specific card
   *  (e.g. the diagram) an explicit height. Omit to let content size naturally. */
  contentClassName?: string;
  children: React.ReactNode;
}

export function CardShell({
  icon: Icon,
  title,
  action,
  className,
  contentClassName,
  children,
}: CardShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-[120px] min-w-0 flex-col rounded-xl border border-border bg-card p-4",
        className
      )}
    >
      <div className="mb-3 flex min-w-0 shrink-0 items-center justify-between gap-2 border-b border-border pb-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
          <h3 className="truncate text-sm font-medium tracking-tight text-foreground">
            {title}
          </h3>
        </div>
        {action}
      </div>
      <div className={cn("min-w-0", contentClassName)}>{children}</div>
    </div>
  );
}
