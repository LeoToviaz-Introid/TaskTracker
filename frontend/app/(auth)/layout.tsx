import { Sidebar } from "@/components/Sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {/** contenedor grid para hacer dos filas con proporcion aproximada 30 70 */}
      <div className="grid grid-rows-[auto_1fr] gap-4 bg-amber-50 flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
