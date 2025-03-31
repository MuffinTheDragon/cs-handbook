import { cn } from "@/lib/utils";

export const H3 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h3
      id={title}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {title}
    </h3>
  );
};
