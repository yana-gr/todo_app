import React, { Component } from "react";

import "./tasks-filter.css";

export default class TasksFilter extends Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button>All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}
