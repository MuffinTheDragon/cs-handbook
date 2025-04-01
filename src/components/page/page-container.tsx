import { Toc } from "@/components/toc";
import { BreadcrumbGenerator } from "../breadcrumb-generator";
import { PaginationButtons } from "../pagination-buttons";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-start p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-1 items-start justify-center gap-4 xl:grid-cols-3 xl:gap-16">
        {/* Mobile Toc */}
        <div className="flex xl:hidden">
          <Toc />
        </div>
        {/* Mobile layout */}
        <div className="flex flex-col items-start justify-center gap-4 xl:col-span-2">
          <BreadcrumbGenerator />
          {children}
          <PaginationButtons />
        </div>
        {/* Desktop layout */}
        <div className="sticky top-10 hidden xl:flex xl:flex-col xl:items-start xl:justify-center xl:gap-4">
          <Toc />
        </div>
      </main>
    </div>
  );
};
