import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BFS",
  description: "BFS pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}