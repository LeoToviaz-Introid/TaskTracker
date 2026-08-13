"use client";

import { useEffect } from "react";
import { useState } from "react";

import Header from "@/components/Header";
import NewModelButton from "@/components/NewModelButton";
import TablaProyectos from "@/components/TablaProyectos";

export default function Page() {
  return (
    <>
      <Header
        title={<h2 className="text-lg">Proyectos</h2>}
        text={""}
        button={
          <NewModelButton
            text="Nuevo Proyecto"
            placeholder="Escribe el nombre del proyecto"
          />
        }
        description={<p className="text-sm text-zinc-700"></p>}
      />

      <div className="bg-zinc-700 flex justify-center items-start p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl">
          <TablaProyectos />
        </div>
      </div>
    </>
  );
}
