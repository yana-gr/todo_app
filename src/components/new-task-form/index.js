import React, { useState } from 'react'

export default function NewTaskForm(props) {
  const { onItemAdded } = props
  const [isNumber, setIsNumber] = useState(true)
  const [label, setLabel] = useState('')
  const [minStartLabel, setMinStartLabel] = useState('')
  const [secStartLabel, setSecStartLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    setMinStartLabel(e.target.value)
  }

  const onSecChange = (e) => {
    setSecStartLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const minStartNum = Number(minStartLabel)
    const secStartNum = Number(secStartLabel)
    if (
      minStartNum >= 0 &&
      minStartNum < 60 &&
      secStartNum >= 0 &&
      secStartNum < 60 &&
      !Number.isNaN(minStartNum) &&
      !Number.isNaN(secStartNum)
    ) {
      onItemAdded(label, Math.round(minStartLabel), Math.round(secStartLabel))
      setLabel('')
      setMinStartLabel('')
      setSecStartLabel('')
    } else {
      setIsNumber(false)
    }
  }

  const onToggleClose = () => {
    setIsNumber(true)
  }

  let classNameBackModal = 'back'
  let classNameModal = 'modal'
  if (isNumber) {
    classNameModal += ' hideModal'
    classNameBackModal += ' hideModal'
  } else {
    classNameModal += ' showModal'
    classNameBackModal += ' showModal'
  }

  return (
    <>
      <div className={classNameBackModal}>
        <div className={classNameModal}>
          <span>Values of time should be </span>
          <span>00 &lt;= Min &lt; 60 and 00 &lt;= Sec &lt; 60</span>

          <button type="button" className="btn-close" onClick={onToggleClose}>
            OK
          </button>
        </div>
      </div>

      <section className="new-todo-section">
        <form className="new-todo-form form-label" onSubmit={onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={onLabelChange}
            value={label}
            autoFocus
          />
        </form>
        <form className="new-todo-form form-timer-min" onSubmit={onSubmit}>
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={onMinChange}
            value={minStartLabel}
            autoFocus
          />
        </form>
        <form className="new-todo-form form-timer-sec" onSubmit={onSubmit}>
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={onSecChange}
            value={secStartLabel}
            autoFocus
          />
        </form>
      </section>
    </>
  )
}

// export default class NewTaskForm extends Component {
//   state = {
//     isNumber: true,
//     label: '',
//     minStartLabel: '',
//     secStartLabel: '',
//   }

//   onLabelChange = (e) => {
//     this.setState({ label: e.target.value })
//   }

//   onMinChange = (e) => {
//     this.setState({ minStartLabel: e.target.value })
//   }

//   onSecChange = (e) => {
//     this.setState({ secStartLabel: e.target.value })
//   }

//   onSubmit = (e) => {
//     e.preventDefault()
//     const minStartNum = Number(this.state.minStartLabel)
//     const secStartNum = Number(this.state.secStartLabel)
//     if (
//       minStartNum >= 0 &&
//       minStartNum < 60 &&
//       secStartNum >= 0 &&
//       secStartNum < 60 &&
//       !Number.isNaN(minStartNum) &&
//       !Number.isNaN(secStartNum)
//     ) {
//       this.props.onItemAdded(
//         this.state.label,
//         Math.round(this.state.minStartLabel),
//         Math.round(this.state.secStartLabel)
//       )
//       this.setState({ label: '', minStartLabel: '', secStartLabel: '' })
//     } else {
//       this.setState({ isNumber: false })
//     }
//   }

//   onToggleClose = () => {
//     this.setState({ isNumber: true })
//   }

//   render() {
//     let classNameBackModal = 'back'
//     let classNameModal = 'modal'
//     if (this.state.isNumber) {
//       classNameModal += ' hideModal'
//       classNameBackModal += ' hideModal'
//     } else {
//       classNameModal += ' showModal'
//       classNameBackModal += ' showModal'
//     }

//     return (
//       <>
//         <div className={classNameBackModal}>
//           <div className={classNameModal}>
//             <span>Values of time should be </span>
//             <span>00 &lt;= Min &lt; 60 and 00 &lt;= Sec &lt; 60</span>

//             <button type="button" className="btn-close" onClick={this.onToggleClose}>
//               OK
//             </button>
//           </div>
//         </div>

//         <section className="new-todo-section">
//           <form className="new-todo-form form-label" onSubmit={this.onSubmit}>
//             <input
//               type="text"
//               className="new-todo"
//               placeholder="What needs to be done?"
//               onChange={this.onLabelChange}
//               value={this.state.label}
//               autoFocus
//             />
//           </form>
//           <form className="new-todo-form form-timer-min" onSubmit={this.onSubmit}>
//             <input
//               className="new-todo-form__timer"
//               placeholder="Min"
//               onChange={this.onMinChange}
//               value={this.state.minStartLabel}
//               autoFocus
//             />
//           </form>
//           <form className="new-todo-form form-timer-sec" onSubmit={this.onSubmit}>
//             <input
//               className="new-todo-form__timer"
//               placeholder="Sec"
//               onChange={this.onSecChange}
//               value={this.state.secStartLabel}
//               autoFocus
//             />
//           </form>
//         </section>
//       </>
//     )
//   }
// }
