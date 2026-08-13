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
    <html lang="en" className="bg-gray-700">
      <body className="w-9/10 max-w-7xl min-h-full my-0 mx-auto flex">
        <Sidebar />
        {/** contenedor grid para hacer dos filas con proporcion aproximada 30 70 */}
        <div className="grid grid-rows-[auto_1fr] gap-4 bg-amber-50"></div>
          <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
