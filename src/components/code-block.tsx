"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  code: string;
  maxLines?: number;
  className?: string;
}

export function CodeBlock({
  children,
  code,
  maxLines = 20,
  className,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split("\n");
  const shouldShowExpand = lines.length > maxLines;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative">
        <pre className="overflow-x-auto">
          <div
            className={
              isExpanded || !shouldShowExpand
                ? "h-full overflow-auto"
                : "h-96 overflow-hidden"
            }
          >
            {children}
          </div>
        </pre>
        {shouldShowExpand && !isExpanded && (
          <div className="from-background absolute right-0 bottom-0 left-0 h-12 bg-gradient-to-t to-transparent" />
        )}
      </div>
      {shouldShowExpand && (
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="border-muted-foreground/20 h-px flex-1 border-t border-dashed" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <div className="border-muted-foreground/20 h-px flex-1 border-t border-dashed" />
        </div>
      )}
    </div>
  );
}
