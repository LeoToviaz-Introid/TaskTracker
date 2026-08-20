import CreateEditProjectButton from "@/components/CreateEditProjectButton";
import Header from "@/components/Header";
import ProjectsTable from "@/components/ProjectsTable";

export default function Page() {
  return (
    <>
      <Header
        title={<h2 className="text-lg">Proyectos</h2>}
        text={""}
        button={<CreateEditProjectButton />}
        description={<p className="text-sm text-gray-300"></p>}
      />

      <div className="bg-gray-900 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <ProjectsTable />
        </div>
      </div>
    </>
  );
}
