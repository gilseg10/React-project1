import React, { useEffect, useState } from "react"

export default function Todos({todo, updateUsers}) {

  const [todoInfo, setTodoInfo] = useState({})

  useEffect(() => {
    setTodoInfo(todo)
  }, [todo]);

  const handleClick = () => {
    setTodoInfo({...todoInfo, completed: true})
    updateUsers(todoInfo.userId, todoInfo.id)
  }

  return (
    <div className="todos-div">
      {/* {console.log(todo)} */}
      <div className="todo-row">
        <span className="todo-label"><strong>Title: </strong>{todo.title}</span>
      </div>
      <div className="todo-row">
        <span className="todo-label"><strong>Completed: </strong>{String(todo.completed)}</span>
        {!todo.completed && <button onClick={() => handleClick(todo.id)}>Mark Completed</button>}
      </div>
    </div>
  )
};
