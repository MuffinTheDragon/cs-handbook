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
    <div className="border-b p-2">
      <Button variant="link" asChild>
        <a href={url} target="_blank">
          <span className="text-base">{children}</span>
        </a>
      </Button>
    </div>
  );
};
