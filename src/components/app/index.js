import React, { useEffect, useState, useRef } from 'react'
import './app.css'

import AppHeader from '../app-header'
import TaskList from '../task-list'
import Footer from '../footer'
import NewTaskForm from '../new-task-form'

export default function App() {
  const maxID = useRef(100)
  const allTimers = useRef([])

  const createTodoItem = (label, minStart, secStart) => ({
    label,
    isCompleted: false,
    isEditing: false,
    isHidden: false,
    id: maxID.current++,
    minStart,
    secStart,
    allSeconds: Number(minStart) * 60 + Number(secStart),
    isRunningTimer: false,
    timer: null,
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

    return () => allTimers.current.forEach((timer) => clearInterval(timer.newTimer))
  }, [])

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

  const editItem = (id, newLabel) => {
    const idx = taskData.findIndex((el) => el.id === id)

    const oldItem = taskData[idx]
    const newItem = {
      ...oldItem,
      isEditing: !oldItem.isEditing,
      label: newLabel,
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
    const numberTimer = allTimers.current.find((timer) => {
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

          setTaskData((prevTaskData) => prevTaskData.map((task) => (task.id === id ? { ...newItem } : task)))

          localStorage.setItem(oldItem.id, oldItem.allSeconds - 1)
        }
      }, 1000)
      allTimers.current.push({ id, newTimer })
    }
  }

  const stopTimer = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const oldItem = taskData[idx]
    const newItem = { ...oldItem, isRunningTimer: false }
    const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
    setTaskData(newTaskData)

    const numberTimer = allTimers.current.find((timer) => {
      if (Number(timer.id) === Number(id)) return timer
    })
    if (typeof numberTimer !== 'undefined') {
      clearInterval(numberTimer.newTimer)
      const indx = allTimers.current.indexOf(numberTimer)
      allTimers.current.splice(indx, 1)
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
