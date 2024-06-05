import React, { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

// Comp to handle new todo for a user
export default function AddTodo({userId, returnTodosList, addTodoOrPost}) {
  const [title, setTitle] = useState("")
  const [newTodo, setNewTodo] = useState({isTodo: true, userId, id: uuid(), title, completed: false})

  useEffect(() => {
    setNewTodo({...newTodo, title})  
  }, [title]);
  
  const handleNewTodo = () => {
    if (title === "")
      alert("Please fill the title for the new todo")
    else {
      addTodoOrPost(newTodo)
      returnTodosList()
    }
  }

  return (
    <div className="addTodo-div">
      <div className="addTodo-row">
        <label>Title: </label>
        <input onChange={(e) => setTitle(e.target.value)} type="text"></input> <br/>
      </div>
      <div className="addTodo-button-group">
        <button onClick={() => returnTodosList()}>Cancel</button>
        <button onClick={handleNewTodo}>Add</button>
      </div>
    </div>
  )
};
