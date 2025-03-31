import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributing",
  description: "Contributing pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}