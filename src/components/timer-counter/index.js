import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './timer-counter.css'

export default class TimerCounter extends Component {
  static defaultProps = {
    Interval: 60000,
  }

  creatingDate = new Date()

  updateInterval = () => {
    let currentDate = setInterval(() => {
      new Date()
    }, this.props.Interval)
    return formatDistanceToNow(this.creatingDate, currentDate)
  }

  render() {
    return <span className="created">created {this.updateInterval()} ago</span>
  }
}
