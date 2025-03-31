interface IH1Props {
  title: string;
  subtitle?: string;
}
export const H1 = (props: IH1Props) => {
  return (
    <div className="space-y-2">
      <h1
        className="scroll-m-20 text-4xl font-extrabold tracking-tight"
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
