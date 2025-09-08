import React from "react";

export default function Header({ date, setDate }) {
  const handleChange = (e) => {
    setDate(new Date(e.target.value));
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-bold text-gray-700">Daily Task Planner</h1>
      <input
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={handleChange}
        className="border rounded-lg px-2 py-1"
      />
    </div>
  );
}
