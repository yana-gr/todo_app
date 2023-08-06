import React, { Component } from 'react'

import './timer.css'

export default class Timer extends Component {
  onToggleStart = () => {
    this.props.runTimer(this.props.id)
  }

  onTogglePause = () => {
    this.props.stopTimer(this.props.id)
  }

  render() {
    const { minStart, secStart } = this.props

    return (
      <span className="description timer">
        <button type="button" className="icon icon-play" onClick={this.onToggleStart} />
        <button type="button" className="icon icon-pause" onClick={this.onTogglePause} />
        <span className="timer">
          {minStart}:{secStart}
        </span>
      </span>
    )
  }
}
