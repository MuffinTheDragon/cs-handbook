import { Button } from "./ui/button";

interface IItemListProps {
  children: React.ReactNode;
  url?: string;
}

interface IItemListProps {
  children: React.ReactNode;
}

export const ItemList = ({ children }: IItemListProps) => {
  return <div className="w-full rounded-lg border">{children}</div>;
};

export const ItemListItem = ({ children, url }: IItemListProps) => {
  return (
    <div className="p-2 [&:not(:last-child)]:border-b">
      <Button variant="link" asChild>
        <a href={url} target="_blank">
          {children}
        </a>
      </Button>
    </div>
  );
};
