import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { getTaskById } from "@/service/TaskService";
import { useParams } from "react-router-dom";

function TaskDetail() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    if (id) {
      getTaskById(id)
        .then((data) => {
          setName(data.name);
          setText(data.text);
          setCreationDate(data.creationDate);
          setEndingDate(data.endingDate);
          setCompleted(data.completed);
        })
        .catch((error) => {
          console.error("Error fetching task details:", error);
        });
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex justify-center w-full py-14 bg-slate-950 min-h-screen">
      <div className="w-full max-w-3xl px-4">
        <Button
          variant="ghost"
          className="cursor-pointer mb-4 text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tasks
        </Button>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="border-b border-slate-800 pb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-slate-100">
                  {name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">ID: {id}</span>
                  <span className="text-slate-600">•</span>
                  {completed ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-400/20 text-slate-300 border border-slate-500/30">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-sm font-medium">Text</span>
              </div>
              <div className="pl-6">
                <p className="text-slate-400 leading-relaxed break-words whitespace-pre-wrap [overflow-wrap:anywhere] hyphens-auto">
                  {text || "No text provided"}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">Creation Date</span>
                </div>
                <div className="pl-6">
                  <p className="text-slate-400">{formatDate(creationDate)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle className="h-4 w-4 text-slate-500" />
                  <span className="text-sm font-medium">Ending Date</span>
                </div>
                <div className="pl-6">
                  <p
                    className={`${
                      endingDate ? "text-slate-400" : "text-slate-600 italic"
                    }`}
                  >
                    {formatDate(endingDate)}
                  </p>
                </div>
              </div>
            </div>

            {completed && endingDate && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <p className="text-sm text-emerald-400">
                  ✓ This task was completed on {formatDate(endingDate)}
                </p>
              </div>
            )}

            {!completed && (
              <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                <p className="text-sm text-slate-400">
                  This task is still pending completion
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default TaskDetail;
