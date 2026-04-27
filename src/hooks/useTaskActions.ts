import { TaskService } from "../services/task.service";
import type { Task } from "../types/task";

/**
 * =========================================================
 * TASK ACTIONS HOOK
 * Handles all task-related API operations and updates state
 * =========================================================
 */
export function useTaskActions(setTasks: any) {
  /**
   * =========================================================
   * CREATE TASK
   * - Calls API to create a new task
   * - Adds the new task at the top of the list (latest first)
   * =========================================================
   */
  const createTask = async (data: any) => {
    const res = await TaskService.create(data);

    setTasks((prev: Task[]) => [
      res.data.data, // newly created task
      ...prev, // existing tasks
    ]);
  };

  /**
   * =========================================================
   * UPDATE TASK
   * - Calls API to update a task
   * - Replaces the updated task in the list
   * =========================================================
   */
  const updateTask = async (id: string, data: any) => {
    const res = await TaskService.update(id, data);

    setTasks((prev: Task[]) =>
      prev.map(
        (t) =>
          t._id === id
            ? res.data.data // replace updated task
            : t, // keep other tasks unchanged
      ),
    );
  };

  /**
   * =========================================================
   * DELETE TASK
   * - Calls API to delete a task
   * - Removes the task from local state
   * =========================================================
   */
  const deleteTask = async (id: string) => {
    await TaskService.remove(id);

    setTasks(
      (prev: Task[]) => prev.filter((t) => t._id !== id), // remove deleted task
    );
  };

  /**
   * =========================================================
   * TOGGLE TASK STATUS
   * - Calls API to toggle task completion status
   * - Updates the specific task in the list
   * =========================================================
   */
  const toggleTask = async (id: string) => {
    const res = await TaskService.toggleStatus(id);

    setTasks((prev: Task[]) =>
      prev.map((t) =>
        t._id === id
          ? res.data.data // updated task with toggled status
          : t,
      ),
    );
  };

  /**
   * =========================================================
   * RETURN ACTIONS
   * =========================================================
   */
  return {
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}
