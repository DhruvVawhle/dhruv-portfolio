"use client"

import CaseStackScroll from "@/components/ui/case-stack-scroll"

export default function Demo() {
  // w-full is load-bearing: flex wrappers shrink width:auto items to their contents.
  return (
    <div className="w-full">
      <CaseStackScroll fontHref={null} />
    </div>
  )
}
