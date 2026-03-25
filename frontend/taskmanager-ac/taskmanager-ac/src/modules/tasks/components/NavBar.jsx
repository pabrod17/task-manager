import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isTasksPage = location.pathname === "/tasks";
  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3">
      <Link
        to="/"
        className="text-xl font-semibold text-slate-100 hover:text-slate-300 transition-colors cursor-pointer"
      >
        Task Management
      </Link>
      {isTasksPage && (
        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="cursor-pointer bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            <Link to="/tasks/new">+ Add Task</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
