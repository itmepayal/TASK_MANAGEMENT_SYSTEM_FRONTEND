import type { Task } from "../../types/task";

type Props = {
  open: boolean; // Controls modal visibility
  task: Task | null; // Selected task to delete
  onCancel: () => void; // Close modal
  onConfirm: () => Promise<void> | void; // Confirm delete action
  loading?: boolean; // Loading state during delete
};

/**
 * =========================================================
 * DELETE TASK MODAL
 * - Displays confirmation before deleting a task
 * - Shows task name for clarity
 * - Handles loading state during deletion
 * =========================================================
 */
export function DeleteTaskModal({
  open,
  task,
  onCancel,
  onConfirm,
  loading = false,
}: Props) {
  /**
   * DEBUG: Check incoming task
   * If this logs null → issue is from parent/controller
   */
  console.log("Delete Modal Task:", task);

  /**
   * =========================================================
   * GUARD: Do not render modal if not open
   * =========================================================
   */
  if (!open) return null;

  return (
    /**
     * =========================================================
     * BACKDROP
     * =========================================================
     */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* ================= MODAL CARD ================= */}
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="px-6 py-4 border-b bg-red-50">
          <h2 className="text-lg font-semibold text-red-600">Delete Task</h2>
          <p className="text-sm text-gray-500 mt-1">
            This action cannot be undone
          </p>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-6 py-6">
          <p className="text-gray-700">Are you sure you want to delete:</p>

          {/* Task name (safe optional chaining) */}
          <p className="mt-2 font-semibold text-gray-900">
            {task?.text || "Unknown Task"}
          </p>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          {/* CANCEL BUTTON */}
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg border bg-white hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          {/* DELETE BUTTON */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
