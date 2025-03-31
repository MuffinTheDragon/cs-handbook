import { cn } from "@/lib/utils";

export const H2 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2
      id={title}
      className={cn(
        "mt-8 w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {title}
    </h2>
  );
};
