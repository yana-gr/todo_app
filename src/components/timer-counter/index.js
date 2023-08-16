import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import './timer-counter.css'

export default function TimerCounter() {
  const defaultProps = {
    Interval: 60000,
  }

  const creatingDate = new Date()

  const updateInterval = () => {
    const currentDate = setInterval(() => {
      new Date()
    }, defaultProps.Interval)
    return formatDistanceToNow(creatingDate, currentDate)
  }

  return <span className="created">created {updateInterval()} ago</span>
}

// export default class TimerCounter extends Component {
//   static defaultProps = {
//     Interval: 60000,
//   }

//   creatingDate = new Date()

//   updateInterval = () => {
//     const currentDate = setInterval(() => {
//       new Date()
//     }, this.props.Interval)
//     return formatDistanceToNow(this.creatingDate, currentDate)
//   }

//   render() {
//     return <span className="created">created {this.updateInterval()} ago</span>
//   }
// }
