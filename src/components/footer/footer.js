import React, { Component } from "react";
import PropTypes from "prop-types";
import TasksFilter from "../tasks-filter";
import "./footer.css";

export default class Footer extends Component {
  static propTypes = {
    leftItemCount: PropTypes.number,
    onFilterActive: PropTypes.func,
    onFilterAll: PropTypes.func,
    onFilterCompleted: PropTypes.func,
    deleteAllCompleted: PropTypes.func,
  };

  render() {
    const {
      leftItemCount,
      onFilterActive,
      onFilterAll,
      onFilterCompleted,
      deleteAllCompleted,
    } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{leftItemCount} items left</span>
        <TasksFilter
          onFilterAll={() => onFilterAll()}
          onFilterActive={() => onFilterActive()}
          onFilterCompleted={() => onFilterCompleted()}
        />
        <button className="clear-completed" onClick={deleteAllCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
