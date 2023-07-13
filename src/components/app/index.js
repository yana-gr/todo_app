import React, { Component } from 'react'
import './app.css'

import AppHeader from '../app-header'
import TaskList from '../task-list'
import Footer from '../footer'
import NewTaskForm from '../new-task-form'

export default class App extends Component {
  maxID = 100

  state = {
    taskData: [
      this.createTodoItem('Completed Task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
  }

  createTodoItem(label) {
    return {
      label,
      isCompleted: false,
      isEditing: false,
      isHidden: false,
      id: this.maxID++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)

      const newTaskData = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
      return {
        taskData: newTaskData,
      }
    })
  }

  deleteAllCompleted = () => {
    this.setState(({ taskData }) => {
      let newtaskData = taskData.slice()
      newtaskData = newtaskData.filter((item) => !item.isCompleted)
      return {
        taskData: newtaskData,
      }
    })
  }

  addItem = (label) => {
    const newItem = this.createTodoItem(label)
    this.setState(({ taskData }) => {
      const newTaskData = [...taskData, newItem]
      return {
        taskData: newTaskData,
      }
    })
  }

  editItem = (id, newLabel) => {
    this.setState(({ taskData }) => {
      let newTaskData = taskData.slice()
      newTaskData = newTaskData.map((el) => (el.id === id ? { ...el, label: newLabel } : el))
      return {
        taskData: newTaskData,
      }
    })
  }

  onToggleEditing = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)

      const oldItem = taskData[idx]
      const newItem = {
        ...oldItem,
        isEditing: !oldItem.isEditing,
      }
      const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
      return {
        taskData: newTaskData,
      }
    })
  }

  onToggleCompleted = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const oldItem = taskData[idx]
      const newItem = { ...oldItem, isCompleted: !oldItem.isCompleted }
      const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
      return {
        taskData: newTaskData,
      }
    })
  }

  onFilterAll = () => {
    this.setState(({ taskData }) => {
      let newtaskData = taskData.slice()
      newtaskData.forEach((item) => {
        item.isHidden = false
      })
      return {
        taskData: newtaskData,
      }
    })
  }

  onFilterActive = () => {
    this.setState(({ taskData }) => {
      let newtaskData = taskData.slice()
      newtaskData.forEach((item) => {
        item.isCompleted ? (item.isHidden = true) : (item.isHidden = false)
      })
      return {
        taskData: newtaskData,
      }
    })
  }

  onFilterCompleted = () => {
    this.setState(({ taskData }) => {
      let newtaskData = taskData.slice()
      newtaskData.forEach((item) => {
        item.isCompleted ? (item.isHidden = false) : (item.isHidden = true)
      })
      return {
        taskData: newtaskData,
      }
    })
  }

  render() {
    const { taskData } = this.state
    const completedItemCount = taskData.filter((el) => el.isCompleted).length
    const leftItemCount = taskData.length - completedItemCount
    return (
      <section className="todoapp">
        <AppHeader />
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={taskData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onEditing={this.onToggleEditing}
            editedItem={this.editItem}
          />
          <Footer
            leftItemCount={leftItemCount}
            onFilterAll={this.onFilterAll}
            onFilterActive={this.onFilterActive}
            onFilterCompleted={this.onFilterCompleted}
            deleteAllCompleted={this.deleteAllCompleted}
            tasks={taskData}
          />
        </section>
      </section>
    )
  }
}
