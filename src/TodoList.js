import React, {useState} from 'react'

const TodoList = ({ createTask, tasks }) => {
  const [content, setContent] = useState('')
  return (
    <div id="content">
    <form onSubmit={(event) => {
      event.preventDefault()
      createTask(content)
    }}>
      <input id="newTask" ref={(input) => setContent(input)} type="text" className="form-control" placeholder="Add task..." required />
      <input type="submit" hidden={true} />
    </form>
    <ul id="taskList" className="list-unstyled">
      { tasks.map((task, key) => {
        return(
          <div className="taskTemplate checkbox" key={key}>
            <label>
              <input type="checkbox" />
              <span className="content">{task.content}</span>
            </label>
          </div>
        )
      })}
    </ul>
    <ul id="completedTaskList" className="list-unstyled">
    </ul>
  </div>
  )
}

export default TodoList