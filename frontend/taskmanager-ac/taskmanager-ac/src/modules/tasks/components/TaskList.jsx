import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { deleteTask, getTasks, markTaskCompleted } from "@/service/TaskService";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function TaskList() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDialogOpenComplete, setIsDialogOpenComplete] = useState(false);
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = tasks.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    getTasks().then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tasks.slice(start, start + pageSize);
  }, [tasks, page, pageSize]);

  async function markTask() {
    if (!selectedTask) return;
    try {
      const updated = await markTaskCompleted(selectedTask.id);
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, ...updated } : t))
      );
      setIsDialogOpenComplete(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("Error completing task:", err);
    }
  }

  function removeTask() {
    if (!selectedTask) return;

    deleteTask(selectedTask.id)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="flex justify-center w-full py-14">
      <div className="w-full max-w-4xl  rounded-lg overflow-hidden">
        <Card>
          <CardContent>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-slate-100">
                Task Management
              </h1>
              <p className="text-slate-400 text-sm">
                Manage your tasks and complete them.
              </p>
            </div>
            <Table className="bg-slate-900 w-full max-w-4xl border rounded-lg overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Ending Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>
                      <div className="max-w-[6rem] truncate break-words">
                        {task.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[10rem] truncate break-words">
                        {task.text}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(task.creationDate)}</TableCell>
                    <TableCell>{formatDate(task.endingDate)}</TableCell>
                    <TableCell>
                      {task.completed ? (
                        <Badge className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          Completed
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-400/20 text-slate-700 dark:text-slate-300 border border-slate-500/30">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          to={`/tasks/${task.id}`}
                          onClick={() => {
                            setSelectedTask(task);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={"cursor-pointer"}
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDialogOpenComplete(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={"cursor-pointer"}
                        onClick={() => {
                          setSelectedTask(task);
                          setIsDialogOpenDelete(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {pageData.length === 0 && (
                  <TableRow>
                    <TableCell className="py-8 text-center text-slate-400">
                      No results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="mt-4 flex items-center justify-between text-slate-300">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <AlertDialog
              open={isDialogOpenComplete}
              onOpenChange={setIsDialogOpenComplete}
            >
              <AlertDialogContent className="bg-slate-900 border border-slate-800 text-slate-200 shadow-xl rounded-2xl">
                <AlertDialogHeader className="flex flex-col items-center text-center space-y-2">
                  <div className="p-3 bg-emerald-500/20 rounded-full">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                  <AlertDialogTitle className="text-lg font-semibold text-slate-100">
                    Mark Task as Complete?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-400 text-sm">
                    Marking this task as complete will update its status. You
                    can undo this action later if necessary.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="flex justify-center gap-4 mt-6">
                  <AlertDialogCancel className="cursor-pointer border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white transition-all">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={markTask}
                    className="cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500 shadow-md hover:shadow-lg transition-all"
                  >
                    ✅ Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
              open={isDialogOpenDelete}
              onOpenChange={setIsDialogOpenDelete}
            >
              <AlertDialogContent className="bg-slate-900 border border-slate-800 text-slate-300">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-slate-100">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-400">
                    This will permanently delete the task and remove all its
                    data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer border border-slate-800 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-slate-100">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer bg-red-800 text-white hover:bg-red-500"
                    onClick={removeTask}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TaskList;
