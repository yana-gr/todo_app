import React from 'react'

import './timer.css'

export default function Timer(props) {
  const { minStart, secStart, runTimer, stopTimer, id } = props

  const onToggleStart = () => {
    runTimer(id)
  }

  const onTogglePause = () => {
    stopTimer(id)
  }

  return (
    <span className="description timer">
      <button type="button" className="icon icon-play" onClick={onToggleStart} />
      <button type="button" className="icon icon-pause" onClick={onTogglePause} />
      <span className="timer">
        {minStart}:{secStart}
      </span>
    </span>
  )
}
