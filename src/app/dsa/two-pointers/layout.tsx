import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Two pointers",
  description: "Two pointers pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}