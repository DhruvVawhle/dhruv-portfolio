import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-10",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-bg-surface border border-border-custom",
        paddings[padding],
        hover &&
          "transition-all duration-300 hover:border-accent/20 hover:bg-bg-surface-hover card-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
