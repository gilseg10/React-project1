import React, { useEffect, useState } from "react"

export default function User({user_info, handleUpdate, handleDelete, showTodosPosts, chosenUserId, isNewUserOpen}) {
  const [isCompleated, setIsCompleated] = useState(false)
  const [otherData, setOtherData] = useState(false)
  const [updated_user, setUpdated_user] = useState(user_info)
  const [isColor, setIsColor] = useState(false)

  // to synchronize the highlighted user when pressing the "Add" new user button 
  useEffect(() => {
    if (isNewUserOpen)
      setIsColor(false)
  }, [isNewUserOpen]);

  // to switch highlighted user when other user is pressed
  useEffect(() => {
    if (chosenUserId !== user_info.id && isColor)
        setIsColor(false)
  }, [chosenUserId]);

  // check if all todos are completed for coloring the frame
  useEffect(() => {
    const fetchTaskStatus = async () => {
        const todos = user_info.todosUser.todos
        setIsCompleated(todos.every(todo => todo.completed))
    }
    fetchTaskStatus()
  }, [showTodosPosts]);

  // handle changes of user's properties
  const handleChange = (e) => {
    const {name, value} = e.target
    setUpdated_user({...updated_user, [name]: value})
  }

  // Click on user's id for open/close his section of todos and posts
  const colorAndShowTP = () => {
    setIsColor(!isColor)
    showTodosPosts(user_info.id)
  }

  return (
    // if "Add" user button was NOT pressed, check indication of selected user click 
    // and valid id (for open or close -> orange or white) 
    <div className={`user-container ${isCompleated ? 'completed' : ''} ${isNewUserOpen ? '' : (isColor && chosenUserId !== 0 ? 'highlighted' : '')}`}>
      <div className="user-row">
        <label>ID:</label>
        <span className="clickable-label" onClick={colorAndShowTP}>{user_info.id}</span>
      </div>
      <div className="user-row">
        <label>Name:</label>
        <input name="name" type="text" defaultValue={user_info.name} onChange={handleChange}></input>
      </div>
      <div className="user-row">
        <label>Email:</label>
        <input name="email" type="text" defaultValue={user_info.email} onChange={handleChange}></input>
      </div>
      
      <div className="buttons-row">
        <button className="otherData-button" onMouseOver={e => setOtherData(!otherData)}>Other Data</button>
      </div>
      
      {otherData && <div className="otherData-div">
        <div className="otherData-row">
          <label>Street:</label>
          <input name="street" type="text" defaultValue={user_info.street} onChange={handleChange}></input> <br/>
        </div>
        <div className="otherData-row">
          <label>City:</label>
          <input name="city" type="text" defaultValue={user_info.city} onChange={handleChange}></input> <br/>
        </div>
        <div className="otherData-row">
          <label>Zip Code:</label>
          <input name="zipcode" type="text" defaultValue={user_info.zipcode} onChange={handleChange}></input> <br/>
        </div>
      </div>
      }

      <div className="button-group">
        <button onClick={() => handleUpdate({...updated_user, todosUser: user_info.todosUser, postsUser: user_info.postsUser})}>Update</button> 
        <button onClick={() => handleDelete(user_info.id)}>Delete</button> 
      </div>
      
    </div>
  )
};
