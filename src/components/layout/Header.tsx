import { CheckSquare } from "lucide-react";

export function Header() {
  return (
    <header className="bg-black text-white py-4 shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare size={28} className="text-white" />

          <h1 className="text-xl font-bold tracking-wide">Task Manager</h1>
        </div>

        <span className="text-gray-300 text-sm hidden sm:block">
          Workflow Dashboard
        </span>
      </div>
    </header>
  );
}
