import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sliding window",
  description: "Sliding window pattern implementation and examples",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}