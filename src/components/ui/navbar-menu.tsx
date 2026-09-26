"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  onClick,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  const content = (
    <motion.span
      transition={{ duration: 0.2 }}
      className="cursor-pointer text-text-secondary hover:text-text-primary text-xs font-mono font-semibold transition-colors select-none py-1 px-2.5 inline-block"
      onClick={onClick}
    >
      {item}
    </motion.span>
  );

  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      {href ? (
        <a href={href} onClick={onClick}>
          {content}
        </a>
      ) : (
        content
      )}
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.9rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-bg-surface dark:bg-[#131418] backdrop-blur-2xl rounded-2xl overflow-hidden border border-border-custom shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative rounded-full border border-border-custom bg-bg-surface/85 dark:bg-[#131418]/85 backdrop-blur-md shadow-input flex justify-center items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  onClick,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex space-x-3 group/item p-1.5 rounded-xl hover:bg-foreground/5 transition-colors"
    >
      <div className="relative w-[120px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 border border-border-custom bg-black/20">
        <Image
          src={src}
          fill
          alt={title}
          sizes="120px"
          className="object-cover group-hover/item:scale-105 transition-transform duration-300"
        />
      </div>
      <div>
        <h4 className="text-sm font-bold font-display text-text-primary group-hover/item:text-accent transition-colors leading-tight mb-1">
          {title}
        </h4>
        <p className="text-text-secondary text-xs max-w-[12rem] line-clamp-2 leading-relaxed font-sans">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: any) => {
  return (
    <Link
      {...rest}
      className={cn(
        "text-text-secondary hover:text-accent transition-colors text-xs font-mono py-0.5 block",
        className
      )}
    >
      {children}
    </Link>
  );
};

