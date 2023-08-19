import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './timer-counter.css'

export default function TimerCounter() {
  const defaultProps = {
    Interval: 60000,
  }

  const [creatingDate] = useState(new Date())

  const updateInterval = () => {
    const currentDate = setInterval(() => {
      new Date()
    }, defaultProps.Interval)
    return formatDistanceToNow(creatingDate, currentDate)
  }

  return <span className="created">created {updateInterval()} ago</span>
}
