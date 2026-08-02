"use client";

import React, { useState } from "react";

export interface FolderNode {
  name: string;
  type: "folder" | "file";
  children?: FolderNode[];
}

interface FolderTreeProps {
  data: FolderNode[];
}

export default function FolderTree({ data }: FolderTreeProps) {
  return (
    <div className="font-mono text-xs sm:text-sm text-gray-300 bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 select-none">
      <ul className="space-y-1.5">
        {data.map((node, index) => (
          <TreeNode key={`${node.name}-${index}`} node={node} />
        ))}
      </ul>
    </div>
  );
}

function TreeNode({ node }: { node: FolderNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.type === "folder" && node.children && node.children.length > 0;

  const toggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <li>
      <div
        onClick={toggle}
        onKeyDown={handleKeyDown}
        tabIndex={hasChildren ? 0 : -1}
        role={hasChildren ? "button" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-colors ${
          hasChildren ? "hover:bg-white/[0.04] cursor-pointer focus-visible:outline-2 focus-visible:outline-accent" : "text-gray-400"
        }`}
      >
        <span>
          {node.type === "folder" ? (
            isOpen ? "📂" : "📁"
          ) : (
            "📄"
          )}
        </span>
        <span className={node.type === "folder" ? "font-semibold text-white" : ""}>
          {node.name}
        </span>
        {hasChildren && (
          <span className="text-[10px] text-gray-500 ml-auto">
            {isOpen ? "collapse" : "expand"}
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <ul className="pl-6 mt-1 border-l border-white/5 space-y-1">
          {node.children!.map((child, index) => (
            <TreeNode key={`${child.name}-${index}`} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
