import Link from "next/link";
import { ItemType } from "./sidebar/pages";
import { H2 } from "./typography/h2";
import { H4 } from "./typography/h4";

interface IAvailableSectionsProps {
  sections: ItemType[];
  title?: string;
}

export function AvailableSections({
  sections,
  title = "Entries",
}: IAvailableSectionsProps) {
  return (
    <>
      <H2 title={title} />

      <div className="mt-4 grid w-full gap-4">
        {sections.map((section) => (
          <Link
            key={section.url}
            href={section.url}
            className="hover:bg-accent rounded-lg border p-4 transition-colors"
          >
            <H4 title={section.title} />
            <p className="text-muted-foreground mt-1 text-sm">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
