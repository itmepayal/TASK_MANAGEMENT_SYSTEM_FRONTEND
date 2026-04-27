import { useEffect, useState } from "react";
import { TaskService } from "../services/task.service";
import type { Task, TaskResponse, Pagination } from "../types/task";

/**
 * =========================================================
 * TASK FETCHING HOOK
 * Handles:
 * - Fetching paginated tasks from API
 * - Managing loading state
 * - Storing tasks + pagination
 * =========================================================
 */
export function useTasks(currentPage: number) {
  /**
   * =========================================================
   * STATE
   * =========================================================
   */
  const [tasks, setTasks] = useState<Task[]>([]); // Task list
  const [pagination, setPagination] = useState<Pagination | null>(null); // Pagination info
  const [loading, setLoading] = useState(false); // Loading state

  /**
   * =========================================================
   * FETCH TASKS FROM API
   * =========================================================
   */
  const fetchTasks = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      // API call to get paginated tasks
      const res = await TaskService.getAll(currentPage);

      // Extract typed response data
      const data: TaskResponse = res.data.data;

      // Update state
      setTasks(data.tasks);
      setPagination(data.pagination);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  /**
   * =========================================================
   * SIDE EFFECT
   * - Fetch tasks whenever currentPage changes
   * =========================================================
   */
  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  /**
   * =========================================================
   * RETURN VALUES
   * =========================================================
   */
  return {
    tasks,
    setTasks, // exposed for local updates
    pagination,
    loading,
    refetch: () => fetchTasks(true), // manual refetch
  };
}
