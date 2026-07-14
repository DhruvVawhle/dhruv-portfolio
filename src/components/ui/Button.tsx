import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  download?: boolean | string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent-hover shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.45)] hover:-translate-y-0.5",
      secondary:
        "bg-bg-surface text-text-primary border border-border-custom hover:border-accent hover:text-accent shadow-sm hover:shadow hover:-translate-y-0.5",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover",
    };

    const sizes = {
      sm: "px-4 py-2 text-[15px] sm:text-xs min-h-[48px] sm:min-h-[36px] sm:h-9",
      md: "px-6 py-3 text-[15px] sm:text-base min-h-[48px] sm:min-h-[50px] sm:h-12",
      lg: "px-8 py-4 text-base sm:text-lg font-bold min-h-[54px] sm:min-h-[56px] sm:h-14",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          {...(props as any)}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
