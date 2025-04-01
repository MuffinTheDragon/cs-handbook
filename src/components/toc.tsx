"use client";

import { IHeading, useHeadingsData } from "@/hooks/use-headings-data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "./ui/button";

export const Toc = () => {
  const { nestedHeadings } = useHeadingsData();
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  if (!nestedHeadings) return null;

  if (isMobile) {
    return (
      <div>
        <Button variant="outline" onClick={() => setExpanded(!expanded)}>
          Table of contents
        </Button>
        {expanded && <TocList nestedHeadings={nestedHeadings} />}
      </div>
    );
  }

  return (
    <div>
      <p>Table of contents</p>
      <TocList nestedHeadings={nestedHeadings} />
    </div>
  );
};

const TocList = ({ nestedHeadings }: { nestedHeadings: IHeading[] }) => (
  <ul className="mt-4 space-y-2 border-l pl-4">
    {nestedHeadings.map((heading) => (
      <li key={heading.id}>
        <a href={`#${heading.id}`}>{heading.title}</a>
        {heading.items.length > 0 && (
          <ul className="space-y-2 pl-4">
            {heading.items.map((child) => (
              <li key={child.id}>
                <a href={`#${child.id}`}>{child.title}</a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);
