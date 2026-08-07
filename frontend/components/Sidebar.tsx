"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";

import { ChevronDown, PanelLeftClose, PanelLeft, Loader2 } from "lucide-react";

/**
 * Barra lateral desplegable que contiene atajos hacia las rutas: /, /projects y /projects/[id],
 * en este último caso se muestran los últimos 4 proyectos visitados; los más recientes.
 *
 * @example
 * <Sidebar />
 */
export function Sidebar() {
  // true cuando esta desplegado el sidebar y false en caso contrario
  const [isCollapsed, setIsCollapsed] = useState(false);
  // true cuando el mouse esta encima de la flecha al lado de "Proyectos"
  // false cuando no
  const [isHovered, setIsHovered] = useState(false);
  // cuando empiece a cargar la app se encontrará vacía, y cuando se renderice el
  // componente cargará datos de la API de proyectos, por el momento datos simulados
  //const [proyectos, setProyectos] = useState<ItemProyecto[]>([]);  // pendiente añadir tipado
  const [proyectos, setProyectos] = useState([
    {
      id: 1,
      nombre: "Proyecto 1",
      url: "/projects/1",
    },
    {
      id: 2,
      nombre: "Proyecto 2",
      url: "/projects/2",
    },
  ]);
  // true mientras la pagina este cargando datos de la API proyectos
  // false cuando no, por el momento no se usa debido a datos simulados
  const [loading, setLoading] = useState(false);

  return (
    <aside
      className={`
        flex flex-col shrink-0 h-screen p-0 m-0 bg-emerald-300 text-white transition-all duration-300 ease-in-out divide-y divide-white/40
      `}
    >
      <button
        className={`
        p-2 overflow-scroll bg-emerald-400 hover:bg-emerald-500 focus:bg-emerald-600 cursor-pointer
        
        ${isCollapsed ? "hidden" : "block"}
      `}
      >
        <Link href="/">Dashboard</Link>
      </button>
      <div
        className={`
        flex p-0

        ${isCollapsed ? "hidden" : "block"}
        `}
      >
        <button className="p-2 bg-emerald-400 hover:bg-emerald-500 focus:bg-emerald-600 cursor-pointer">
          <Link href="/projects">Proyectos</Link>
        </button>
        {/** -------- flecha al lado de Proyectos -------- */}
        <div
          className={`
            flex flex-col justify-center shrink-0 transition-transform duration-200 bg-emerald-400 hover:bg-emerald-500
            relative
            ${isCollapsed ? "-rotate-90" : ""}
          `}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ChevronDown
            className={`
            w-5 h-5
            
            ${isCollapsed ? "-rotate-90" : ""}
          `}
          />
        </div>
        {/** -------- flecha al lado de Proyectos -------- */}
        {isHovered &&
          typeof window !== "undefined" &&
          document.getElementById("recent-projects-container") &&
          createPortal(
            <div
              className="bg-emerald-500 flex flex-col divide-y divide-white/20"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? (
                <div className="flex items-center justify-center pt-2 pb-2 text-sm text-emerald-100">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Cargando...
                </div>
              ) : proyectos.length > 0 ? (
                proyectos.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="block px-4 py-2 text-sm text-white hover:bg-emerald-700 transition-colors"
                  >
                    {item.nombre}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-emerald-200">
                  Sin proyectos
                </div>
              )}
            </div>,
            document.getElementById("recent-projects-container")!,
          )}
        {/** ------------------------- */}
      </div>
      <div id="recent-projects-container" className="flex-1"></div>
      <button
        className="p-2 bg-emerald-400 hover:bg-emerald-500 focus:bg-emerald-600 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <PanelLeft className="w-5 h-5 shrink-0" />
        ) : (
          <PanelLeftClose className="w-5 h-5 shrink-0" />
        )}
      </button>
    </aside>
  );
}
