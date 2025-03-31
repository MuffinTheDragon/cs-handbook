import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Singleton",
  description: "Community-driven handbook for all things related to CS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
