import { useTaskController } from "./hooks/useTaskController";
import { TaskPage } from "./components/tasks/TaskPage";

const App = () => {
  const controller = useTaskController();

  return <TaskPage controller={controller} />;
};

export default App;
