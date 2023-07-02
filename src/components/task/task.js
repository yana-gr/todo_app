import React, { Component } from "react";
import "./task.css";
import { formatDistanceToNow } from "date-fns";

let dataNow = formatDistanceToNow(new Date());

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
  };

  onCheckboxClick = () => {
    this.setState((state) => {
      return {
        completed: !state.completed,
      };
    });
  };

  onIconEditClick = () => {
    this.setState((state) => {
      return {
        editing: !state.editing,
      };
    });
  };

  render() {
    const { label } = this.props;
    const { completed, editing } = this.state;
    let classNames = "description";
    if (completed) {
      classNames += " completed";
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={this.onCheckboxClick}
        ></input>
        <label>
          <input type="text" class="edit" value="Editing task"></input>
          <input type="text" class="edit" value="Editing task"></input>
          <span className={classNames}>{label}</span>
          <span className="created">created {dataNow} ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={this.onIconEditClick}
        ></button>
        <button className="icon icon-destroy"></button>
      </div>
    );
  }
}
