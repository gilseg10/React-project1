import React, { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid'

// Comp to handle new user addition
export default function AddUser({hideFillAddUser, addNewUser}) {
  const id = uuid().slice(0,6)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [user, setUser] = useState({
        id: id,
        name,
        email,
        street: "",
        city: "",
        zipcode: "",
        todosUser: {userId: id, todos: []},
        postsUser: {userId: id, posts: []}
  })

  useEffect(() => {
    setUser({...user, name, email})
  }, [name, email]);
  
  const HandleNewUser = () => {
    if (name === "" || email === "")
        alert("Please fill the Name and the Email for the new user")
    else {
        addNewUser(user)
        hideFillAddUser()
    }
  }
  
  return (
    <div className="addUser-div">
      <strong>Add New User</strong>
      <div className="addUser-container">
        <div className="addUser-row">
          <label>Name: </label>
          <input onChange={(e) => setName(e.target.value)} type="text"></input> <br/>
        </div>
        <div className="addUser-row">
          <label>Email: </label>
          <input onChange={(e) => setEmail(e.target.value)} type="text"></input> <br/>
        </div>
        <div className="addUser-button-group">
          <button onClick={() => hideFillAddUser()}>Cancel</button>
          <button onClick={HandleNewUser}>Add</button>
        </div>
      </div>
    </div>
  )
};
