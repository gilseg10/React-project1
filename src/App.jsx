import React, { useState, useEffect } from "react"
import { getUsersData } from "./utils"
import './App.css'
import TodosPosts from "./Components/TodosPosts";
import User from "./Components/User";
import AddUser from "./Components/AddUser";
import LoadingSpinner from "./Components/LoadingSpinner";

// Main App
function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("")
  const [showTP, setShowTP] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [chosenUserId, setChosenUserId] = useState(0)
  const [userTodos, setUserTodos] = useState([])
  const [userPosts, setUserPosts] = useState([])

  // fetching the users and their data
  useEffect(() => {
    const fetchData = async () => {
      const users_info = await getUsersData()
      setUsers(users_info)
    }
    fetchData()
  }, []);

  // filter the users according to username and email
  const filteredUsers = users.filter(user => {
    const username = user.name.toLocaleLowerCase()
    const useremail = user.email.toLocaleLowerCase()
    const searchLowerCase = search.toLocaleLowerCase()
    return username.includes(searchLowerCase) || useremail.includes(searchLowerCase)
  })

  // function to handle update user's info from User comp
  // only replace the updated user info instead the old info 
  const handleUpdate = (updated_user) => {
    console.log(updated_user)
    setUsers(users.map(user => {
      return user.id === updated_user.id ? updated_user : user 
    }))
  }

  // Delete user and close his section of todos-posts
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id))
    if (chosenUserId === id && showTP)
      setShowTP(false)
  }
  
  // CLOSE the todos-posts section and SHOW 'add user' section
  const showFillAddUser = () => {
    setShowTP(false)
    setShowAddUser(true)
  }

  // SHOW the todos-posts section and CLOSE 'add user' section
  const hideFillAddUser = () => {
    setShowAddUser(false)
    setChosenUserId(0)
  }

  // function to transfer to User comp to handle the showing of todos-posts
  const showTodosPosts = async (id) => {
    const chosenUser = users.find(user => user.id === id)
    setUserTodos(chosenUser.todosUser)
    setUserPosts(chosenUser.postsUser)
    
    if (chosenUserId === id && showTP) { 
      // if its the same user that we click, we close his todos-posts section 
      // set the ChosenUserId to 0 to indicate no user's todos-posts was chosen
      setShowTP(false)
      setChosenUserId(0)
    }
    // if its another user or the same as before (but with his section closed), 
    // we want to open his todos-posts section
    else { 
      setShowTP(true)
      setShowAddUser(false)
      // update the current user that his todos-posts section is presented
      setChosenUserId(id)
    }
  }
  
  // function to update user's todo to "completed: true" and update the users state 
  const updateUsers = (user_id, todo_id) => {
    setUsers(users.map(user => {
      if (user.id === user_id) {
        const updated_todos = user.todosUser.todos.map(todo => {
          if (todo.id !== todo_id)
            return todo
          else
            return {...todo, completed: true}
        })
        return {...user, todosUser: {userId: user.id, todos: updated_todos}}
      }
      return user
    }))
  }

  // function to recieve data object that could be either be todo or post
  // the function distinguishes between todo or post using `isTodo` property
  const addTodoOrPost = (data) => {
    setUsers(users.map(user => {
      if (user.id === data.userId) {
        if (data.isTodo) { // data is new Todo
          const {isTodo, ...newTodo} = data
          user.todosUser.todos.push(newTodo)
        } else { // data is new Post
          const {isTodo, ...newPost} = data
          user.postsUser.posts.push(newPost)
        }
      }
      return user
    }))
  }

  const addNewUser = (new_user) => {
    const new_users = users
    new_users.push(new_user)
    setUsers(new_users)
  }
  
  // update the todos-posts section when users state is updated
  useEffect(() => {
    const chosenUser = users.find(user => user.id === chosenUserId)
    setUserTodos(chosenUser?.todosUser)
    setUserPosts(chosenUser?.postsUser)
  }, [users]);

  return (
    <div>
      { users.length != 0 ? <div className="full_app"> 
        <div className="searchAndUsers">
          <div className="searchInput">
            <label>Search </label>
            <input onChange={e => setSearch(e.target.value)} type="text"></input>
            <button onClick={() => showFillAddUser()}>Add</button> <br/>
          </div>
          <div className="scrollBarUsers">
            {
              filteredUsers.map(user => {
                return <User key={user.id} user_info={user} handleUpdate={handleUpdate} handleDelete={handleDelete} showTodosPosts={showTodosPosts} chosenUserId={chosenUserId} isNewUserOpen={showAddUser}/>
              })
            }
          </div>
        </div>
        <div>
          { showTP && <TodosPosts userTodos={userTodos} userPosts={userPosts} updateUsers={updateUsers} addTodoOrPost={addTodoOrPost}/> }
          { showAddUser && <AddUser hideFillAddUser={hideFillAddUser} addNewUser={addNewUser}/> }
        </div>
      </div> : <LoadingSpinner />} 
    </div>
  )
}

export default App
