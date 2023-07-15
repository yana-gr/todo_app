import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
  }

  render() {
    const { tasks, onDeleted, onToggleCompleted, onEditing } = this.props

    const elements = tasks.map((item) => {
      const { id, ...itemProps } = item
      return (
        <li key={id}>
          <Task
            {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleCompleted={() => onToggleCompleted(id)}
            onEditing={() => onEditing(id)}
            editedItem={this.props.editedItem}
            id={id}
          />
        </li>
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
