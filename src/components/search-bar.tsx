"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGES } from "./sidebar/pages";
import { Button } from "./ui/button";

export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  return (
    <div className="flex-1 sm:flex-none">
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="bg-muted/30 text-muted-foreground flex w-full items-center justify-between rounded-lg sm:w-64"
      >
        <span>Search</span>
        <span className="bg-muted rounded-lg px-1 py-0.5">⌘K</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {PAGES.map((page) => (
            <CommandGroup key={page.title} heading={page.title}>
              {page.url !== "#" && (
                <CommandItem key={page.url} onSelect={() => onSelect(page.url)}>
                  <span>{page.title}</span>
                </CommandItem>
              )}
              {page.items.map((item) => {
                if (item.url === "#") return;
                return (
                  <CommandItem
                    asChild
                    key={item.url}
                    onSelect={() => onSelect(item.url)}
                  >
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
};
