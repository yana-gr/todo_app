import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  static propTypes = {
    onFilterActive: PropTypes.func,
    onFilterAll: PropTypes.func,
    onFilterCompleted: PropTypes.func,
  }

  render() {
    const { onFilterActive, onFilterAll, onFilterCompleted } = this.props
    return (
      <ul className="filters">
        <li className="filters-item">
          <button onClick={onFilterAll}>All</button>
        </li>
        <li className="filters-item">
          <button onClick={onFilterActive}>Active</button>
        </li>
        <li className="filters-item">
          <button onClick={onFilterCompleted}>Completed</button>
        </li>
      </ul>
    )
  }
}
