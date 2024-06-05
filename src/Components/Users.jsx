import React, { useState, useEffect } from "react"
import { getUsersData } from "../utils"
import User from "./User";

// NOT IN USE
export default function Users({users, handleUpdate, handleDelete, showTodosPosts, chosenUserId}) {

  return (
    <div>
      {/* {console.log(users)} */}
      {
        users.map((user) => {
          return <User key={user.id} user_info={user} handleUpdate={handleUpdate} handleDelete={handleDelete} showTodosPosts={showTodosPosts} chosenUserId={chosenUserId}/>
        })
      }
    </div>
  )
};
