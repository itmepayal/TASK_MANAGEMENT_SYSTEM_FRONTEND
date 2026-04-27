import { api } from "../api/axios";
import type { Task, TaskResponse } from "../types/task";

/* =========================================================
TYPES
========================================================= */
export type CreateTaskDto = {
  text: string;
  priority: Task["priority"];
};

export type UpdateTaskDto = Partial<CreateTaskDto>;

/* =========================================================
API RESPONSE WRAPPER 
========================================================= */
type ApiResponse<T> = {
  data: T;
  message: string;
};

/* =========================================================
SERVICE
========================================================= */
export const TaskService = {
  /**
   * GET ALL TASKS
   */
  getAll: async (page = 1, limit = 8) => {
    return await api.get<{ data: TaskResponse }>(
      `/tasks?page=${page}&limit=${limit}`,
    );
  },

  /**
   * CREATE TASK
   */
  create: async (data: CreateTaskDto) => {
    return await api.post<ApiResponse<Task>>("/tasks", data);
  },

  /**
   * UPDATE TASK
   */
  update: async (id: string, data: UpdateTaskDto) => {
    return await api.patch<ApiResponse<Task>>(`/tasks/${id}`, data);
  },

  /**
   * TOGGLE STATUS
   */
  toggleStatus: async (id: string) => {
    return await api.patch<ApiResponse<Task>>(`/tasks/${id}/toggle`);
  },

  /**
   * DELETE TASK
   */
  remove: async (id: string) => {
    return await api.delete<ApiResponse<null>>(`/tasks/${id}`);
  },
};
