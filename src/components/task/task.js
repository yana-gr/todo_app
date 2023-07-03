import React, { Component } from "react";
import "./task.css";
import { formatDistanceToNow } from "date-fns";

let dateNow = formatDistanceToNow(new Date());

export default class Task extends Component {
  state = {
    isCompleted: false,
    isEditing: false,
  };

  onCheckboxClick = () => {
    this.setState((state) => {
      return {
        isCompleted: !state.isCompleted,
      };
    });
  };

  onIconEditClick = () => {
    this.setState((state) => {
      return {
        isEditing: !state.isEditing,
      };
    });
  };

  render() {
    const { label, onDeleted } = this.props;
    const { isCompleted, isEditing } = this.state;
    let classNames = "description";
    if (isCompleted) {
      classNames += " completed";
    }

    function Item({ label, isEditing }) {
      if (isEditing) {
        return (
          <input
            type="text"
            className="edit"
            onChange={(e) => {
              label = e.target.value;
            }}
            value={label}
          ></input>
        );
      }
      return <span className={classNames}>{label}</span>;
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={this.onCheckboxClick}
        ></input>
        <label>
          <Item isEditing={isEditing} label={label} />
          <span className="created">created {dateNow} ago</span>
        </label>
        <button
          className="icon icon-edit"
          onClick={this.onIconEditClick}
        ></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
