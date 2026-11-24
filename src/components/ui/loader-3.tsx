"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type Loader3Props = HTMLAttributes<HTMLDivElement>;

export const Component = ({ className, ...props }: Loader3Props) => {
  return (
    <div className={cn("loader", className)} {...props}>
      <div className="box box0">
        <div></div>
      </div>
      <div className="box box1">
        <div></div>
      </div>
      <div className="box box2">
        <div></div>
      </div>
      <div className="box box3">
        <div></div>
      </div>
      <div className="box box4">
        <div></div>
      </div>
      <div className="box box5">
        <div></div>
      </div>
      <div className="box box6">
        <div></div>
      </div>
      <div className="box box7">
        <div></div>
      </div>
      <div className="ground">
        <div></div>
      </div>
    </div>
  );
};

export const Loader3 = Component;
export default Component;
