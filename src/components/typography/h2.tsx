export const H2 = ({ title }: { title: string }) => {
  return (
    <h2
      id={title}
      className="mt-8 w-full scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
    >
      {title}
    </h2>
  );
};
