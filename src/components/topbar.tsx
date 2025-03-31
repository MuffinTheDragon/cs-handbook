import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";

export function Topbar() {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-r border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-1 px-4 sm:w-full lg:gap-2 lg:px-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent className="text-base">
              <span>⌘B</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4 sm:mx-2"
        />
        <Link href="/">
          <h1 className="hidden text-base font-medium sm:block">CS Handbook</h1>
        </Link>
      </div>
      <div className="flex w-full items-center justify-between sm:justify-end">
        <SearchBar />
        <Button variant="link">Github</Button>
      </div>
    </header>
  );
}
