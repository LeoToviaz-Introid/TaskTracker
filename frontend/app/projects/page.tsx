import Header from "@/components/Header";
import NewProjectButton from "@/components/NewProjectButton";
import ProjectsTable from "@/components/ProjectsTable";

export default function Page() {
  return (
    <>
      <Header
        title={<h2 className="text-lg">Proyectos</h2>}
        text={""}
        button={<NewProjectButton />}
        description={<p className="text-sm text-zinc-700"></p>}
      />

      <div className="bg-zinc-700 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <ProjectsTable />
        </div>
      </div>
    </>
  );
}
