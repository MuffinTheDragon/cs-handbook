export type ItemType = {
  title: string;
  url: string;
  description?: string;
};

export type PageType = {
  id: string;
  title: string;
  url: string;
  description?: string;
  isActive: boolean;
  items: ItemType[];
};

export const PAGES: PageType[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    url: "#",
    isActive: true,
    items: [
      { title: "Introduction", url: "/introduction" },
      {
        title: "Contributing",
        url: "/contributing",
      },
    ],
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    url: "/design-patterns",
    description:
      "List of common design patterns used in OOP, their applications, and how to implement them",
    isActive: false,
    items: [
      {
        title: "Strategy Pattern",
        url: "/design-patterns/strategy",
        description:
          "Define a family of algorithms, encapsulate each one, and make them interchangeable.",
      },
      {
        title: "Singleton Pattern",
        url: "/design-patterns/singleton",
        description:
          "Define an interface for creating an object, but let subclasses decide which class to instantiate.",
      },
    ],
  },
  {
    id: "dsa",
    title: "DSA",
    url: "/dsa",
    description: "List of common data structures and algorithms",
    isActive: false,
    items: [
      {
        title: "Two pointers",
        url: "/dsa/two-pointers",
        description:
          "A technique to solve problems using two pointers where the pointers can either move toward or away from each other.",
      },
      {
        title: "Sliding window",
        url: "/dsa/sliding-window",
        description:
          "A technique to solve problems by moving an imaginary window across a data structure.",
      },
    
      {
        title: "DFS",
        url: "/dsa/dfs",
      },],
  },
];
