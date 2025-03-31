import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA",
  description: "Add your section description here",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}