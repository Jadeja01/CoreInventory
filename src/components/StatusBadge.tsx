import { cn } from "@/lib/utils";

type StatusType = "draft" | "waiting" | "ready" | "done" | "canceled";

const statusStyles: Record<StatusType, string> = {
  draft: "bg-accent-blue/20 text-accent-blue-foreground",
  waiting: "bg-accent/30 text-accent-foreground",
  ready: "bg-primary/15 text-primary-foreground",
  done: "bg-primary/20 text-primary-foreground",
  canceled: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: StatusType }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize",
      statusStyles[status]
    )}>
      {status}
    </span>
  );
}
