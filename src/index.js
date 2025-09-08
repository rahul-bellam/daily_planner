import React from "react";
import ReactDOM from "react-dom/client";
import DailyTaskPlanner from "./components/DailyTaskPlanner";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DailyTaskPlanner />
  </React.StrictMode>
);
