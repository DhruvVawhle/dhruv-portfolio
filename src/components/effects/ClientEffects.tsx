"use client";

import dynamic from "next/dynamic";

const CubertoCursor = dynamic(() => import("@/components/effects/CubertoCursor"), {
  ssr: false,
});
const LoadingSequence = dynamic(() => import("@/components/effects/LoadingSequence"), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <LoadingSequence />
      <CubertoCursor />
    </>
  );
}
