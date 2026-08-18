import type { Metadata } from "next";
import type { Viewport } from "next";

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
        {children}
      </body>
    </html>
  );
}
