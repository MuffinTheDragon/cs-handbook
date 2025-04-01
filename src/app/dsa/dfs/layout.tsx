import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DFS",
  description: "DFS pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}