import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  message,
}: {
  icon: LucideIcon;
  message: string;
}) {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6 text-center">
      <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
      <p className="max-w-[220px] text-xs leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  );
}

export function SkeletonLines({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("flex min-h-[140px] flex-col justify-center gap-2.5", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded bg-secondary"
          style={{ width: `${85 - i * 12}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("min-h-[140px] animate-pulse rounded-lg bg-secondary", className)} />;
}
