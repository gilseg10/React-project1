import React, { useState } from "react"
import Todos from "./Todos"
import Posts from "./Posts"
import AddTodo from "./AddTodo"
import AddPost from "./AddPost"

// Comp to handle the todos-posts section appearance
export default function TodosPosts({userTodos, userPosts, updateUsers, addTodoOrPost}) {
  const [addNewTodo, setAddNewTodo] = useState(false)
  const [addNewPost, setAddNewPost] = useState(false)

  const returnTodosList = () => {
    setAddNewTodo(false)
  }

  const returnPostsList = () => {
    setAddNewPost(false)
  }
  
  return (
    <div className="todos-posts-div">
      {/* Todos Section */}
      <div className="todos-posts-header">
        <label className="todos-posts-label">Todos - User {userTodos.userId}</label>
        { !addNewTodo && <button className="todos-posts-button" onClick={() => setAddNewTodo(true)}>Add</button> }
      </div>
      <div className="todos-posts-container">
        {
          !addNewTodo && userTodos.todos.map((todo, index) => {
            return <Todos key={index} todo={todo} updateUsers={updateUsers}/>
          })
        }
        {addNewTodo && <AddTodo userId={userTodos.userId} returnTodosList={returnTodosList} addTodoOrPost={addTodoOrPost}/>}
      </div> <br/>

      {/* Posts Section */}
      <div className="todos-posts-header">
        <label className="todos-posts-label">Posts - User {userPosts.userId}</label>
        { !addNewPost && <button className="todos-posts-button" onClick={() => setAddNewPost(true)} >Add</button> }
      </div>
      <div className="todos-posts-container">
        {
          !addNewPost && userPosts.posts.map((post, index) => {
            return <Posts key={index} post={post}/>
          })
        }
        { addNewPost && <AddPost userId={userPosts.userId} returnPostsList={returnPostsList} addTodoOrPost={addTodoOrPost}/>}
      </div>
    </div>
  )
};
