"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { PAGES } from "./sidebar/pages";
import { Button } from "./ui/button";

export const PaginationButtons = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const currentPage = PAGES.find((page) =>
    page.items.some((item) => item.url === currentPath),
  );

  if (!currentPage) return null;

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
    <div className="my-10 flex w-full justify-between">
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
