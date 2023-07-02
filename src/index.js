import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppHeader from "./components/app-header";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

const App = () => {
  const taskData = [
    { label: "Completed Task", id: 1 },
    { label: "Editing task", id: 2 },
    { label: "Active task", id: 3 },
  ];
  return (
    <section className="todoapp">
      <AppHeader />
      <section className="main">
        <TaskList tasks={taskData} />
        <Footer />
      </section>
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
