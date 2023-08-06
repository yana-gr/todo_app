import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './task.css'
import Timer from '../timer'
import TimerCounter from '../timer-counter'
// import { min } from 'date-fns'

export default class Task extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
    onEditing: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isHidden: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }

  state = {
    label: '',
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onEditing()
    this.props.editedItem(this.props.id, this.state.label)
    this.setState({ label: '' })
  }

  onLabelChange = (e) => {
    this.setState({ label: e.target.value })
  }

  render() {
    const {
      label,
      onDeleted,
      onToggleCompleted,
      onEditing,
      isCompleted,
      isHidden,
      isEditing,
      minStart,
      secStart,
      runTimer,
      stopTimer,
      id,
    } = this.props
    let classNames = 'description'
    if (isCompleted) {
      classNames += ' completed'
    }
    let classNamesItem = 'view'
    if (isHidden) {
      classNamesItem += ' hidden'
    }

    let item
    const checkbox = <input className="toggle" type="checkbox" onClick={onToggleCompleted} />

    if (isEditing) {
      item = (
        <div className={classNamesItem}>
          {checkbox}
          <label>
            <form onSubmit={this.onSubmit}>
              <input type="text" className="edit" onChange={this.onLabelChange} value={this.label} />
            </form>
          </label>
        </div>
      )
    } else {
      item = (
        <div className={classNamesItem}>
          {checkbox}
          <label>
            <span className={classNames}>{label}</span>
            <Timer minStart={minStart} secStart={secStart} runTimer={runTimer} stopTimer={stopTimer} id={id} />
            <TimerCounter />
          </label>
          <button type="button" className="icon icon-edit" onClick={onEditing} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
      )
    }

    return item
  }
}
