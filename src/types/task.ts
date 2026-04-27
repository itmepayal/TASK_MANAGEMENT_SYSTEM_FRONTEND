export type Task = {
  id?: string;
  _id?: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type TaskResponse = {
  tasks: Task[];
  pagination: Pagination;
};
