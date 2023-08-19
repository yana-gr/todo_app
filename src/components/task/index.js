import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './task.css'
import Timer from '../timer'
import TimerCounter from '../timer-counter'

export default function Task(props) {
  const {
    label,
    onDeleted,
    onToggleCompleted,
    onEditing,
    editedItem,
    isCompleted,
    isHidden,
    isEditing,
    minStart,
    secStart,
    runTimer,
    stopTimer,
    id,
  } = props

  const [labl, setLabl] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    onEditing()
    editedItem(id, labl)
    setLabl('')
  }

  const onLabelChange = (e) => {
    setLabl(e.target.value)
  }

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
          <form onSubmit={onSubmit}>
            <input type="text" className="edit" onChange={onLabelChange} value={labl} />
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

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onEditing: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
}
