import React, { useEffect, useState, useCallback } from 'react'
import './app.css'

import AppHeader from '../app-header'
import TaskList from '../task-list'
import Footer from '../footer'
import NewTaskForm from '../new-task-form'

export default function App() {
  let maxID = 100

  const allTimers = []

  const createTodoItem = (label, minStart, secStart) => ({
    label,
    isCompleted: false,
    isEditing: false,
    isHidden: false,
    id: maxID++,
    minStart,
    secStart,
    allSeconds: Number(minStart) * 60 + Number(secStart),
    isRunningTimer: false,
  })

  const firstTaskData = [
    createTodoItem('Completed Task', '10', '00'),
    createTodoItem('Editing task', '15', '00'),
    createTodoItem('Active task', '00', '10'),
  ]
  const [taskData, setTaskData] = useState(firstTaskData)

  useEffect(() => {
    const newTaskData = taskData.map((task) => {
      for (let i = 0; i < localStorage.length; i++) {
        const localStorageTaskID = localStorage.key(i)
        if (Number(localStorageTaskID) === Number(task.id)) {
          const allSeconds = Number(localStorage.getItem(localStorageTaskID))
          const minutes = Math.floor(allSeconds / 60)
          const seconds = Math.round((allSeconds / 60 - Math.trunc(allSeconds / 60)) * 60)
          return {
            ...task,
            isRunningTimer: !task.isRunningTimer,
            allSeconds,
            minStart: minutes,
            secStart: seconds,
          }
        }
      }
      return task
    })
    setTaskData(newTaskData)
    return () => allTimers.forEach((timer) => clearInterval(timer.newTimer))
  }, [taskData])

  const deleteItem = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const newTaskData = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
    setTaskData(newTaskData)
  }

  const deleteAllCompleted = () => {
    let newTaskData = taskData.slice()
    newTaskData = newTaskData.filter((item) => !item.isCompleted)
    setTaskData(newTaskData)
  }

  const addItem = (label, minStart, secStart) => {
    const newItem = createTodoItem(label, minStart, secStart)
    const newTaskData = [...taskData, newItem]
    setTaskData(newTaskData)
  }

  const editItem = (id, newLabel) => {
    let newTaskData = taskData.slice()
    newTaskData = newTaskData.map((el) => (el.id === id ? { ...el, label: newLabel } : el))
    setTaskData(newTaskData)
  }

  const onToggleEditing = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)

    const oldItem = taskData[idx]
    const newItem = {
      ...oldItem,
      isEditing: !oldItem.isEditing,
    }
    const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    setTaskData(newTaskData)
  }

  const onToggleCompleted = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = taskData[idx]
    const newItem = { ...oldItem, isCompleted: !oldItem.isCompleted }
    const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

    setTaskData(newTaskData)
  }

  const onFilterAll = () => {
    const newTaskData = []
    taskData.forEach((item) => {
      if (!item.isHidden) {
        newTaskData.push(item)
      } else {
        const newItem = { ...item, isHidden: !item.isHidden }
        newTaskData.push(newItem)
      }
    })

    setTaskData(newTaskData)
  }

  const onFilterActive = () => {
    const newTaskData = []
    taskData.forEach((item) => {
      if (item.isCompleted) {
        const newItem = { ...item, isHidden: true }
        newTaskData.push(newItem)
      } else {
        const newItem = { ...item, isHidden: false }
        newTaskData.push(newItem)
      }
    })

    setTaskData(newTaskData)
  }

  const onFilterCompleted = () => {
    const newTaskData = []
    taskData.forEach((item) => {
      if (item.isCompleted) {
        const newItem = { ...item, isHidden: false }
        newTaskData.push(newItem)
      } else {
        const newItem = { ...item, isHidden: true }
        newTaskData.push(newItem)
      }
    })

    setTaskData(newTaskData)
  }

  const runTimer = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = taskData[idx]
    const numberTimer = allTimers.find((timer) => {
      if (Number(timer.id) === Number(id)) return timer
    })
    if (!numberTimer) {
      const newTimer = setInterval(() => {
        if (oldItem.allSeconds > 0) {
          const allSecondsCount = Number((oldItem.allSeconds -= 1))
          const minutes = Math.floor(Number(oldItem.allSeconds) / 60)
          const seconds = Math.round(
            (Number(oldItem.allSeconds) / 60 - Math.trunc(Number(oldItem.allSeconds) / 60)) * 60
          )
          const newItem = {
            ...oldItem,
            secStart: seconds,
            minStart: minutes,
            allSeconds: allSecondsCount,
            isRunningTimer: true,
            timer: newTimer,
          }
          const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

          setTaskData(newTaskData)

          localStorage.setItem(oldItem.id, oldItem.allSeconds - 1)
        }
      }, 1000)
      allTimers.push({ id, newTimer })
    }
  }

  const stopTimer = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = taskData[idx]
    const newItem = { ...oldItem, isRunningTimer: false }
    const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    setTaskData(newTaskData)

    const numberTimer = allTimers.find((timer) => {
      if (Number(timer.id) === Number(id)) return timer
    })
    if (typeof numberTimer !== 'undefined') {
      clearInterval(numberTimer.newTimer)
      const indx = allTimers.indexOf(numberTimer)
      allTimers.splice(indx, 1)
    }
  }

  const completedItemCount = taskData.filter((el) => el.isCompleted).length
  const leftItemCount = taskData.length - completedItemCount

  return (
    <section className="todoapp">
      <AppHeader />
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          tasks={taskData}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onEditing={onToggleEditing}
          editedItem={editItem}
          runTimer={runTimer}
          stopTimer={stopTimer}
        />
        <Footer
          leftItemCount={leftItemCount}
          onFilterAll={onFilterAll}
          onFilterActive={onFilterActive}
          onFilterCompleted={onFilterCompleted}
          deleteAllCompleted={deleteAllCompleted}
          tasks={taskData}
        />
      </section>
    </section>
  )
}

// export default class App extends Component {
//   maxID = 100

//   allTimers = []

//   state = {
//     taskData: [
//       this.createTodoItem('Completed Task', '10', '00'),
//       this.createTodoItem('Editing task', '15', '00'),
//       this.createTodoItem('Active task', '00', '10'),
//     ],
//   }

//   createTodoItem(label, minStart, secStart) {
//     return {
//       label,
//       isCompleted: false,
//       isEditing: false,
//       isHidden: false,
//       id: this.maxID++,
//       minStart,
//       secStart,
//       allSeconds: Number(minStart) * 60 + Number(secStart),
//       isRunningTimer: false,
//     }
//   }

//   componentDidMount() {
//     const newTaskData = this.state.taskData.map((task) => {
//       for (let i = 0; i < localStorage.length; i++) {
//         const localStorageTaskID = localStorage.key(i)
//         if (Number(localStorageTaskID) === Number(task.id)) {
//           const allSeconds = Number(localStorage.getItem(localStorageTaskID))
//           const minutes = Math.floor(allSeconds / 60)
//           const seconds = Math.round((allSeconds / 60 - Math.trunc(allSeconds / 60)) * 60)
//           return {
//             ...task,
//             isRunningTimer: !task.isRunningTimer,
//             allSeconds,
//             minStart: minutes,
//             secStart: seconds,
//           }
//         }
//       }
//       return task
//     })
//     this.setState({ taskData: newTaskData })
//   }

//   componentWillUnmount() {
//     this.allTimers.forEach((timer) => clearInterval(timer.newTimer))
//   }

//   deleteItem = (id) => {
//     this.setState(({ taskData }) => {
//       const idx = taskData.findIndex((el) => el.id === id)

//       const newTaskData = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   deleteAllCompleted = () => {
//     this.setState(({ taskData }) => {
//       let newtaskData = taskData.slice()
//       newtaskData = newtaskData.filter((item) => !item.isCompleted)
//       return {
//         taskData: newtaskData,
//       }
//     })
//   }

//   addItem = (label, minStart, secStart) => {
//     const newItem = this.createTodoItem(label, minStart, secStart)
//     this.setState(({ taskData }) => {
//       const newTaskData = [...taskData, newItem]
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   editItem = (id, newLabel) => {
//     this.setState(({ taskData }) => {
//       let newTaskData = taskData.slice()
//       newTaskData = newTaskData.map((el) => (el.id === id ? { ...el, label: newLabel } : el))
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   onToggleEditing = (id) => {
//     this.setState(({ taskData }) => {
//       const idx = taskData.findIndex((el) => el.id === id)

//       const oldItem = taskData[idx]
//       const newItem = {
//         ...oldItem,
//         isEditing: !oldItem.isEditing,
//       }
//       const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   onToggleCompleted = (id) => {
//     this.setState(({ taskData }) => {
//       const idx = taskData.findIndex((el) => el.id === id)
//       const oldItem = taskData[idx]
//       const newItem = { ...oldItem, isCompleted: !oldItem.isCompleted }
//       const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   onFilterAll = () => {
//     this.setState(({ taskData }) => {
//       const newTaskData = []
//       taskData.forEach((item) => {
//         if (!item.isHidden) {
//           newTaskData.push(item)
//         } else {
//           const newItem = { ...item, isHidden: !item.isHidden }
//           newTaskData.push(newItem)
//         }
//       })
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   onFilterActive = () => {
//     this.setState(({ taskData }) => {
//       const newTaskData = []
//       taskData.forEach((item) => {
//         if (item.isCompleted) {
//           const newItem = { ...item, isHidden: true }
//           newTaskData.push(newItem)
//         } else {
//           const newItem = { ...item, isHidden: false }
//           newTaskData.push(newItem)
//         }
//       })
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   onFilterCompleted = () => {
//     this.setState(({ taskData }) => {
//       const newTaskData = []
//       taskData.forEach((item) => {
//         if (item.isCompleted) {
//           const newItem = { ...item, isHidden: false }
//           newTaskData.push(newItem)
//         } else {
//           const newItem = { ...item, isHidden: true }
//           newTaskData.push(newItem)
//         }
//       })
//       return {
//         taskData: newTaskData,
//       }
//     })
//   }

//   runTimer = (id) => {
//     const idx = this.state.taskData.findIndex((el) => el.id === id)
//     const oldItem = this.state.taskData[idx]
//     const numberTimer = this.allTimers.find((timer) => {
//       if (Number(timer.id) === Number(id)) return timer
//     })
//     if (!numberTimer) {
//       const newTimer = setInterval(() => {
//         if (oldItem.allSeconds > 0) {
//           this.setState(({ taskData }) => {
//             const allSecondsCount = Number((oldItem.allSeconds -= 1))
//             const minutes = Math.floor(Number(oldItem.allSeconds) / 60)
//             const seconds = Math.round(
//               (Number(oldItem.allSeconds) / 60 - Math.trunc(Number(oldItem.allSeconds) / 60)) * 60
//             )
//             const newItem = {
//               ...oldItem,
//               secStart: seconds,
//               minStart: minutes,
//               allSeconds: allSecondsCount,
//               isRunningTimer: true,
//               timer: this.newTimer,
//             }
//             const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]

//             return {
//               taskData: newTaskData,
//             }
//           })
//           localStorage.setItem(oldItem.id, oldItem.allSeconds - 1)
//         }
//       }, 1000)
//       this.allTimers.push({ id, newTimer })
//     }
//   }

//   stopTimer = (id) => {
//     const idx = this.state.taskData.findIndex((el) => el.id === id)
//     const oldItem = this.state.taskData[idx]

//     this.setState(({ taskData }) => {
//       const newItem = { ...oldItem, isRunningTimer: false }
//       const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
//       return {
//         taskData: newTaskData,
//       }
//     })
//     const numberTimer = this.allTimers.find((timer) => {
//       if (Number(timer.id) === Number(id)) return timer
//     })
//     if (typeof numberTimer !== 'undefined') {
//       clearInterval(numberTimer.newTimer)
//       const indx = this.allTimers.indexOf(numberTimer)
//       this.allTimers.splice(indx, 1)
//     }
//   }

//   render() {
//     const { taskData } = this.state
//     const completedItemCount = taskData.filter((el) => el.isCompleted).length
//     const leftItemCount = taskData.length - completedItemCount
//     return (
//       <section className="todoapp">
//         <AppHeader />
//         <NewTaskForm onItemAdded={this.addItem} />
//         <section className="main">
//           <TaskList
//             tasks={taskData}
//             onDeleted={this.deleteItem}
//             onToggleCompleted={this.onToggleCompleted}
//             onEditing={this.onToggleEditing}
//             editedItem={this.editItem}
//             runTimer={this.runTimer}
//             stopTimer={this.stopTimer}
//           />
//           <Footer
//             leftItemCount={leftItemCount}
//             onFilterAll={this.onFilterAll}
//             onFilterActive={this.onFilterActive}
//             onFilterCompleted={this.onFilterCompleted}
//             deleteAllCompleted={this.deleteAllCompleted}
//             tasks={taskData}
//           />
//         </section>
//       </section>
//     )
//   }
// }
