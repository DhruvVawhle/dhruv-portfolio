"use client";

import dynamic from "next/dynamic";

const CubertoCursor = dynamic(() => import("@/components/effects/CubertoCursor"), {
  ssr: false,
});

export default function ClientEffects() {
  return <CubertoCursor />;
}
