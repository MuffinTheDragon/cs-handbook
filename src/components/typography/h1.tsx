import { cn } from "@/lib/utils";

interface IH1Props {
  title: string;
  subtitle?: string;
  className?: string;
}
export const H1 = (props: IH1Props) => {
  return (
    <div className="space-y-2">
      <h1
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight",
          props.className,
        )}
        id={props.title}
      >
        {props.title}
      </h1>
      {props.subtitle && (
        <p className="text-muted-foreground">{props.subtitle}</p>
      )}
    </div>
  );
};
