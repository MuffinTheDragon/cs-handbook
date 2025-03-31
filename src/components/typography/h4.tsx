import { cn } from "@/lib/utils";

export const H4 = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h4
      id={title}
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {title}
    </h4>
  );
};
