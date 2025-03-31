import * as React from "react";

export interface IHeading {
  id: string;
  title: string;
  items: { id: string; title: string }[];
}

export function useHeadingsData() {
  const [nestedHeadings, setNestedHeadings] = React.useState<IHeading[]>([]);

  React.useEffect(() => {
    // skip the topbar headers
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4"),
    ).slice(2);

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
}

const getNestedHeadings = (headingElements: Element[]) => {
  const nestedHeadings: IHeading[] = [];

  headingElements.forEach((heading) => {
    const { innerHTML: title, id } = heading;

    if (heading.nodeName === "H2" || heading.nodeName === "H1") {
      nestedHeadings.push({ id, title, items: [] });
    } else if (nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};
