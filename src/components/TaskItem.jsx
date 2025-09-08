import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEdit = (e) => {
    e.preventDefault();
    editTask(task.id, text);
    setEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center justify-between bg-white p-3 rounded-xl shadow"
    >
      {editing ? (
        <form onSubmit={handleEdit} className="flex-grow mr-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleEdit}
            autoFocus
            className="w-full border px-2 py-1 rounded"
          />
        </form>
      ) : (
        <span
          onClick={() => toggleTask(task.id)}
          onDoubleClick={() => setEditing(true)}
          className={`flex-grow cursor-pointer select-none ${
            task.done ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>
      )}
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
}
