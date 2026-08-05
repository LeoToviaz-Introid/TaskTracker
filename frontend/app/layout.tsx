import type { Metadata } from "next";
import type { Viewport } from "next";

import { Sidebar } from "@/components/Sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "TaskTracker",
  description: "Sistema de Gestión de Proyectos estilo Kanban.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
