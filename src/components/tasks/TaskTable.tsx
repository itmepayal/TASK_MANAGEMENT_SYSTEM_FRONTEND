import type { Task } from "../../types/task";
import { TaskRow } from "./TaskRow";
import { TaskPagination } from "./TaskPagination";

type Props = {
  tasks: Task[]; // list of tasks for current page
  loading: boolean; // loading state while fetching tasks
  currentPage: number; // current active page
  pagination: {
    totalPages: number; // total number of pages
  } | null;
  setCurrentPage: (page: number) => void; // page change handler
  onEdit: (task: Task) => void; // edit handler
  onDelete: (task: Task) => void; // delete handler
  onToggle: (task: Task) => void; // toggle status handler
};

/**
 * =========================================================
 * TASK TABLE COMPONENT
 * - Displays list of tasks in table format
 * - Handles loading state
 * - Renders rows using TaskRow component
 * - Integrates pagination
 * =========================================================
 */
export function TaskTable({
  tasks,
  loading,
  currentPage,
  pagination,
  setCurrentPage,
  onEdit,
  onDelete,
  onToggle,
}: Props) {
  return (
    /**
     * =========================================================
     * TABLE CONTAINER
     * =========================================================
     */
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      {/* ================= TABLE ================= */}
      <table className="w-full text-sm">
        {/* -------- TABLE HEADER -------- */}
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">#</th>
            <th className="px-6 py-3 text-left">Task</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Priority</th>
            <th className="px-6 py-3 text-left">Created</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* ================= TABLE BODY ================= */}
        <tbody className="divide-y">
          {/* -------- LOADING STATE -------- */}
          {loading && (
            <tr>
              <td colSpan={6} className="text-center py-10">
                Loading...
              </td>
            </tr>
          )}

          {/* -------- DATA ROWS -------- */}
          {!loading &&
            tasks.map((task, i) => (
              <TaskRow
                key={task._id}
                task={task}
                /**
                 * Row index calculation:
                 * - Keeps numbering consistent across pages
                 * - Example: page 2 starts from 6 (if 5 items per page)
                 */
                index={(currentPage - 1) * 5 + i + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}

          {/* -------- EMPTY STATE -------- */}
          {!loading && tasks.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-500">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
      {pagination && (
        <TaskPagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
