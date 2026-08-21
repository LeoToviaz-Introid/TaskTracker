import { serverRequest } from "@/app/server-api";
import { Sidebar } from "@/components/Sidebar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  return (
    <>
      <Sidebar projects={projects} />
      {/** contenedor grid para hacer dos filas con proporcion aproximada 30 70 */}
      <div className="grid grid-rows-[auto_1fr] gap-4 bg-gray-800 flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}

async function getProjects() {
  // obtener proyectos para el Sidebar
  const res = await serverRequest("/projects/", "GET", undefined, "projects");
  if (res.error) return [];
  return res;
}
