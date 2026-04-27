import { CheckCircle, Circle, Pencil, Trash } from "lucide-react";
import type { Task } from "../../types/task";

type Props = {
  task: Task; // task object
  index: number; // row index (for display)
  onEdit: (task: Task) => void; // edit handler
  onDelete: (task: Task) => void; // delete handler
  onToggle: (task: Task) => void; // toggle completion handler
};

/**
 * =========================================================
 * TASK ROW COMPONENT
 * - Represents a single row in the task table
 * - Displays task details (name, status, priority, date)
 * - Provides actions (toggle, edit, delete)
 * =========================================================
 */
export function TaskRow({ task, index, onEdit, onDelete, onToggle }: Props) {
  return (
    /**
     * =========================================================
     * TABLE ROW
     * - Adds hover effect using Tailwind group
     * =========================================================
     */
    <tr className="border-b hover:bg-gray-50 transition group">
      {/* ================= INDEX ================= */}
      <td className="px-6 py-4 text-gray-500 font-medium">{index}</td>

      {/* ================= TASK NAME ================= */}
      <td className="px-6 py-4">
        <p className="font-semibold text-gray-800 group-hover:text-black transition">
          {task.text}
        </p>
      </td>

      {/* ================= STATUS ================= */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.completed
              ? "bg-green-100 text-green-700" // completed state
              : "bg-yellow-100 text-yellow-700" // pending state
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </td>

      {/* ================= PRIORITY ================= */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.priority === "high"
              ? "bg-red-100 text-red-700" // high priority
              : task.priority === "medium"
                ? "bg-blue-100 text-blue-700" // medium priority
                : "bg-gray-100 text-gray-600" // low priority
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
      </td>

      {/* ================= CREATED DATE ================= */}
      <td className="px-6 py-4 text-gray-500 text-sm">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>

      {/* ================= ACTIONS ================= */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {/* -------- TOGGLE STATUS -------- */}
          <button
            onClick={() => onToggle(task)}
            className={`p-2 rounded-lg transition active:scale-95 ${
              task.completed
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            }`}
            title={task.completed ? "Mark as Pending" : "Mark as Completed"}
          >
            {task.completed ? <CheckCircle size={18} /> : <Circle size={18} />}
          </button>

          {/* -------- EDIT -------- */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
            title="Edit Task"
          >
            <Pencil size={15} />
          </button>

          {/* -------- DELETE -------- */}
          <button
            onClick={() => onDelete(task)}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 active:scale-95 transition"
            title="Delete Task"
          >
            <Trash size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
