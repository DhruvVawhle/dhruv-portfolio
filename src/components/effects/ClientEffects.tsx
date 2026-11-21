"use client";

import dynamic from "next/dynamic";
import PortfolioLoadingScreen from "@/components/ui/PortfolioLoadingScreen";

const CubertoCursor = dynamic(() => import("@/components/effects/CubertoCursor"), {
  ssr: false,
});

export default function ClientEffects() {
  return (
    <>
      <PortfolioLoadingScreen />
      <CubertoCursor />
    </>
  );
}
