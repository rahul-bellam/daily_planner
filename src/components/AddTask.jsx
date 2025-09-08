import React, { useState } from "react";

export default function AddTask({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-grow border rounded-lg px-3 py-2"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
