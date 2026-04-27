import { useTaskController } from "./hooks/useTaskController";
import { TaskPage } from "./components/tasks/TaskPage";

export default function App() {
  const controller = useTaskController();

  return <TaskPage controller={controller} />;
}
