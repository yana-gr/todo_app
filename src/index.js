import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import AppHeader from "./components/app-header";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

class App extends Component {
  state = {
    taskData: [
      { label: "Completed Task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "Active task", id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id);

      const newTaskData = [
        ...taskData.slice(0, idx),
        ...taskData.slice(idx + 1),
      ];
      return {
        taskData: newTaskData,
      };
    });
  };
  render() {
    return (
      <section className="todoapp">
        <AppHeader />
        <section className="main">
          <TaskList tasks={this.state.taskData} onDeleted={this.deleteItem} />
          <Footer />
        </section>
      </section>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
