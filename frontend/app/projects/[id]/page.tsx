"use client";

import { Plus } from "lucide-react";

import TaskList from "@/components/TaskList";

export default function Page() {
    return (
        <div className="grid grid-rows-[auto_1fr] gap-4 bg-amber-50">
            <div className="p-4 bg-red-100 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="font-bold text-lg">
                    <h2>(Nombre Proyecto)</h2>
                </div>
                <div className="text-left font-medium">X/Y</div>
                <div className="flex justify-start md:justify-end">
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-emerald-400 hover:bg-emerald-500 text-zinc-900 font-medium px-4 py-2 flex items-center gap-2 border border-emerald-500 cursor-pointer"
                    >
                        Nueva Tarea <Plus className="w-5 h-5" />
                    </button>
                </div>
                <div className="col-span-1 md:col-span-3 mt-2">
                    <p className="text-sm text-zinc-700">
                        Descripcion de prueba... Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci sapiente eum iure, nihil voluptates
                        ullam neque consequuntur quis magnam quasi maxime repellendus, laborum, pariatur
                        deserunt repudiandae omnis aperiam ad commodi.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-blue-50 p-4">
                <div className="bg-rose-400 p-2">
                    <TaskList titulo="Por hacer"/>
                </div>
                <div className="bg-indigo-500 p-2">
                    <TaskList titulo="En progreso"/>
                </div>
                <div className="bg-gray-700 text-white p-2">
                    <TaskList titulo="Completadas"/>
                </div>
            </div>
            
        </div>
    );
}