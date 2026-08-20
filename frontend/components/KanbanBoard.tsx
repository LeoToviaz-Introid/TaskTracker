'use client';

import { useEffect, useState } from 'react';

import interact from 'interactjs';

import { refreshTag } from '@/app/actions';
import { request } from "@/app/api";

import TaskList from './TaskList';

export default function KanbanBoard({ projectTasks }) {
  const [tasks, setTasks] = useState(projectTasks);

  const updateTaskStatus = async (taskId, newStatus) => {
    // cambia el status de la tarea del lado del cliente
    setTasks((prevState) =>
      prevState.map((task) => (task.id === Number(taskId) ? { ...task, estado: newStatus } : task))
    );

    const res = await request(`/tasks/${taskId}/`, "PATCH", {estado: newStatus}, undefined);
    if (res.error) {
      alert("error - " + res.msg);
      return;
    }
    refreshTag("project-tasks");
  };
  // efecto de configuracion de interact js
  useEffect(() => {
    // hacer tarea en un draggable
    interact('.draggable-task').draggable({
      inertia: true,
      autoScroll: true,
      listeners: {
        start(event) {
          const rect = event.target.getBoundingClientRect();
          // Guardar dimensión original y fijar posición global para evitar el corte por overflow
          event.target.style.width = `${rect.width}px`;
          event.target.style.position = 'fixed';
          event.target.style.left = `${rect.left}px`;
          event.target.style.top = `${rect.top}px`;
          event.target.classList.add('z-50', 'opacity-75');
        },
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x.toString());
          target.setAttribute('data-y', y.toString());
        },
        end(event) {
          const target = event.target;
          // quitar estilos temporales
          target.style.position = '';
          target.style.left = '';
          target.style.top = '';
          target.style.width = '';
          target.style.transform = 'none';
          target.removeAttribute('data-x');
          target.removeAttribute('data-y');
          target.classList.remove('z-50', 'opacity-75');
        },
      },
    });
    // hacer columnas en dropzones
    interact('.task-dropzone').dropzone({
      accept: '.draggable-task',
      overlap: 0.5,
      ondrop(event) {
        // id de la tarea
        const taskId = event.relatedTarget.getAttribute('data-task-id');
        // status de la columna
        const newStatus = event.target.getAttribute('data-status');

        if (taskId && newStatus) updateTaskStatus(taskId, newStatus);
      },
    });

    return () => {
      interact('.draggable-task').unset();
      interact('.task-dropzone').unset();
    };
  }, []);

  const pendingTasks = tasks.filter((el) => el.estado === 'pending');
  const inProgressTasks = tasks.filter((el) => el.estado === 'in_progress');
  const completedTasks = tasks.filter((el) => el.estado === 'completed');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-800 p-4 min-h-[500px]">
      <div className="task-dropzone bg-pink-950 p-2" data-status="pending">
        <TaskList title="Por hacer" tasks={pendingTasks} />
      </div>
      <div className="task-dropzone bg-green-950 p-2" data-status="in_progress">
        <TaskList title="En progreso" tasks={inProgressTasks} />
      </div>
      <div className="task-dropzone bg-gray-950 text-white p-2" data-status="completed">
        <TaskList title="Completadas" tasks={completedTasks} />
      </div>
    </div>
  );
}
