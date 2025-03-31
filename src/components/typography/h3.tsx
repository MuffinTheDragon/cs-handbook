export const H3 = ({ title }: { title: string }) => {
  return (
    <h3
      id={title}
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      {title}
    </h3>
  );
};
