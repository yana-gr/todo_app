import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  // static propTypes = {
  //   onFilterActive: PropTypes.func.isRequired,
  //   onFilterAll: PropTypes.func.isRequired,
  //   onFilterCompleted: PropTypes.func.isRequired,
  // }

  render() {
    const { onFilterActive, onFilterAll, onFilterCompleted } = this.props
    return (
      <ul className="filters">
        <li className="filters-item">
          <button type="button" onClick={onFilterAll}>
            All
          </button>
        </li>
        <li className="filters-item">
          <button type="button" onClick={onFilterActive}>
            Active
          </button>
        </li>
        <li className="filters-item">
          <button type="button" onClick={onFilterCompleted}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
