import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Cyber Savvy Pro",
  description: "Manage website content.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
