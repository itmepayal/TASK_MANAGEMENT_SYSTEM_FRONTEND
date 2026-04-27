import { useState } from "react";
import type { Task } from "../../types/task";

type Props = {
  open: boolean; // controls modal visibility
  isEdit: boolean; // determines create or edit mode
  loading?: boolean; // loading state for submit action
  formData: {
    title: string; // task title input
    priority: Task["priority"]; // task priority
  };

  onClose: () => void; // close modal handler
  onSubmit: () => void; // submit handler (create/update)
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void; // form change handler
};

/**
 * =========================================================
 * TASK MODAL COMPONENT
 * - Used for both Create and Edit task
 * - Handles form input + validation
 * =========================================================
 */
export function TaskModal({
  open,
  isEdit,
  formData,
  onClose,
  onSubmit,
  onChange,
  loading = false,
}: Props) {
  /**
   * =========================================================
   * LOCAL STATE
   * - Tracks whether user has interacted with input
   * =========================================================
   */
  const [touched, setTouched] = useState(false);

  /**
   * =========================================================
   * GUARD: DO NOT RENDER IF MODAL CLOSED
   * =========================================================
   */
  if (!open) return null;

  /**
   * =========================================================
   * VALIDATION
   * - Title is required
   * =========================================================
   */
  const isInvalid = formData.title.trim() === "";

  /**
   * =========================================================
   * HANDLE SUBMIT
   * - Marks field as touched
   * - Prevents submit if invalid
   * =========================================================
   */
  const handleSubmit = () => {
    setTouched(true);

    if (isInvalid) return;

    onSubmit();
  };

  return (
    /**
     * =========================================================
     * MODAL BACKDROP
     * =========================================================
     */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* ================= MODAL CARD ================= */}
      <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        {/* ================= HEADER ================= */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEdit ? "Edit Task" : "Create New Task"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below
          </p>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-6 py-6 space-y-4">
          {/* -------- TASK INPUT -------- */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Task Title
            </label>

            <input
              name="title"
              value={formData.title}
              onChange={(e) => {
                onChange(e); // update parent state
                setTouched(true); // mark field as interacted
              }}
              disabled={loading}
              placeholder="Enter task name"
              className={`w-full px-3 py-2 border rounded-lg transition
                focus:outline-none focus:ring-2
                ${
                  isInvalid && touched
                    ? "border-red-500 focus:ring-red-200" // error state
                    : "focus:ring-black/20 focus:border-black" // normal state
                }`}
            />

            {/* -------- VALIDATION MESSAGE -------- */}
            {isInvalid && touched && (
              <p className="text-xs text-red-500 mt-1">
                Task title is required
              </p>
            )}
          </div>

          {/* -------- PRIORITY SELECT -------- */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Priority</label>

            <select
              name="priority"
              value={formData.priority}
              onChange={onChange}
              disabled={loading}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          {/* -------- CANCEL BUTTON -------- */}
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          {/* -------- SUBMIT BUTTON -------- */}
          <button
            onClick={handleSubmit}
            disabled={loading || isInvalid}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-black text-white hover:bg-gray-900 transition disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isEdit ? "Updating..." : "Saving..."}
              </>
            ) : isEdit ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
