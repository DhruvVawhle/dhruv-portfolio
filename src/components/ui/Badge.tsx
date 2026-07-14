import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "copyright";
  icon?: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  icon,
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-bg-surface text-text-secondary border border-border-custom shadow-2xs",
    accent:
      "bg-accent-soft text-accent border border-accent/20 shadow-2xs",
    outline:
      "bg-transparent text-text-secondary border border-border-custom hover:border-accent/40 hover:text-accent transition-colors",
    copyright:
      "bg-accent-soft text-accent border border-accent/30 shadow-[0_0_12px_rgba(59,130,246,0.1)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium whitespace-nowrap min-h-[28px]",
        variants[variant],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
