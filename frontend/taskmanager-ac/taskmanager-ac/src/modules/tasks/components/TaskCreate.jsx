import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, FileText, Type, Calendar } from "lucide-react";
import { createTask } from "@/service/TaskService";
import { useNavigate } from "react-router-dom";

function TaskCreate() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const navigator = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      name: name.trim(),
      text: text.trim(),
      endingDate: endingDate || null,
    };

    createTask(newTask)
      .then(() => navigator("/tasks"))
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  }

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
            <CardTitle className="text-2xl font-semibold text-slate-100">
              Create New Task
            </CardTitle>
          </CardHeader>
        <form onSubmit={handleSubmit}>

          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                  <Type className="h-4 w-4 text-slate-500" />
                  Name
                  <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter task name"
                  value={name}
                  required
                  maxLength={50}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:ring-slate-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="text" className="text-slate-300 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Description
                  <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="text"
                  placeholder="Enter task text"
                  value={text}
                  required
                  maxLength={250}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-slate-600 focus:ring-slate-600 min-h-[120px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endingDate" className="text-slate-300 flex items-center gap-2">
                  <Calendar className=" h-4 w-4 text-slate-500" />
                  Ending Date
                </Label>
                <Input
                  id="endingDate"
                  type="datetime-local"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                  className="cursor-pointer bg-slate-800 border-slate-700 text-slate-100 focus:border-slate-600 focus:ring-slate-600"
                />
                <p className="text-xs text-slate-500 pl-1">
                  Optional: Set a deadline for completing this task.
                </p>
              </div>

              <div className="border-t border-slate-800"></div>

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
        </Card>
      </div>
    </div>
  );
}

export default TaskCreate;

