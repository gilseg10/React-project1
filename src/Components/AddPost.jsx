import React, { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

export default function AddPost({userId, returnPostsList, addTodoOrPost}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newPost, setNewPost] = useState({isTodo: false, userId, id: uuid(), title, body})

  useEffect(() => {
    setNewPost({...newPost, title, body})  
  }, [title, body]);

  const handleNewPost = () => {
    if (title === "" || body === "")
        alert("Please fill the title and the body for the new post")
      else {
        addTodoOrPost(newPost)
        returnPostsList()
      }
  }

  return (
    <div className="addPost-div">
      <div className="addPost-row">
        <label>Title: </label>
        <input onChange={(e) => setTitle(e.target.value)} type="text"></input> <br/>
      </div>
      <div className="addPost-row">
        <label>Body: </label>
        <input onChange={(e) => setBody(e.target.value)} type="text"></input> <br/>
      </div>
      <div className="addPost-button-group">
        <button onClick={() => returnPostsList()}>Cancel</button>
        <button onClick={handleNewPost}>Add</button>
      </div>      
    </div>
  )
};
