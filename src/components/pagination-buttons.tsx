// PaginationButtons.tsx
"use client"; // This is necessary for client-side components in Next.js 13+

import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { PAGES } from "./sidebar/pages";
import { Button } from "./ui/button";

const PaginationButtons = () => {
  const router = useRouter();
  const currentPath = usePathname(); // Get the current path
  const currentPage = PAGES.find((page) =>
    page.items.some((item) => item.url === currentPath),
  );

  if (!currentPage) return null; // If no current page is found, return null

  const currentIndex = currentPage.items.findIndex(
    (item) => item.url === currentPath,
  );

  const previousPage =
    currentIndex > 0 ? currentPage.items[currentIndex - 1] : null;
  const nextPage =
    currentIndex < currentPage.items.length - 1
      ? currentPage.items[currentIndex + 1]
      : null;

  return (
    <div className="flex justify-between">
      {previousPage && (
        <Button variant="ghost" onClick={() => router.push(previousPage.url)}>
          <ArrowLeft />
          {previousPage.title}
        </Button>
      )}
      {nextPage && (
        <Button variant="ghost" onClick={() => router.push(nextPage.url)}>
          {nextPage.title} <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export default PaginationButtons;
