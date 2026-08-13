"use client";

import { useEffect } from "react";
import { useState } from "react";

import NewModelButton from "@/components/NewModelButton";
import TablaProyectos from "@/components/TablaProyectos";

export default function Page() {
  // true cuando este siendo mostrado el popup de nuevo proyecto y false en caso contrario

  return (
    <>
      {/** <div className="grid grid-rows-[1fr_3fr] h-screen">*/}
      <div className="p-4 bg-red-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="font-bold text-lg">
          <h2>Proyectos</h2>
        </div>
        <div className=""></div>
        <div className="flex justify-start md:justify-end">
          <NewModelButton
            text="Nuevo Proyecto"
            placeholder="Escribe el nombre del proyecto"
          />
        </div>

        <div className="col-span-1 md:col-span-3 mt-2">
          <p className="text-sm text-zinc-700"></p>
        </div>
      </div>

      <div className="bg-zinc-700 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <TablaProyectos />
        </div>
      </div>
    </>
  );
}
