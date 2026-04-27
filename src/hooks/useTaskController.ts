import { useState, type ChangeEvent } from "react";
import type { Task } from "../types/task";
import { useTasks } from "./useTasks";
import { useTaskActions } from "./useTaskActions";

/**
 * =========================================================
 * TASK CONTROLLER HOOK
 * Handles:
 * - Task fetching (pagination)
 * - CRUD operations
 * - UI state (modals, loading, form)
 * =========================================================
 */
export const useTaskController = () => {
  /**
   * =========================================================
   * PAGINATION STATE
   * =========================================================
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * =========================================================
   * FETCH TASKS
   * Custom hook for fetching paginated tasks
   * =========================================================
   */
  const { tasks, setTasks, pagination, loading, refetch } =
    useTasks(currentPage);

  /**
   * =========================================================
   * TASK ACTIONS (API CALLS)
   * Custom hook for CRUD operations
   * =========================================================
   */
  const { createTask, updateTask, deleteTask, toggleTask } =
    useTaskActions(setTasks);

  /**
   * =========================================================
   * UI STATE
   * =========================================================
   */
  const [isEdit, setIsEdit] = useState(false); // Edit mode flag
  const [submitLoading, setSubmitLoading] = useState(false); // Create/Update loading
  const [deleteLoading, setDeleteLoading] = useState(false); // Delete loading

  /**
   * =========================================================
   * FORM STATE
   * =========================================================
   */
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium" as Task["priority"],
  });

  /**
   * =========================================================
   * MODAL STATE
   * =========================================================
   */
  const [showModal, setShowModal] = useState(false); // Create/Edit modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete confirmation modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // Selected task for edit/delete

  /**
   * =========================================================
   * HANDLE FORM INPUT CHANGE
   * =========================================================
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * =========================================================
   * CREATE TASK
   * =========================================================
   */
  const handleCreate = async () => {
    try {
      setSubmitLoading(true);

      await createTask({
        text: formData.title,
        priority: formData.priority,
      });
      resetForm();
      await refetch();
    } finally {
      setSubmitLoading(false);
    }
  };

  /**
   * =========================================================
   * UPDATE TASK
   * =========================================================
   */
  const handleUpdate = async () => {
    if (!selectedTask) return;

    try {
      setSubmitLoading(true);

      await updateTask(selectedTask._id!, {
        text: formData.title,
        priority: formData.priority,
      });

      resetForm();
      await refetch();
    } finally {
      setSubmitLoading(false);
    }
  };

  /**
   * =========================================================
   * HANDLE SUBMIT (CREATE / UPDATE)
   * =========================================================
   */
  const handleSubmit = async () => {
    if (isEdit) await handleUpdate();
    else await handleCreate();
  };

  /**
   * =========================================================
   * DELETE HANDLERS
   * =========================================================
   */

  // Open delete confirmation modal
  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (!selectedTask) return;

    try {
      setDeleteLoading(true);
      await deleteTask(selectedTask._id!);
      setShowDeleteModal(false);
      setSelectedTask(null);
      await refetch();
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * =========================================================
   * EDIT HANDLER
   * =========================================================
   */
  const handleEdit = (task: Task) => {
    setIsEdit(true);
    setSelectedTask(task);

    // Prefill form with selected task data
    setFormData({
      title: task.text,
      priority: task.priority,
    });

    setShowModal(true);
  };

  /**
   * =========================================================
   * TOGGLE TASK STATUS (COMPLETE / INCOMPLETE)
   * =========================================================
   */
  const handleToggle = async (task: Task) => {
    await toggleTask(task._id!);
  };

  /**
   * =========================================================
   * RESET FORM & CLOSE MODAL
   * =========================================================
   */
  const resetForm = () => {
    setShowModal(false);
    setSelectedTask(null);
    setIsEdit(false);
    setFormData({ title: "", priority: "medium" });
  };

  /**
   * =========================================================
   * RETURN VALUES
   * =========================================================
   */
  return {
    // data
    tasks,
    loading,
    pagination,
    currentPage,

    // state setters
    setCurrentPage,

    // task
    selectedTask,

    // modals
    showModal,
    showDeleteModal,

    // form
    formData,
    isEdit,

    // loading
    submitLoading,
    deleteLoading,

    // resetForm
    resetForm,

    // handlers
    handleChange,
    handleSubmit,
    handleDelete,
    confirmDelete,
    handleEdit,
    handleToggle,
    setShowModal,
    setShowDeleteModal,
  };
};
