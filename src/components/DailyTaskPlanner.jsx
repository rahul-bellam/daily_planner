import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

const STORAGE_KEY = "daily-task-planner-v1";

const fmtDateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export default function DailyTaskPlanner() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const key = fmtDateKey(date);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    setTasks(saved[key] || []);
  }, [date]);

  useEffect(() => {
    const key = fmtDateKey(date);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    saved[key] = tasks;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [tasks, date]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, text) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const carryForward = () => {
    const prev = new Date(date);
    prev.setDate(prev.getDate() - 1);
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const prevTasks = saved[fmtDateKey(prev)] || [];
    const unfinished = prevTasks.filter((t) => !t.done);
    setTasks([...unfinished, ...tasks]);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.done));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="max-w-md w-full">
        <Header date={date} setDate={setDate} />
        <AddTask addTask={addTask} />
        <div className="mt-4 space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={carryForward}
            className="px-3 py-1 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600"
          >
            Carry forward
          </button>
          <button
            onClick={clearCompleted}
            className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}
