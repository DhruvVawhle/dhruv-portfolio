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
        "group relative inline-flex items-center justify-center min-w-[136px] h-9 cursor-pointer overflow-hidden rounded-full border border-border-custom bg-bg-surface px-4 text-center text-xs font-semibold text-text-primary transition-all duration-300 hover:border-accent/60 shadow-2xs hover:text-white",
        className,
      )}
      {...props}
    >
      {/* Background Accent Fill on Hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-accent translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-0 pointer-events-none"
      />

      {/* Single Text & Icon Node (never duplicated) */}
      <span className="relative z-10 inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-0.5 whitespace-nowrap">
        <span>{content}</span>
        {icon || (
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
        )}
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };

