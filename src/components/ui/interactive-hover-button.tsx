import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text, children, icon, className, ...props }, ref) => {
  const content = text || children || "Button";

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center min-w-[136px] h-9 cursor-pointer overflow-hidden rounded-full border border-border-custom bg-bg-surface px-4 text-center text-xs font-semibold text-text-primary transition-all duration-300 hover:border-accent/40 shadow-2xs",
        className,
      )}
      {...props}
    >
      {/* Default State */}
      <span className="inline-flex items-center gap-1.5 translate-x-1.5 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 whitespace-nowrap">
        <span>{content}</span>
      </span>

      {/* Hover State: Revealed as the circle expands (hidden from screen readers to prevent duplicate text) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1.5 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap px-3 pointer-events-none"
      >
        <span>{content}</span>
        {icon || <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />}
      </div>

      {/* Expanding Ripple Circle */}
      <div
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent transition-all duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:translate-y-0 group-hover:h-full group-hover:w-full group-hover:rounded-none z-0 pointer-events-none"
      />
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

