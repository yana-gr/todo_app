import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default function TaskList(props) {
  const { tasks, onDeleted, onToggleCompleted, onEditing, runTimer, stopTimer, editedItem } = props

  const elements = tasks.map((item) => {
    const { id, ...itemProps } = item
    return (
      <li key={id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEditing={() => onEditing(id)}
          editedItem={editedItem}
          runTimer={runTimer}
          stopTimer={stopTimer}
          id={id}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
}
