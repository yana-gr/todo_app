import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './footer.css'

export default function Footer(props) {
  const { leftItemCount, onFilterActive, onFilterAll, onFilterCompleted, deleteAllCompleted } = props

  return (
    <footer className="footer">
      <span className="todo-count">{leftItemCount} items left</span>
      <TasksFilter
        onFilterAll={() => onFilterAll()}
        onFilterActive={() => onFilterActive()}
        onFilterCompleted={() => onFilterCompleted()}
      />
      <button type="button" className="clear-completed" onClick={deleteAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  leftItemCount: PropTypes.number.isRequired,
  onFilterActive: PropTypes.func.isRequired,
  onFilterAll: PropTypes.func.isRequired,
  onFilterCompleted: PropTypes.func.isRequired,
  deleteAllCompleted: PropTypes.func.isRequired,
}

// export default class Footer extends Component {
//   static propTypes = {
//     leftItemCount: PropTypes.number.isRequired,
//     onFilterActive: PropTypes.func.isRequired,
//     onFilterAll: PropTypes.func.isRequired,
//     onFilterCompleted: PropTypes.func.isRequired,
//     deleteAllCompleted: PropTypes.func.isRequired,
//   }

//   render() {
//     const { leftItemCount, onFilterActive, onFilterAll, onFilterCompleted, deleteAllCompleted } = this.props

//     return (
//       <footer className="footer">
//         <span className="todo-count">{leftItemCount} items left</span>
//         <TasksFilter
//           onFilterAll={() => onFilterAll()}
//           onFilterActive={() => onFilterActive()}
//           onFilterCompleted={() => onFilterCompleted()}
//         />
//         <button type="button" className="clear-completed" onClick={deleteAllCompleted}>
//           Clear completed
//         </button>
//       </footer>
//     )
//   }
// }
